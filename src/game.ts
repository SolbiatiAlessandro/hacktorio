import "Phaser";
import { GameConfig } from "./config";

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  const body: any = document.getElementById("gamebody");
  body.style.backgroundColor = "#" + GameConfig.backgroundColor.toString(16);

  const game = new Game(GameConfig);
});
