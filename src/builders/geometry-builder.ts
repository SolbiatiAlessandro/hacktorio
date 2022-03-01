import { Node } from "../graph/node";
import { Point } from "../geometry/point";
import { CurveTypes, CurveForRender, CurveForTest } from "../geometry/curve";

import { NodeGeometries } from "../builders/node-builder";

export class GeometryBuilder {
  newCurve(type: CurveTypes, firstNode: Node, secondNode: Node) {
    const points = [
      firstNode.geometries[NodeGeometries.POINT__CENTER],
      firstNode.geometries[NodeGeometries.POINT__RIGHT_HANDLE],
      secondNode.geometries[NodeGeometries.POINT__LEFT_HANDLE],
      secondNode.geometries[NodeGeometries.POINT__CENTER],
    ] as const;
    if (type == CurveTypes.FOR_RENDER) {
      //@ts-ignore
      return new CurveForRender(...points);
    }
    if (type == CurveTypes.FOR_TEST) {
      //@ts-ignore
      return new CurveForTest(...points);
    }
  }
}
