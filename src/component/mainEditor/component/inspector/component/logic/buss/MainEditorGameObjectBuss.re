let hasTransformComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasTransformComponent(gameObject);

let getTransformComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getTransformComponent(gameObject);

let hasMaterialComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasMaterialComponent(gameObject);

let getMaterialComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getMaterialComponent(gameObject);

/* let hasCameraControllerComponent = (gameObject, (_editorState, engineState)) =>
   engineState |> MainEditorGameObjectOper.hasCameraControllerComponent(gameObject); */
/* let getCameraControllerComponent = (gameObject, (_editorState, engineState)) =>
   engineState |> MainEditorGameObjectOper.getCameraControllerComponent(gameObject); */
let getGameObjectAllShowInspectorComponent = () =>
  GameObject_inspector_show_component.gameObject_inspector_show_component
  |> GameObjectComponentParseSystem.convertDataToRecord;