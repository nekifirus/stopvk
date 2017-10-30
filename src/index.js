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
import Jumbotron from './components/Jumbotron';

import Wall from './containers/Wall';
import Favs from './containers/Favs';
import Mess from './containers/Messages';
import Groups from './containers/Groups';
import Friends from './containers/Friends';
import Notes from './containers/Notes';
import Docs from './containers/Docs';
import Videos from './containers/Videos';
import Photos from './containers/Photos';

import Gallery from './containers/Gallery';



const store = configureStore();
const history= createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/intro" component={Jumbotron} />

      <Layout>
          <Route exact path ="/" component={App} />
          <App>
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/wall" component={Wall} />
            <Route exact path="/favs" component={Favs} />
            <Route exact path="/messages" component={Mess} />
            <Route exact path="/favphotos" component={Gallery} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/docs" component={Docs} />
            <Route exact path="/videos" component={Videos} />
            <Route exact path="/photos" component={Photos} />

          </App>

          <Route path="/about" component={About} />


      </Layout>
      </Switch>
    </Router>
  </Provider>,
   document.getElementById('root')
   );
registerServiceWorker();
