import { GraphObject } from "../../graph/graphobjects/graph-object";
import { GraphSelection } from "../../graph/graph-selection";
import { Graph } from "../../graph/graph";

import { Event, GraphEvent, Events } from "../../events";

export abstract class GraphSelectionObject extends GraphObject {
  abstract readonly SELECTION_EVENTS: Array<Event>;

  select() {
    GraphSelection.select(this);
  }

  deselect() {
    GraphSelection.deselect(this);
  }

  on(event: GraphEvent) {
    if (this.SELECTION_EVENTS.includes(event)) {
      this.broadcastToGameObjects(event);
    }
  }
}
