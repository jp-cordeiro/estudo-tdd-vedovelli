import Cart from './cart';

describe('Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it('multiply quantity and price and receive the total amount ', () => {
    const item = {
      product: {
        title: 'Action Figure Luffy',
        price: 35388,
      },
      quantity: 2,
    };

    const totalExpected = 2 * 35388;

    cart.addItem(item);
    expect(cart.getTotal()).toEqual(totalExpected);
  });
});
