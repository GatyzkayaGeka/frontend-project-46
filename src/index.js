import path from 'path';
import _ from 'lodash';
import treeDiff from './chowDiff.js';
import readFile from './seeFile.js';
import stylish from './stringify.js';

const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const difference = treeDiff(content1, content2);
  const result = stylish(difference);

  return result;
};

export default genDiff;