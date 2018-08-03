function isLocal() {
  const hostname = window && window.location && window.location.hostname;
  return hostname.includes('localhost') || hostname.includes('127.0.0.1');
}

export const PLAN_API_ROOT = isLocal() ?
  'http://127.0.0.1:3002' :
  'https://plans.cp-api.tech' ;

export const AUTH_API_ROOT = isLocal() ?
  'http://127.0.0.1:3001' :
  'https://auth.cp-api.tech' ;
