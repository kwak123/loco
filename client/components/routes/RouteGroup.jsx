import React from 'react';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';

import RoutesSubGroup from './RoutesSubGroup.jsx';

export default class RouteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
    this._toggleExpand = this._toggleExpand.bind(this);
  }

  _toggleExpand() {
    this.setState({ expand: !this.state.expand });
  }

  render() {
    return (
      <div className="routegroup__container">
        <div className="routegroup__row">
          <p className="routegroup__name">{this.props.name}</p>
          <p className="routegroup__status--text">{this.props.status}</p>
          <p className={`routegroup__status--icon ${this.props.status === 'GOOD SERVICE' ? 'good' : 'problems'}`}></p>
          <div onClick={this._toggleExpand} className={'routegroup__expand'}>
            <MdArrowDropDown size={32} />
          </div>
        </div>
        {this.state.expand ? 
          <RoutesSubGroup
            organized={this.props.organized} /> : null}
        <div className="routegroup__divider"></div>
      </div>
    );
  }
}

/* <a href={`/${props.redir}/${props.name}`}><MdArrowForward /></a>
{/* <Link className="trainline_button" to={`/${props.redir}/${props.name}`}>
  Details
</Link>
*/