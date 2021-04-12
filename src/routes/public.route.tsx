import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';

const PublicRoutes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
  </Switch>
);

export default PublicRoutes;
