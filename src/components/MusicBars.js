import React from 'react';
import './MusicBars.css';

export default props => {
  const className = props.animated ? 'animated' : '';
  return (
    <div id="bars" className={className} style={props.style}>
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </div>
  );
};
