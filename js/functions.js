const checkString = (string, length) => string.length <= length;

const checkPalindrom = (string) => {
  const modString = string.toLowerCase().replaceAll(' ', '');
  let tempString = '';
  for (let i = modString.length - 1; i >= 0; i--) {
    tempString += modString.at(i);
  }
  return tempString === modString;
};

const extractNumber = (string) => {
  let tempString = '';
  const modString = string.toString();
  for (let i = 0; i <= modString.length - 1; i++) {
    if (typeof parseInt(modString.at(i), 10) === 'number' && !isNaN(parseInt(modString.at(i), 10))) {
      tempString += modString.at(i);
    }
  }
  return parseInt(tempString, 10);
};


const myPadStart = (string, minLength, pad) => {
  let result = string;
  while (result.length < minLength) {
    const newLength = result.length + pad.length;
    const actualPad = (newLength <= minLength) ? pad : pad.slice(0, minLength - newLength);
    console.log(minLength - newLength);
    result = actualPad + result;
  }
  return result;
};

