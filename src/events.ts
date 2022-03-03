export class Event {
  constructor(
    public name: string,
    public type: "geometry" | "gameobject" | "graph"
  ) {}
}

export class GraphEvent extends Event {
  constructor(public name: string) {
    super(name, "graph");
  }
}

export class GeometryEvent extends Event {
  constructor(public name: string) {
    super(name, "geometry");
  }
}

export class Events {
  static readonly CURVE_VALID: Event = new GeometryEvent("CURVE_VALID");
  static readonly CURVE_INVALID: Event = new GeometryEvent("CURVE_INVALID");

  static readonly EDGE_SELECTED: Event = new GraphEvent("EDGE_SELECTED");
  static readonly EDGE_DESELECTED: Event = new GraphEvent("EDGE_DESELECTED");
  static readonly NODE_SELECTED: Event = new GraphEvent("NODE_SELECTED");
  static readonly NODE_DESELECTED: Event = new GraphEvent("NODE_DESELECTED");
}
