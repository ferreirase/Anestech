import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

import signInBackgroundImg from '../../assets/office.jpg';

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

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 100px;

  img {
    position: relative;
    width: 100%;
    height: 20%;
    top: 5%;
  }

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #c2c2c2;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#d3d3d3')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: flex;
    text-decoration: none;
    transition: color 0.2s;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
  background-color: whitesmoke;
  height: 120vh;
`;
