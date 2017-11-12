var Linewave = function(amp, vel, length, xpos, ypos, radius, noiseX, r, g, b) {
  this.xspacing = 2; // How far apart should each horizontal position be spaced
  this.w; // Width of entire wave
  this.maxwaves = 1; // total # of waves to add together

  this.theta = 1;
  this.amplitude = []; // Height of wave
  this.dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
  this.yvalues = []; // Using an array to store height values for the wave (not entirely necessary)
  this.waveLength = length;

  this.stepx = int((random(3)) - 1);
  this.stepy = int((random(3)) - 1);

  this.xoff = 0;
  this.xincrement = noiseX;
  this.lifespan = 255.0;

  this.init = function() {
    this.w = 0;
    for (var i = 0; i < this.maxwaves; i++) {
      this.amplitude[i] = amp;
      this.period1 = 500; // How many pixels before the wave repeats
      this.dx[i] = (TWO_PI / this.period1) * this.xspacing;
    }
    this.yvalues = [];
  }

  this.calcWave = function() {
    // Increment theta
    this.theta += vel;

    // Set all height values to zero
    for (var i = 0; i < this.w / this.xspacing; i++) {
      this.yvalues[i] = 0;
    }

    // Accumulate wave height values
    for (var j = 0; j < this.maxwaves; j++) {
      var x = this.theta;
      for (var i = 0; i < this.yvalues.length; i++) {
        // Every other wave is cosine instead of sine
        if (j % 2 === 0) this.yvalues[i] += sin(x) * this.amplitude[j];
        else this.yvalues[i] += cos(x) * this.amplitude[j];
        x += this.dx[j];
      }
    }
  }

  this.renderWave = function() {
    var n = noise(this.xoff);
    var xx = map(n, 0, 1, 0, width / 2);
    var yy = map(n, 0, 1, 0, height / 2);
    this.xoff += this.xincrement / 7500;

    stroke(255);
    noFill();

      ellipseMode(CENTER);
      for (var x = 0; x < this.yvalues.length; x++) {
        point(x * this.xspacing + xpos + xx, this.yvalues[x] + ypos + yy);
        fill(r, g, b, x * 1.2);
        noStroke();
        ellipse(x * this.xspacing + xpos + xx, this.yvalues[x] + ypos + yy, radius + x / 90, radius + x / 90);
      }

      if (xpos >= width * 7 / 8) {
        this.stepx *= -1;
      } else if (xpos <= width * 7 / 8) {
        this.stepx *= -1;
      }
    }
  }