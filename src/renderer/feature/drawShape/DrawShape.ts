import Point from 'renderer/components/stimuli/point/Point';

export default class DrawShape {
  constructor(private canvas: HTMLCanvasElement) {}

  getWidth() {
    return this.canvas.width;
  }

  getHeight() {
    return this.canvas.height;
  }

  drawLine(begin: Point, end: Point) {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.moveTo(begin.getX(), begin.getY());
    ctx.lineTo(end.getX(), end.getY());
    ctx.closePath();
    ctx.stroke();
  }

  drawRectangle(begin: Point, end: Point) {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.rect(begin.getX(), begin.getY(), end.getX(), end.getY());
    ctx.closePath();
    ctx.stroke();
  }

  fillRectangle(begin: Point, end: Point) {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.fillRect(begin.getX(), begin.getY(), end.getX(), end.getY());
    ctx.closePath();
    ctx.stroke();
  }

  clearAll() {
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
