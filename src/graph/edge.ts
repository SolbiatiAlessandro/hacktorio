import { Node } from "../graph/node";
import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../interfaces/graph.interface";
import { Graph, GraphObject } from "../graph/graph";
import { GraphEvent, Event, Events } from "../events";
import { GraphSelection } from "../graph/graph-selection";

export class Edge extends GraphObject {
  public name: string;
	graphSelection: GraphSelection = Graph.getInstance().graphSelection;

  constructor(
    public firstNode: Node,
    public secondNode: Node,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    super();
    this.name = firstNode.name + "-" + secondNode.name;
  }

	neighbouringNodes(): [Node, Node]{
		return [this.firstNode, this.secondNode];
	}

  select() {
    this.graphSelection.selectEdge(this);
  }

	deselect(){
		this.graphSelection.deselectEdge(this);
	}

	private readonly EVENTS: Array<Event> = 
		[Events.EDGE_DESELECTED, Events.EDGE_SELECTED];

	on(event: GraphEvent){
		if (this.EVENTS.includes(event)){
			this.broadcastToGameObjects(event);
		}
	}

	selectNeighbourNodes(){
		this.neighbouringNodes().map((node: Node) => node.select());
	}

	deselectNeighbourNodes(){
		this.neighbouringNodes().map((node: Node) => node.deselect());
	}

  broadcastToNeighbourNodes(event: Event) {
		this.neighbouringNodes().map((node: Node) => node.broadcastToGameObjects(event));
  }

  update() {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.update()
    );
    Object.entries(this.geometries).forEach(([_, geometry]) =>
      geometry.update()
    );
  }
}
