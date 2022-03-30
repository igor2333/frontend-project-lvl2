import _ from 'lodash';

const makeString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } else if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const makeName = (name, parents) =>
  `${parents.join('.')}${parents.length > 0 ? '.' : ''}${name}`;

const plain = (diff, parents = []) => {
  const result = [];

  diff.forEach((obj) => {
    switch (obj.status) {
      case 'have a child':
        result.push(plain(obj.value, [...parents, obj.key]));
        break;

      case 'removed':
        result.push(`Property '${makeName(obj.key, parents)}' was removed`);
        break;

      case 'new':
        result.push(`Property '${makeName(obj.key, parents)}' was added with value: ${makeString(obj.value)}`);
        break;

      case 'changed':
        result.push(`Property '${makeName(obj.key, parents)}' was updated. From ${makeString(obj.value.oldValue)} to ${makeString(obj.value.newValue)}`);
        break;

      case 'same':
        result.push();
        break;

      default:
        break;
    }
  });

  return result.sort().flat();
};

export default plain;