import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import { Router, Route, Switch } from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory'


import '../node_modules/bulma/css/bulma.css'
import '../src/stylesheets/Groups.css'

import App from './containers/App';

import Auth from './containers/Auth'
import Layout from './components/Layout'

import registerServiceWorker from './registerServiceWorker';

import About from './components/About.js';

import Wall from './containers/Wall';
import Favs from './containers/Favs';
import Mess from './containers/Messages';
import Groups from './containers/Groups';
import Friends from './containers/Friends';
import Notes from './containers/Notes';
import Docs from './containers/Docs';
import Videos from './containers/Videos';
import Photos from './containers/Photos';





const store = configureStore();
const history= createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>

            <Route path="/auth" component={Auth} />
            <Route path="/about" component={About} />
            <Route exact path ="/" component={App} />

          <Layout>
            <App>



              <Route exact path="/wall" component={Wall} />
              <Route exact path="/favs" component={Favs} />
              <Route exact path="/messages" component={Mess} />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/friends" component={Friends} />
              <Route exact path="/notes" component={Notes} />
              <Route exact path="/docs" component={Docs} />
              <Route exact path="/videos" component={Videos} />
              <Route exact path="/photos" component={Photos} />

            </App>

          </Layout>

      </Switch>
    </Router>
  </Provider>,
   document.getElementById('root')
   );
registerServiceWorker();
