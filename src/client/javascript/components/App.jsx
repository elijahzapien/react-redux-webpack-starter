import React from 'react';
import PropTypes from 'prop-types';

import '../../sass/styles.scss';

const App = props => {
  return (
    <div className='app'>
      <main>
        {props.children}
      </main>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
