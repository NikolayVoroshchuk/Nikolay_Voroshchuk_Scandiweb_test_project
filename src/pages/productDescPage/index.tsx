import { Component } from 'react';
import { client } from '../../index';
import { GET_PRODUCT_QUERY } from '../../queries/product';
import { IProductDesc } from '../../interfaces/productDesc';
import AttributeIcons from '../../components/attributeIcons';
import { CurrencyContext } from '../../context/withCurrency';
import ColorIcons from '../../components/colorIcons';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router';
import cls from './index.module.scss';
import { CartConsumer } from '../../context/withCartData';

class ProductDescPage extends Component<{ match: any }, IProductDesc> {
  static contextType = CurrencyContext;

  state = {
    product: {
      brand: '',
      category: '',
      description: '',
      gallery: [],
      id: '',
      inStock: false,
      name: '',
      attributes: [
        { id: '', items: [{ displayValue: '', value: '', id: '' }] },
      ],
      prices: [{ currency: { symbol: '' }, amount: '' }],
    },
    imageIdx: 0,
    attributeIdx: 0,
  };

  getProductData = async () => {
    const {
      params: { id },
    } = this.props.match;
    const {
      data: { product },
    } = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: { id },
    });

    this.setState({ product });
  };

  changeImageToShow = (idx: number) => this.setState({ imageIdx: idx });

  componentDidMount() {
    this.getProductData();
  }

  handleAttribute = (idx: number) => this.setState({ attributeIdx: idx });

  getCurrentAttributes = (title: string, attributes: any, idx: number) => {
    switch (title) {
      case 'Size':
      case 'Capacity':
        return (
          <AttributeIcons
            items={attributes[0]?.items}
            handleAttribute={this.handleAttribute}
            attributeIdx={idx}
          />
        );
      case 'Color':
        return (
          <ColorIcons
            items={attributes[0]?.items}
            handleAttribute={this.handleAttribute}
            attributeIdx={idx}
          />
        );
    }
  };

  render() {
    const {
      product: { gallery, brand, name, attributes, prices, description },
      attributeIdx,
    } = this.state;
    // @ts-ignore
    const { getCurrentCurrency } = this.context;

    return (
      <div className={cls.pageDescWrapper}>
        <div className={cls.productGalery}>
          {gallery.map((item, idx) => (
            <div key={idx} className={cls.productImage}>
              <img
                onClick={() => this.changeImageToShow(idx)}
                src={item}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className={cls.productImage}>
          <img src={gallery[this.state.imageIdx]} alt="img" />
        </div>
        <div className={cls.productInfo}>
          <div className={cls.productBrand}>
            <p>{brand}</p>
          </div>
          <div className={cls.productName}>
            <p>{name}</p>
          </div>
          <div className={cls.productSize}>
            <p>{attributes[0]?.id}</p>
            {this.getCurrentAttributes(
              attributes[0]?.id,
              attributes,
              attributeIdx,
            )}
          </div>
          <div className={cls.productColor}></div>
          <div className={cls.productPrice}>
            <p>PRICE:</p>
            <span>{getCurrentCurrency(prices)?.currency?.symbol}</span>
            <span>{getCurrentCurrency(prices)?.amount}</span>
          </div>
          <div className={cls.productButton}>
            <CartConsumer>
              {({ addNewItemToCart }) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: add brand
                    addNewItemToCart(
                      name,
                      brand,
                      // @ts-ignore
                      prices,
                      attributes[0].id,
                      gallery[0],
                    );
                  }}
                  className={cls.cart}
                >
                  ADD TO CART
                </button>
              )}
            </CartConsumer>
          </div>
          <div className={cls.productDesc}>{ReactHtmlParser(description)}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDescPage);
