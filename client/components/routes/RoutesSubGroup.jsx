import React from 'react';

import Route from './Route.jsx';

export default class RouteSubGroup extends React.Component {

  render() {
    return (
      <div>
        {this.props.organized.map((route, idx) => 
          <Route key={idx} route={route} />)}
      </div>
    );
  }
}