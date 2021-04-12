import AdminRoutes from './admin.route';
import PublicRoutes from './public.route';

const signed = false;

const Routes: React.FC = () => (
  <>{signed ? <AdminRoutes /> : <PublicRoutes />}</>
);

export default Routes;
