open EditorType;

let create = () => {
  sceneRecord: {
    root: None,
    diffMap: None,
    currentSceneTreeNode: None,
    isRun: false,
  },
  currentDragSource: (None, None),
  currentSelectSource: None,
  loopId: (-1),
};