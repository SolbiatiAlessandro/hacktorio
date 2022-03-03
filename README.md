## Hacktorio -> [Live Demo](https://solbiatialessandro.github.io/hacktorio/)

Hacktorio is [Factorio](https://www.factorio.com) for hackers.

_Grow your railway by programming trains in the Chrome dev console!_

![](https://github.com/SolbiatiAlessandro/hacktorio/blob/master/imgs/demo.png?raw=true)

---

## Architecture

Strict abstraction barriers between each domain (Graph, GameObjects, Geometry, ...)

See [Structure And Interpretation Of Computer Programs, Abstraction Barriers](https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-14.html#%_sec_2.1.2)

Here are some ideas for how the game architecture works (that's not a complete architecture, just the patterns being used)

![](https://github.com/SolbiatiAlessandro/hacktorio/blob/master/imgs/architecture.png?raw=true)

Here is some pseudocode to lay down these ideas

```
**main scene**
MainScene

// knows how to speak the graph language, called by the UI
**GraphBuilder**
- constructor():
	events = GraphEvents.get();
    events.on(GraphEvents.SELECT-NODE-EVENT, this.onNodeSelected, this)

- newNode(x, y):
	geometries = [];
    gameObjects = [new Controller(x, y)];
	graph = Graph.get()
    graph.addNode(new Node(geometries, gameObjects));

- newEdge(firstNode, secondNode)
    let curve = new curveToRender();
	geometries = [curve, new curveToTest()];
    gameObjects = [new TopRailway(curve), new BottomRailway(curve), new ShadowRailway(curve)];
	graph = Graph.get()
	graph.addEdge(new Edge({firstNode, secondNode}, geometries, gameObjects);

- onNodeSelected(node: Node)
	this.newEdge(node, cursor)

**events**

GraphEvents //singleton, static methods
- public readonly NODE-CONTROLLER-DAG
- public readonly SELECT-NODE-EVENT
- public selectedEdge: Edge
- static get

GeometryEvents
- public readonly CURVE-BROKEN
- static get

**graph**
Graph // singleton
- constructor
	events = GraphEvents.getEmitter()
    events.on(GraphEvents.CONTROLLER-NODE-DRAG, this.onNodeControllerDrag, this)

- onNodeControllerDrag(x, y, valid):
    node.getEdges.curves.forEach(curve => curve.updateControlPoints(x, y, valid))

- addEdge(edge: Edge, where)
	graphology.addEdge(where, edge: edge)
- addNode(node: Node, where)
	graphology.addNode(where, node: node)

- static get

Node
- gameObjects = Array<GameObjectsOnGraph>
- geometries = Array<GeometryOnGraph>
- constructor(gameObjects, geometries)
- select():
	emitter = GraphEvents.getEmitter()
    emitter.emit(GraphEvents.SELECT-NODE-EVENT, this)
- controllerDrag():
	emitter = GraphEvents.getEmitter()
    emitter.emit(GraphEvents.NODE-CONTROLLER-DRAG, this)

Edge
- gameObjects = Array<GameObjectsOnGraph>
- geometries = Array<GeometryOnGraph>
- constructor({firstNode, secondNode}, gameObjects, geometries):
- select():
	[this.firstNode, this.secondNode].forEach(
		node => node.gameObjects.forEach(
			gameObjects => gameObject.select()
	))
    this.gameObjects.forEach(
        gameObjects => gameObjects.select())

GameObjectOnGraph.interface
- parentGraphElement: Edge || Node
- update: function

GeometryOnGraph.interace
- parentGraphElement: Edge || Node


**gameobjects**
Railway implements GameObjectOnEdge.interface
- buildlingGroup
- onclick():
	this.parentEdge.select
- select
	lift
- deselect
	putback

ShadowRailway extends Railway
- select
	display = true
- deselect
	display = false

ControllerHandle extends Image
- parentController
- parentNode
- onDrag(x, y)
	this.parentNode.controllerMoved(x, y, this.parentController.dragValid)

Controller implements GameObjectOnNode.interface extends Phaser.Group
- center: Phaser.Image
- left: ControllerHandle(this)
- right: ControllerHandle(this)
- dragValid: boolean = true
- constructor:
	events = GeometryEvents.get()
	events.on(GeometryEvents.CURVE-INVALID, {this.error(true); this.dragValid = false})
	events.on(GeometryEvents.CURVE-VALID, {this.error(false); this.dragValid = true})

- error(value: boolean = false)
	 tint(value ? white : red)
- center.onclick
	this.parentNode.select()
- select
	this.setVisibile(true)
- deselect
	this.setVisible(false)

**geometry**
Point

Curve extend Phaser.Bezier
- updateControlPoints
CurveForRender extend Curve
- updateControlPoints(x, y, valid)
	if not valid: return
CurveForTest extend Curve
- emitter = CurveEvents.get()
- updateControlPoints(x, y, valid)
	super.updateControlPoints()
    if ( this.checkBreaksDistance or  this.checkBreaksCurvature)
		emitter.emit(CURVE-INVALID)
    else
		emitter.emit(CURVE-VALID)

- checkBreaksDistance
- checkbreaksCurvature
```

## Dev Workflow

1. Make a new branch the new feature you are building in the ugliest/fastes way possible writing stuff in the main scene without adding files
2. Check if what you are seeing is good
3. Abandon your branch, check out master
4. Rewrite everything in small file <100 lines, functional, typed, and tested
5. Make small commits of every change.
6. Optional: pack all commits for a given feature in a PR so that when we ask "how does that feature work?" we just look at the PR

```
yarn dev
```

Stretch: listen to bach while coding

```
// git
git commit --allow-empty  (feature ideas descriptions)
git log --graph --decorate --oneline --all


// code format
npx prettier --write .

// docs
npx tplant -i src/game.ts -o ./imgs/architecture.svg && open ./imags/architecture.svg

// refactoring
rg "\{ Edge \}" -l | xargs sed -i '' 's/graph\/edge/graph\/graphobjects\/edge/g'
rg "AbstractRailway" -l | xargs sed -i '' 's/AbstractRailway/BaseRailway/g'
```
