import { Component } from 'react';
import { CartContext } from '../../context/withCartData';
import { withRouter } from 'react-router';
import { CurrencyConsumer } from '../../context/withCurrency';
import { ICartData } from '../../interfaces/cartData';
import { IPrices } from '../../interfaces/productList';
import cls from './index.module.scss';

interface ICartDataProps {
  cartData: ICartData;
  changeCartProperty: (id: number, category: string, value: string) => void;
  decrementAmount: (id: number) => void;
  incrementAmount: (id: number) => void;
  addNewItemToCart: (
    name: string,
    brand: string,
    prices: Array<IPrices>,
    attribute: string,
    image: string
  ) => void;
}

class CartPage extends Component<ICartDataProps> {
  static contextType = CartContext;

  state = {
    amount: 0,
  };

  render() {
    // @ts-ignore
    const { cartData, decrementAmount, incrementAmount } = this.context;

    if (cartData.quantity === 0) {
      return (
        <div className={cls.cartEmpty}>
          <span>Your cart is empty</span>
        </div>
      );
    }

    return (
      <div>
        <CurrencyConsumer>
          {({ getCurrentCurrency }) => (
            <div className={cls.cartWrapper}>
              <h2 className={cls.cartTitle}>Cart</h2>
              <ul className={cls.cartList}>
                {cartData.cart.map(
                  ({ name, brand, amount, image, prices, quantity }, idx) => (
                    <li key={name} className={cls.cartListItem}>
                      <div className={cls.cartItemInfo}>
                        <div className={cls.productBrand}>{brand}</div>
                        <div className={cls.productName}>{name}</div>
                        <div className={cls.productPrice}>
                          <span>
                            {/* @ts-ignore */}
                            {getCurrentCurrency(prices)?.currency?.symbol}
                          </span>
                          <span>
                            {(
                              // @ts-ignore
                              getCurrentCurrency(prices)?.amount * amount
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className={cls.cartCount}>
                        <div className={cls.buttonWrapper}>
                          <div className={cls.productInc}>
                            <button onClick={() => incrementAmount(idx)}>
                              +
                            </button>
                          </div>
                          <div className={cls.productAmount}>{amount}</div>
                          <div className={cls.productDec}>
                            <button onClick={() => decrementAmount(idx)}>
                              -
                            </button>
                          </div>
                        </div>
                        <div className={cls.productImg}>
                          <img src={image} alt='img' />
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
              <div className={cls.cartFooter}>
                <div className={cls.quantity}>
                  Quantity: <span>{cartData.quantity}</span>
                </div>
                <div className={cls.total}>
                  Total:{' '}
                  <span>
                    {
                      // @ts-ignore
                      getCurrentCurrency(cartData.cart[0].prices)?.currency
                        ?.symbol
                    }
                    {cartData.cart
                      .reduce(
                        (acc, el) =>
                        (acc +=
                          // @ts-ignore
                          getCurrentCurrency(el.prices)?.amount * el.amount),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button>ORDER</button>
              </div>
            </div>
          )}
        </CurrencyConsumer>
      </div>
    );
  }
}

export default withRouter(CartPage);
