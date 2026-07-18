import { visit, SKIP } from 'unist-util-visit';

const KNOWN_FLAGS = ['wide'];

function parseFigureTitle(title) {
  const pipeIndex = title.indexOf('|');
  if (pipeIndex === -1) {
    return { flags: [], caption: title.trim() };
  }
  const flags = title
    .slice(0, pipeIndex)
    .toLowerCase()
    .split(',')
    .map((flag) => flag.trim())
    .filter((flag) => KNOWN_FLAGS.includes(flag));
  const caption = title.slice(pipeIndex + 1).trim();
  return { flags, caption };
}

// Wraps a standalone `![alt](src "flags | caption")` markdown image in a
// <figure>/<figcaption>, using the image's `title` as plain-Markdown syntax
// for captions and layout flags (currently just `wide`, for a full-bleed
// image) — no MDX/JSX required, so posts stay editable in any Markdown app.
// Must run as a rehypePlugin (before Astro's built-in image optimization
// pass) so the nested <img> is still recognized and optimized.
export function rehypeBlogFigures() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;

      const meaningfulChildren = node.children.filter(
        (child) => !(child.type === 'text' && child.value.trim() === '')
      );
      if (meaningfulChildren.length !== 1) return;

      const [img] = meaningfulChildren;
      if (img.type !== 'element' || img.tagName !== 'img' || !img.properties?.title) {
        return;
      }

      const { flags, caption } = parseFigureTitle(String(img.properties.title));
      delete img.properties.title;

      const className = ['post-figure'];
      if (flags.includes('wide')) className.push('post-figure--wide');

      const children = [img];
      if (caption) {
        children.push({
          type: 'element',
          tagName: 'figcaption',
          properties: { className: ['post-figure__caption'] },
          children: [{ type: 'text', value: caption }],
        });
      }

      parent.children[index] = {
        type: 'element',
        tagName: 'figure',
        properties: { className },
        children,
      };

      return SKIP;
    });
  };
}
