open SceneGraphType;

let getDragedSceneGraphData = SceneTreeUtils.getDragedSceneGraphData;

let getSimpleSceneTree = () => [|
  {
    uid: 0,
    name: "root",
    isShowChildren: true,
    children: [|
      {uid: 1, name: "gameObject1", isShowChildren: true, children: [||]},
      {uid: 2, name: "gameObject2", isShowChildren: true, children: [||]},
      {uid: 3, name: "gameObject3", isShowChildren: true, children: [||]},
    |],
  },
|];

let getTwoLayerSceneTree = () => [|
  {
    uid: 0,
    name: "root",
    isShowChildren: true,
    children: [|
      {uid: 1, name: "gameObject1", isShowChildren: true, children: [||]},
      {uid: 2, name: "gameObject2", isShowChildren: true, children: [||]},
      {
        uid: 3,
        name: "gameObject3",
        isShowChildren: true,
        children: [|
          {uid: 4, name: "gameObject4", isShowChildren: true, children: [||]},
          {uid: 5, name: "gameObject5", isShowChildren: true, children: [||]},
        |],
      },
    |],
  },
|];

let getThreeLayerSceneTree = () => [|
  {
    uid: 0,
    name: "root",
    isShowChildren: true,
    children: [|
      {uid: 1, name: "gameObject1", isShowChildren: true, children: [||]},
      {uid: 2, name: "gameObject2", isShowChildren: true, children: [||]},
      {
        uid: 3,
        name: "gameObject3",
        isShowChildren: true,
        children: [|
          {uid: 4, name: "gameObject4", isShowChildren: true, children: [||]},
          {
            uid: 5,
            name: "gameObject5",
            isShowChildren: true,
            children: [|
              {
                uid: 6,
                name: "gameObject6",
                isShowChildren: true,
                children: [||],
              },
            |],
          },
        |],
      },
    |],
  },
|];