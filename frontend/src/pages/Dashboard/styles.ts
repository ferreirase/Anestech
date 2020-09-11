import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Header = styled.div`
  position: absolute;
  background-color: #000000;
  width: 100%;
  height: 75px;

  animation: ${appearFromLeft} 1s;

  h2 {
    position: relative;
    color: #fff;
    width: 25%;
    text-align: center;
    margin: 0 auto;
    top: 20px;
  }
`;

export const Message = styled.h3`
  position: relative;
  top: 200px;
  width: 50%;
  margin: 0 auto;
  text-align: center;
  color: #c2c2c2;
`;
