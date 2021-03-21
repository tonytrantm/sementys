export const validInput = (data) => {
  const newData = data;
  Object.keys(newData).forEach((key) => {
    if (newData[key] === null) {
      newData[key] = '';
    }
  });
  return newData;
};
