import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filejson1 = getFixturePath('file1.json');
const filejson2 = getFixturePath('file2.json');

const expectedResultStylish = readFile('resultStylish.txt');
/// const expectedResultJson = readFile('resultJson.txt');
// const expectedResultPlain = readFile('resultPlain.txt');

test('check json stylish format', () => {
  const expected = expectedResultStylish.trim();
  const actual = genDiff(filejson1, filejson2, 'stylish');
  expect(actual).toEqual(expected);
});

test('check yml and yaml stylish format', () => {
  const expected = expectedResultStylish.trim();
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  expect(actual).toEqual(expected);
});

// test('check plain format', () => {
// const expected = expectedResultPlain.trim();
// const actual = genDiff(filejson1, filejson2, 'plain');
// expect(actual).toEqual(expected);
// });

// test('check json format', () => {
// const expected = expectedResultJson.trim();
// const actual = genDiff(filejson1, filejson2, 'json');
// expect(actual).toEqual(expected);
// });

// test('unkown format', () => {
// const error = new Error("This format is not supported: '.txt'. Please read the documentation and use the available formats");

// expect(() => {
// genDiff(filejson1, filejson2, 'txt');
// }).toThrow(error);
// });
