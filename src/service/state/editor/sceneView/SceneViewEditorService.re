open EditorType;

let getViewRect = editorState => editorState.sceneViewRecord.viewRect;

let unsafeGetViewRect = editorState =>
  getViewRect(editorState) |> OptionService.unsafeGet;

let updateViewRect = (x, y, width, height, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    viewRect: Some((x, y, width, height)),
  },
};

let unsafeGetGridPlane = editorState =>
  editorState.sceneViewRecord.gridPlane |> OptionService.unsafeGet;

let setGridPlane = (gridPlane, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    gridPlane: Some(gridPlane),
  },
};

let getEditCamera = editorState => editorState.sceneViewRecord.editCamera;

let unsafeGetEditCamera = editorState =>
  getEditCamera(editorState) |> OptionService.unsafeGet;

let setEditCamera = (editCamera, editorState) => {
  ...editorState,
  sceneViewRecord: {
    ...editorState.sceneViewRecord,
    editCamera: Some(editCamera),
  },
};

let unsafeGetActiveCamera = editorState => editorState |> unsafeGetEditCamera;