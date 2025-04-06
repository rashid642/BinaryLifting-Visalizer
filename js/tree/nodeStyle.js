export class NodeStyle {
    constructor(x = 0, y = 0, color = '#D3D3D3') {
      this.x = x;
      this.y = y;
      this.color = color;
    }
  
    updateColor(newColor) {
      this.color = newColor;
    }
  
    updateXCoordinate(newX) {
      this.x = newX;
    }
  
    updateYCoordinate(newY) {
      this.y = newY;
    }
  
    getPosition() {
      return { x: this.x, y: this.y };
    }
  }
  