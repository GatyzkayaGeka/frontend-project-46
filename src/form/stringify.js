import _ from 'lodash';

const indent = (depth, replacer = ' ', diffIndent = 2, spaceCount = 4) => (
  replacer.repeat(spaceCount * depth).slice(diffIndent));

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const getLines = Object.entries(data).map(
    ([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`,
  );

  return ['{', ...getLines, `${indent(depth)}  }`].join('\n');
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const makeLine = (value, mark) => `${indent(depth)}${mark} ${node.name}: ${stringify(value, depth)}`;

    const mark = {
      added: '+',
      removed: '-',
      unchanged: ' ',
    };

    switch (node.status) {
      case 'added':
        return makeLine(node.value, mark.added);
      case 'removed':
        return makeLine(node.value, mark.removed);
      case 'updated':
        return [`${makeLine(node.oldValue, mark.removed)}`,
          `${makeLine(node.newValue, mark.added)}`].join('\n');
      case 'unchanged':
        return makeLine(node.value, mark.unchanged);
      case 'nested':
        return `${indent(depth)}  ${node.name}: ${[
          '{',
          ...iter(node.children, depth + 1),
          `${indent(depth)}  }`,
        ].join('\n')}`;
      default:
        throw new Error(`Unkown status: ${node.status}`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
