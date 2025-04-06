export class Visualizer {
    constructor(canvasId, width = 800, height = 600) {
      this.canvas = document.getElementById(canvasId);
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext("2d");
      this.width = width;
      this.height = height;
    }
  
    createCircle(x, y, radius = 25, color = "#4CAF50", text = "") {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
  
      if (text) {
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, x, y);
      }
    }
  
    createLine(x1, y1, x2, y2, color = "#333", lineWidth = 2) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  
    resizeCanvas(newWidth, newHeight) {
      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      this.width = newWidth;
      this.height = newHeight;
    }
}
  