class Scribble {
  static get inputProperties() {
    return [
      '--thickness',
      '--amplitude',
      '--frequency',
      '--color'
    ];
  }

  paint(ctx, size, props) {
    const thickness = props.get('--thickness').value;
    const amplitude = props.get('--amplitude').value;
    const frequency = props.get('--frequency').value;
    ctx.lineWidth = thickness;
    ctx.strokeStyle = props.get('--color');
    ctx.lineJoin = 'round';

    /*ctx.beginPath();
    ctx.moveTo(0, size.height / 2);
    ctx.lineTo(size.width, size.height / 2);
    ctx.stroke();*/

    const middle = size.height / 2;
    const maxDist = (size.height * amplitude) / 2;
    const floatBetween = (min, max) => {
      min = min > max ? max : min;
      max = max < min ? min : max;
      return Math.random() * (max - min) + min;
    }
    const getY = dir => {
      return dir === 'up' ? floatBetween(middle, middle - maxDist) : floatBetween(middle, middle + maxDist);
    }

    ctx.beginPath();
    ctx.moveTo(0, getY('up'));

    let x = 0;
    let direction = 'down';
    while (x < size.width) {
      ctx.lineTo(x + frequency, getY(direction));
      direction = direction === 'down' ? 'up' : 'down';
      x += floatBetween(frequency / 2, frequency);
    }
    ctx.stroke();
  }
}

registerPaint('scribble', Scribble);
