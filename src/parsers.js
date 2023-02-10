import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml' || 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Format is not supported: ${format}`);
  }
};

export default parse;
