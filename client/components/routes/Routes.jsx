import React from 'react';

import RouteGroup from './RouteGroup.jsx';

export default class Routes extends React.Component {

  componentDidMount() {
    this.props.getRoutesAndService();
  }

  render() {
    return (
      <div className="trainline_container">
        {this.props.service.map(({ name, status }, idx) => 
          <RouteGroup key={idx} name={name} status={status} />)}
      </div>
    );
  }
}