import {Node} from "../graph/node"
import {Edge} from "../graph/edge"

export interface GameObjectOnGraph {
	parentGraphElement: Node | Edge,
	update: () => void
}

export interface GeometryOnGraph {
	parentGraphElement: Node | Edge,
	update: () => void
}
