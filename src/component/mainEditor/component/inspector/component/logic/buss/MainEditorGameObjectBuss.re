let hasTransformComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasTransformComponent(gameObject);

let getTransformComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getTransformComponent(gameObject);

let hasMaterialComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasMaterialComponent(gameObject);

let getMaterialComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getMaterialComponent(gameObject);

let hasSourceInstanceComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasGameObjectSourceInstanceComponent(gameObject);

let getSourceInstanceComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getGameObjectSourceInstanceComponent(gameObject);

let hasCameraControllerComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasCameraControllerComponent(gameObject);

let getCameraControllerComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getCameraControllerComponent(gameObject);

let hasBoxGeometryComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasBoxGeometryComponent(gameObject);

let getBoxGeometryComponent = (gameObject, (_editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.getBoxGeometryComponent(gameObject);