import React from 'react';
import { useLog } from '../hooks';
import styled from 'styled-components';
import Proptypes, { setType } from '../proptypes';
import Loader from './Component.loader';

const Container = styled.div``;

const Component = ({ className, style, loadingKeys, onAction }) => {
  // eslint-disable-line
  const log = useLog();

  if (loadingKeys.has('default'))
    return (
      <Container>
        <Loader />
      </Container>
    );

  return (
    <Container className={className} style={style}>
      Component will be here
    </Container>
  );
};

Component.defaultProps = {
  loadingKeys: new Set(),
  className: '',
  style: {},
};

Component.propTypes = {
  className: Proptypes.string,
  style: Proptypes.string,
  loadingKeys: setType.isRequired,
  onAction: Proptypes.func.isRequired,
};

export default Component;
