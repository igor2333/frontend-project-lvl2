import plain from './formatters/plain.js';
import stylish from './formatters/stylish.js';
import json from './formatters/json.js';

const formatSwithcer = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);

    case 'plain':
      return plain(diff);

    case 'json':
      return json(diff);

    default:
      return stylish(diff);
  }
};

export default formatSwithcer;
