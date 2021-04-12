import { useState, useEffect } from 'react';
import { FoodsContainer } from './styles';

import PublicHeader from '../../components/PublicHeader';
import PublicFood from '../../components/PublicFood';

import api from '../../services/api';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

const Home: React.FC = () => {
  const [foods, setFoods] = useState<FoodPlate[]>([]);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data));
  }, []);

  return (
    <>
      <PublicHeader />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <PublicFood
              key={food.id}
              food={food}
              isAvailable={food.available}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Home;
