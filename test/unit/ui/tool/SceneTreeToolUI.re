let _buildSceneTreeAppState = (sceneGraphData) => {
  let state = TestToolUI.buildEmptyAppState();
  state.sceneTreeState.sceneGraphData = Some(sceneGraphData);
  state
};

let buildAppStateSceneGraphFromEngine = () =>
  MainEditorStateView.prepareState()
  |> MainEditorSceneTreeView.getSceneGraphData
  |> _buildSceneTreeAppState;

let buildSimpleSceneTreeAppState = () =>
  _buildSceneTreeAppState([|
    {
      uid: 0,
      name: "root",
      children: [|
        {uid: 1, name: "gameObject1", children: [||]},
        {uid: 2, name: "gameObject2", children: [||]},
        {uid: 3, name: "gameObject3", children: [||]}
      |]
    }
  |]);

let buildTwoLayerSceneTreeAppState = () =>
  _buildSceneTreeAppState([|
    {
      uid: 0,
      name: "root",
      children: [|
        {uid: 1, name: "gameObject1", children: [||]},
        {uid: 2, name: "gameObject2", children: [||]},
        {
          uid: 3,
          name: "gameObject3",
          children: [|
            {uid: 4, name: "gameObject4", children: [||]},
            {uid: 5, name: "gameObject5", children: [||]}
          |]
        }
      |]
    }
  |]);

let buildThreeLayerSceneTreeAppState = () =>
  _buildSceneTreeAppState([|
    {
      uid: 0,
      name: "root",
      children: [|
        {uid: 1, name: "gameObject1", children: [||]},
        {uid: 2, name: "gameObject2", children: [||]},
        {
          uid: 3,
          name: "gameObject3",
          children: [|
            {uid: 4, name: "gameObject4", children: [||]},
            {
              uid: 5,
              name: "gameObject5",
              children: [|{uid: 6, name: "gameObject6", children: [||]}|]
            }
          |]
        }
      |]
    }
  |]);