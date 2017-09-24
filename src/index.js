import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import { Router, Route } from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory'


import '../node_modules/bulma/css/bulma.css'

import App from './containers/App';

import Auth from './containers/Auth'
import Layout from './components/Layout'

import registerServiceWorker from './registerServiceWorker';

import About from './components/About.js';
import Jumbotron from './components/Jumbotron';

import Wall from './containers/Wall';
import Favs from './containers/Favs';


const store = configureStore();
const history= createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      <Layout>
          <Route exact path ="/" component={App} />
          <App>
            <Route path="/wall" component={Wall} />
            <Route path="/favs" component={Favs} />
          </App>
          <Route path="/about" component={About} />
          <Route path="/auth" component={Auth} />
          <Route path="/intro" component={Jumbotron} />
      </Layout>
    </Router>
  </Provider>,
   document.getElementById('root')
   );
registerServiceWorker();
