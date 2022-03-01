import {Node} from "../graph/node"
import {Point} from "../geometry/point"
import {CurveTypes, CurveForRender, CurveForTest} from "../geometry/curve"

export class GeometryBuilder {
	newCurve(type: CurveTypes, firstNode: Node, secondNode: Node){
		const points = [
				firstNode.geometries.POINT_CENTER,
				firstNode.geometries.POINT_RIGHT_HANDLE,
				secondNode.geometries.POINT_LEFT_HANDLE,
				secondNode.geometries.POINT_CENTER
		] as const;
		if (type == CurveTypes.FOR_RENDER){
			//@ts-ignore
			return new CurveForRender(...points);
		}
		if (type == CurveTypes.FOR_TEST){
			//@ts-ignore
			return new CurveForTest(...points);
		}
	}
}

