open EditorType;

let getCurrenttree = (editorState) => editorState.currentTree;

let setCurrentTree = (currentTree, editorState) => {...editorState, currentTree};

let clearCurrentTree = (editorState) => {...editorState, currentTree: ""};