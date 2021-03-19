module.exports = {
  sum: (number1, number2) => {
    number1 = parseInt(number1);
    number2 = parseInt(number2);
    if (Number.isNaN(number1) | Number.isNaN(number2)) {
      throw new Error("Please check your inputr");
    }
    return number1 + number2;
  },
};
