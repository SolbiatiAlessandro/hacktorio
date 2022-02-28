export class LoadScene extends Phaser.Scene {
  ready: boolean = false;

  constructor() {
    super({ key: "LoadingScene" });
  }

  preload(): void {}

  loadAssets(): void {
    this.load.image("rail-top", "assets/rail-top.png");
    this.load.image("rail-bottom", "assets/rail-bottom.png");
    this.load.image("red", "assets/red.png");
    this.load.image("green", "assets/green.png");
    this.load.image("blue", "assets/blue.png");
    this.load.image("orange", "assets/orange.png");
    this.load.image("controlPoint", "assets/controlPoint.png");
    this.load.image("controlPointCenter", "assets/controlPointCenter.png");
  }

  create(): void {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value: number) {
      percentText.setText(value * 100 + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on(
      "complete",
      function () {
        this.scene.start("MainScene");
      }.bind(this)
    );

    this.loadAssets();

    this.load.start();
  }
}
