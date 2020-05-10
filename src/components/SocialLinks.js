import React from 'react';
import SocialLink from './SocialLink';

export default props => {
  return (
    <div id="social">
      {props.links.map(socialLink => (
        <SocialLink href={socialLink.href} title={socialLink.title} key={socialLink.title} />
      ))}
    </div>
  );
};
