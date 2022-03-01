import { GeometryOnGraph } from "../interfaces/graph.interface";

export class Point extends Phaser.Math.Vector2 implements GeometryOnGraph {
  graphParentElement: any;
  update() {}

  vector(): [number, number] {
    return [this.x, this.y];
  }

  reflectBy(x: number, y: number): [number, number] {
    return [this.x - (x - this.x), this.y - (y - this.y)];
  }

	setPosition(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}
