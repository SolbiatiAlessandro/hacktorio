import { GameObject } from "../../gameobjects/gameobject";
import { NodeGeometries } from "../../builders/node-builder";
import { Point } from "../../geometry/point";
import { Node } from "../../graph/node"; 

export class GameObjectWithControllerTypes extends GameObject {
	get graphParentNode(): Node {
		//@ts-ignore
    return this.graphParentElement;
	};

  get pointCenter(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[NodeGeometries.POINT__CENTER];
  }

  get pointLeftTest(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__LEFT_HANDLE_TEST
    ];
  }

  get pointLeftRender(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__LEFT_HANDLE
    ];
  }

  get pointRightTest(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__RIGHT_HANDLE_TEST
    ];
  }

  get pointRightRender(): Point {
    //@ts-ignore
    return this.graphParentElement.geometries[
      NodeGeometries.POINT__RIGHT_HANDLE
    ];
  }
}
