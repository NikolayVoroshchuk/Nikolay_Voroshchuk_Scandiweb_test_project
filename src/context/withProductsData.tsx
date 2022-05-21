import { Component, createContext } from 'react';
import { client } from '../index';
import { ICategory } from '../interfaces/productList';
import { GET_CATEGORY_QUERY } from '../queries/category';

export const ProductsDataContext = createContext({
  getCategoryData: (_: string) => { },
  category: { name: '', products: [] }
});

export const ProductsDataProvider = ProductsDataContext.Provider;

export function withProductsData(WrappedComponent) {
  return class extends Component<{}, { category: ICategory }> {
    state = {
      category: {
        name: '',
        products: [],
      },
    };

    getCategoryData = async (categoryTitle: string) => {
      const {
        data: { category },
      } = await client.query({
        query: GET_CATEGORY_QUERY,
        variables: { input: { title: categoryTitle } },
      });

      this.setState({ category });
    }

    componentDidMount() {
      this.getCategoryData('tech');
    }

    render() {
      return (
        <ProductsDataProvider value={{
          category: this.state.category,
          getCategoryData: this.getCategoryData
        }}>
          <WrappedComponent {...this.props} />
        </ProductsDataProvider>
      );
    }
  };
}
