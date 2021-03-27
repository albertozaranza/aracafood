import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  header {
    width: 100%;
    margin: 0 auto;
    padding: 0 32px 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      @media (max-width: 425px) {
        width: 70%;
      }
    }

    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;

          .text {
            padding: 16px 24px;

            @media (max-width: 425px) {
              display: none;
            }
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;

            @media (max-width: 425px) {
              border-radius: 8px;
            }
          }
        }
      }
    }
  }
`;
