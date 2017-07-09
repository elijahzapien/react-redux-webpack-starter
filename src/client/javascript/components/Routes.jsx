import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'components/App';

import Home from './Home';
import NotFound from './NotFound';

const Routes = props => (
  <Provider store={props.store}>
    <Router>
      <App>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired
};

export default Routes;
