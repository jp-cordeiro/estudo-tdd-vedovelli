import Cart from './cart';

describe('Cart', () => {
  let cart;
  let product, product2;

  beforeEach(() => {
    cart = new Cart();
    product = {
      title: 'Action Figure Luffy',
      price: 35388,
    };
    product2 = {
      title: 'Action Figure Zoro',
      price: 12345,
    };
  });
  describe('getTotal()', () => {
    it('return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('multiply quantity and price and receive the total amount ', () => {
      const item = {
        product,
        quantity: 2,
      };

      const totalExpected = 2 * 35388;

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(totalExpected);
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

      expect(cart.getTotal().getAmount()).toEqual(totalExpected);
    });

    it('update total when a product gets included and then remove', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: product2,
        quantity: 1,
      });

      const totalExpected = 12345;

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(totalExpected);
    });
  });

  describe('checkout()', () => {
    it('return an object with the total and the list items', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('return an object with the total and the list items when sumary is called', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: product2,
        quantity: 3,
      });

      expect(cart.sumary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('reset the cart when checkout is called', () => {
      cart.addItem({
        product,
        quantity: 2,
      });

      cart.addItem({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });
});
