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
  export default stringify;