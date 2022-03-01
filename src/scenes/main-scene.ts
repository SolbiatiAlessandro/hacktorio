import { EdgeBuilder } from "../builders/edge-builder";
import { NodeBuilder } from "../builders/node-builder";
import { Graph } from "../graph/graph";

export class MainScene extends Phaser.Scene {
  graph: Graph = Graph.getInstance();

  constructor() {
    super({ key: "MainScene" });
  }

  create(): void {
    this.createGraph();
    this.input.on(
      "drag",
      function (pointer: any, gameObject: any, x: number, y: number) {
        gameObject.onDrag(x, y);
      }
    );
  }

  createGraph() {
    const nodeBuilder = new NodeBuilder(this);
    const node1 = nodeBuilder.build(300, 100);
    const node2 = nodeBuilder.build(500, 200);
    const node3 = nodeBuilder.build(700, 500);
    const node4 = nodeBuilder.build(800, 300);

    const edgeBuilder = new EdgeBuilder(this);
    edgeBuilder.build(node1, node2);
    edgeBuilder.build(node2, node3);
    edgeBuilder.build(node2, node4);
  }

  update(): void {
    this.graph.update();
  }
}
