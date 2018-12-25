open NodeAssetType;

module Method = {
  let _isSelected = (selectedFolderNodeInAssetTree, nodeId) =>
    NodeAssetService.isIdEqual(
      nodeId,
      NodeAssetService.getNodeId(~node=selectedFolderNodeInAssetTree),
    );

  let _isActive = (selectedFolderNodeInAssetTree, currentNode, editorState) =>
    currentNode
    |> OptionService.andThenWithDefault(
         currentNode =>
           NodeAssetService.isNodeEqualById(
             ~sourceNode=selectedFolderNodeInAssetTree,
             ~targetNode=currentNode,
           ),
         false,
       );

  let handleToggleShowTreeChildren =
      (store, dispatchFunc, targetId, isShowChildren) => {
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
        (store, dispatchFunc, dragImg),
        (onSelectFunc, onDropFunc),
        editorState,
      ) => {
    let selectedFolderNodeInAssetTree =
      TreeAssetEditorService.getSelectedFolderNodeInAssetTree(editorState);
    let currentNode =
      CurrentNodeAssetEditorService.getCurrentNode(editorState);

    let rec _build =
            (
              (selectedFolderNodeInAssetTree, currentNode),
              allFolderNodes,
              (store, dispatchFunc, dragImg),
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
             isSelected=(_isSelected(selectedFolderNodeInAssetTree, nodeId))
             isActive=(
               _isActive(
                 selectedFolderNodeInAssetTree,
                 currentNode,
                 editorState,
               )
             )
             dragImg
             widget=(AssetUtils.getWidget())
             icon="./public/img/package.png"
             onSelect=onSelectFunc
             onDrop=onDropFunc
             isWidget=AssetUtils.isWidget
             isShowChildren=(
               FolderNodeAssetService.getIsShowChildren(folderNode)
             )
             isHasChildren=(FolderNodeAssetService.hasChildren(folderNode))
             handleToggleShowTreeChildren=(
               handleToggleShowTreeChildren(store, dispatchFunc)
             )
             checkNodeRelation=OperateTreeAssetLogicService.checkNodeRelation
             treeChildren=(
               _build(
                 (selectedFolderNodeInAssetTree, currentNode),
                 FolderNodeAssetService.getChildrenNodes(folderNode),
                 (store, dispatchFunc, dragImg),
                 (onSelectFunc, onDropFunc),
                 editorState,
               )
             )
           />;
         });

    _build(
      (selectedFolderNodeInAssetTree, currentNode),
      FolderNodeAssetEditorService.findAllFolderNodes(editorState),
      (store, dispatchFunc, dragImg),
      (onSelectFunc, onDropFunc),
      editorState,
    );
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = ((store, dispatchFunc), dragImg, _self) => {
  let editorState = StateEditorService.getState();

  <article key="assetTreeRoot" className="wonder-asset-assetTree">
    (
      ReasonReact.array(
        editorState
        |> Method.buildAssetTreeArray(
             (store, dispatchFunc, dragImg),
             (
               FolderNodeUtils.enterFolder(dispatchFunc),
               AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
                 (store, dispatchFunc),
                 (),
               ),
             ),
           ),
      )
    )
  </article>;
};

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, self),
};