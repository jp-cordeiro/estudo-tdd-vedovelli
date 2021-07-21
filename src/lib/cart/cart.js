import { find, remove } from 'lodash';
import Dinero from 'dinero.js';
const Money = Dinero;
import { calculateDiscount } from './utils';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;
export default class Cart {
  items = [];
  addItem(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }
  getTotal() {
    return this.items.reduce((acc, { quantity, product, condition }) => {
      const amount = Money({ amount: quantity * product.price });
      let discount = Money({ amount: 0 });
      if (condition) {
        discount = calculateDiscount(amount, quantity, condition);
      }
      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }
  remove(product) {
    remove(this.items, { product });
  }
  sumary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return {
      total,
      items,
    };
  }
  checkout() {
    const { total, items } = this.sumary();
    this.items = [];
    return {
      total,
      items,
    };
  }
}
