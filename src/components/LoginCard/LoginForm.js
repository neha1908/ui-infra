import React from 'react';
import styled from 'styled-components';
import { Form, Icon, Input, Button } from 'antd';
import Proptypes from '../proptypes';

const FormHeader = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
`;
const StyledLink = styled.a`
  font-size: 14px;
  font-weight: 700;
`;

const LoginForm = ({ form, onAction, redirectToForgotPassword }) => {
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onAction(values);
      }
    });
  }

  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormHeader>Welcome Back!</FormHeader>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <StyledLink className="login-form-forgot" onClick={redirectToForgotPassword}>
          Forgot password?
        </StyledLink>
        <br />
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          Login to continue
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  redirectToForgotPassword: Proptypes.func.isRequired,
  onAction: Proptypes.func.isRequired,
  form: Proptypes.string.isRequired
};

const WrappedNormalLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedNormalLoginForm;
