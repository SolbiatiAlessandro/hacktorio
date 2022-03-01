import {Node} from '../graph/node';
import {GameObjectOnGraph, GeometryOnGraph} from '../interfaces/graph.interface'

export class Edge{
	public name: string;
	constructor(
		public firstNode: Node,
		public secondNode: Node,
		gameObjects: Record<string, GameObjectOnGraph>,
		geometries: Record<string, GeometryOnGraph>
	){
		this.name = firstNode.name + '-' + secondNode.name;
	}
}
