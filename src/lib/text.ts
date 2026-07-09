// Quill's rich-text editor emits &nbsp; (and, once already decoded, literal U+00A0)
// between every word instead of regular spaces. Non-breaking spaces don't allow
// line wrapping, so long paragraphs overflow their container on narrow viewports.
export function cleanRichText(html?: string | null): string {
  if (!html) return "";
  return html.replace(/&nbsp;/g, " ").replace(/ /g, " ");
}
