import React from "react";
import { Link, navigate } from "gatsby";
import { useTrail, animated } from "react-spring";

export default function MainMenu({ items }) {
  const trail = useTrail(items.length, {
    config: { mass: 1.1, tension: 400, friction: 24 },
    from: { opacity: 0, y: 75 },
    to: { opacity: 1, y: 0 },
    opacity: 1,
  });

  return (
    <>
      {trail.map(({ y, opacity }, index) => (
        <animated.div
          className="App-box"
          onClick={() => navigate(`/${items[index]}`)}
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
