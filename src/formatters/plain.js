import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (tree, ancestry) => tree.flatMap((node) => {
    const prop = [...ancestry, node.name].join('.');

    switch (node.status) {
      case 'added':
        return `Property '${prop}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${prop}' was removed`;
      case 'updated':
        return `Property '${prop}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'unchanged':
        return [];
      case 'nested':
        return `${iter(node.children, [prop]).join('\n')}`;
      default:
        throw new Error(`Unkown status: ${node.status}`);
    }
  });
  const diffPlain = iter(diff, []);
  return [...diffPlain].join('\n');
};

export default plain;
