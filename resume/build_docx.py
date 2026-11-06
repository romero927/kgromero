#!/usr/bin/env python3
"""Build static/Kyle_Romero-Resume.docx from resume/Kyle_Romero-Resume.html.

The PDF is printed from the same HTML, so this keeps the two in sync. Sizes,
spacing, and colors mirror the HTML's CSS. Word only supports half-point font
sizes, so sizes like 7.2pt use the nearest half point plus a character-width
scale (w:w) to keep line breaks the same. Source Sans 3 is embedded so the file
looks right on machines without it (OFL; fsType 0 allows embedding).

Usage: python3 resume/build_docx.py   (needs ImageMagick `convert` for the icons)
"""

from __future__ import annotations

import re
import subprocess
import tempfile
import uuid
import zipfile
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from xml.sax.saxutils import escape

HERE = Path(__file__).resolve().parent
HTML = HERE / "Kyle_Romero-Resume.html"
OUT = HERE.parent / "static" / "Kyle_Romero-Resume.docx"

# ---- Layout constants, from the CSS (pt) ----
TW = 20  # twips per pt
PAGE_W, PAGE_H = 612, 792
MARGIN_TOP, MARGIN_SIDE, MARGIN_BOTTOM = 38, 39.7, 18
# Word/LibreOffice place text in an exact-height line slightly lower than Chrome does;
# these nudges were measured by comparing word positions in the two PDFs.
BASELINE_NUDGE = -0.8  # whole page up
NAME_RAISE = 1.0  # the 14pt name sits a further 1pt low
GAP_NUDGE = 0.17  # per contact-row gap
CONTENT_W = PAGE_W - 2 * MARGIN_SIDE
COLOR, RULE_COLOR = "2D3748", "1A202C"
REGULAR, SEMIBOLD = "Source Sans 3", "Source Sans 3 SemiBold"
SPACE_EM = 0.2  # advance width of a space in Source Sans 3


def tw(pt: float) -> int:
    return round(pt * TW)


def size(pt: float) -> tuple[int, int]:
    """Nearest half-point size (w:sz) and width scale % (w:w) that keeps the width."""
    hp = round(pt * 2)
    return hp, round(pt / (hp / 2) * 100)


# ---- Minimal HTML tree ----
class Node:
    def __init__(self, tag, attrs=None, parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs or {}), parent, []

    def cls(self):
        return self.attrs.get("class", "").split()

    def find_all(self, pred):
        for c in self.children:
            if isinstance(c, Node):
                if pred(c):
                    yield c
                yield from c.find_all(pred)

    def text(self):
        return "".join(c if isinstance(c, str) else c.text() for c in self.children)


VOID = {"meta", "link", "br", "img", "path", "input"}


class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = self.cur = Node("root")

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def norm(s: str) -> str:
    return re.sub(r"[ \t\r\n]+", " ", s).strip()


# ---- XML helpers ----
def rpr(font=REGULAR, pt=7.2, bold=False):
    hp, scale = size(pt)
    out = f'<w:rFonts w:ascii="{font}" w:hAnsi="{font}" w:cs="{font}"/>'
    if bold:
        out += "<w:b/><w:bCs/>"
    out += f'<w:color w:val="{COLOR}"/>'
    out += f'<w:w w:val="{scale}"/>'  # always set: the document default is scaled for 7.2pt
    out += f'<w:kern w:val="2"/><w:sz w:val="{hp}"/><w:szCs w:val="{hp}"/>'
    return f"<w:rPr>{out}</w:rPr>"


def run(text, **fmt):
    return f'<w:r>{rpr(**fmt)}<w:t xml:space="preserve">{escape(text)}</w:t></w:r>'


def para(content, *, before=0, after=0, line=10.5, jc=None, keep_next=False, extra=""):
    ppr = ""
    if keep_next:
        ppr += "<w:keepNext/>"
    ppr += extra
    ppr += f'<w:spacing w:before="{tw(before)}" w:after="{tw(after)}" w:line="{tw(line)}" w:lineRule="exact"/>'
    if jc:
        ppr += f'<w:jc w:val="{jc}"/>'
    return f"<w:p><w:pPr>{ppr}</w:pPr>{content}</w:p>"


