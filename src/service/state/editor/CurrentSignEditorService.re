open EditorType;

let getCurrentSign = (editorState) => editorState.currentSign;

let setCurrentSign = (currentSign, editorState) => {...editorState, currentSign};

let clearCurrentSign = (editorState) => {...editorState, currentSign: ""};