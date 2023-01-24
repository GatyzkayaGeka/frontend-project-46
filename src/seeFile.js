import path from 'path';
import fs from 'fs';

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => JSON.parse(fs.readFileSync(getFilePath(filename), 'utf-8'));

export default readFile;