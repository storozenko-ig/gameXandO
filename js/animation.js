function Animation(draw, timingFunction, duration) {
  this._draw = draw;
  this._tFunc = timingFunction;
  this._duration = duration;
  this._status = false;

  this.start = function () {
    this._status = true;
    this._start = performance.now();
    this._animate();
  };
  this._animate = function () {
    var fract = (performance.now() - this._start) / this._duration;
    if (fract > 1) fract = 1;
    var process = this._tFunc(fract);
    this._draw(process);
    if (this._status && process < 1) {
      requestAnimationFrame(this._animate.bind(this));
    } else {
      return;
    }
  };
  this.stop = function () {
    this._status = false;
  };
}
function tF(fract) {
  return -(Math.cos(Math.PI * fract) - 1) / 2;
}
