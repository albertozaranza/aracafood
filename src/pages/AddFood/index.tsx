import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheckSquare, FiX } from 'react-icons/fi';

import { Container, Form, ButtonContainer, Button } from './styles';

import Input from '../../components/Input';

import api from '../../services/api';

interface CreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

const AddFood: React.FC = () => {
  const formRef = useRef(null);

  const history = useHistory();

  const handleSubmit = async (food: CreateFoodData) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <ButtonContainer>
          <Button onClick={handleCancel} isCancel>
            <p className="text">Cancelar</p>
            <div className="icon">
              <FiX size={24} />
            </div>
          </Button>
          <Button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddFood;
