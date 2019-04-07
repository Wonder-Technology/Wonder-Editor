open SceneGraphType;

/* let getSimpleSceneTree = () => [|
     {
       uid: 0,
       name: "root",
       children: [|
         {uid: 1, name: "gameObject1", children: [||]},
         {uid: 2, name: "gameObject2", children: [||]},
         {uid: 3, name: "gameObject3", children: [||]},
       |],
     },
   |]; */

/* let getTwoLayerSceneTree = () => [|
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
   |]; */

/* let getThreeLayerSceneTree = () => [|
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
   |]; */

module Drag = {
  let isTriggerDragCurrentSceneTreeNode = targetGameObject => {
    /* DragEventBaseUtils.isValidForDragDrop(
         targetGameObject,
         sourceGameObject,
         SceneTreeWidgetService.isWidget,
         CheckSceneTreeLogicService.checkGameObjectRelation,
       ); */

    let (isValid, _) =
      DragEventBaseUtils.isValidForDragEnter(
        targetGameObject,
        SceneTreeWidgetService.isWidget,
        CheckSceneTreeLogicService.checkGameObjectRelation,
      );

    isValid;
  };

  let dragWDBAssetToSceneTree =
      (
        ~wdbNodeId,
        ~targetGameObject=SceneEngineService.getSceneGameObject(
                            StateEngineService.unsafeGetState(),
                          ),
        ~dispatchFunc=TestTool.getDispatch(),
        ~uiState=TestTool.buildEmptyAppState(),
        ~widget=AssetWidgetService.getWidget(),
        ~effectEffectAllowd="move",
        ~dragImg=DomHelper.createElement("img"),
        ~event=BaseEventTool.buildDragEvent(.),
        ~dragPosition=SceneTreeNodeType.DragIntoTarget,
        (),
      ) => {
    /* DragEventUtils.handleDragStart(
         wdbNodeId,
         widget,
         dragImg,
         effectEffectAllowd,
         event,
       ); */

    let wdbGameObject =
      StateEditorService.getState()
      |> OperateTreeAssetEditorService.unsafeFindNodeById(wdbNodeId)
      |> WDBNodeAssetService.getWDBGameObject;

    MainEditorSceneTree.Method.dragWDBToBeTargetSib(
      (uiState, dispatchFunc),
      (),
      (targetGameObject, wdbGameObject, dragPosition),
    );
    /* DragEventUtils.handleDragEnd(event); */
  };

  let dragGameObjectToBeTargetSib =
      (
        ~sourceGameObject,
        ~targetGameObject,
        ~dragPosition=SceneTreeNodeType.DragIntoTarget,
        ~dispatchFunc=TestTool.getDispatch(),
        ~uiState=TestTool.buildEmptyAppState(),
        (),
      ) =>
    MainEditorSceneTree.Method.dragGameObjectToBeTargetSib(
      (uiState, dispatchFunc),
      (),
      (targetGameObject, sourceGameObject, dragPosition),
    );
};

module Select = {
  let selectGameObject =
      (
        ~dispatchFunc=TestTool.getDispatch(),
        ~uiState=TestTool.buildEmptyAppState(),
        ~gameObject,
        (),
      ) => {
    GameObjectTool.clearCurrentSceneTreeNode();

    MainEditorSceneTree.Method.onSelect((uiState, dispatchFunc), gameObject);
  };
};