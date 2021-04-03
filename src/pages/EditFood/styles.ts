import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

interface ButtonProps {
  isCancel?: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c72828;
`;

export const Form = styled(Unform)`
  height: 100vh;
  width: 1024px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.button<ButtonProps>`
  font-weight: 600;
  border-radius: 8px;
  border: 0;
  background: ${({ isCancel }) => (isCancel ? '#fff' : '#39b100')};
  color: ${({ isCancel }) => (isCancel ? '#c72828' : '#fff')};
  display: flex;
  flex-direction: row;
  align-items: center;

  .text {
    padding: 16px 24px;
  }

  .icon {
    display: flex;
    padding: 16px 16px;
    background: ${({ isCancel }) => (isCancel ? '#fcc' : '#41c900')};
    border-radius: 0 8px 8px 0;
    margin: 0 auto;
  }
`;
