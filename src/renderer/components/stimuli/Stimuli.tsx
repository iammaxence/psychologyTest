import { useEffect, useState } from 'react';
import DrawShape from 'renderer/feature/utils/drawShape/DrawShape';
import useWindowDimensions from 'renderer/feature/utils/windowDimensions/WindowDimentions';
import Point from './point/Point';

interface PropsStimuli {
  id: number;
  size: number;
  middleDivergence: number;
  reverseDiagonal?: boolean;
}

const Stimuli = ({
  id,
  size,
  middleDivergence,
  reverseDiagonal = false,
}: PropsStimuli) => {
  const { width, height } = useWindowDimensions();
  const RECTANGLE_CANVAS_HEIGHT = 19;

  const [drawShape, setDrawShape] = useState<DrawShape>();

  useEffect(() => {
    const canvas = document.getElementById(
      'stimuli_' + id
    ) as HTMLCanvasElement;

    setDrawShape(new DrawShape(canvas));
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [width, height, middleDivergence, drawShape, reverseDiagonal]);

  function drawMiddleLines(drawShape: DrawShape) {
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
  }

  function drawDiagonalRectangles(drawShape: DrawShape) {
    if (!reverseDiagonal) {
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
    } else {
      // DOWN LEFT FILL RECTANGLE
      drawShape.fillRectangle(
        new Point(rectangleCenterX(drawShape.getWidth(), size), height / 2),
        new Point(size / 2 + middleDivergence, RECTANGLE_CANVAS_HEIGHT / 2)
      );
      // UP RIGHT FILL RECTANGLE
      drawShape.fillRectangle(
        new Point(
          width / 2 + middleDivergence,
          height / 2 - RECTANGLE_CANVAS_HEIGHT / 2
        ),
        new Point(size / 2 - middleDivergence, RECTANGLE_CANVAS_HEIGHT / 2)
      );
    }
  }

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

      drawMiddleLines(drawShape);
      drawDiagonalRectangles(drawShape);
      // ctx.rect(size, 0, width - size * 2, RECTANGLE_CANVAS_HEIGHT);
    }
  };

  const rectangleCenterX = (canvasWidth: number, size: number) =>
    canvasWidth / 2 - size / 2;

  return <canvas id={'stimuli_' + id} width={width} height={height}></canvas>;
};

export default Stimuli;
