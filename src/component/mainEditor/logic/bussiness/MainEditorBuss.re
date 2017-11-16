/* let createState = () => {
       /* todo create editor state in edit layer */
       a:1
   }; */
let createEditorState = () => StateSystemEdit.createState();

/* let getEditorState = () => {

   }; */
let setEditorState = (editorState) =>
  StateSystemEdit.setState(StateDataEdit.stateData, editorState);

/* let getEngineState = () => {

   }; */
/* let setEngineStateToEngineData = (engineState) => {

   }; */
/* todo should get canvasId from config */
let initEngineMain = () => MainEditorMainOper.init("webgl");

let initEngineDirector = (engineState) => MainEditorDirectorOper.init(engineState);

let initEditor = ((editorState, engineState)) => {
  /* todo add camera,box to editorState */
  let (engineState, camera, box) = MainEditorSceneOper.createDefaultScene(engineState);
  (editorState, engineState)
};

let loopBody = (time: float, (editorState, engineState)) => {
  let engineState = MainEditorDirectorOper.loopBody(time, engineState);
  (editorState, engineState)
};