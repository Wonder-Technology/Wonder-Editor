let getChildren = gameObject =>
  StateEngineService.unsafeGetState()
  |> GameObjectUtils.getChildren(gameObject);

let unsafeGetCurrentSceneTreeNode = () =>
  SceneEditorService.unsafeGetCurrentSceneTreeNode
  |> StateLogicService.getEditorState;

let clearCurrentSceneTreeNode = () =>
  SceneEditorService.clearCurrentSceneTreeNode
  |> StateLogicService.getAndSetEditorState;

let addFakeVboBufferForGameObject = gameObject =>
  StateEngineService.unsafeGetState()
  |> MainEditorVboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
       GameObjectComponentEngineService.unsafeGetGeometryComponent(gameObject)
       |> StateLogicService.getEngineStateToGetData,
     )
  |> StateEngineService.setState
  |> ignore;

let getCurrentSceneTreeNodeTransform = () =>
  GameObjectComponentEngineService.unsafeGetTransformComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectBasicMaterial = () =>
  GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectLightMaterial = () =>
  GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectDirectionLightComponent = () =>
  GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectPointLightComponent = () =>
  GameObjectComponentEngineService.unsafeGetPointLightComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectPerspectiveCamera = () =>
  GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectGeometry = () =>
  GameObjectComponentEngineService.unsafeGetGeometryComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectArcballCamera = () =>
  GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentGameObjectMeshRenderer = () =>
  GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
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