let getScene = () => MainEditorStateView.prepareState() |> MainEditorSceneView.getScene;

let getCurrentGameObject = () =>
  MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;

let clearSceneChildren = () => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let scene = getScene();
  let engineState =
    engineState
    |> MainEditorGameObjectOper.getChildren(scene)
    |> Js.Array.reduce(
         (engineState, child) =>
           MainEditorGameObjectAdaptor.hasGeometryComponent(child, engineState) ?
             engineState
             |> MainEditorVboBufferToolEngine.passBufferShouldExistCheckWhenDisposeGeometry(
                  MainEditorGameObjectAdaptor.getGeometryComponent(child, engineState)
                ) :
             engineState,
         engineState
       );
  MainEditorSceneView.disposeGameObjectChildren(scene, (editorState, engineState))
  |> MainEditorStateView.finishState
};

let getChildren = (gameObject) => {
  let (_, engineState) = MainEditorStateView.prepareState();
  engineState |> MainEditorGameObjectOper.getChildren(gameObject)
};

let _isBox = (gameObject, engineState) =>
  MainEditorGameObjectAdaptor.hasGeometryComponent(gameObject, engineState);

let getBoxInDefaultScene = (editorState, engineState) =>
  MainEditorGameObjectToolEngine.getChildren(getScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArraySystem.unsafePop;