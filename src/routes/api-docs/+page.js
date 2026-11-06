// Title and description go through page data so the layout owns <title>. A
// <title> in this page's <svelte:head> isn't undone when navigating away, which
// left "API & MCP Documentation" in the tab after going back home.
export function load() {
  return {
    title: 'API & MCP Documentation - Kyle Romero',
    description:
      "Kyle Romero's resume API and MCP server: connect Claude or other AI assistants, or fetch resume and site data as JSON.",
  };
}
