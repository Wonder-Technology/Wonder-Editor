let unsafeGetCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.unsafeGetCurrentGameObject;

let getCurrentGameObjectTransform = () => {
  let (_, engineState) = MainEditorStateView.prepareState();
  engineState |> MainEditorGameObjectOper.getTransformComponent(unsafeGetCurrentGameObject())
};

let getCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;

let setCurrentGameObject = (gameObject) =>
  MainEditorStateView.prepareState()
  |> MainEditorSceneView.setCurrentGameObject(gameObject)
  |> MainEditorStateView.finishState;

let hasCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.hasCurrentGameObject;

let recombineSceneChildrenAndSetCameraIsCurrentGameObject = () => {
  MainEditorSceneToolEngine.clearSceneChildren();
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let scene = MainEditorSceneToolEngine.unsafeGetScene();
  let (engineState, camera) = MainEditorCameraOper.createCamera(engineState);
  let engineState = engineState |> MainEditorGameObjectOper.addChild(scene, camera);
  (editorState, engineState) |> MainEditorStateView.finishState;
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject
};

/* TODO add prepareDefaultScene for both camera and box */
/* TODO add setCameraToBeCurrentGameObject and inject */
/* TODO add setBoxToBeCurrentGameObject  inject */
let recombineSceneChildrenAndSetBoxIsCurrentGameObject = () => {
  MainEditorSceneToolEngine.clearSceneChildren();
  SceneTreeToolUI.buildTwoLayerSceneGraphToEngine();
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject
};

let _prepareSceneGraphData = () => {
  MainEditorSceneToolEngine.clearSceneChildren();
  SceneTreeToolUI.buildTwoLayerSceneGraphToEngine()
};

/* let _setCurrentGameObject = (gameObject) => {

   }; */
/* let prepareScene = () => _prepareSceneGraphData(); */
/* 
MainEditorSceneToolEngine.unsafeGetScene()
|> MainEditorSceneToolEngine.getChildren
|> OperateArrayUtils.getFirst
|> setCurrentGameObject; */