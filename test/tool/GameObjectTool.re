let getChildren = gameObject =>
  StateLogicService.getRunEngineState()
  |> GameObjectUtils.getChildren(gameObject);

let getEditEngineChildren = gameObject =>
  StateLogicService.getEditEngineState()
  |> GameObjectUtils.getChildren(gameObject);

let unsafeGetCurrentSceneTreeNode = () =>
  SceneEditorService.unsafeGetCurrentSceneTreeNode
  |> StateLogicService.getEditorState;

let clearCurrentSceneTreeNode = () =>
  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = gameObject => {
  StateLogicService.getEditEngineState()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData,
     )
  |> StateLogicService.setEditEngineState;

  StateLogicService.getRunEngineState()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.getGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData,
     )
  |> StateLogicService.setRunEngineState
  |> ignore;
};

let getCurrentSceneTreeNodeTransform = () =>
  GameObjectComponentEngineService.getTransformComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectBasicMaterial = () =>
  GameObjectComponentEngineService.getBasicMaterialComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectLightMaterial = () =>
  GameObjectComponentEngineService.getLightMaterialComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectDirectionLightComponent = () =>
  GameObjectComponentEngineService.getDirectionLightComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectPointLightComponent = () =>
  GameObjectComponentEngineService.getPointLightComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectArcballCamera = () =>
  GameObjectComponentEngineService.getArcballCameraControllerComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectMeshRenderer = () =>
  GameObjectComponentEngineService.getMeshRendererComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNode = () =>
  SceneEditorService.getCurrentSceneTreeNode
  |> StateLogicService.getEditorState;

let setCurrentSceneTreeNode = gameObject =>
  SceneEditorService.setCurrentSceneTreeNode(gameObject)
  |> StateLogicService.getAndSetEditorState;

let isAlive = Wonderjs.AliveGameObjectMainService.isAlive;