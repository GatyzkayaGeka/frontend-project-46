import path from 'path';
import treeDiff from './chowDiff.js';
import readFile from './seeFile.js';
import stylish from './form/stringify.js';
import parser from './parsers.js';
import formatters from './form/index.js';

const getFileData = (filepath) => {
  const fileData = readFile(filepath);
  const fileFormat = path.extname(filepath);
  if (fileFormat[0] === '.') {
    fileFormat.slice(1);
  }
  const parsedData = parser(fileData, fileFormat);

  return parsedData;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = getFileData(filepath1);
  const content2 = getFileData(filepath2);

  const difference = treeDiff(content1, content2);
  const result = stylish(difference);

  return result;
};

export default genDiff;
