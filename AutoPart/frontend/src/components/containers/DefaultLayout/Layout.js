import React from 'react';

import Header from '../../header';

export default props => (
    <>
      <Header />
      <div className="container">
        {props.children}
      </div>
    </>
  );
