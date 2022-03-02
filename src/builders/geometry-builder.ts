import { Node } from "../graph/node";
import { Point } from "../geometry/point";
import { CurveTypes, CurveForRender, CurveForTest } from "../geometry/curve";

import { NodeGeometries } from "../builders/node-builder";

export class GeometryBuilder {
  newCurve(type: CurveTypes, firstNode: Node, secondNode: Node) {
    if (type == CurveTypes.FOR_RENDER) {
      return new CurveForRender(
        //@ts-ignore
        firstNode.geometries[NodeGeometries.POINT__CENTER],
        firstNode.geometries[NodeGeometries.POINT__RIGHT_HANDLE],
        secondNode.geometries[NodeGeometries.POINT__LEFT_HANDLE],
        secondNode.geometries[NodeGeometries.POINT__CENTER]
      );
    }
    if (type == CurveTypes.FOR_TEST) {
      return new CurveForTest(
        //@ts-ignore
        firstNode.geometries[NodeGeometries.POINT__CENTER],
        firstNode.geometries[NodeGeometries.POINT__RIGHT_HANDLE_TEST],
        secondNode.geometries[NodeGeometries.POINT__LEFT_HANDLE_TEST],
        secondNode.geometries[NodeGeometries.POINT__CENTER]
      );
    }
  }
}
