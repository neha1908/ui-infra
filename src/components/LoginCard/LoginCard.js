import React from 'react';
import { Card } from 'antd';
import Proptypes, { setType } from '../proptypes';

import LoginForm from './LoginForm';

const LoginCard = ({ className, loading, style, onAction }) => {

  return (
    <Card className={className} style={style} loading={loading}>
      <LoginForm onAction={onAction} />
    </Card>
  );
};

LoginCard.defaultProps = {
  className: '',
  style: { width: 400 }
};

LoginCard.propTypes = {
  className: Proptypes.string,
  style: Proptypes.string,
  loading: setType.isRequired,
  onAction: Proptypes.func.isRequired
};

export default LoginCard;
