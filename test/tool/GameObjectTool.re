
let getChildren = (gameObject) =>
  StateLogicService.getRunEngineState() |> GameObjectUtils.getChildren(gameObject);

let getEditEngineChildren = (gameObject) =>
  StateLogicService.getEditEngineState() |> GameObjectUtils.getChildren(gameObject);

let unsafeGetCurrentGameObject = () =>
  SceneEditorService.unsafeGetCurrentGameObject |> StateLogicService.getEditorState;

let clearCurrentGameObject = () =>
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = (gameObject) => {
  StateLogicService.getEditEngineState()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData
     )
  |> StateLogicService.setEditEngineState;
  StateLogicService.getRunEngineState()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData
     )
  |> StateLogicService.setRunEngineState
  |> ignore
};

let getCurrentGameObjectTransform = () =>
  GameObjectComponentEngineService.getTransformComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectMaterial = () =>
  GameObjectComponentEngineService.getBasicMaterialComponent(unsafeGetCurrentGameObject())
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObject = () =>
  SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState;

let setCurrentGameObject = (gameObject) =>
  SceneEditorService.setCurrentGameObject(gameObject) |> StateLogicService.getAndSetEditorState;

let hasCurrentGameObject = () =>
  SceneEditorService.hasCurrentGameObject |> StateLogicService.getEditorState;