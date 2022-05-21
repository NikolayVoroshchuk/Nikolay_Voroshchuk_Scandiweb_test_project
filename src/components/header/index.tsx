import { Component } from 'react';
import { ReactComponent as BrandIcon } from '../../assets/header/BrandIcon.svg';
import { ReactComponent as Cart } from '../../assets/header/Cart.svg';
import { ProductsDataContext } from '../../context/withProductsData';
import { withRouter } from 'react-router';
import cls from './index.module.scss';
import { client } from '../../index';
import { GET_CURRENCIES_QUERY } from '../../queries/currencies';
import { CurrencyConsumer } from '../../context/withCurrency';
import { CartConsumer } from '../../context/withCartData';
import PopupCart from '../popupCart';


interface IHeader {
  currencies: Array<any>;
  modalActive: boolean;
}

const headerData = [
  { name: 'tech', title: 'TECH' },
  { name: 'clothes', title: 'CLOTHES' },
  { name: 'all', title: 'ALL' },
];

class Header extends Component<{ history: any }, IHeader> {
  static contextType = ProductsDataContext;

  state = {
    currencies: [],
    modalActive: false,
  };

  getCurrencies = async () => {
    const { data } = await client.query({ query: GET_CURRENCIES_QUERY });

    this.setState({ currencies: data.currencies });
  };

  componentDidMount() {
    this.getCurrencies();
  }

  render() {
    // @ts-ignore
    const { getCategoryData } = this.context;
    const { currencies, modalActive } = this.state;

    const goToLink = (name: string) => {
      const { history } = this.props;
      getCategoryData(name);
      history.push('/');
    };

    const toggleCart = () => {
      this.setState((prevState) => ({ modalActive: !prevState.modalActive }));
    };

    return (
      <div className={cls.header}>
        <nav>
          <ul className={cls.items}>
            {headerData.map(({ title, name }) => (
              <li key={title} onClick={() => goToLink(name)}>
                {title}
              </li>
            ))}
          </ul>
        </nav>
        <div className={cls.logo}>
          <BrandIcon />
        </div>
        <div className={cls.wrapper}>
          <div className={cls.currency}>
            <CurrencyConsumer>
              {/* @ts-ignore */}
              {({ currency, changeCurrency }) => (
                <select
                  name='currency'
                  id='currency'
                  defaultValue='USD'
                  onChange={({ target: { value } }) => changeCurrency(value)}
                >
                  {/* this is not the place for russian ruble */}
                  {currencies.slice(0, 4).map(({ symbol, label }) => (
                    <option
                      key={label}
                      selected={currency === label}
                      value={label}
                    >
                      {symbol} {label}
                    </option>
                  ))}
                </select>
              )}
            </CurrencyConsumer>
          </div>
          <div id="header-cart" className={cls.cart} onClick={toggleCart}>
            <CartConsumer>
              {({ cartData }) => (
                <>
                  <div className={cls.quantity}>
                    {/* @ts-ignore */}
                    {cartData.quantity}
                  </div>
                  <Cart />
                </>
              )}
            </CartConsumer>
          </div>
          <PopupCart
            active={modalActive}
            closePopUp={() => this.setState({ modalActive: false })}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
