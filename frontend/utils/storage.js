export const getFromStorage = (key) => {
  if (!key) {
    console.error('Error: Key is missing');
    return null;
  }
  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const setInStorage = (key, obj) => {
  if (!key) {
    console.error('Error: Key is missing');
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
};
