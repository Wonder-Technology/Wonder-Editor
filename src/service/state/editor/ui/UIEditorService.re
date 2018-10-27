open EditorType;

/* open UIType; */

let markFileInputOpen = editorState => {
  ...editorState,
  uiRecord: {
    isFileInputOpen: true,
  },
};

let markFileInputClose = editorState => {
  ...editorState,
  uiRecord: {
    isFileInputOpen: false,
  },
};

let isFileInputOpen = editorState => editorState.uiRecord.isFileInputOpen;