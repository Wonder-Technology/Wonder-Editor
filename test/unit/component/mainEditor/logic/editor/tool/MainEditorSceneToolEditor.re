let unsafeGetCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.unsafeGetCurrentGameObject;

let getCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;

let setCurrentGameObject = (gameObject) =>
  MainEditorStateView.prepareState()
  |> MainEditorSceneView.setCurrentGameObject(gameObject)
  |> MainEditorStateView.finishState;

let hasCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.hasCurrentGameObject;

let recombineSceneChildrenAndSetCurrentGameObject = () => {
  MainEditorSceneToolEngine.clearSceneChildren();
  SceneTreeToolUI.buildTwoLayerSceneGraphToEngine();
  MainEditorSceneToolEngine.unsafeGetScene()
  |> MainEditorSceneToolEngine.getChildren
  |> OperateArrayUtils.getFirst
  |> setCurrentGameObject
};