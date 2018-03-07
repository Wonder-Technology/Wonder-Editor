/* todo should get canvasId,isDebug from config */
let initEngineMain = () => MainEditorMainOper.init("webgl", Js.true_);

let initEngineDirector = (engineState) => MainEditorDirectorOper.init(engineState);

let initEditor = ((editorState, engineState)) => {
  let (engineState, scene) = GameObjectLogicSingleService.create(engineState);
  let editorState = MainEditorSceneEdit.setScene(scene, editorState);
  let (engineState, camera, box1, box2) =
    SceneLogicCompositeService.createDefaultSceneGameObjects(engineState);
  let engineState =
    engineState
    |> GameObjectLogicCompositeService.addChild(scene, camera)
    |> GameObjectLogicCompositeService.addChild(scene, box1)
    |> GameObjectLogicCompositeService.addChild(scene, box2);
  (editorState, engineState)
};

let loopBody = (time: float, engineState) => MainEditorDirectorOper.loopBody(time, engineState);