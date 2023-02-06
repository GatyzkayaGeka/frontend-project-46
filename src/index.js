import path from 'path';
import treeDiff from './treeDiff.js';
import readFile from './readFile.js';
import parse from './parsers.js';
import formatte from './formatters/index.js';

const getFileData = (filepath) => {
  const fileData = readFile(filepath);
  const fileFormat = path.extname(filepath).slice(1);

  const parsedData = parse(fileData, fileFormat);

  return parsedData;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = getFileData(filepath1);
  const content2 = getFileData(filepath2);

  const difference = treeDiff(content1, content2);
  const result = formatte(difference, formatName);

  return result;
};

export default genDiff;
