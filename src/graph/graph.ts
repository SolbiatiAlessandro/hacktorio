import * as graphology from "graphology";

import { Node }  from "../graph/node";

// @ts-ignore
export class Graph extends graphology.Graph{
	private static instance: Graph;

	private readonly NODE: string = "_node";
	private readonly EDGE: string = "_edge";

	private constructor(){
		super();
	}

	public static getInstance(): Graph {
		if (!Graph.instance){
			Graph.instance = new Graph();
		}
		return Graph.instance;
	}

	addNode(node: Node): string {
		let attr: any = {};
		attr[this.NODE] = node;
		super.addNode(node.name, attr);
		return node.name;
	}
}


