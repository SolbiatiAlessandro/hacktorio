import { AbstractRailway } from "../../gameobjects/railway/abstract-railway";

import { Event, Events } from "../../events";
import { Constants } from "../../constants";
import { GameObjectOnGraph } from "../../interfaces/graph.interface";

class RenderedRailway extends AbstractRailway {
  private readonly OFFSET_DOWN = -2;
  private readonly OFFSET_UP = -10;
  yOffset: number = this.OFFSET_DOWN;

  onEvent(event: Event) {
    if (event == Events.EDGE_SELECTED) {
      this.yOffset = this.OFFSET_UP;
    }
    if (event == Events.EDGE_DESELECTED) {
      this.yOffset = this.OFFSET_DOWN;
    }
  }
}

export class TopRailway extends RenderedRailway implements GameObjectOnGraph {
  image: string = "rail-top";
  depth: number = 2;

  onEvent(event: Event) {
    super.onEvent(event);
    if (event.name == Events.EDGE_SELECTED.name) {
      this.depth = 4;
    }
    if (event == Events.EDGE_DESELECTED) {
      this.depth = 2;
    }
  }
}

export class BottomRailway
  extends RenderedRailway
  implements GameObjectOnGraph
{
  image: string = "rail-bottom";
  depth: number = 1;
  tint: number = Constants.randomColor();

  onEvent(event: Event) {
    super.onEvent(event);
    if (event == Events.EDGE_SELECTED) {
      this.depth = 3;
    }
    if (event == Events.EDGE_DESELECTED) {
      this.depth = 1;
    }
  }
}

export class ShadowRailway
  extends AbstractRailway
  implements GameObjectOnGraph
{
  image: string = "rail-bottom";
  depth: number = 0;
  tint: number = Constants.SHADOW;

  onEvent(event: Event) {
    if (event == Events.EDGE_SELECTED) {
      this.depth = 2;
    }
    if (event == Events.EDGE_DESELECTED) {
      this.depth = 0;
    }
  }
}
