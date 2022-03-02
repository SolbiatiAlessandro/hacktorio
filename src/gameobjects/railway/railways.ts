import { AbstractRailway } from "../../gameobjects/railway/abstract-railway";

import { Events } from "../../events";
import { Constants } from "../../constants";

class RenderedRailway extends AbstractRailway {
  private readonly OFFSET_DOWN = -2;
  private readonly OFFSET_UP = -10;
  yOffset: number = this.OFFSET_DOWN;

  onEvent(event: number) {
    if (event == Events.RAILWAY_SELECTED) {
      this.yOffset = this.OFFSET_UP;
    }
    if (event == Events.RAILWAY_DESELECTED) {
      this.yOffset = this.OFFSET_DOWN;
    }
  }
}

export class TopRailway extends RenderedRailway {
  image: string = "rail-top";
  depth: number = 2;

  onEvent(event: number) {
    super.onEvent(event);
    if (event == Events.RAILWAY_SELECTED) {
      this.depth = 4;
    }
    if (event == Events.RAILWAY_DESELECTED) {
      this.depth = 2;
    }
  }
}

export class BottomRailway extends RenderedRailway {
  image: string = "rail-bottom";
  depth: number = 1;
  tint: number = Constants.randomColor();

  onEvent(event: number) {
    super.onEvent(event);
    if (event == Events.RAILWAY_SELECTED) {
      this.depth = 3;
    }
    if (event == Events.RAILWAY_DESELECTED) {
      this.depth = 1;
    }
  }
}

export class ShadowRailway extends AbstractRailway {
  image: string = "rail-bottom";
  depth: number = 0;
  tint: number = Constants.SHADOW;

  onEvent(event: number) {
    if (event == Events.RAILWAY_SELECTED) {
      this.depth = 2;
    }
    if (event == Events.RAILWAY_DESELECTED) {
      this.depth = 0;
    }
  }
}
