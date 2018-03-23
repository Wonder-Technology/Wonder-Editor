let getChildren = (gameObject) =>
  GameObjectUtils.getChildren(gameObject) |> StateLogicService.getEngineStateToGetData;

let addChild = (parent, child) =>
  GameObjectUtils.addChild(parent, child) |> StateLogicService.getEngineStateToGetData;

let hasChildren = (gameObject) =>
  GameObjectUtils.hasChildren(gameObject) |> StateLogicService.getEngineStateToGetData;

