import { useCart } from '../../hooks/useCart';

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
  const { addFoodPlate } = useCart();

  const handleAddFood = (foodPlateId: number) => {
    addFoodPlate(foodPlateId);
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
          <button
            type="button"
            className="add-food"
            onClick={() => handleAddFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            Adicionar ao carrinho
          </button>
        </section>
      )}
    </Container>
  );
};

export default PublicFood;
