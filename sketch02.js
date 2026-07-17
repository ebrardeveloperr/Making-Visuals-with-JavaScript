const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, time }) => {
    const t = time * 0.0000002;
    context.fillStyle = 'OldLace';
    context.fillRect(0, 0, width, height);

    // const degtoRad = (degrees) => {
    //   return degrees / 180 * Math.PI;
    // }

    // const randomRange = (min, max) => {
    //   return Math.random() * (max - min) + min;
    // }

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 20;
    const radius = width * 0.3;



    let x, y;

    for (let i = 0; i < num; i++) {

      const slice = math.degToRad(360 / num);
      const angle = slice * i;


      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);

context.rotate(-angle + time * t);

      const scale = math.mapRange(
        Math.sin(time + i * 0.5)  );

      context.scale(scale, scale);

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle + time * 0.0005);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, random.range(radius * 0.7, radius * 1.3), slice * random.range(0, 5), slice * random.range(0, 5));
      context.stroke();
      context.restore();
    };
  };
};

canvasSketch(sketch, settings);
