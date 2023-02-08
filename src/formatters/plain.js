import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const getPath = (ancestry, name) => [...ancestry, name].join('.');
const plain = (diff) => {
  const iter = (tree, ancestry) => tree.flatMap((node) => {
    const {
      key, value, oldValue, newValue, children, status,
    } = node;

    switch (node.status) {
      case 'added':
        return `Property '${getPath(ancestry, key)}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${getPath(ancestry, key)}' was removed`;
      case 'updated':
        return `Property '${getPath(ancestry, key)}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return iter(children, [getPath(ancestry, key)]);
      default:
        throw new Error(`Unkown status: ${node.status}`);
    }
  });
  return iter(diff, []).join('\n');
};

export default plain;
