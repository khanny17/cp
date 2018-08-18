import React from 'react';
import PropTypes from 'prop-types';

const RequirementsPreview = ({ requirements }) =>
  <div>
    {Object.values(requirements).map(req => (
      <div key={req.fid}>
        {req.type}
        {req.value}
      </div>
    ))}
  </div>
;

RequirementsPreview.propTypes = { requirements: PropTypes.object };

export default RequirementsPreview;
