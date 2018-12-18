open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = nodeId =>
    AssetTreeUtils.getTargetTreeNodeId
    |> StateLogicService.getEditorState === nodeId;

  let _isActive = () => {
    let editorState = StateEditorService.getState();

    switch (CurrentNodeDataAssetEditorService.getCurrentNodeData(editorState)) {
    | None => false
    | Some({currentNodeId}) =>
      TreeAssetEditorService.isIdEqual(
        AssetTreeUtils.getTargetTreeNodeId(editorState),
        currentNodeId,
      )
    };
  };

  let _isNotRoot = nodeId =>
    StateEditorService.getState()
    |> TreeRootAssetEditorService.getRootTreeNodeId != nodeId;

  let handleToggleShowTreeChildren =
      (store, dispatchFunc, targetId, isShowChildren) => {
    let editorState = StateEditorService.getState();

    AssetTreeUtils.setSpecificAssetTreeNodeIsShowChildren(
      targetId,
      isShowChildren,
      [|editorState |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot|],
    )
    |> ArrayService.unsafeGetFirst
    |. TreeRootAssetEditorService.setAssetTreeRoot(editorState)
    |> StateEditorService.setState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };

  let _getNodeNameByType = ({nodeId, type_}, editorState) =>
    switch (type_) {
    | Folder =>
      let {name}: folderResultType =
        editorState
        |> FolderNodeMapAssetEditorService.getFolderNodeMap
        |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

      name;
    | type_ =>
      ConsoleUtils.error(
        LogUtils.buildErrorMessage(
          ~description={j|unknown type: $type_|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
        editorState,
      );

      "";
    };

  let _sortByName = (assetTreeArray, editorState) =>
    assetTreeArray
    |> Js.Array.filter(({type_}) => type_ === Folder)
    |> Js.Array.sortInPlaceWith((node1, node2) =>
         Js.String.localeCompare(
           _getNodeNameByType(node2, editorState) |> Js.String.charAt(0),
           _getNodeNameByType(node1, editorState) |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let buildAssetTreeArray =
      (
        (store, dispatchFunc, dragImg),
        (onSelectFunc, onDropFunc),
        assetTreeArray,
        editorState,
      ) => {
    let rec _iterateAssetTreeArray = (assetTreeArray, editorState) =>
      assetTreeArray
      |> _sortByName(_, editorState)
      |> Js.Array.map(({nodeId, type_, isShowChildren, children}) =>
           switch (type_) {
           | Folder =>
             let {name}: folderResultType =
               StateEditorService.getState()
               |> FolderNodeMapAssetEditorService.getFolderNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             <AssetTreeNode
               key=(StringService.intToString(nodeId))
               id=nodeId
               name
               isSelected=(_isSelected(nodeId))
               isActive=(_isActive())
               dragImg
               widget=(AssetUtils.getWidget())
               icon="./public/img/package.png"
               onSelect=(onSelectFunc(type_))
               onDrop=onDropFunc
               isWidget=AssetUtils.isWidget
               isShowChildren
               isHasChildren=(
                 children
                 |> Js.Array.filter(({type_}) => type_ === Folder)
                 |> Js.Array.length >= 1
               )
               handleToggleShowTreeChildren=(
                 handleToggleShowTreeChildren(store, dispatchFunc)
               )
               handleRelationError=AssetTreeUtils.isTreeNodeRelationError
               treeChildren=(_iterateAssetTreeArray(children, editorState))
             />;

           | _ => ReasonReact.null
           }
         );

    _iterateAssetTreeArray(assetTreeArray, editorState);
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = ((store, dispatchFunc), dragImg, _self) => {
  let editorState = StateEditorService.getState();

  <article key="assetTreeRoot" className="wonder-asset-assetTree">
    (
      ReasonReact.array(
        editorState
        |> AssetTreeUtils.buildAssetTreeArray
        |> Method.buildAssetTreeArray(
             (store, dispatchFunc, dragImg),
             (
               AssetTreeUtils.enterFolder(dispatchFunc),
               AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
                 (store, dispatchFunc),
                 (),
               ),
             ),
             _,
             editorState,
           ),
      )
    )
  </article>;
};

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, self),
};