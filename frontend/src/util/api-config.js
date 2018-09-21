function isLocal() {
  const hostname = window && window.location && window.location.hostname;
  return hostname.includes('localhost') || hostname.includes('127.0.0.1');
}

export const AUTH_API_ROOT = isLocal() ?
  'http://127.0.0.1:3000/auth' :
  'https://0gm3wmboci.execute-api.us-east-1.amazonaws.com/dev/auth' ;
  //'https://auth.cp-api.tech' ;

export const PLAN_API_ROOT = isLocal() ?
  'http://127.0.0.1:3000/plans' :
  'https://0gm3wmboci.execute-api.us-east-1.amazonaws.com/dev/plans' ;
  //'https://plans.cp-api.tech' ;

export const TEMPLATE_API_ROOT = isLocal() ?
  'http://127.0.0.1:3000/templates' :
  'https://0gm3wmboci.execute-api.us-east-1.amazonaws.com/dev/templates' ;
  //'https://templates.cp-api.tech' ;

export const SCHOOL_API_ROOT = isLocal() ?
  'http://127.0.0.1:3004' :
  'https://schools.cp-api.tech' ;

export const PREFERENCES_API_ROOT = isLocal() ?
  //'http://127.0.0.1:3005' :
  'http://127.0.0.1:3000/preferences' :
  'https://0gm3wmboci.execute-api.us-east-1.amazonaws.com/dev/preferences' ;
  //'https://preferences.cp-api.tech' ;
