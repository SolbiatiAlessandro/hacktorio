import { Node } from "../graph/node";
import { Edge } from "../graph/edge";
import { Event, GraphEvent, Events } from "../events";

class GraphSelectionState{
	selectedEdge: Edge = null;

	get selectedNodes(): Array<Node>{
		return this.selectedEdge.neighbouringNodes();
	}

	emptySelection(){
		if( this.selectedEdge ) this.selectedEdge.deselect();
	}
}

// GraphSelectionObjects (Node | Edge) 
// 1) alert GraphSelection that they want to be selected
// 2) listen GraphEvents (emitted by GraphSelection) to react 
// when they have been successfully selected (thorugh receving a GraphEvent)
export class GraphSelection extends GraphSelectionState {

	static emitGraphEvent(to: Node | Edge, event: GraphEvent){
		to.on(event);
	}

	deselectEdge(edge: Edge){
		this.selectedEdge = null;

		GraphSelection.emitGraphEvent(edge, Events.EDGE_DESELECTED);

		edge.deselectNeighbourNodes();
	}

  selectEdge(edge: Edge) {
		if(this.selectedEdge) this.deselectEdge(this.selectedEdge)
		this.selectedEdge = edge;

		GraphSelection.emitGraphEvent(edge, Events.EDGE_SELECTED);

		edge.selectNeighbourNodes();
  }

	selectNode(node: Node){
		GraphSelection.emitGraphEvent(node, Events.NODE_SELECTED);
	}

	deselectNode(node: Node){
		GraphSelection.emitGraphEvent(node, Events.NODE_DESELECTED);
	}
}