class Doc:
    def __init__(self):
        self.body, self.rels, self.media = [], [], {}
        self._next_rel, self._next_pic = 10, 1

    def rel(self, typ, target, external=False):
        rid = f"rId{self._next_rel}"
        self._next_rel += 1
        mode = ' TargetMode="External"' if external else ""
        self.rels.append(f'<Relationship Id="{rid}" Type="{typ}" Target="{escape(target)}"{mode}/>')
        return rid

    def link(self, url, text, **fmt):
        rid = self.rel("http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", url, True)
        return f'<w:hyperlink r:id="{rid}" w:history="1">{run(text, **fmt)}</w:hyperlink>'

    def image(self, png: bytes, pt: float, drop_pt: float):
        name = f"icon{self._next_pic}.png"
        self.media[name] = png
        rid = self.rel("http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", f"media/{name}")
        emu, pid = round(pt * 12700), self._next_pic
        self._next_pic += 1
        return (
            f'<w:r><w:rPr><w:position w:val="{-round(drop_pt * 2)}"/></w:rPr><w:drawing>'
            f'<wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="{emu}" cy="{emu}"/>'
            f'<wp:docPr id="{pid}" name="Icon {pid}"/>'
            '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
            '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic>'
            f'<pic:nvPicPr><pic:cNvPr id="{pid}" name="{name}"/><pic:cNvPicPr/></pic:nvPicPr>'
            f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
            f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{emu}" cy="{emu}"/></a:xfrm>'
            '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
            "</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>"
        )


def gap(pt_wide: float, font_pt: float):
    """A space widened with character spacing to an exact gap (CSS flex gap)."""
    hp, scale = size(font_pt)
    natural = SPACE_EM * hp / 2 * scale / 100 - GAP_NUDGE
    return (
        f'<w:r><w:rPr><w:spacing w:val="{tw(pt_wide - natural)}"/><w:sz w:val="{hp}"/>'
        f'<w:w w:val="{scale}"/></w:rPr><w:t xml:space="preserve"> </w:t></w:r>'
    )


def render_icon(svg: Node) -> bytes:
    """Rasterize an inline SVG icon to a crisp PNG in the text color."""
    paths = "".join(f'<path d="{escape(p.attrs["d"])}"/>' for p in svg.find_all(lambda n: n.tag == "path"))
    src = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{svg.attrs.get("viewbox", "0 0 24 24")}" '
        f'width="24" height="24" fill="#{COLOR}">{paths}</svg>'
    )
    with tempfile.TemporaryDirectory() as d:
        s, p = Path(d, "i.svg"), Path(d, "i.png")
        s.write_text(src)
        subprocess.run(["convert", "-background", "none", "-density", "1200", str(s), "-resize", "96x96", str(p)], check=True)
        return p.read_bytes()


def runs_with_bold(node: Node, font_pt=7.2):
    """Inline content of an <li>/<p>: plain text plus <b> runs."""
    out, parts = [], []
    for c in node.children:
        if isinstance(c, str):
            parts.append((c, False))
        elif c.tag == "b":
            parts.append((c.text(), True))
        else:
            parts.append((c.text(), False))
    for i, (t, b) in enumerate(parts):
        t = re.sub(r"\s+", " ", t)
        if i == 0:
            t = t.lstrip()
        if i == len(parts) - 1:
            t = t.rstrip()
        if t:
            out.append(run(t, font=REGULAR, pt=font_pt, bold=b))
    return "".join(out)


