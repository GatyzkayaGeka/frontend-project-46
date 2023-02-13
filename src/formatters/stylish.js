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

const mark = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const {
      value, oldValue, newValue, children, status, name,
    } = node;
    const makeLine = (value1, marks) => `${indent(depth)}${marks} ${name}: ${stringify(value1, depth)}`;
    switch (status) {
      case 'added':
        return makeLine(value, mark.added);
      case 'removed':
        return makeLine(value, mark.removed);
      case 'updated':
        return [`${makeLine(oldValue, mark.removed)}`,
          `${makeLine(newValue, mark.added)}`].join('\n');
      case 'unchanged':
        return makeLine(value, mark.unchanged);
      case 'nested':
        return `${indent(depth)}  ${name}: ${[
          '{',
          ...iter(children, depth + 1),
          `${indent(depth)}  }`,
        ].join('\n')}`;
      default:
        throw new Error(`Unkown status: ${status}`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default stylish;
