import { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiCheckSquare, FiX } from 'react-icons/fi';

import { Container, Form, Button, ButtonContainer } from './styles';

import Input from '../../components/Input';

import api from '../../services/api';

interface FoodPlate {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface EditFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}
interface EditFoodProps {
  editingFood: FoodPlate;
}

const EditFood: React.FC = () => {
  const formRef = useRef(null);

  const history = useHistory();
  const {
    state: { editingFood },
  } = useLocation<EditFoodProps>();

  const handleSubmit = async (food: EditFoodData) => {
    try {
      const response = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      console.log(response);

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    history.push('/');
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <ButtonContainer>
          <Button type="submit" onClick={handleCancel} isCancel>
            <div className="text">Cancelar</div>
            <div className="icon">
              <FiX size={24} />
            </div>
          </Button>
          <Button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default EditFood;
