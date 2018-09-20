const requiredProperties = [
  'years', 'terms', 'courses', 'details', 'colorscheme', 'requirements',
  '_id', 'plan_owner', 'lastAccessed',
];

module.exports = (plan) => {
  requiredProperties.forEach(p => {
    if(!plan[p]) {
      throw new Error('Missing property: ' + p);
    }
  });

  if(!plan.details.title) {
    throw new Error('Missing property: details.title');
  }
  if(!plan.details.years) {
    throw new Error('Missing property: details.years');
  }
  if(!plan.details.requirements) {
    throw new Error('Missing property: details.requirements');
  }
};
