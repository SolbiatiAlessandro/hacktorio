import { EdgeBuilder } from "../builders/edge-builder";
import { NodeBuilder } from "../builders/node-builder";
import { Graph } from "../graph/graph";
import { GraphSelection } from "../graph/graph-selection";
import { Edge } from "../graph/graphobjects/edge";
import { Node } from "../graph/graphobjects/node";
import { Events } from "../events";

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
    this.input.on(
      "pointerdown",
      function (
        pointer: any,
        currentlyOver: Array<Phaser.GameObjects.GameObject>
      ) {
        if (currentlyOver.length == 0) {
					GraphSelection.emptySelection();
        }
      }.bind(this)
    );
  }

  createGraph() {
    const nodeBuilder = new NodeBuilder(this);
    const node1 = nodeBuilder.build(100, 50);
    const node2 = nodeBuilder.build(300, 150);
    const node3 = nodeBuilder.build(500, 300);
    const node4 = nodeBuilder.build(600, 200);
    const node5 = nodeBuilder.build(550, 450);
    const node6 = nodeBuilder.build(900, 400);
    const node7 = nodeBuilder.build(850, 550);

    const edgeBuilder = new EdgeBuilder(this);
    edgeBuilder.build(node1, node2);
    edgeBuilder.build(node2, node4);
    edgeBuilder.build(node4, node5);
    edgeBuilder.build(node2, node5);
    edgeBuilder.build(node4, node6);
    edgeBuilder.build(node5, node7);
  }

  update(): void {
    this.graph.update();
  }
}
