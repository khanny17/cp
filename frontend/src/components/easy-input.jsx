import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const capitalize = lower => lower.replace(/^\w/, c => c.toUpperCase());

const EasyInput = ({ name, value=null, type='input', onChange }) => {
  return value ?
    <Form.Input
      fluid
      label={capitalize(name)}
      name={name}
      type={type}
      value={value}
      placeholder={capitalize(name)}
      onChange={onChange}
    />
    :
    <Form.Input
      fluid
      label={capitalize(name)}
      name={name}
      type={type}
      placeholder={capitalize(name)}
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
