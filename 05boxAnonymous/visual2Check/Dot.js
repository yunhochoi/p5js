function Dot(tempX, tempY, tempR) { // position must be here
  /* Q1: why ellipse cannot be drawn here? */
  this.x = tempX;
  this.y = tempY;
  this.r = tempR;
  this.show = function() { /* why position cannot be here? */
    noFill();
    ellipse(this.x, this.y, r, r);
  }
  this.showRandom = function() {
    ellipse(random(100), random(100), 3, 3)
  }
  this.moveSin = function() {
    this.x = PX[0] + sin(a1) * distance;
    this.y = pY;
    a1 = a1 + sp;
  }
  this.moveCos = function() {
    this.y = pY + cos(a2) * distance;
    a2 = a2 + sp;
  }
  this.moveSinCos = function() {
    this.y = pY + cos(a4) * distance;
    this.x = PX[2] + sin(a4) * distance;
    a4 = a4 + sp;
  }
  this.moveSinTan = function() {
    this.y = pY + tan(a3) * distance;
    this.x = PX[2] + sin(a3) * distance;
    a3 = a3 + spt;
  }
  this.move = function(sX, sY) {
    
    this.x = this.x + sX;
    this.y = this.y + sY;
  }
  this.moveCosTan = function() {
    this.y = pY + cos(a4) * distance;
    this.x = pY + tan(a4) * distance;
    a4 = a4 + spt;
  }
  this.moveSinSin = function() {
    this.y = pY + sin(a5) * distance;
    this.x = PX[3] + sin(a5) * distance;
    a5 = a5 + sp;
  }
  this.moveCosCos = function() {
    this.y = pY + cos(a6) * distance * -1;
    this.x = PX[4] + cos(a6) * distance;
    a6 = a6 + sp;
  }
  this.showline = function() {
    line(this.x, this.y, this.x, this.y);
  }
}