import Cart from './cart';

describe('Cart', () => {
  let cart;
  let product;

  beforeEach(() => {
    cart = new Cart();
    product = {
      title: 'Action Figure Luffy',
      price: 35388,
    };
  });

  it('return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it('multiply quantity and price and receive the total amount ', () => {
    const item = {
      product,
      quantity: 2,
    };

    const totalExpected = 2 * 35388;

    cart.addItem(item);
    expect(cart.getTotal()).toEqual(totalExpected);
  });

  it('ensure no more than on product exists at a time', () => {
    cart.addItem({
      product,
      quantity: 2,
    });

    cart.addItem({
      product,
      quantity: 1,
    });

    const totalExpected = 35388;

    expect(cart.getTotal()).toEqual(totalExpected);
  });
});
