open MainEditorSceneTreeType;

type sceneTreeAction('a) =
  | SetSceneGraph('a);

type sceneTreeDataType = option(array(treeNode));

type sceneTreeState = {mutable sceneGraphData: sceneTreeDataType};

let sceneTreeReducer = (state: sceneTreeState, action: sceneTreeAction('a)) =>
  switch action {
  | SetSceneGraph(sceneGraph) => {...state, sceneGraphData: sceneGraph}
  };