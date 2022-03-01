import { GeometryOnGraph } from "../interfaces/graph.interface";

export class Point extends Phaser.Math.Vector2 implements GeometryOnGraph {
  graphParentElement: any;
  update() {}

  vector(): [number, number] {
    return [this.x, this.y];
  }
}
