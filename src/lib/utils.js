/**
 * Svelte action that relocates an element to document.body (or a given target).
 * Needed for fixed-position overlays whose ancestor establishes a containing
 * block via backdrop-filter/filter/transform, which would otherwise trap them.
 * @param {HTMLElement} node
 * @param {HTMLElement | string} [target]
 */
export function portal(node, target = document.body) {
  const resolve = () =>
    typeof target === "string" ? document.querySelector(target) : target;

  let host = resolve();
  if (host) host.appendChild(node);

  return {
    update(newTarget) {
      target = newTarget;
      host = resolve();
      if (host) host.appendChild(node);
    },
    destroy() {
      if (node.parentNode) node.parentNode.removeChild(node);
    },
  };
}
