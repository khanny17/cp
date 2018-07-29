import React from 'react';
import Term from './term';

const Year = ({ year }) => (
  <div>
    <h1>year.title</h1>
    <div>
      year.terms.map(term => <Term term={term} />
    </div>
  </div>
)

export default Year;
