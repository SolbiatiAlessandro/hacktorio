import {GraphBuilder} from "../builders/graph-builder"

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  create(): void {
	  const builder = new GraphBuilder();
	  const node1 = builder.newNode("1", 300, 400);
	  const node2 = builder.newNode("2", 600, 600);
	  builder.newEdge(node1, node2);
  }

  update(): void {
  }
}
