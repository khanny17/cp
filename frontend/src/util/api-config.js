function isLocal() {
  const hostname = window && window.location && window.location.hostname;
  return hostname.includes('localhost') || hostname.includes('127.0.0.1');
}

export const AUTH_API_ROOT = isLocal() ?
  'http://127.0.0.1:3001' :
  'https://auth.cp-api.tech' ;

export const PLAN_API_ROOT = isLocal() ?
  'http://127.0.0.1:3002' :
  'https://plans.cp-api.tech' ;

export const TEMPLATE_API_ROOT = isLocal() ?
  'http://127.0.0.1:3003' :
  'https://templates.cp-api.tech' ;

export const SCHOOL_API_ROOT = isLocal() ?
  'http://127.0.0.1:3004' :
  'https://schools.cp-api.tech' ;
