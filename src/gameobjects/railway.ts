import { GameObjectOnGraph } from "../interfaces/graph.interface";
import { Edge } from "../graph/edge";
import { EdgeGeometries } from "../builders/edge-builder";
import { CurveForRender } from "../geometry/curve";

import { Events } from "../events";
import { Constants } from "../constants";

import { GameObject } from "../gameobjects/gameobject";
import { Rail } from "../gameobjects/railway/rail";

class GameObjectWithRailwayGeometries
  extends GameObject
  implements GameObjectOnGraph
{
  get curve(): CurveForRender {
    // @ts-ignore
    return this.graphParentElement.geometries[EdgeGeometries.CURVE__RENDER];
  }

  update() {}
}

class Railway
  extends GameObjectWithRailwayGeometries
  implements GameObjectOnGraph
{
  image: string = "no-image";
  tint: number = Constants.PRIMARY_COLOR;
  depth: number = 0;
  rails: Array<Rail> = [];
  yOffset: number = 0;

  pointerdown() {
    this.graphParentElement.broadcastToAllEdges(Events.RAILWAY_DESELECTED);
    this.graphParentElement.broadcastToAllNodes(Events.RAILWAY_DESELECTED);
    this.graphParentElement.broadcastToNeighbourNodes(Events.RAILWAY_SELECTED);
    this.graphParentElement.broadcastToGameObjects(Events.RAILWAY_SELECTED);
  }

  populate() {
    this.curve.pointsWithTangents().forEach(([point, tangent], index) => {
      const rail = new Rail(
        this.scene,
        point,
        this.image,
        this.tint,
        tangent,
        this.pointerdown.bind(this)
      );
      this.rails.push(rail);
      this.add(rail, true);
    });
  }

  update() {
    this.curve.pointsWithTangents().forEach(([point, tangent], index) => {
      this.rails[index].update(point.x, point.y + this.yOffset, tangent);
    });
    this.setDepth(this.depth);
  }
}

const LIFT_OFFSET = -2;

class ConcreteRailway extends Railway {
  yOffset: number = LIFT_OFFSET;

  onEvent(event: number) {
    if (event == Events.RAILWAY_SELECTED) {
      this.yOffset = LIFT_OFFSET * 5;
    }
    if (event == Events.RAILWAY_DESELECTED) {
      this.yOffset = LIFT_OFFSET;
    }
  }
}

export class TopRailway extends ConcreteRailway {
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

export class BottomRailway extends ConcreteRailway {
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

export class ShadowRailway extends Railway {
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
