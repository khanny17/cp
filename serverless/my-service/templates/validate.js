const requiredProperties = [
  '_id', 'plan', 'description', 'school', 'major', 'tags', 'stars', 'owner',
  'lastUpdated',
];

const planRequiredProperties = [
  'years', 'terms', 'courses', 'details', 'colorscheme', 'requirements',
];

const planDetailsRequiredProperties = [
  'title', 'years', 'requirements',
];
  

module.exports = (template) => {
  requiredProperties.forEach(p => {
    if(!template[p]) {
      throw new Error('Missing property: ' + p);
    }
  });

  planRequiredProperties.forEach(p => {
    if(!template.plan[p]) {
      throw new Error('Missing property: plan.' + p);
    }
  });

  planDetailsRequiredProperties.forEach(p => {
    if(!template.plan.details[p]) {
      throw new Error('Missing property: plan.details.' + p);
    }
  });
};

