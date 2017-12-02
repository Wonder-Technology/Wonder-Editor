/* let createEditorState = () => EditorStateSystemEdit.createState(); */
let getEditorState = () => EditorStateSystemEdit.getState(EditorStateDataEdit.stateData);

let setEditorState = (editorState) =>
  EditorStateSystemEdit.setState(EditorStateDataEdit.stateData, editorState);

let getEngineState = () => EngineStateOper.getState();

let setEngineState = (engineState) => EngineStateOper.setState(engineState);

/* todo should get canvasId,isTest from config */
let initEngineMain = () => MainEditorMainOper.init("webgl", Js.true_);

let initEngineDirector = (engineState) => MainEditorDirectorOper.init(engineState);

let initEditor = ((editorState, engineState)) => {
  let (engineState, scene) = MainEditorGameObjectOper.create(engineState);
  let editorState = MainEditorSceneEdit.setScene(scene, editorState);
  let (engineState, camera, box) = MainEditorSceneOper.createDefaultSceneGameObjects(engineState);
  let engineState =
    engineState
    |> MainEditorGameObjectOper.addChild(scene, camera)
    |> MainEditorGameObjectOper.addChild(scene, box);
  (editorState, engineState)
};

let loopBody = (time: float, (editorState, engineState)) => {
  let engineState = MainEditorDirectorOper.loopBody(time, engineState);
  (editorState, engineState)
};