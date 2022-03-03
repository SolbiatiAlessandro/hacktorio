import { Node } from "../../graph/graphobjects/node";
import { Edge } from "../../graph/graphobjects/edge";
import { Graph } from "../../graph/graph";
import {
  GameObjectOnGraph,
  GeometryOnGraph,
} from "../../interfaces/graph.interface";
import { Event, GraphEvent, Events } from "../../events";

export class GeometriesOnGraphObject{
	geometries: Array<GeometryOnGraph>;

	update(){
		this.geometries.forEach(geometry => geometry.update());
	}

	set parentGraphObject(_parentGraphObject: Node | Edge){
		this.geometries.forEach(geometry => geometry.graphParentElement = _parentGraphObject);
	}
}

export abstract class GraphObject {
  graph = Graph.getInstance();
  public gameObjects: Record<string, GameObjectOnGraph>;
  public geometries: GeometriesOnGraphObject;

  broadcastToGameObjects(event: Event) {
    Object.entries(this.gameObjects).forEach(([_, gameObject]) =>
      gameObject.onEvent(event)
    );
  }

  update() {
		this.geometries.update();
    Object.entries(this.geometries).forEach(([_, geometry]) =>
      geometry.update()
    );
  }
}
