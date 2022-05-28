import _ from 'lodash';

const tabSize = (depth) => '    '.repeat(depth);

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((elem) =>`${tabSize(depth)}    ${elem}: ${_.isObject(value[elem]) ? stringify(value[elem], depth + 1) : value[elem]}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${tabSize(depth)}}`;
};

const stylish = (diff, depth = 0) => {
  const lines = diff.map((obj) => {
    const buildLine = (char, value) => `${tabSize(depth)}  ${char} ${obj.key}: ${stringify(value, depth + 1)}`;
    switch (obj.status) {
      case 'removed':
        return buildLine('-', obj.value);
      case 'new':
        return buildLine('+', obj.value);
      case 'changed':
        return `${tabSize(depth)}  - ${obj.key}: ${stringify(obj.value.oldValue, depth + 1)}
${tabSize(depth)}  + ${obj.key}: ${stringify(obj.value.newValue, depth + 1)}`;
      case 'same':
        return buildLine(' ', obj.value);
      case 'have a child':
        const sorted = _.sortBy(obj.value, [function (obj) { return obj.key; }]);
        return `${tabSize(depth)}    ${obj.key}: ${stylish(sorted, depth + 1)}`;

      default:
        throw new Error();
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${tabSize(depth)}}`;
}

export default stylish;
