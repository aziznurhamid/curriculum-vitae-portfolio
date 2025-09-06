export const getUrlByKey = (key, data) => {
  if (!key || !data) return '';
  const keys = key.split('.');
  let result = data;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return '';
    }
  }
  return result;
};