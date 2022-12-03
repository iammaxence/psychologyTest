import { useEffect, useState } from 'react';
import DrawShape from 'renderer/feature/drawShape/drawShape';
import useWindowDimensions from 'renderer/feature/windowDimensions/WindowDimentions';
import Point from '../stimuli/point/Point';

interface PropsCross {
  size: number;
}

const Cross = ({ size }: PropsCross) => {
  const { width, height } = useWindowDimensions();
  const [drawShape, setDrawShape] = useState<DrawShape>();

  useEffect(() => {
    const canvas = document.getElementById('cross') as HTMLCanvasElement;
    setDrawShape(new DrawShape(canvas));
  }, []);

  useEffect(() => {
    console.log('------UPDATE COMPONENT-----');

    drawCross();
  }, [width, height, drawShape]);

  const drawCross = () => {
    if (drawShape) {
      drawShape.clearAll();
      drawShape.drawLine(
        new Point(drawShape.getWidth() / 2 - size, drawShape.getHeight() / 2),
        new Point(drawShape.getWidth() / 2 + size, drawShape.getHeight() / 2)
      );

      drawShape.drawLine(
        new Point(drawShape.getWidth() / 2, drawShape.getHeight() / 2 - size),
        new Point(drawShape.getWidth() / 2, drawShape.getHeight() / 2 + size)
      );
    }
  };

  return (
    <div>
      <canvas id="cross" width={width} height={height}></canvas>
    </div>
  );
};

export default Cross;