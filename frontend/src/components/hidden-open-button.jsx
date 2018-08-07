import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

const HiddenOpenButton = ({ onClick, planId }) => (
  <Link to={`/plan/${planId}`}
    className="show-on-hover"
  >
    <Button icon basic size="mini" style={{float: 'right'}}
      onClick={onClick}
    >
      <Icon name="folder open"/>
      Open
    </Button>
  </Link>
);

HiddenOpenButton.propTypes = {
  onClick: PropTypes.func,
  planId: PropTypes.string,
};

export default HiddenOpenButton;
