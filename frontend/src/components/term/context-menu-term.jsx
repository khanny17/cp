import React from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from 'react-contextmenu';
import TermContextMenu from './term-contextmenu';

const ContextMenuTerm = ({ term, children }) =>
  <React.Fragment>
    <ContextMenuTrigger id={term}>
      {children}
    </ContextMenuTrigger>

    <TermContextMenu term={term} />
  </React.Fragment>
;
ContextMenuTerm.propTypes = {
  term: PropTypes.string,
  children: PropTypes.element,
};

export default ContextMenuTerm;
