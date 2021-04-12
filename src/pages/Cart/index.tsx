/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

import PublicHeader from '../../components/PublicHeader';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
  amount: number;
}

const Cart: React.FC = () => {
  const { cart, removeFoodPlate, updateFoodAmount } = useCart();

  const cartFormatted = cart.map(foodPlate => ({
    ...foodPlate,
    priceFormatted: formatPrice(foodPlate.price),
    subtotal: formatPrice(foodPlate.price * foodPlate.amount),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, foodPlate) => {
      return (sumTotal += foodPlate.amount * foodPlate.price);
    }, 0),
  );

  function handleProductIncrement(foodPlate: FoodPlate) {
    updateFoodAmount({
      foodPlateId: foodPlate.id,
      amount: foodPlate.amount + 1,
    });
  }

  function handleProductDecrement(foodPlate: FoodPlate) {
    updateFoodAmount({
      foodPlateId: foodPlate.id,
      amount: foodPlate.amount - 1,
    });
  }

  function handleRemoveProduct(foodPlateId: number) {
    removeFoodPlate(foodPlateId);
  }

  return (
    <Container>
      <PublicHeader />

      {cart.length === 0 ? (
        <h2>Ops, parece que seu carrinho está vazio :(</h2>
      ) : (
        <>
          <ProductTable>
            <thead>
              <tr>
                <th aria-label="product image" />
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th aria-label="delete icon" />
              </tr>
            </thead>
            <tbody>
              {cartFormatted.map(product => (
                <tr data-testid="product" key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} />
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                    <span>{product.priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={product.amount <= 1}
                        onClick={() => handleProductDecrement(product)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={product.amount}
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(product)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{product.subtotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            <button type="button">Finalizar pedido</button>

            <Total>
              <span>TOTAL</span>
              <strong>{total}</strong>
            </Total>
          </footer>
        </>
      )}
    </Container>
  );
};

export default Cart;
