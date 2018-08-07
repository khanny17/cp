import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const EasyInput = ({ name, value=null, type='input', onChange }) => {
  return value ?
    <Form.Input
      label={name}
      name={name}
      type={type}
      value={value}
      placeholder={name}
      onChange={onChange}
    />
    :
    <Form.Input
      label={name}
      name={name}
      type={type}
      placeholder={name}
      onChange={onChange}
    />
  ;
};

EasyInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

export default EasyInput;
