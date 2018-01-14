let unsafeGetScene = () => MainEditorStateView.prepareState() |> MainEditorSceneView.unsafeGetScene;

let clearSceneChildren = () => {
  let (editorState, engineState) = MainEditorStateView.prepareState();
  let scene = unsafeGetScene();
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
  MainEditorGameObjectToolEngine.getChildren(unsafeGetScene(), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArraySystem.unsafePop;