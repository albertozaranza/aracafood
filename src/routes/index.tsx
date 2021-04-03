import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import AddFood from '../pages/AddFood';
import EditFood from '../pages/EditFood';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/add-food" exact component={AddFood} />
    <Route path="/edit-food" exact component={EditFood} />
  </Switch>
);

export default Routes;
