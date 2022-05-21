import { Component } from 'react';
import { IProductData } from '../../interfaces/productData';
import ProductList from '../../components/productList';
import { ProductsDataContext } from '../../context/withProductsData';
import cls from './index.module.scss';

class ProductListPage extends Component<IProductData> {
    static contextType = ProductsDataContext;

    render() {
        // @ts-ignore
        const { category: { name, products } } = this.context;

        return (
            <div>
                <h2 className={cls.title}>{name}</h2>
                <ProductList products={products} />
            </div>
        );
    }
}

export default ProductListPage;
