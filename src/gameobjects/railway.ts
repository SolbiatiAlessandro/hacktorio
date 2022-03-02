import { GameObjectOnGraph } from "../interfaces/graph.interface";
import { Edge } from "../graph/edge";
import { EdgeGeometries } from "../builders/edge-builder";
import { CurveForRender } from "../geometry/curve";
import { Constants } from "../constants";
import { GameObject } from "../gameobjects/gameobject";

class GameObjectWithRailwayGeometries
  extends GameObject
  implements GameObjectOnGraph
{
  _curve(): CurveForRender {
    // @ts-ignore
    return this.graphParentElement.geometries[EdgeGeometries.CURVE__RENDER];
  }

  update() {}
}

function rotateRail(
  rail: Phaser.GameObjects.Sprite,
  tangent: Phaser.Math.Vector2
) {
  rail.rotation =
    Phaser.Math.Angle.Between(0, 0, tangent.x, tangent.y) + Phaser.Math.PI2 / 4;
}

class Railway
  extends GameObjectWithRailwayGeometries
  implements GameObjectOnGraph
{
  image: string = "no-image";
  tint: number = Constants.PRIMARY_COLOR;
  depth: number = 0;
  rails: Array<Phaser.GameObjects.Sprite> = [];

  populate() {
    this._curve()
      .pointsWithTangents()
      .forEach(([point, tangent], index) => {
        const rail = this.getFirstDead(true, point.x, point.y, this.image);
				// TODO: on click broadcast event, let curve listen and check if it's broken 
				// or not and let the curve emit a CURVE_VALID/CURVE_INVALID event
        rail.setTint(this.tint);
        rotateRail(rail, tangent);

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
        rail.setPosition(point.x, point.y);
        rotateRail(rail, tangent);
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
