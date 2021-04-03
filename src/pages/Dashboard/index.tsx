import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FoodsContainer } from './styles';

import Header from '../../components/Header';
import Food from '../../components/Food';

import api from '../../services/api';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();

  const [foods, setFoods] = useState<FoodPlate[]>([]);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data));
  }, []);

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function handleEditFood(food: FoodPlate): void {
    history.push({
      pathname: '/edit-food',
      state: { editingFood: food },
    });
  }

  return (
    <>
      <Header />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
