import { useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const originalPositions = [
  { x: 0, y: 28, x1: 300, y1: 118 },
  { x: 200, y: 148, x1: 310, y1: 148 },
  { x: 85, y: 263, x1: 300, y1: 173 },

  { x: 660, y: 30, x1: 508, y1: 123 },
  { x: 645, y: 148, x1: 490, y1: 150 },
  { x: 765, y: 263, x1: 480, y1: 175 },
];

const CanvasComponent = () => {
  const [positions, setPositions] = useState(originalPositions);

  const calculateNewPositions = (changeWidth) => {
    const updatedPositions = originalPositions.map((item, index) => ({
      ...item,
      x: index < 3 ? item.x + changeWidth : item.x - changeWidth,
    }));
    setPositions(updatedPositions);
  };

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1440
        ? calculateNewPositions((1440 - window.innerWidth) / 2)
        : setPositions(originalPositions);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Stage
      width={800}
      height={400}
      style={{
        padding: "43px 0px",
      }}
      className="absoluteCenter"
    >
      <Layer>
        {positions.map((item, index) => (
          <Line
            key={index}
            points={[item.x, item.y, item.x1, item.y1]}
            stroke="#686868"
            strokeWidth={2}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasComponent;