def build(doc: Doc, root: Node):
    page = next(root.find_all(lambda n: "page" in n.cls()))
    header = next(page.find_all(lambda n: n.tag == "header"))

    # Name
    h1 = next(header.find_all(lambda n: n.tag == "h1"))
    name = run(norm(h1.text()), font=REGULAR, pt=14, bold=True)
    name = name.replace("<w:rPr>", f'<w:rPr><w:position w:val="{round(NAME_RAISE * 2)}"/>', 1)
    doc.body.append(para(name, line=17, jc="center"))

    # Contact row: icon, 4pt gap, text; 8pt between items
    contact = next(header.find_all(lambda n: "contact" in n.cls()))
    items = []
    for span in [c for c in contact.children if isinstance(c, Node) and c.tag == "span"]:
        svg = next(span.find_all(lambda n: n.tag == "svg"))
        a = next(span.find_all(lambda n: n.tag == "a"), None)
        label = norm(span.text())
        txt = doc.link(a.attrs["href"], label, pt=6.4) if a else run(label, pt=6.4)
        items.append(doc.image(render_icon(svg), 6, 0.6) + gap(4, 6.4) + txt)
    doc.body.append(para(gap(8, 6.4).join(items), before=3, line=8, jc="center"))

    # Sections
    for el in [c for c in page.children if isinstance(c, Node) and c.tag != "header"]:
        if el.tag == "h2":
            border = f'<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="{RULE_COLOR}"/></w:pBdr>'
            doc.body.append(para(run(norm(el.text()), font=SEMIBOLD, pt=9.8), before=11, after=3.5, line=12,
                                 keep_next=True, extra=border))
        elif el.tag == "p":
            doc.body.append(para(runs_with_bold(el)))
        elif "job" in el.cls() or "edu" in el.cls():
            is_edu = "edu" in el.cls()
            jobs = [c for c in el.parent.children if isinstance(c, Node) and "job" in c.cls()]
            last = is_edu or el is jobs[-1]
            h3 = next(el.find_all(lambda n: n.tag == "h3"))
            doc.body.append(para(run(norm(h3.text()), font=SEMIBOLD, pt=8.5), keep_next=True))

            co = next(el.find_all(lambda n: "co" in n.cls()))
            left, when = [c for c in co.children if isinstance(c, Node)]
            ul = next(el.find_all(lambda n: n.tag == "ul"), None)
            tabs = f'<w:tabs><w:tab w:val="right" w:pos="{tw(CONTENT_W)}"/></w:tabs>'
            co_runs = (run(norm(left.text()), font=REGULAR if is_edu else SEMIBOLD, pt=7.2)
                       + '<w:r><w:tab/></w:r>' + run(norm(when.text()), font=SEMIBOLD, pt=7.8))
            doc.body.append(para(co_runs, after=0 if (ul is None and last) else 0.8, keep_next=ul is not None,
                                 extra=tabs))

            if ul is not None:
                lis = [c for c in ul.children if isinstance(c, Node) and c.tag == "li"]
                for i, li in enumerate(lis):
                    numpr = '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>'
                    after = 7.6 if (i == len(lis) - 1 and not last) else 0
                    doc.body.append(para(runs_with_bold(li), after=after, extra=numpr))


# ---- Package parts ----
NS = (
    'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
    'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
    'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
    'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
    'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"'
)
XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'


def document_xml(doc: Doc):
    sect = (
        f'<w:sectPr><w:pgSz w:w="{tw(PAGE_W)}" w:h="{tw(PAGE_H)}"/>'
        f'<w:pgMar w:top="{tw(MARGIN_TOP + BASELINE_NUDGE)}" w:right="{tw(MARGIN_SIDE)}" w:bottom="{tw(MARGIN_BOTTOM)}" '
        f'w:left="{tw(MARGIN_SIDE)}" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>'
    )
    return f'{XML}<w:document {NS}><w:body>{"".join(doc.body)}{sect}</w:body></w:document>'


def styles_xml():
    hp, scale = size(7.2)
    return (
        f'{XML}<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        "<w:docDefaults><w:rPrDefault><w:rPr>"
        f'<w:rFonts w:ascii="{REGULAR}" w:eastAsia="{REGULAR}" w:hAnsi="{REGULAR}" w:cs="{REGULAR}"/>'
        f'<w:color w:val="{COLOR}"/><w:w w:val="{scale}"/><w:kern w:val="2"/><w:sz w:val="{hp}"/><w:szCs w:val="{hp}"/>'
        '<w:lang w:val="en-US"/></w:rPr></w:rPrDefault>'
        f'<w:pPrDefault><w:pPr><w:spacing w:before="0" w:after="0" w:line="{tw(10.5)}" w:lineRule="exact"/>'
        "</w:pPr></w:pPrDefault></w:docDefaults>"
        '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>'
        '<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont">'
        '<w:name w:val="Default Paragraph Font"/><w:uiPriority w:val="1"/><w:semiHidden/></w:style>'
        "</w:styles>"
    )


def numbering_xml():
    # "•" then a tab to the hanging indent: matches li{padding-left:3.7pt;text-indent:-3.7pt}
    # inside ul{margin-left:7.5pt}. Wrapped lines and first-line text both start at 11.2pt.
    return (
        f'{XML}<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        '<w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/>'
        '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:suff w:val="tab"/><w:lvlText w:val="•"/>'
        '<w:lvlJc w:val="left"/>'
        f'<w:pPr><w:tabs><w:tab w:val="num" w:pos="{tw(11.2)}"/></w:tabs><w:ind w:left="{tw(11.2)}" w:hanging="{tw(3.7)}"/></w:pPr>'
        f'{rpr(pt=7.2)}</w:lvl></w:abstractNum>'
        '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>'
    )


def settings_xml():
    return (
        f'{XML}<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        "<w:embedTrueTypeFonts/><w:defaultTabStop w:val=\"720\"/>"
        '<w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat>'
        "</w:settings>"
    )


