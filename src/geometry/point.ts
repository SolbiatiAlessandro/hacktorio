import {GeometryOnGraph} from "../interfaces/graph.interface"

export 
class Point
extends Phaser.Math.Vector2
implements GeometryOnGraph 
{
	graphParentElement: any;
	constructor(public x: number, public y: number){
		super(x, y);
	}
	update(){}
}
