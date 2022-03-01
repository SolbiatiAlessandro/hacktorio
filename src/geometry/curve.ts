import {Point} from "../geometry/point";

export class Curve extends Phaser.Curves.CubicBezier {
  graphParentElement: any;

  segments: number;
  private readonly _LENGTH_SEGMENT_RATIO: number = 15;

  constructor(
    A: Point,
    B: Point,
    C: Point,
    D: Point
  ) {
    super(A, B, C, D);
    this.segments = Math.floor(this.getLength() / this._LENGTH_SEGMENT_RATIO);
  }

  points(): Array<Phaser.Math.Vector2> {
    return this.getPoints(this.segments);
  }

  // https://en.wikipedia.org/wiki/Menger_curvature
  curvature(
    a: Phaser.Math.Vector2,
    b: Phaser.Math.Vector2,
    c: Phaser.Math.Vector2
  ) {
    const area = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const d = Phaser.Math.Distance.BetweenPoints;
    const curv = (2 * area) / (d(a, b) * d(a, c) * d(b, c));
    return curv;
  }

  update(){}
}

// this is the curve used to render railways images
export class CurveForRender extends Curve {

  pointsWithTangents(): Array<[Phaser.Math.Vector2, Phaser.Math.Vector2]> {
    const _points = super.points();
    return Array(this.segments + 1)
      .fill(0)
      .map((_, i) => {
        var _t = this.getTangent(i / (this.segments + 1));
        return [_points[i], _t];
      });
  }
}

// this is the curve used to test if we have an acceptable curve state after a user edit
export class CurveForTest extends Curve {
  broken: boolean = false;
  private readonly BREAKING_DISTANCE_MAX: number = 23;
  private readonly BREAKING_CURVATURE_MAX: number = 0.05;

  breaksDistance(
    firstPoint: Phaser.Math.Vector2,
    secondPoint: Phaser.Math.Vector2
  ): Phaser.Math.Vector2 {
    if (
      Phaser.Math.Distance.BetweenPoints(firstPoint, secondPoint) >
      this.BREAKING_DISTANCE_MAX
    ) {
      this.broken = true;
    }
    return secondPoint;
  }

  breaksCurvature(
    a: Phaser.Math.Vector2,
    b: Phaser.Math.Vector2,
    c: Phaser.Math.Vector2
  ): Phaser.Math.Vector2 {
    if (
      typeof c != "undefined" &&
      super.curvature(a, b, c) > this.BREAKING_CURVATURE_MAX
    ) {
      this.broken = true;
    }
    return b;
  }

  update(): void {
    const _points = super.points();
    this.broken = false;
    _points.reduce((previousPoint, currentPoint) =>
      this.breaksDistance(previousPoint, currentPoint)
    );
    _points.reduce((previousPoint, currentPoint, index, points) =>
      this.breaksCurvature(previousPoint, currentPoint, _points[index + 1])
    );
  }
}

export enum CurveTypes {
	FOR_RENDER,
	FOR_TEST
}
