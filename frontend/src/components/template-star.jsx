import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { toggleStar } from '../actions/template';

const TemplateStar = ({ template, toggleStar, user }) =>
  template.togglingStar ?
    <Icon loading name="circle notch" className="star"/>
    :
    <Icon
      name={ template.stars.includes(user._id) ? 'star' : 'star outline' }
      className="star"
      onClick={() => toggleStar(template._id)} />
;

TemplateStar.propTypes = {
  template: PropTypes.object,
  user: PropTypes.object,
  toggleStar: PropTypes.func,
};

const TemplateStarContainer = connect(
  state => ({
    user: state.auth.user,
  }),
  dispatch => ({
    toggleStar: templateId => dispatch(toggleStar(templateId)),
  }),
)(TemplateStar);

export default TemplateStarContainer;
