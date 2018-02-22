import React from 'react';

export default class Route extends React.Component {
  render() {
    return (
      <div>{this.props.route.route_id}</div>
    );
  }
}