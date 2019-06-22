import React from 'react';
import styled from 'styled-components';
import Proptypes, { setType } from '../proptypes';
import Loader from './LoginPage.loader';

import Logo from './images/logo.svg';
import RightImage from './images/right-img.svg';
import LoginCard from "../LoginCard/LoginCard";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`;
const LogoContainer = styled.div`
  align-self: flex-start;
  padding: 0 100px 0 40px;
`;
const LoginFormContainer = styled.div`
  align-self: center;
`;
const RightImageContainer = styled.div`
  align-self: center;
  padding: 50px 165px 50px 50px;
  img {
    width: 600px;
  }
`;

const LoginPage = ({ className, style, loadingKeys, logo, rightImage, onAction }) => {

  if (loadingKeys.has('default'))
    return (
      <Container>
        <Loader />
      </Container>
    );

  return (
    <Container className={className} style={style}>
      <LogoContainer>
        <img src={logo} alt="logo" />
      </LogoContainer>
      <LoginFormContainer>
        <LoginCard onAction={onAction} />
      </LoginFormContainer>
      <RightImageContainer>
        <img src={rightImage} alt="placeholder" />
      </RightImageContainer>
    </Container>
  );
};

LoginPage.defaultProps = {
  loadingKeys: new Set(),
  className: '',
  style: {},
  logo: Logo,
  rightImage: RightImage
};

LoginPage.propTypes = {
  className: Proptypes.string,
  style: Proptypes.string,
  loadingKeys: setType.isRequired,
  logo: Proptypes.string,
  rightImage: Proptypes.string,
  onAction: Proptypes.func.isRequired,
};

export default LoginPage;
