import { json } from "@sveltejs/kit";
import { get } from "svelte/store";
import { t, yearsExperience } from "$lib/i18n.js";
import { docSections } from "$lib/docs.js";
import { travelLocations } from "$lib/travel.js";
import { seoData } from "$lib/seoData.js";

// Everything on the home page that isn't in /api/resume, as JSON.
// Built at deploy time, so it always matches the page. Read by the kgromero-mcp server (https://github.com/romero927/kgromero-mcp).
export const prerender = true;

const split = (s) =>
  s
    .replace(/\.$/, "")
    .split(/,\s*(?![^()]*\))/)
    .map((x) => x.trim())
    .filter(Boolean);

const absolute = (href) => (href.startsWith("/") ? `${seoData.siteUrl}${href}` : href);

export function GET() {
  const copy = get(t);
  const body = {
    name: copy.name,
    tagline: copy.description,
    yearsExperience,
    about: copy.aboutMe.content,
    timeline: copy.experience.timeline,
    techStackByCompany: copy.skills.companies.map((c) => ({
      company: c.name,
      url: c.url,
      techStack: split(c.techStack),
    })),
    skillCategories: copy.skills.allSkills.categories.map((c) => ({
      category: c.name,
      skills: split(c.skills),
    })),
    sideProjects: copy.other.projects.map((p) => {
      const m = p.name.match(/^\((.+?)\)\s*(.+)$/);
      return {
        name: m ? m[2] : p.name,
        language: m ? m[1] : null,
        description: p.description,
        link: p.link,
      };
    }),
    moreProjects: "https://github.com/romero927",
    interests: split(copy.other.interestList),
    techResources: copy.other.blogs.map((b) => ({ name: b.name, url: b.href })),
    documents: docSections.map((s) => ({
      group: s.label,
      items: s.items.map((i) => ({ name: i.name, url: absolute(i.href) })),
    })),
    travel: travelLocations.map((l) => ({
      place: l.label,
      lat: l.lat,
      lng: l.lng,
      lived: l.lived,
    })),
  };
  return json(body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
