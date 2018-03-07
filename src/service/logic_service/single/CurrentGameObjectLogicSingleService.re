
let unsafeGetCurrentGameObject = (editorState) =>
  editorState |> MainEditorSceneEdit.unsafeGetCurrentGameObject;

let getCurrentGameObject = (editorState) =>
  editorState |> MainEditorSceneEdit.getCurrentGameObject;

let hasCurrentGameObject = (editorState) =>
  editorState |> MainEditorSceneEdit.hasCurrentGameObject;

let setCurrentGameObject = (gameObject, editorState) =>
  editorState |> MainEditorSceneEdit.setCurrentGameObject(gameObject);

let clearCurrentGameObject = (editorState) =>
  editorState |> MainEditorSceneEdit.clearCurrentGameObject;
