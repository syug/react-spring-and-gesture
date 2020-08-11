import React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import styled from "styled-components";

import { useDrag } from "react-use-gesture";

const App = () => {
  const props = useSpring({ to: { x: 50 }, from: { x: -100, y: 50 } });
  const [{ x, y, scale }, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const maxX = 30;
  const maxY = 30;
  const bind = useDrag(
    ({ down, movement: [mx, my], direction: [xDir], velocity }) => {
      const triggerToGo = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      const tx = (mx > maxX) ? maxX : mx;
      const ty = (my > maxY) ? maxY : my;
      const x = down ? tx : triggerToGo && dir < 0 ? dir * 500 : 0;
      const y = down ? ty : 0;
      const scale = down ? 1.01 : 1;
      set({ x, y, scale });
    }
  );

  return (
    <div>
      {/* <AnimatedPanel {...bind()} style={{ ...props, x, y, scale }}> */}
      <AnimatedPanel
        {...bind()}
        style={{
          ...props,
          scale,
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        {/* <button>click</button> */}
      </AnimatedPanel>
    </div>
  );
}

const Panel = styled.div`
  font-family: sans-serif "Noto Sans";
  position: absolute;
  padding: 1em;
  background: #fff;
  width: 300px;
  height: 200px;
  box-shadow: 0px 0px 2em -0.5em rgba(0, 0, 0, 0.4);
  border-radius: 1em;
  transform-origin: center;
  transform: translateY(50px);
`;
const AnimatedPanel = animated(Panel);

export default App;