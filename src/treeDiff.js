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

export default treeDiff;
