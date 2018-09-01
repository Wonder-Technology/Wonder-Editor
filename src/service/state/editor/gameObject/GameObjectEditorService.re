open EditorType;

let unsafeGetGridPlane = editorState =>
  editorState.gameObjectRecord.gridPlane |> OptionService.unsafeGet;

let setGridPlane = (gridPlane, editorState) => {
  ...editorState,
  gameObjectRecord: {
    ...editorState.gameObjectRecord,
    gridPlane: Some(gridPlane),
  },
};

let getEditCamera = editorState => editorState.gameObjectRecord.editCamera;

let unsafeGetEditCamera = editorState =>
  getEditCamera(editorState) |> OptionService.unsafeGet;

let setEditCamera = (editCamera, editorState) => {
  ...editorState,
  gameObjectRecord: {
    ...editorState.gameObjectRecord,
    editCamera: Some(editCamera),
  },
};