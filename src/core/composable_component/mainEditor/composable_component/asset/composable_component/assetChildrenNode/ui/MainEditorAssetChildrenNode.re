/* open FileType;

module Method = {
  let getSign = () => "fileContent";
  let showSpecificTreeNodeJson = (store, dispatch, nodeMap, currentAssetTreeNode, jsonArr) =>
    jsonArr
    |> Js.Array.map(
         (jsonId) =>
           nodeMap
           |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
           |> (
             ({name}) =>
               <FileBox
                 key=(DomHelper.getRandomKey())
                 store
                 dispatch
                 imgSrc="./public/img/12.jpg"
                 fileId=jsonId
                 fileName=name
                 sign=(getSign())
                 isSelected=(
                   switch currentAssetTreeNode {
                   | None => false
                   | Some(fileId) => AssetUtils.isIdEqual(fileId, jsonId)
                   }
                 )
               />
           )
       );
  let showSpecificTreeNodeImage = (store, dispatch, nodeMap, currentAssetTreeNode, imgArr) =>
    imgArr
    |> Js.Array.map(
         (imgId) =>
           nodeMap
           |> WonderCommonlib.SparseMapService.unsafeGet(imgId)
           |> (
             ({name, result}) =>
               <FileBox
                 key=(DomHelper.getRandomKey())
                 store
                 dispatch
                 imgSrc=result
                 fileId=imgId
                 fileName=name
                 sign=(getSign())
                 isSelected=(
                   switch currentAssetTreeNode {
                   | None => false
                   | Some(fileId) => AssetUtils.isIdEqual(fileId, imgId)
                   }
                 )
               />
           )
       );
  let showSpecificTreeNodeChildren = (store, dispatch, currentAssetTreeNode, assetTreeChildren) =>
    assetTreeChildren
    |> Js.Array.map(
         ({id, name}: AssetChildrenNodeParentType.assetTreeNodeType) =>
           <FolderBox
             key=(DomHelper.getRandomKey())
             store
             dispatch
             imgSrc="./public/img/11.jpg"
             folderId=id
             name
             isSelected=(
               switch currentAssetTreeNode {
               | None => false
               | Some(fileId) => AssetUtils.isIdEqual(id, fileId)
               }
             )
             sign=(AssetTreeUtils.getSign())
           />
       );
  let buildContent = (store, dispatch) => {
    let editorState = StateEditorService.getState();
    let currentAssetChildrenNodeParent =
      editorState
      |> AssetUtils.getRootTreeNode
      |> AssetUtils.getSpecificTreeNodeById(editorState |> AssetUtils.getTargetTreeNodeId);
    let currentAssetTreeNode = editorState |> AssetEditorService.getCurrentAssetTreeNode;
    let nodeMap = editorState |> AssetEditorService.unsafeGetNodeMap;
    switch currentAssetChildrenNodeParent {
    | Some((treeNode_: AssetChildrenNodeParentType.assetTreeNodeType)) =>
      treeNode_.children
      |> showSpecificTreeNodeChildren(store, dispatch, currentAssetTreeNode)
      |> Js.Array.concat(
           treeNode_.imgArray |> showSpecificTreeNodeImage(store, dispatch, nodeMap, currentAssetTreeNode)
         )
      |> Js.Array.concat(
           treeNode_.jsonArray |> showSpecificTreeNodeJson(store, dispatch, nodeMap, currentAssetTreeNode)
         )
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="buildContent",
          ~description={j|the treeNode:$currentAssetChildrenNodeParent not exist in assetTree|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
      )
    }
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dispatch, _self) =>
  <article key="assetHeader" className="asset-content">
    (ReasonReact.arrayToElement(Method.buildContent(store, dispatch)))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
}; */