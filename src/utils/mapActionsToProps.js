import React from 'react';

const mapActionToProps = actions => Component => props => <Component {...actions} {...props} />;

export default mapActionToProps;
