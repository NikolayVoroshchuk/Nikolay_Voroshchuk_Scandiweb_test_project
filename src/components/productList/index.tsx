import { Component, createRef } from 'react';
import { IProduct } from '../../interfaces/productList';
import { CurrencyContext } from '../../context/withCurrency';
import { ReactComponent as Cart } from '../../assets/header/Cart.svg';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import cls from './index.module.scss';
import { CartConsumer } from '../../context/withCartData';
import SnackBar from '../snackBar';


class ProductList extends Component<{
  products: Array<IProduct>;
  history: any;
}> {
  static contextType = CurrencyContext;
  private snackBarRef: React.RefObject<any>;
  constructor(props) {
    super(props);
    this.snackBarRef = createRef<any>();
  }
  state = {
    showCartIdx: null,
  };
  addNewItem = () => { };

  showSnackbarHandler = () => {
    this.snackBarRef.current.openSnackBar('Item added to cart');
  }

  render() {
    // @ts-ignore
    const { getCurrentCurrency } = this.context;
    const { products } = this.props;
    const { showCartIdx } = this.state;

    return (
      <>
        <ul className={cls.productList}>
          {products.map(
            ({ id, name, brand, gallery, prices, attributes }, idx) => (
              <Link key={name} to={`/description/${id}`} className={cls.listItem}>
                <li
                  onMouseEnter={() => this.setState({ showCartIdx: idx })}
                  onMouseLeave={() => this.setState({ showCartIdx: null })}
                >
                  <div className={cls.itemImg}>
                    <img src={gallery[0]} alt="img" />
                  </div>
                  {showCartIdx === idx && (
                    <CartConsumer>
                      {({ addNewItemToCart }) => (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            addNewItemToCart(
                              name,
                              brand,
                              prices,
                              attributes[0]?.id,
                              gallery[0],
                            );
                            this.showSnackbarHandler()
                          }}
                          className={cls.cart}
                        >
                          <Cart />
                        </div>
                      )}
                    </CartConsumer>
                  )}
                  <div className={cls.itemDetails}>
                    <p className={cls.productName}>{name}</p>
                    <p className={cls.productPrice}>
                      {getCurrentCurrency(prices).currency.symbol}
                      {getCurrentCurrency(prices).amount}
                    </p>
                  </div>
                </li>
              </Link>
            ),
          )}
        </ul>
        <SnackBar ref={this.snackBarRef} />
      </>
    );
  }
}

export default withRouter(ProductList);
