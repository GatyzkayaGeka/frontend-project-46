import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('check plain format', () => {
  const sourceData = readFile('expected-result-plain.txt');
  const expected = sourceData.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toEqual(expected);
});

test('check json format', () => {
  const sourceData = readFile('expected-result-json.txt');
  const expected = sourceData.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(actual).toEqual(expected);
});

test('unkown format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const error = new Error("This format is not supported: '.txt'. Please read the documentation and use the available formats");

  expect(() => {
    genDiff(filepath1, filepath2, 'txt');
  }).toThrow(error);
});
