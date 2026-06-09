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

export function lazyLoad(image) {
  const loadImage = () => {
    // Load low-res placeholder
    const lowRes = image.dataset.placeholder;
    if (lowRes) {
      image.style.filter = "blur(20px)";
      image.src = lowRes;
    }

    // Create a new image element to load the full resolution image
    const img = new Image();
    img.src = image.dataset.src;
    img.onload = () => {
      // When the full image is loaded, apply it and remove the blur
      image.src = img.src;
      image.style.filter = "none";
      image.style.transition = "filter 0.1s ease-out";
    };

    image.removeAttribute("data-src");
    image.removeAttribute("data-placeholder");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(image);
        }
      });
    });

    observer.observe(image);
  } else {
    loadImage();
  }
}
