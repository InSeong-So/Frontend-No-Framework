import { tokenize } from '../tokenizer/index.js';
import { TagStart, TagEnd, Text } from '../tokenizer/types.js';
import { ElEMENT_TYPE, TEXT_TYPE, createNodeFactory } from './nodes.js';

export const parse = tokens => {
  const root = {
    tag: 'root',
    children: [],
  };
  const tagArray = [root];
  tagArray.last = () => tagArray[tagArray.length - 1];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token instanceof TagStart) {
      const node = createNodeFactory(ElEMENT_TYPE, token);
      if (node.children) {
        tagArray.push(node);
      } else {
        tagArray.last().children.push(node);
      }
      continue;
    }
    if (token instanceof TagEnd) {
      const parent = tagArray[tagArray.length - 2];
      const node = tagArray.pop();
      parent.children.push(node);
      continue;
    }
    if (token instanceof Text) {
      const text = createNodeFactory(TEXT_TYPE, token);
      if (text.content.trim() !== '')
        tagArray.last().children.push(createNodeFactory(TEXT_TYPE, token));
      continue;
    }
  }

  return root;
};

const htmlParser = html => parse(tokenize(html));

export default htmlParser;
