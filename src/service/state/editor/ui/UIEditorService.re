open EditorType;

let markFileInputOpen = editorState => {
  ...editorState,
  uiRecord: {
    ...editorState.uiRecord,
    isFileInputOpen: true,
  },
};

let markFileInputClose = editorState => {
  ...editorState,
  uiRecord: {
    ...editorState.uiRecord,
    isFileInputOpen: false,
  },
};

let isFileInputOpen = editorState => editorState.uiRecord.isFileInputOpen;