import React from 'react';

import RouteGroup from './RouteGroup.jsx';

import styles from './styles/Routes.css';

export default class Routes extends React.Component {

  componentDidMount() {
    this.props.getRoutesAndService();
  }

  render() {
    return (
      <div className="routes__container">
        {this.props.service.map(({ name, status }, idx) => 
          <RouteGroup
            key={idx}
            name={name}
            status={status}
            organized={this.props.organized[name]} />)}
      </div>
    );
  }
}