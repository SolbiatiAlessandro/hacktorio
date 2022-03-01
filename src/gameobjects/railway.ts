import { GameObjectOnGraph } from "../interfaces/graph.interface";
import { Edge } from "../graph/edge";
import { EdgeGeometries } from "../builders/edge-builder";
import { CurveForRender } from "../geometry/curve";
import { Constants } from "../constants";
import { GameObject } from "../gameobjects/gameobject";

class Railway
  extends GameObject
  implements GameObjectOnGraph
{
  image: string = "no-image";
  tint: number = Constants.PRIMARY_COLOR;
  depth: number = 0;
  rails: Array<Phaser.GameObjects.Sprite> = [];

  _curve(): CurveForRender {
    // @ts-ignore
    return this.graphParentElement.geometries[EdgeGeometries.CURVE__RENDER];
  }

  populate() {
    this._curve()
      .pointsWithTangents()
      .forEach(([point, tangent], index) => {
        const rail = this.getFirstDead(true, point.x, point.y, this.image);
        rail.setTint(this.tint);
        rail.rotation =
          Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) +
          Phaser.Math.PI2 / 4;

        rail.displayHeight = 32;
        rail.displayWidth = 64;
        rail.setScale(0.5);
        this.rails.push(rail);
      });
  }

  update() {
    this._curve()
      .pointsWithTangents()
      .forEach(([point, tangent], index) => {
        const rail = this.rails[index];
        rail.x = point.x;
        rail.y = point.y;
        rail.rotation =
          Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) +
          Phaser.Math.PI2 / 4;
      });
    this.setDepth(this.depth);
  }
}


export class TopRailway 
	extends Railway 
{
  image: string = "rail-top";
  depth: number = 2;
}

export class BottomRailway 
  extends Railway 
{
  image: string = "rail-bottom";
  depth: number = 1;
  tint: number = Constants.randomColor();
}
