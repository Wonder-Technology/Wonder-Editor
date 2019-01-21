open NodeAssetType;

module Method = {
  let _isSelected = (selectedFolderNodeIdInAssetTree, nodeId) =>
    NodeAssetService.isIdEqual(nodeId, selectedFolderNodeIdInAssetTree);

  let _isActive =
      (selectedFolderNodeIdInAssetTree, currentNodeId, editorState) =>
    currentNodeId
    |> OptionService.andThenWithDefault(
         currentNodeId =>
           NodeAssetService.isIdEqual(
             currentNodeId,
             selectedFolderNodeIdInAssetTree,
           ),
         false,
       );

  let handleToggleShowTreeChildren =
      (uiState, dispatchFunc, targetId, isShowChildren) => {
    let editorState = StateEditorService.getState();

    OperateTreeAssetEditorService.setNodeIsShowChildren(
      targetId,
      isShowChildren,
      editorState,
    )
    /* AssetTreeUtils.setSpecificAssetTreeNodeIsShowChildren(
         targetId,
         isShowChildren,
         [|editorState |> TreeRootAssetEditorService.unsafeGetAssetTreeRoot|],
       )
       |> ArrayService.unsafeGetFirst
       |. TreeRootAssetEditorService.setAssetTreeRoot(editorState) */
    |> StateEditorService.setState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Project|])))
    |> ignore;
  };

  let _sortByName = folderNodes =>
    folderNodes
    |> Js.Array.sortInPlaceWith((node1, node2) =>
         Js.String.localeCompare(
           FolderNodeAssetService.getNodeName(
             FolderNodeAssetService.getNodeData(node2),
           )
           |> Js.String.charAt(0),
           FolderNodeAssetService.getNodeName(
             FolderNodeAssetService.getNodeData(node1),
           )
           |> Js.String.charAt(0),
         )
         |> NumberType.convertFloatToInt
       );

  let buildAssetTreeArray =
      (
        (uiState, dispatchFunc, dragImg),
        (onSelectFunc, onDropFunc),
        editorState,
      ) => {
    let selectedFolderNodeIdInAssetTree =
      TreeAssetEditorService.getSelectedFolderNodeIdInAssetTree(editorState);
    let currentNodeId =
      CurrentNodeIdAssetEditorService.getCurrentNodeId(editorState);

    let rec _build =
            (
              (selectedFolderNodeIdInAssetTree, currentNodeId),
              allFolderNodes,
              (uiState, dispatchFunc, dragImg),
              (onSelectFunc, onDropFunc),
              editorState,
            ) =>
      allFolderNodes
      |> _sortByName
      |> Js.Array.map(folderNode => {
           let nodeId = NodeAssetService.getNodeId(~node=folderNode);
           let name =
             FolderNodeAssetService.getNodeName(
               FolderNodeAssetService.getNodeData(folderNode),
             );

           <AssetTreeNode
             key=(StringService.intToString(nodeId))
             id=nodeId
             name
             isSelected=(_isSelected(selectedFolderNodeIdInAssetTree, nodeId))
             isActive=(
               _isActive(
                 selectedFolderNodeIdInAssetTree,
                 currentNodeId,
                 editorState,
               )
             )
             dragImg
             widget=(AssetWidgetService.getWidget())
             icon="./public/img/package.png"
             onSelect=onSelectFunc
             onDrop=onDropFunc
             isWidget=AssetWidgetService.isWidget
             isShowChildren=(
               FolderNodeAssetService.getIsShowChildren(folderNode)
             )
             isHasChildren=(FolderNodeAssetService.hasChildren(folderNode))
             handleToggleShowTreeChildren=(
               handleToggleShowTreeChildren(uiState, dispatchFunc)
             )
             checkNodeRelation=OperateTreeAssetLogicService.checkNodeRelation
             treeChildren=(
               _build(
                 (selectedFolderNodeIdInAssetTree, currentNodeId),
                 FolderNodeAssetService.getChildrenNodes(folderNode)
                 |> Js.Array.filter(node =>
                      FolderNodeAssetService.isFolderNode(node)
                    ),
                 (uiState, dispatchFunc, dragImg),
                 (onSelectFunc, onDropFunc),
                 editorState,
               )
             )
           />;
         });

    _build(
      (selectedFolderNodeIdInAssetTree, currentNodeId),
      [|RootTreeAssetEditorService.getRootNode(editorState)|],
      (uiState, dispatchFunc, dragImg),
      (onSelectFunc, onDropFunc),
      editorState,
    );
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = ((uiState, dispatchFunc), dragImg, _self) => {
  let editorState = StateEditorService.getState();

  <article key="assetTreeRoot" className="wonder-asset-assetTree">
    (
      ReasonReact.array(
        editorState
        |> Method.buildAssetTreeArray(
             (uiState, dispatchFunc, dragImg),
             (
               FolderNodeUtils.enterFolder(dispatchFunc),
               AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
                 (uiState, dispatchFunc),
                 (),
               ),
             ),
           ),
      )
    )
  </article>;
};

let make = (~uiState, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((uiState, dispatchFunc), dragImg, self),
};