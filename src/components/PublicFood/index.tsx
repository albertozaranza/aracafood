import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { Container } from './styles';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface FoodProps {
  food: FoodPlate;
  isAvailable: boolean;
}

const PublicFood: React.FC<FoodProps> = ({ food, isAvailable }: FoodProps) => {
  const [amount, setAmount] = useState<number>(0);

  const addItem = () => {
    setAmount(amount + 1);
  };

  const removeItem = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      {isAvailable && (
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={removeItem}
              data-testid={`edit-food-${food.id}`}
            >
              <FiMinus size={20} />
            </button>

            <input type="number" disabled value={amount} />

            <button
              type="button"
              className="icon"
              onClick={addItem}
              data-testid={`remove-food-${food.id}`}
            >
              <FiPlus size={20} />
            </button>
          </div>
        </section>
      )}
    </Container>
  );
};

export default PublicFood;
