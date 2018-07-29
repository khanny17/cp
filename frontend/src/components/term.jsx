import React from 'react';
import Course from './course';

const Term = ({ term }) => (
  <div>
    <h1>term.title</h1>
    <div>
      term.courses.map(course => <Course course={course} />)
    </div>
  </div>
)

export default Term;
