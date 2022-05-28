import _ from 'lodash';

const makeString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } else if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const makeName = (name, parents) => `${parents.join('.')}${parents.length > 0 ? '.' : ''}${name}`;

const plain = (diff, parents = []) => {
  const lines = diff.map((obj) => {
    switch (obj.status) {
      case 'have a child':
        const sorted = _.sortBy(obj.value, [function (obj) { return obj.key; }]);
        return plain(sorted, [...parents, obj.key]);
      case 'removed':
        return `Property '${makeName(obj.key, parents)}' was removed`;
      case 'new':
        return `Property '${makeName(obj.key, parents)}' was added with value: ${makeString(obj.value)}`;
      case 'changed':
        return `Property '${makeName(obj.key, parents)}' was updated. From ${makeString(obj.value.oldValue)} to ${makeString(obj.value.newValue)}`;
      case 'same':
        return null;
      default:
        throw new Error();
    }
  }, []);
  return lines.filter((el) => el).join('\n');
};

export default plain;
