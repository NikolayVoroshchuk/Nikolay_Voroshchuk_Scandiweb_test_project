import { Component } from 'react';
import Header from '../../components/header';
import { Switch, Route } from 'react-router-dom';
import ProductListPage from '../../pages/productListPage';
import ProductDescPage from '../../pages/productDescPage';
import { withProductsData } from '../../context/withProductsData';
import { withCurrencyData } from '../../context/withCurrency';
import { withCartData } from '../../context/withCartData';
import CartPage from '../../pages/cartPage';
import cls from './index.module.scss';

class ShopLayout extends Component {
    render() {
        return (
            <div className={cls.layout}>
                <Header />
                <div className={cls.content}>
                    <Switch>
                        <Route path='/' exact component={ProductListPage} />
                        <Route path='/cart' exact component={CartPage} />
                        <Route path='/description/:id' exact component={ProductDescPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withCurrencyData(withCartData(withProductsData(ShopLayout)));
