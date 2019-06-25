import React from 'react';
import styled from 'styled-components';
import { Row, Col , Layout , Anchor } from 'antd';


import Loader from './LoginPage.loader';
import Proptypes, { setType } from '../proptypes';
import Logo from './images/logo.svg';
import RightImage from './images/right-img.svg';
import LoginCard from '../LoginCard/LoginCard';

const { Link } = Anchor;
const { Header, Footer, Sider, Content } = Layout;

const Container = styled.div`
  // display: flex;
  // justify-content: space-between;
  height: 100vh;
`;
const LogoContainer = styled.div`
  // align-self: flex-start;
  // padding: 0 100px 0 40px;
`;
const LoginFormContainer = styled.div`
  // align-self: center;
`;
const RightImageContainer = styled.div`
  // align-self: center;
  // padding: 50px 165px 50px 50px;
  img {
    height: 520px;
    margin: 50px 0;
    // width: 600px;
  }
`;
const Img = styled.img`
  height: 100%;
  margin-top: -4px;
`;

const LoginPage = ({ className, style, loadingKeys, logo, rightImage, onAction }) => {
  if (loadingKeys.has('default'))
    return (
      <Container>
        <Loader />
      </Container>
    );

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <Img src={logo} alt="logo" />
      </Header>
      <Content>
        <Row type="flex" align="middle">
          <Col span={7} offset={2}>
            <LoginFormContainer className="col-offset-2 col-7">
              <LoginCard onAction={onAction} />
            </LoginFormContainer>
          </Col>
          <Col offset={2} xl={9} md={0}>
            <RightImageContainer>
              <img src={rightImage} alt="placeholder" />
            </RightImageContainer>
          </Col>
        </Row>
      </Content>
      <Footer>
        <Row type="flex" justify="space-between">
          <Col>© 2014-2019 Smartpaddle Technology Pvt. Ltd. All rights reserved.</Col>
          <Col>
            <Row>
              <a>Terms of use</a>&nbsp;
              <a>Privacy Policy</a>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

LoginPage.defaultProps = {
  loadingKeys: new Set(),
  className: '',
  style: {},
  logo: Logo,
  rightImage: RightImage,
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
