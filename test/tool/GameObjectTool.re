let getChildren = (gameObject, engineState) =>
  GameObjectUtils.getChildren(gameObject, engineState);

let getChild = (gameObject, index, engineState) =>
  Array.unsafe_get(getChildren(gameObject, engineState), index);

let unsafeGetCurrentSceneTreeNode = () =>
  SceneTreeEditorService.unsafeGetCurrentSceneTreeNode
  |> StateLogicService.getEditorState;

let clearCurrentSceneTreeNode = () =>
  SceneTreeEditorService.clearCurrentSceneTreeNode
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

let getCurrentGameObjectMaterial = () => {
  let gameObject = unsafeGetCurrentSceneTreeNode();
  let engineState = StateEngineService.unsafeGetState();

  GameObjectComponentEngineService.hasBasicMaterialComponent(
    gameObject,
    engineState,
  ) ?
    GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
      gameObject,
      engineState,
    ) :
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ) ?
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
        gameObject,
        engineState,
      ) :
      WonderLog.Log.fatal(
        LogUtils.buildFatalMessage(
          
          ~description={j|gameObject should has material, but actual not|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );
};

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

let getCurrentGameObjectBasicCameraView = () =>
  GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
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
  SceneTreeEditorService.getCurrentSceneTreeNode
  |> StateLogicService.getEditorState;

let setCurrentSceneTreeNode = gameObject =>
  SceneTreeEditorService.setCurrentSceneTreeNode(gameObject)
  |> StateLogicService.getAndSetEditorState;

let isAlive = Wonderjs.AliveGameObjectMainService.isAlive;

let getNewGameObjectUid =
    (~engineState=StateEngineService.unsafeGetState(), ()) =>
  engineState.gameObjectRecord.uid;