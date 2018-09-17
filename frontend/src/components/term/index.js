import React from 'react';
import PropTypes from 'prop-types';
import '../../css/term.css';

import ContextMenuTerm from './context-menu-term';
import DraggableTerm from './draggable-term';
import Term from './term';

const TermIndex = ({ term, index }) =>
  <ContextMenuTerm term={term}>
    <DraggableTerm term={term} index={index}>
      <Term term={term} />
    </DraggableTerm>
  </ContextMenuTerm>
;
TermIndex.propTypes = { term: PropTypes.string, index: PropTypes.number };

export default TermIndex;
