import React from 'react'

export default props => {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.title}
    </a>
  );
};
