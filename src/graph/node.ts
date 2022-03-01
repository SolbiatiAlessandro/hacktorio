import {GameObjectOnGraph, GeometryOnGraph} from '../interfaces/graph.interface'

export class Node{
	constructor(
		public name: string,
		public gameObjects: Record<string, GameObjectOnGraph>,
		public geometries: Record<string, GeometryOnGraph>
	){}
}
