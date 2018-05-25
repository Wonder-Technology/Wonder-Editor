open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let handleSign = (startSign) =>
    startSign === AssetTreeUtils.getSign() || startSign === "assetChildrenNode";
  /* let handleFileToFolder = (dispatch, targetTreeNodeId, fileId) => {
       let editorState = StateEditorService.getState();
       let fileType = editorState |> AssetTreeNodeUtils.getFileTypeByFileId(fileId);
       let removedTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;
       AssetUtils.isIdEqual(targetTreeNodeId, removedTreeNodeId) ?
         dispatch(AppStore.ReLoad) :
         {
           AssetTreeRootEditorService.setAssetTreeRoot(
             editorState
             |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
             |> AssetUtils.removeFileFromTargetTreeNode(removedTreeNodeId, fileId, fileType)
             |> AssetUtils.addFileIntoTargetTreeNode(targetTreeNodeId, fileId, fileType)
           )
           |> StateLogicService.getAndSetEditorState;
           dispatch(AppStore.ReLoad)
         }
     };
     let handleFolderToFolder = (dispatch, targetId, removedId) => {
       let editorState = StateEditorService.getState();
       let assetTreeRoot = editorState |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot;
       AssetUtils.isIdEqual(targetId, removedId) ?
         dispatch(AppStore.ReLoad) :
         {
           let (newAssetTree, removedTreeNode) =
             assetTreeRoot |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
           editorState
           |> AssetTreeRootEditorService.setAssetTreeRoot(
                AssetUtils.insertNewTreeNodeToTargetTreeNode(targetId, removedTreeNode, newAssetTree)
              )
           |> StateEditorService.setState;
           dispatch(AppStore.ReLoad)
         }
     };
     let onDrop = (dispatch, (targetId, removedId, currentSign)) =>
       switch currentSign {
       | currentSign when currentSign === AssetTreeUtils.getSign() =>
         handleFolderToFolder(dispatch, targetId, removedId)
       | currentSign when currentSign === MainEditorAssetChildrenNode.Method.getSign() =>
         handleFileToFolder(dispatch, targetId, removedId)
       | _ => WonderLog.Log.log({j|can't drop to AssetTree|j})
       }; */
  let onDrop = (dispatch, (targetId, removedId, currentSign)) =>
    WonderLog.Log.print((targetId, removedId)) |> ignore;
  let _isCurrentAssetChildrenNodeParent = (id) =>
    AssetUtils.getTargetTreeNodeId |> StateLogicService.getEditorState === id ? true : false;
  let _isNotRoot = (uid) =>
    ((editorState) => editorState |> AssetTreeRootEditorService.getRootTreeNodeId != uid)
    |> StateLogicService.getEditorState;
  /* let rec buildAssetTreeArray = (node, resultArr) =>{
     handle    node.id

     push resultArr



         node.children |> WonderCommonlib.ArrayService.reduceOneParam([@bs] (resultArr, childNode) => {
     buildAssetTreeArray(childNode, resultArr);

         }, resultArr);

         resultArr
       };

       buildAssetTreeArray(assetTreeRoot, [||]) */
  let buildAssetTreeNodeArray = (onSelect, onDrop, assetTreeRoot) => {
    let rec _iterateAssetTreeArray = (onSelect, onDrop, assetTreeArray) =>
      assetTreeArray
      |> Array.map(
           ({id, children}: assetTreeNodeType) => {
             let nodeResult =
               StateEditorService.getState()
               |> AssetNodeMapEditorService.unsafeGetNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(id);
             switch nodeResult.type_ {
             | Folder =>
               ArrayService.hasItem(children) ?
                 <TreeNode
                   key=(DomHelper.getRandomKey())
                   attributeTuple=(id, nodeResult.name, _isCurrentAssetChildrenNodeParent(id))
                   eventHandleTuple=(
                     onSelect,
                     onDrop,
                     handleSign,
                     AssetUtils.isTreeNodeRelationError
                   )
                   sign=(AssetTreeUtils.getSign())
                   icon="./public/img/12.jpg"
                   dragable=(_isNotRoot(id))
                   treeChildren=(_iterateAssetTreeArray(onSelect, onDrop, children))
                 /> :
                 <TreeNode
                   key=(DomHelper.getRandomKey())
                   attributeTuple=(id, nodeResult.name, _isCurrentAssetChildrenNodeParent(id))
                   eventHandleTuple=(
                     onSelect,
                     onDrop,
                     handleSign,
                     AssetUtils.isTreeNodeRelationError
                   )
                   sign=(AssetTreeUtils.getSign())
                   icon="./public/img/12.jpg"
                   dragable=(_isNotRoot(id))
                 />
             | _ => ReasonReact.nullElement
             }
           }
         );
    _iterateAssetTreeArray(onSelect, onDrop, [|assetTreeRoot|])
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = (store, dispatch, _self) =>
  <article key="assetTreeRoot" className="tree-content">
    (
      ReasonReact.arrayToElement(
        (
          (editorState) =>
            editorState
            |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
            |> Method.buildAssetTreeNodeArray(
                 AssetTreeUtils.onSelect(dispatch),
                 Method.onDrop(dispatch)
               )
        )
        |> StateLogicService.getEditorState
      )
    )
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};