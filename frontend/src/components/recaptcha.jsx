import React from 'react';
import PropTypes from 'prop-types';

const Recaptcha = ({ siteKey }) => (
  <div id='recaptcha' className="g-recaptcha"
    data-sitekey={siteKey}
    data-callback="onSubmit"
    data-size="invisible"></div>
);

Recaptcha.propTypes = { siteKey: PropTypes.string };

export default Recaptcha;
