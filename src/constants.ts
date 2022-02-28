export abstract class Constants {
  // this are only proportional since we are using Phaser.Scale.FIT
  static readonly GAME_WINDOW_WIDTH: number = 1100;
  static readonly GAME_WINDOW_HEIGHT: number = 600;
  static readonly BACKGROUND_COLOR: number = 0xdbd9d9;
  static readonly PRIMARY_COLOR: number = 0xffffff;
  static readonly SECONDARY_COLOR: number = 0x403932;
  static readonly ERROR_COLOR: number = 0xff0000;
  static readonly HIGHLIGHT_COLORS: Array<number> = [
    0xff4e02, 0x1ab157, 0xfe86b3, 0x4470e7, 0xfd9a1d,
  ];
}
