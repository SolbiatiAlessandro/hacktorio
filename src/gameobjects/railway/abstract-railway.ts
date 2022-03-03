import { BaseRailway } from "../../gameobjects/railway/base-railway";
import { Event, Events } from "../../events";

import { callAfterSuperCall } from "../../decorators";

export abstract class RailwayWithChangingDepth extends BaseRailway {
  abstract readonly depth_when_selected: number;
  depth_when_deseleted: number = this.depth;

  @callAfterSuperCall
  onEvent(event: Event) {
    if (event == Events.EDGE_SELECTED) {
      this.depth = this.depth_when_selected;
    }
    if (event == Events.EDGE_DESELECTED) {
      this.depth = this.depth_when_deseleted;
    }
  }
}

export abstract class RailwayWithChangingOffsetAndDepth extends RailwayWithChangingDepth {
  private readonly OFFSET_DOWN = -2;
  private readonly OFFSET_UP = -10;
  yOffset: number = this.OFFSET_DOWN;

  @callAfterSuperCall
  onEvent(event: Event) {
    if (event == Events.EDGE_SELECTED) {
      this.yOffset = this.OFFSET_UP;
    }
    if (event == Events.EDGE_DESELECTED) {
      this.yOffset = this.OFFSET_DOWN;
    }
  }
}
