import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/react-contextmenu.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(reducers),
  applyMiddleware(thunk, routerMiddleware(history)),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();

//Why did you update?
if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}
