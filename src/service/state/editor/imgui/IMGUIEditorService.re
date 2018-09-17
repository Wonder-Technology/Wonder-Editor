open EditorType;

let getGameViewIMGUIFunc = editorState =>
  editorState.imguiRecord.gameViewIMGUIFunc;

let unsafeGetGameViewIMGUIFunc = editorState =>
  getGameViewIMGUIFunc(editorState) |> OptionService.unsafeGet;

let setGameViewIMGUIFunc = (imguiFunc, editorState) => {
  ...editorState,
  imguiRecord: {
    ...editorState.imguiRecord,
    gameViewIMGUIFunc: Some(imguiFunc),
  },
};

let hasGameViewIMGUIData = editorState =>
  getGameViewIMGUIFunc(editorState) |> Js.Option.isSome;

let removeGameViewIMGUIFunc = editorState => {
  ...editorState,
  imguiRecord: {
    ...editorState.imguiRecord,
    gameViewIMGUIFunc: None,
  },
};

let getGameViewIMGUICustomData = editorState =>
  editorState.imguiRecord.gameViewCustomData;

let unsafeGetGameViewIMGUICustomData = editorState =>
  getGameViewIMGUICustomData(editorState) |> OptionService.unsafeGet;

let setGameViewIMGUICustomData = (customData, editorState) => {
  ...editorState,
  imguiRecord: {
    ...editorState.imguiRecord,
    gameViewCustomData: Some(customData),
  },
};

let removeGameViewIMGUICustomData = editorState => {
  ...editorState,
  imguiRecord: {
    ...editorState.imguiRecord,
    gameViewCustomData: None,
  },
};