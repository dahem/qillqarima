import React from 'react';
import PropTypes from 'prop-types';

const Endpoint = ({ method, path }) => (
  <div className="end-point">
    <div className="method">{method}</div>
    <div className="path">{path}</div>
  </div>
);

Endpoint.propTypes = {
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Endpoint;
