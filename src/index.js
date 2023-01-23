import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const treeDiff = (obj1, obj2) => {
    const key1 = Object.keys(obj1);
    const key2 = Object.keys(obj2);
  
    const uniqKeys = _.union(key1, key2);
    const sortedKeys = _.sortBy(uniqKeys);
  
    return sortedKeys.map((key) => {
      if (!_.has(obj1, key)) {
        return { name: key, value: obj2[key], status: 'added' };
      }
      if (!_.has(obj2, key)) {
        return { name: key, value: obj1[key], status: 'removed' };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { name: key, children: treeDiff(obj1[key], obj2[key]), status: 'nested' };
      }
      if (!_.isEqual(obj1[key], obj2[key])) {
        return {
          name: key, oldValue: obj1[key], newValue: obj2[key], status: 'updated',
        };
      }
      return { name: key, value: obj1[key], status: 'unchanged' };
    });
  };

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

  const genDiff = (filepath1, filepath2) => {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const difference = treeDiff(content1, content2);

  return difference;
};

export default genDiff;