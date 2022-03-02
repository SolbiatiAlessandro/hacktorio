import { Edge } from "../../graph/edge";
import { EdgeGeometries } from "../../builders/edge-builder";
import { CurveForRender } from "../../geometry/curve";

import { Constants } from "../../constants";

import { GameObject } from "../../gameobjects/gameobject";
import { Rail } from "../../gameobjects/railway/rail";

// set the correct types of object from other domains
// TODO: think how to get rid of this class and ts-ignores
class GameObjectWithRailwayTypes
  extends GameObject
{
  get curve(): CurveForRender {
    // @ts-ignore
    return this.graphParentElement.geometries[EdgeGeometries.CURVE__RENDER];
  }

  get graphParentEdge(): Edge {
    // @ts-ignore
    return this.graphParentElement;
  }
}

export class AbstractRailway
  extends GameObjectWithRailwayTypes
{
  image: string = "no-image";
  tint: number = Constants.PRIMARY_COLOR;
  depth: number = 0;
  rails: Array<Rail> = [];
  yOffset: number = 0;

  pointerdown() {
    this.graphParentEdge.select();
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
