import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CartContext } from '../../context/withCartData';
import { CurrencyConsumer } from '../../context/withCurrency';
import cls from './index.module.scss';

class PopupCart extends Component<{
  active: boolean;
  closePopUp: () => void;
  history: any;
}> {
  static contextType = CartContext;

  state = {
    product: {
      attributes: [
        { id: '', items: [{ displayValue: '', value: '', id: '' }] },
      ],
    },
    attributeIdx: 0,
  }

  checkOutsideClick = ({ target }) => {
    const cartElement = document.getElementById('header-cart');
    const specifiedElement = document.getElementById('popupCart');

    const isClickInside = specifiedElement?.contains(target) || '';
    const isCartClick = cartElement?.contains(target) || '';

    if (!isCartClick && !isClickInside) {
      this.props.closePopUp();
    }
  }

  componentDidUpdate() {
    document.addEventListener('click', this.checkOutsideClick);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.checkOutsideClick);
  }

  goToCart = () => {
    const { history } = this.props;
    history.push('/cart');
    this.props.closePopUp();
  };

  render() {
    const { active } = this.props;
    const { product: { attributes } } = this.state;
    if (!active) return null;
    // @ts-ignore
    const { cartData, decrementAmount, incrementAmount } = this.context;
    if (cartData.quantity === 0) {
      return (
        <div className={cls.popUpCart}>
          <span>Your cart is empty</span>
        </div>
      );
    }
    return (
      // @ts-ignore
      <div id="popupCart" className={cls.popUpCart}>
        <div className={cls.popUpCartContent}>
          <CurrencyConsumer>
            {({ getCurrentCurrency }) => (
              <div className={cls.popUpCartWrapper}>
                <h2 className={cls.popUpCartTitle}>My Bag, {cartData.quantity} items</h2>
                <ul className={cls.popUpCartList}>
                  {cartData.cart.map(
                    ({ name, brand, amount, image, prices }, idx) => (
                      <li key={name} className={cls.cartListItem}>
                        <div className={cls.popUpCartItemInfo}>
                          <div className={cls.productBrand}>{brand}</div>
                          <div className={cls.productName}>{name}</div>
                          <div className={cls.productSize}>
                            <p>{attributes[0]?.id}</p>
                          </div>
                          <div className={cls.productPrice}>
                            <span>
                              {/* @ts-ignore */}
                              {getCurrentCurrency(prices)?.currency?.symbol}
                            </span>
                            <span>
                              {(
                                /* @ts-ignore */
                                getCurrentCurrency(prices)?.amount * amount
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className={cls.popUpCartCount}>
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
                            <img src={image} alt="img" />
                          </div>
                        </div>
                      </li>
                    ),
                  )}
                </ul>
                <div className={cls.cartFooter}>
                  <div className={cls.totalPriceWrapper}>
                    <span>Total: </span>
                    {/* @ts-ignore */}
                    {getCurrentCurrency(cartData.cart[0].prices)?.currency?.symbol}
                    {cartData.cart
                      .reduce(
                        (acc, el) =>
                        (acc +=
                          // @ts-ignore
                          getCurrentCurrency(el.prices)?.amount * el.amount),
                        0,
                      )
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </CurrencyConsumer>
        </div>
        <div className={cls.footerButtons}>
          <button className={cls.viewBag} onClick={this.goToCart}>
            VIEW BAG
          </button>
          <button className={cls.checkOut} onClick={this.goToCart}>
            CHECK OUT
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(PopupCart);