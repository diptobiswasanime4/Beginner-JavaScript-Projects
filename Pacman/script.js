const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  constructor({ position, color = "blue" }) {
    this.position = position;
    this.width = 36;
    this.height = 36;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [
  new Boundary({
    position: {
      x: 4,
      y: 4,
    },
    color: "red",
  }),
];
for (i = 0; i < 8; i++) {
  for (j = 0; j < 8; j++) {
    boundaries.forEach((boundary) => {
      boundary.draw();
      boundary.position.x += 40;
    });
  }
  boundaries.forEach((boundary) => (boundary.position.x = 4));

  boundaries.forEach((boundary) => {
    boundary.position.y += 40;
    boundary.draw();
  });
}
