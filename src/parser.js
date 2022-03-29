import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

const parser = (file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } else if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
    return yaml.load(fs.readFileSync(file, 'utf8'));
  }
};

export default parser;