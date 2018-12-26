open SceneGraphType;

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

module Drag = {
  let isTriggerDragCurrentSceneTreeNode = targetGameObject => {
    /* DragEventBaseUtils.checkDragDrop(
         targetGameObject,
         sourceGameObject,
         SceneTreeWidgetService.isWidget,
         CheckSceneTreeLogicService.isGameObjectRelationError,
       ); */

    let (isTrigger, _) =
      DragEventBaseUtils.checkDragEnter(
        targetGameObject,
        SceneTreeWidgetService.isWidget,
        CheckSceneTreeLogicService.isGameObjectRelationError,
      );

    isTrigger;
  };

  let dragWDBAssetToSceneTree =
      (
        ~wdbNodeId,
        ~targetGameObject=SceneEngineService.getSceneGameObject(
                            StateEngineService.unsafeGetState(),
                          ),
        ~dispatchFunc=TestTool.getDispatch(),
        ~store=TestTool.buildEmptyAppState(),
        ~widget=AssetWidgetService.getWidget(),
        ~effectEffectAllowd="move",
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        (),
      ) => {
    /* DragEventUtils.handleDragStart(
         wdbNodeId,
         widget,
         dragImg,
         effectEffectAllowd,
         event,
       ); */

    let wdbGameObjectUid =
      StateEditorService.getState()
      |> OperateTreeAssetEditorService.unsafeFindNodeById(wdbNodeId)
      |> WDBNodeAssetService.getWDBGameObject;

    MainEditorSceneTree.Method.dragWDBIntoScene(
      (store, dispatchFunc),
      (),
      (targetGameObject, wdbGameObjectUid),
    );
    /* DragEventUtils.handleDragEnd(event); */
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