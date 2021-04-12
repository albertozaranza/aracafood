import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';

import { CartProvider } from '../hooks/useCart';

const PublicRoutes: React.FC = () => (
  <CartProvider>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" exact component={Cart} />
    </Switch>
  </CartProvider>
);

export default PublicRoutes;
