/* eslint-disable no-param-reassign */
import { createContext, ReactNode, useContext, useState } from 'react';
import api from '../services/api';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  available: boolean;
  image: string;
}

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  foodPlateId: number;
  amount: number;
}

interface CartContextData {
  cart: FoodPlate[];
  addFoodPlate: (foodPlateId: number) => Promise<void>;
  removeFoodPlate: (foodPlateId: number) => void;
  updateFoodAmount: ({ foodPlateId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<FoodPlate[]>(() => {
    const storagedCart = localStorage.getItem('@AracaFood:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addFoodPlate = async (foodPlateId: number) => {
    try {
      const [hasFood] = cart.filter(foodPlate => foodPlateId === foodPlate.id);

      if (!hasFood) {
        const { data: foodPlate } = await api.get<FoodPlate>(
          `/foods/${foodPlateId}`,
        );

        setCart([...cart, { ...foodPlate, amount: 1 }]);

        localStorage.setItem(
          '@AracaFood:cart',
          JSON.stringify([...cart, { ...foodPlate, amount: 1 }]),
        );

        return;
      }

      if (hasFood.amount > 0) {
        const updatedCard = cart.map(foodPlate => {
          if (foodPlate.id === foodPlateId) {
            foodPlate.amount += 1;
          }

          return foodPlate;
        });

        setCart(updatedCard);

        localStorage.setItem('@AracaFood:cart', JSON.stringify(updatedCard));

        return;
      }
    } catch {
      console.log('Erro na adição do produto');
    }
  };

  const removeFoodPlate = (foodPlateId: number) => {
    try {
      const hasFood = cart.findIndex(foodPlate => foodPlate.id === foodPlateId);

      if (hasFood === -1) {
        throw new Error();
      } else {
        const filteredFoods = cart.filter(({ id }) => foodPlateId !== id);

        setCart(filteredFoods);

        localStorage.setItem('@AracaFood:cart', JSON.stringify(filteredFoods));
      }
    } catch {
      console.log('Erro na remoção do produto');
    }
  };

  const updateFoodAmount = async ({
    foodPlateId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount === 0) {
        throw new Error();
      }

      const updatedCart = cart.map(foodPlate => {
        if (foodPlate.id === foodPlateId) foodPlate.amount = amount;
        return foodPlate;
      });

      setCart(updatedCart);

      localStorage.setItem('@AracaFood:cart', JSON.stringify(updatedCart));
    } catch {
      console.log('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addFoodPlate, removeFoodPlate, updateFoodAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
