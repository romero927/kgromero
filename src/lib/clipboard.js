// Copy text to the clipboard. Falls back to a hidden textarea for older browsers,
// non-secure contexts, or a Clipboard API call that never settles (e.g. a pending
// permission prompt).
/** @param {string} text */
export async function copyText(text) {
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000));
    await Promise.race([navigator.clipboard.writeText(text), timeout]);
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
  }
}
