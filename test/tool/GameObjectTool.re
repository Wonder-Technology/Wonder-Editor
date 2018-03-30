let getChildren = (gameObject) =>
  GameObjectUtils.getChildren(gameObject) |> StateLogicService.getEngineStateToGetData;

let hasChildren = (gameObject) =>
  GameObjectUtils.hasChildren(gameObject) |> StateLogicService.getEngineStateToGetData;

