import { Component, createContext } from 'react';
import { ICartData } from '../interfaces/cartData';

export const CartContext = createContext({
  cartData: {},
  addNewItemToCart: (
    name: string,
    brand: string,
    prices: any,
    attribute: string,
    image: string
  ) => { },
  changeCartProperty: (id: number, category: string, value: string) => { },
  incrementAmount: (id: number) => { },
  decrementAmount: (id: number) => { },
});

export const CartProvider = CartContext.Provider;
export const CartConsumer = CartContext.Consumer;

export function withCartData(WrappedComponent) {
  return class extends Component<{}, ICartData> {
    state = {
      cart: [],
      quantity: 0,
    };

    addNewItemToCart = (
      name: string,
      brand: string,
      prices: any,
      attribute: string,
      image: string
    ) => {
      const cartNamesArr = this.state.cart.map((el) => el.name);
      if (cartNamesArr.includes(name)) {
        const existingIndex = this.state.cart.findIndex(
          (el) => el.name === name
        );
        this.setState((prevState) => {
          const cart = [...prevState.cart];

          cart[existingIndex].amount = cart[existingIndex].amount + 1;

          return {
            cart,
            quantity: prevState.quantity + 1,
          };
        });
      } else {
        this.setState((prevState: ICartData) => ({
          cart: [
            ...prevState.cart,
            { name, brand, prices, attribute, image, amount: 1, attributesSelectedIdx: 0 },
          ],
          quantity: prevState.quantity + 1,
        }));
      }
    };

    changeCartProperty = (id: number, value: string) => {
      this.setState((prevProps: ICartData): any => {
        const newCart = [...prevProps.cart];
        newCart[id].attribute = value;

        return {
          cart: newCart,
        };
      });
    };

    incrementAmount = (id: number) => {
      this.setState((prevState: ICartData): any => {
        const newCartObj = { ...prevState };
        newCartObj.cart[id].amount = newCartObj.cart[id].amount + 1;
        const quantity = newCartObj.cart.reduce(
          (acc, { amount }) => (acc += amount),
          0
        );
        newCartObj.quantity = quantity;

        return newCartObj;
      });
    };

    decrementAmount = (id: number) => {
      this.setState((prevState: ICartData): any => {
        const newCartObj = { ...prevState };

        newCartObj.cart[id].amount = newCartObj.cart[id].amount - 1;
        const quantity = newCartObj.cart.reduce(
          (acc, { amount }) => (acc += amount),
          0
        );
        newCartObj.quantity = quantity;

        if (newCartObj.cart[id].amount === 0) {
          newCartObj.cart.splice(id, 1);
        };

        return newCartObj;
      });
    };

    render() {
      return (
        <CartProvider
          value={{
            cartData: this.state,
            addNewItemToCart: this.addNewItemToCart,
            changeCartProperty: this.changeCartProperty,
            incrementAmount: this.incrementAmount,
            decrementAmount: this.decrementAmount
          }}
        >
          <WrappedComponent {...this.props} />
        </CartProvider>
      );
    }
  };
}
