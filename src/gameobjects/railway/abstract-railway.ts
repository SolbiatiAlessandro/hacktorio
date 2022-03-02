import { GameObjectOnGraph } from "../../interfaces/graph.interface";
import { Edge } from "../../graph/edge";
import { EdgeGeometries } from "../../builders/edge-builder";
import { CurveForRender } from "../../geometry/curve";

import { Events } from "../../events";
import { Constants } from "../../constants";

import { GameObject } from "../../gameobjects/gameobject";
import { Rail } from "../../gameobjects/railway/rail";

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

export class AbstractRailway
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
