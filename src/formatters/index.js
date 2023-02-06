import stylish from './stringify.js';
import plain from './plain.js';

const formatte = (difference, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return JSON.stringify(difference);
    default:
      throw new Error(`This format is not supported: '.${formatName}'. Please read the documentation and use the available formats`);
  }
};

export default formatte;
