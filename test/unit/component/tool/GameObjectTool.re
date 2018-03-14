let getChildren = (gameObject) =>
  GameObjectUtils.getChildren(gameObject) |> StateLogicService.getEngineState;

let addChild = (parent, child) =>
  GameObjectUtils.addChild(parent, child) |> StateLogicService.getEngineState;

let hasChildren = (gameObject) =>
  GameObjectUtils.hasChildren(gameObject) |> StateLogicService.getEngineState;

