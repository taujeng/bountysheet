import React from 'react';

// src: https://codeburst.io/simple-data-visualization-in-react-learn-how-to-build-a-progress-meter-c4041af4c77a

const Meter = (props) => {
  let {
    percent = 0, // number: 0 - 1, inclusive. Fill %
    width = 400, // the width of our meter
    height = 30, // the height of our meter
    rounded = true, // if true, use rounded corners
    color = '#0078bc', // the fill color
    animate = false, // if true, animate
    label = null, // a label for accessibility
  } = props;

  const r = rounded ? Math.ceil(height / 2) : 0;
  const w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
  const style = animate ? { transition: 'width 500ms, fill 250ms' } : null;
  return (
    <svg width={width} height={height} aria-label={label}>
      <rect width={width} height={height} fill="#ccc" rx={r} ry={r} />
      <rect
        width={w}
        height={height}
        fill={color}
        rx={r}
        ry={r}
        style={style}
      />
    </svg>
  );
};

export default Meter;
