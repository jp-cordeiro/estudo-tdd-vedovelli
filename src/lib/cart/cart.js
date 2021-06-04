import { find, remove } from 'lodash';
import Dinero from 'dinero.js';
const Money = Dinero;

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
    return this.items.reduce((acc, item) => {
      return acc.add(Money({ amount: item.quantity * item.product.price }));
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
