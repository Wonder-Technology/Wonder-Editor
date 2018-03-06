/* todo should get canvasId,isDebug from config */
let initEngineMain = () => MainEditorMainOper.init("webgl", Js.true_);

let initEngineDirector = (engineState) => MainEditorDirectorOper.init(engineState);

let initEditor = ((editorState, engineState)) => {
  let (engineState, scene) = MainEditorGameObjectOper.create(engineState);
  let editorState = MainEditorSceneEdit.setScene(scene, editorState);

  WonderLog.Log.print(SceneLogicService.unsafeGetScene(editorState)) |> ignore;
  let (engineState, camera, box1, box2) =
    MainEditorSceneOper.createDefaultSceneGameObjects(engineState);
  let engineState =
    engineState
    |> MainEditorGameObjectOper.addChild(scene, camera)
    |> MainEditorGameObjectOper.addChild(scene, box1)
    |> MainEditorGameObjectOper.addChild(scene, box2);
  (editorState, engineState)
};

let loopBody = (time: float, engineState) => MainEditorDirectorOper.loopBody(time, engineState);