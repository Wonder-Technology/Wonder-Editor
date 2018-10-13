open SceneGraphType;

let getDragedSceneGraphData = SceneTreeUtils.getDragedSceneGraphData;

let getSimpleSceneTree = () => [|
  {
    uid: 0,
    name: "root",
    children: [|
      {uid: 1, name: "gameObject1", children: [||]},
      {uid: 2, name: "gameObject2", children: [||]},
      {uid: 3, name: "gameObject3", children: [||]},
    |],
  },
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
          {uid: 5, name: "gameObject5", children: [||]},
        |],
      },
    |],
  },
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
            children: [|{uid: 6, name: "gameObject6", children: [||]}|],
          },
        |],
      },
    |],
  },
|];

module Drag = {
  let isTriggerDragCurrentSceneTreeNode = targetGameObject =>
    /* DragEventBaseUtils.isTriggerDragDrop(
         targetGameObject,
         sourceGameObject,
         SceneTreeUtils.isWidget,
         SceneTreeUtils.isGameObjectRelationError,
       ); */
    DragEventBaseUtils.isTriggerDragEnter(
      targetGameObject,
      SceneTreeUtils.isWidget,
      SceneTreeUtils.isGameObjectRelationError,
    );

  let dragAssetWDBToSceneTree =
      (
        ~wdbNodeId,
        ~dispatchFunc=TestTool.getDispatch(),
        ~store=TestTool.buildEmptyAppState(),
        ~widget=AssetUtils.getWidget(),
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) => {
    DragEventUtils.handleDragStart(wdbNodeId, widget, dragImg, event);

    let wdbGameObjectUid =
      StateEditorService.getState()
      |> AssetWDBNodeMapEditorService.getWDBNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(wdbNodeId)
      |> (({wdbGameObject}) => wdbGameObject);
    MainEditorSceneTree.Method.dragWDBIntoScene(
      (store, dispatchFunc),
      (),
      wdbGameObjectUid,
    );

    DragEventUtils.handleDrageEnd(event);
  };

  let dragGameObjectIntoGameObject =
      (
        ~sourceGameObject,
        ~targetGameObject,
        ~dispatchFunc=TestTool.getDispatch(),
        ~store=TestTool.buildAppStateSceneGraphFromEngine(),
        (),
      ) =>
    MainEditorSceneTree.Method.dragGameObjectIntoGameObject(
      (store, dispatchFunc),
      (),
      (targetGameObject, sourceGameObject),
    );
};

module Select = {
  let selectGameObject =
      (
        ~dispatchFunc=TestTool.getDispatch(),
        ~store=TestTool.buildEmptyAppState(),
        ~gameObject,
        (),
      ) =>
    MainEditorSceneTree.Method.onSelect((store, dispatchFunc), gameObject);
};