let addChild = HierarchyGameObjectEngineService.addChild;

let getChildren = (gameObject, engineState) =>
  HierarchyGameObjectEngineService.getChildren(gameObject, engineState);

let getChild = (gameObject, index, engineState) =>
  Array.unsafe_get(getChildren(gameObject, engineState), index);

let hasTargetChildren = (gameObject, targetChildren, engineState) => {
  let children = getChildren(gameObject, engineState);

  targetChildren
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. has, targetChild) =>
         has ? true : children |> Js.Array.includes(targetChild),
       false,
     );
};

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

let getCurrentSceneTreeNodeMaterial = () => {
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

let getCurrentSceneTreeNodeBasicMaterial = () =>
  GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeLightMaterial = () =>
  GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeDirectionLightComponent = () =>
  GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodePointLightComponent = () =>
  GameObjectComponentEngineService.unsafeGetPointLightComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeBasicCameraView = () =>
  GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodePerspectiveCamera = () =>
  GameObjectComponentEngineService.unsafeGetPerspectiveCameraProjectionComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeGeometry = () =>
  GameObjectComponentEngineService.unsafeGetGeometryComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeArcballCamera = () =>
  GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeMeshRenderer = () =>
  GameObjectComponentEngineService.unsafeGetMeshRendererComponent(
    unsafeGetCurrentSceneTreeNode(),
  )
  |> StateLogicService.getEngineStateToGetData;

let getCurrentSceneTreeNodeScript = () =>
  GameObjectComponentEngineService.unsafeGetScriptComponent(
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

let getNewGameObject = (~engineState=StateEngineService.unsafeGetState(), ()) =>
  engineState.gameObjectRecord.uid;