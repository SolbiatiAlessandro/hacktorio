import { Point } from "../../geometry/point";

export class Handle extends Phaser.GameObjects.Image{
	constructor(scene: Phaser.Scene, point: Point){
		super(scene, point.x, point.y, "controlPoint");
	}
}
