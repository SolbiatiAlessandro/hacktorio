import { Constants } from "../../constants";
import { GameObjectOnGraph } from "../../interfaces/graph.interface";

import {
  RailwayWithChangingDepth,
  RailwayWithChangingOffsetAndDepth,
} from "../../gameobjects/railway/abstract-railway";

export class TopRailway
  extends RailwayWithChangingOffsetAndDepth
  implements GameObjectOnGraph
{
  image: string = "rail-top";
  depth: number = 2;
  readonly depth_when_selected: number = 4;
}

export class BottomRailway
  extends RailwayWithChangingOffsetAndDepth
  implements GameObjectOnGraph
{
  image: string = "rail-bottom";
  depth: number = 1;
  tint: number = Constants.randomColor();
  readonly depth_when_selected: number = 3;
}

export class ShadowRailway
  extends RailwayWithChangingDepth
  implements GameObjectOnGraph
{
  image: string = "rail-bottom";
  depth: number = 0;
  tint: number = Constants.SHADOW;
  readonly depth_when_selected: number = 2;
}
