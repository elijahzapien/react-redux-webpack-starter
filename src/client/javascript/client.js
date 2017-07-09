import React from 'react';
import ReactDOM from 'react-dom';

import EnvEnum from 'enums/EnvEnum';

import createStore from './store';

import Routes from 'components/Routes';

// Store initialization
const store = createStore(window.__INITIAL_STATE__);

// Render
const mountNode = document.getElementById('app');

let render = () => {
  ReactDOM.render(
    <Routes store={store} />,
    mountNode
  );
};

if (EnvEnum.DEVELOPMENT && module.hot) {
  const renderApp = render;

  const renderError = (error) => {
    const RedBox = require('redbox-react').default;

    ReactDOM.render(
      <RedBox error={error} />,
      mountNode
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (e) {
      console.error(e);

      renderError(e);
    }
  };

  module.hot.accept(
    ['./components/Routes'],
    () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        render();
      });
    }
  );
}

render();
