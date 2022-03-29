import parser from './parser.js';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);

  const mergeFiles = { ...file1, ...file2 };
  const uniqueKeys = Object.keys(mergeFiles);

  const diff = uniqueKeys.map((key) => {
    if (_.has(file1, key) && _.has(file2, key) && typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      return { key, value: gendiff(file1[key], file2[key]), status: 'have a child', };
    } else if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
      return { key, value: { oldValue: file1[key], newValue: file2[key] }, status: 'changed', };
    } else if (_.has(file1, key) && !_.has(file2, key)) {
      return { key, value: file1[key], status: 'removed' };
    } else if (!_.has(file1, key) && _.has(file2, key)) {
      return { key, value: file2[key], status: 'new' };
    } else if (_.has(file1, key) && _.has(file2, key) && file1[key] === file2[key]) {
      return { key, value: file1[key], status: 'same' };
    }
  });

  return diff;
};