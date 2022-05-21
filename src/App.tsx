import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopLayout from '../../client/src/layouts/shop';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={ShopLayout} />
      </Switch>
    );
  }
}

export default App;
