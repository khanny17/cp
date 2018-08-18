// Convert 'array' to a dict with key 'keyField'
export const arrToObj = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