def obfuscate(font: bytes, key: str) -> bytes:
    """ECMA-376 font obfuscation: XOR the first 32 bytes with the GUID key, reversed."""
    k = bytes.fromhex(key.strip("{}").replace("-", ""))[::-1]
    head = bytes(b ^ k[i % 16] for i, b in enumerate(font[:32]))
    return head + font[32:]


def font_parts():
    fonts = [  # (family, slot, file)
        (REGULAR, "embedRegular", "SourceSans3-Regular.ttf"),
        (REGULAR, "embedBold", "SourceSans3-Bold.ttf"),
        (SEMIBOLD, "embedRegular", "SourceSans3-SemiBold.ttf"),
    ]
    rels, files, entries = [], {}, {}
    for i, (family, slot, fname) in enumerate(fonts, 1):
        key = "{" + str(uuid.uuid5(uuid.NAMESPACE_URL, f"kgromero-resume/{fname}")).upper() + "}"
        files[f"word/fonts/font{i}.odttf"] = obfuscate((HERE / fname).read_bytes(), key)
        rels.append(f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/font" Target="fonts/font{i}.odttf"/>')
        entries.setdefault(family, []).append(f'<w:{slot} r:id="rId{i}" w:fontKey="{key}"/>')
    table = "".join(
        f'<w:font w:name="{fam}"><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/>{"".join(e)}</w:font>'
        for fam, e in entries.items()
    )
    xml = (f'{XML}<w:fonts xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
           f'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">{table}</w:fonts>')
    rels_xml = f'{XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{"".join(rels)}</Relationships>'
    return xml, rels_xml, files


def main():
    tb = TreeBuilder()
    tb.feed(HTML.read_text(encoding="utf-8"))
    doc = Doc()
    build(doc, tb.root)

    base = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    doc_rels = [
        f'<Relationship Id="rId1" Type="{base}/styles" Target="styles.xml"/>',
        f'<Relationship Id="rId2" Type="{base}/numbering" Target="numbering.xml"/>',
        f'<Relationship Id="rId3" Type="{base}/settings" Target="settings.xml"/>',
        f'<Relationship Id="rId4" Type="{base}/fontTable" Target="fontTable.xml"/>',
        *doc.rels,
    ]
    font_table, font_rels, font_files = font_parts()
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    wd = "application/vnd.openxmlformats-officedocument.wordprocessingml"
    parts = {
        "[Content_Types].xml": (
            f'{XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Default Extension="png" ContentType="image/png"/>'
            '<Default Extension="odttf" ContentType="application/vnd.openxmlformats-officedocument.obfuscatedFont"/>'
            f'<Override PartName="/word/document.xml" ContentType="{wd}.document.main+xml"/>'
            f'<Override PartName="/word/styles.xml" ContentType="{wd}.styles+xml"/>'
            f'<Override PartName="/word/numbering.xml" ContentType="{wd}.numbering+xml"/>'
            f'<Override PartName="/word/settings.xml" ContentType="{wd}.settings+xml"/>'
            f'<Override PartName="/word/fontTable.xml" ContentType="{wd}.fontTable+xml"/>'
            '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
            '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
            "</Types>"
        ),
        "_rels/.rels": (
            f'{XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f'<Relationship Id="rId1" Type="{base}/officeDocument" Target="word/document.xml"/>'
            '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
            f'<Relationship Id="rId3" Type="{base}/extended-properties" Target="docProps/app.xml"/>'
            "</Relationships>"
        ),
        "docProps/core.xml": (
            f'{XML}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
            'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" '
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
            "<dc:title>Kyle Romero - Resume</dc:title><dc:creator>Kyle Romero</dc:creator>"
            f'<dcterms:modified xsi:type="dcterms:W3CDTF">{now}</dcterms:modified></cp:coreProperties>'
        ),
        "docProps/app.xml": (
            f'{XML}<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">'
            "<Application>kgromero resume/build_docx.py</Application></Properties>"
        ),
        "word/document.xml": document_xml(doc),
        "word/_rels/document.xml.rels": (
            f'{XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{"".join(doc_rels)}</Relationships>'
        ),
        "word/styles.xml": styles_xml(),
        "word/numbering.xml": numbering_xml(),
        "word/settings.xml": settings_xml(),
        "word/fontTable.xml": font_table,
        "word/_rels/fontTable.xml.rels": font_rels,
    }
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for name, data in parts.items():
            z.writestr(name, data)
        for name, data in doc.media.items():
            z.writestr(f"word/media/{name}", data)
        for name, data in font_files.items():
            z.writestr(name, data)
    print(f"Wrote {OUT.relative_to(HERE.parent)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
