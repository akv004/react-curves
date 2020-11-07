import React, { Fragment, useRef, useState } from "react";

export const Path = (props) => {
  const { viewBoxWidth, viewBoxHeight } = props;
  const [startPoint, setStartPoint] = useState({ x: 10, y: 10 });
  const [controlPoint, setControlPoint] = useState({ x: 190, y: 100 });
  const [endPoint, setPoint] = useState({ x: 10, y: 190 });
  const [draggingPointId, setDraggingPointId] = useState(null);

  const handleMouseDown = (pointId) => {
    setDraggingPointId(pointId);
  };
  const handleMouseUp = (pointId) => {
    setDraggingPointId(null);
  };
  const handleMouseMove = (pointId) => {
    if (!draggingPointId) {
      return;
    }
    //const svgRect = node.getBoundingClientRect();
  };

  const ConnectingLine = ({ from, to }) => (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="rgb(200, 200, 200)"
      strokeDasharray="1,1"
      strokeWidth={1}
    />
  );

  const Curve = ({ instructions }) => (
    <path
      d={instructions}
      fill="none"
      stroke="rgb(213, 0, 0)"
      strokeWidth={2}
    />
  );

  const LargeHandle = ({ coordinates, onMouseDown }) => (
    <ellipse
      cx={coordinates.x}
      cy={coordinates.y}
      rx={8}
      ry={8}
      fill="rgb(0, 0, 137)"
      onMouseDown={onMouseDown}
      style={{ cursor: "-webkit-grab" }}
    />
  );

  const SmallHandle = ({ coordinates, onMouseDown }) => (
    <ellipse
      cx={coordinates.x}
      cy={coordinates.y}
      rx={8}
      ry={8}
      fill="transparent"
      stroke="rgb(244, 0, 137)"
      strokeWidth={2}
      onMouseDown={onMouseDown}
      style={{ cursor: "-webkit-grab" }}
    />
  );

  // As we've seen before, the quadratic Bézier curve
  // involves moving to the starting point, and then
  // specifying the control and end points with `Q`
  const instructions = `
      M ${startPoint.x},${startPoint.y}
      Q ${controlPoint.x},${controlPoint.y}
        ${endPoint.x},${endPoint.y}
    `;

  return (
    <svg
      ref={(node) => (node = node)}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={(ev) => handleMouseMove(ev)}
      onMouseUp={() => handleMouseUp()}
      onMouseLeave={() => handleMouseUp()}
      style={{
        overflow: "visible",
        width: "100%",
        border: "1px solid"
      }}
    >
      <ConnectingLine from={startPoint} to={controlPoint} />
      <ConnectingLine from={controlPoint} to={endPoint} />

      <Curve instructions={instructions} />

      <LargeHandle
        coordinates={startPoint}
        onMouseDown={() => handleMouseDown("startPoint")}
      />

      <LargeHandle
        coordinates={endPoint}
        onMouseDown={() => handleMouseDown("endPoint")}
      />

      <SmallHandle
        coordinates={controlPoint}
        onMouseDown={() => handleMouseDown("controlPoint")}
      />
    </svg>
  );
};
