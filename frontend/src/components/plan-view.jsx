import React from 'react';
import Year from './year'

const PlanView = ({ plan }) => (
  <div>
    <h1>plan.name</h1>
    <div>
      plan.years.map(year => <Year year={year} />)
    </div>
  </div>
)

export default PlanView;
