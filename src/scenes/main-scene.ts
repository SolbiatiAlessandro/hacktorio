import {Builder} from "../builder"

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  create(): void {
	  let builder = new Builder();
	  builder.newNode("1", 300, 400);
	  builder.newNode("2", 600, 600);
  }

  update(): void {
  }
}
