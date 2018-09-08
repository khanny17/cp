import { createSelector } from 'reselect';

const getRequirements = state => state.plan.requirements;

export default createSelector(
  [getRequirements],
  (requirements) => {
    return Object.values(requirements)
      .reduce((acc, r) => {
        if(r.course) {
          acc[r.course] = (acc[r.course] || []).concat(r._id);
        }

        return acc;
      }, {});
  }
);

