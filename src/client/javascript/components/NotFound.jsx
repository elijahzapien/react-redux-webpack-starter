import React from 'react';
import PropTypes from 'prop-types';

const NotFound = props => {
  return (
    <section className='section section--not-found'>
      <h1>404</h1>
      <p><code>{props.location.pathname}</code> not found.</p>
    </section>
  );
};

NotFound.propTypes = {
  location: PropTypes.object.isRequired
};

export default NotFound; 