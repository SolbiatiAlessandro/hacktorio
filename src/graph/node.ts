import {GameObjectOnGraph, GeometryOnGraph} from '../interfaces/graph.interface'

export class Node{
	constructor(
		public name: string,
		gameObjects: Array<GameObjectOnGraph>,
		geometries: Array<GeometryOnGraph>
	){}
}
