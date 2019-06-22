import React from 'react';
import Loader from 'react-content-loader';

const ComponentLoader = () => {
  return (
    <Loader height={12} width={100}>
      <rect x="0" y="0" rx="2" ry="2" width="100" height="12" />
    </Loader>
  );
};

ComponentLoader.propTypes = {};

export default ComponentLoader;
