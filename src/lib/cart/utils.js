import Dinero from 'dinero.js';
const Money = Dinero;

export const calculatePercentageDiscount = (amount, item) => {
  if (item.quantity > item.condition.minimum) {
    return amount.percentage(item.condition.percentage);
  }
  return Money({ amount: 0 });
};

export const calculateQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 == 0;
  if (item.quantity > item.condition.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }
  return Money({ amount: 0 });
};

export const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];
  const [higherDiscount] = list
    .map((discountCondition) => {
      if (discountCondition.percentage) {
        return calculatePercentageDiscount(amount, {
          condition: discountCondition,
          quantity,
        }).getAmount();
      }
      if (discountCondition.quantity) {
        return calculateQuantityDiscount(amount, {
          condition: discountCondition,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);
  return Money({ amount: higherDiscount });
};
