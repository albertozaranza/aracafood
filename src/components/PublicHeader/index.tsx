import { useHistory } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

import { Container } from './styles';
import Logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={() => history.push('/')}>
              <div className="text">Carrinho</div>
              <div className="icon">
                <FiShoppingCart size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
