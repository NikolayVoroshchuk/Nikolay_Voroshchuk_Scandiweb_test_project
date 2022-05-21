import { Component, createContext } from 'react';

export const CurrencyContext = createContext({
  currency: '',
  changeCurrency: (currency: string) => { },
  getCurrentCurrency: (prices: any) => { }
});

export const CurrencyProvider = CurrencyContext.Provider;
export const CurrencyConsumer = CurrencyContext.Consumer;

export function withCurrencyData(WrappedComponent) {
  return class extends Component<{}, { currency: string }> {
    state = {
      currency: 'USD',
    };

    changeCurrency = (currency: string) => this.setState({ currency });

    getCurrentCurrency = (prices: any): any =>
      prices.find((el: any) => el.currency.label === this.state.currency);

    render() {
      const { currency } = this.state;
      return (
        <CurrencyProvider
          value={{
            currency,
            changeCurrency: this.changeCurrency,
            getCurrentCurrency: this.getCurrentCurrency,
          }}
        >
          <WrappedComponent {...this.props} />
        </CurrencyProvider>
      );
    }
  };
}
