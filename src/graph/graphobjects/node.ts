import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../../interfaces/graph.interface";

import { Graph } from "../../graph/graph";
import { GraphSelection } from "../../graph/graph-selection";

import { GraphObject } from "../../graph/graphobjects/graph-object";

import { Event, GraphEvent, Events } from "../../events";

export class Node extends GraphObject {
	graphSelection: GraphSelection = Graph.getInstance().graphSelection;

  constructor(
    public name: string,
    public gameObjects: Record<string, GameObjectOnGraph>,
    public geometries: Record<string, GeometryOnGraph>
  ) {
    super();
  }

	select(){
		this.graphSelection.selectNode(this);
	}

	deselect(){
		this.graphSelection.deselectNode(this);
	}

	private readonly EVENTS: Array<Event> = 
		[Events.NODE_SELECTED, Events.NODE_DESELECTED];

	on(event: GraphEvent){
		if (this.EVENTS.includes(event)){
			this.broadcastToGameObjects(event);
		}
	}
}
