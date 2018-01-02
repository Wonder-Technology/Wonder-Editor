open MainEditorSceneTreeType;

let getDragedSceneGraphData = MainEditorSceneTreeView.getDragedSceneGraphData;

let getSimpleSceneTree = () => [|
  {
    uid: 0,
    name: "root",
    children: [|
      {uid: 1, name: "gameObject1", children: [||]},
      {uid: 2, name: "gameObject2", children: [||]},
      {uid: 3, name: "gameObject3", children: [||]}
    |]
  }
|];

let getTwoLayerSceneTree = () => [|
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
|];

let getThreeLayerSceneTree = () => [|
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
|];