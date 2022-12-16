import { useEffect, useState } from 'react';
import DrawShape from 'renderer/feature/drawShape/DrawShape';
import useWindowDimensions from 'renderer/feature/windowDimensions/WindowDimentions';
import Point from './point/Point';
import './Stimuli.scss';

interface PropsStimuli {
  id: number;
  size: number;
  middleDivergence: number;
}

const Stimuli = ({ id, size, middleDivergence }: PropsStimuli) => {
  const { width, height } = useWindowDimensions();
  const RECTANGLE_CANVAS_HEIGHT = 40;

  const [drawShape, setDrawShape] = useState<DrawShape>();

  useEffect(() => {
    const canvas = document.getElementById(
      'stimuli_' + id
    ) as HTMLCanvasElement;

    setDrawShape(new DrawShape(canvas));
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [width, height, middleDivergence, drawShape]);

  const drawCanvas = () => {
    if (drawShape) {
      drawShape.clearAll();

      drawShape.drawRectangle(
        new Point(
          rectangleCenterX(drawShape.getWidth(), size),
          height / 2 - RECTANGLE_CANVAS_HEIGHT / 2
        ),
        new Point(size, RECTANGLE_CANVAS_HEIGHT)
      );

      // Vertical Middle line
      drawShape.drawLine(
        new Point(
          width / 2 + middleDivergence,
          height / 2 - RECTANGLE_CANVAS_HEIGHT / 2
        ),
        new Point(
          width / 2 + middleDivergence,
          height / 2 + RECTANGLE_CANVAS_HEIGHT / 2
        )
      );

      // Horizontal Middle line
      drawShape.drawLine(
        new Point(rectangleCenterX(drawShape.getWidth(), size), height / 2),
        new Point(
          drawShape.getWidth() - rectangleCenterX(drawShape.getWidth(), size),
          height / 2
        )
      );

      // UP LEFT FILL RECTANGLE
      drawShape.fillRectangle(
        new Point(
          rectangleCenterX(drawShape.getWidth(), size),
          height / 2 - RECTANGLE_CANVAS_HEIGHT / 2
        ),
        new Point(size / 2 + middleDivergence, RECTANGLE_CANVAS_HEIGHT / 2)
      );

      // DOWN RIGHT FILL RECTANGLE
      drawShape.fillRectangle(
        new Point(width / 2 + middleDivergence, height / 2),
        new Point(size / 2 - middleDivergence, RECTANGLE_CANVAS_HEIGHT / 2)
      );
      // ctx.rect(size, 0, width - size * 2, RECTANGLE_CANVAS_HEIGHT);
    }
  };

  const rectangleCenterX = (canvasWidth: number, size: number) =>
    canvasWidth / 2 - size / 2;

  return (
    <div className="stimuli">
      <canvas id={'stimuli_' + id} width={width} height={height}></canvas>
    </div>
  );
};

export default Stimuli;
