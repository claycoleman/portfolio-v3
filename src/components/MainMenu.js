import React, { Component, useState } from "react";
import { Link } from "gatsby";
import { Redirect } from "@reach/router";
import { useTrail, animated, config } from "react-spring";

export default function MainMenu({ items }) {
  const [redirect, setRedirect] = useState(null);

  const trail = useTrail(items.length, {
    config: config.wobbly,
    from: { opacity: 0, y: 75 },
    to: { opacity: 1, y: 0 },
    opacity: 1,
  });

  let shouldRedirect = "/" + redirect !== window.location.pathname;
  if (redirect && shouldRedirect) {
    return <Redirect to={`/${redirect}`} push />;
  }

  return (
    <>
      {trail.map(({ y, opacity }, index) => (
        <animated.div
          className="App-box"
          style={{
            opacity,
            transform: y.interpolate((y) => `translate3d(0,${y}%,0)`),
          }}
        >
          <Link to={`/${items[index]}`}>{items[index]}</Link>
        </animated.div>
      ))}
    </>
  );
}
