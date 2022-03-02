import { GameObjectOnGraph } from "../interfaces/graph.interface";
import { Edge } from "../graph/edge";
import { EdgeGeometries } from "../builders/edge-builder";
import { CurveForRender } from "../geometry/curve";
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

  populate() {
    this.curve.pointsWithTangents().forEach(([point, tangent], index) => {
      const rail = new Rail(this.scene, point, this.image, this.tint, tangent);
      this.rails.push(rail);
      this.add(rail, true);
    });
  }

  update() {
    this.curve.pointsWithTangents().forEach(([point, tangent], index) => {
      this.rails[index].update(point, tangent);
    });
    this.setDepth(this.depth);
  }
}

export class TopRailway extends Railway {
  image: string = "rail-top";
  depth: number = 2;
}

export class BottomRailway extends Railway {
  image: string = "rail-bottom";
  depth: number = 1;
  tint: number = Constants.randomColor();
}
