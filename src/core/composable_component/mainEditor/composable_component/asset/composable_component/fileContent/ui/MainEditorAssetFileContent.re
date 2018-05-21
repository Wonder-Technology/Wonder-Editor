open FileType;

module Method = {
  let getSign = () => "fileContent";
  let showSpecificTreeNodeJson = (store, dispatch, fileMap, currentAssetFileNode, jsonArr) =>
    jsonArr
    |> Js.Array.map(
         (jsonId) =>
           fileMap
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
                   switch currentAssetFileNode {
                   | None => false
                   | Some(fileId) => AssetUtils.isIdEqual(fileId, jsonId)
                   }
                 )
               />
           )
       );
  let showSpecificTreeNodeImage = (store, dispatch, fileMap, currentAssetFileNode, imgArr) =>
    imgArr
    |> Js.Array.map(
         (imgId) =>
           fileMap
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
                   switch currentAssetFileNode {
                   | None => false
                   | Some(fileId) => AssetUtils.isIdEqual(fileId, imgId)
                   }
                 )
               />
           )
       );
  let showSpecificTreeNodeChildren = (store, dispatch, currentAssetFileNode, assetTreeChildren) =>
    assetTreeChildren
    |> Js.Array.map(
         ({id, name}: AssetTreeNodeType.assetTreeNodeType) =>
           <FolderBox
             key=(DomHelper.getRandomKey())
             store
             dispatch
             imgSrc="./public/img/11.jpg"
             folderId=id
             name
             isSelected=(
               switch currentAssetFileNode {
               | None => false
               | Some(fileId) => AssetUtils.isIdEqual(id, fileId)
               }
             )
             sign=(AssetTreeUtils.getSign())
           />
       );
  let buildContent = (store, dispatch) => {
    let editorState = StateEditorService.getState();
    let currentAssetTreeNode =
      editorState
      |> AssetUtils.getRootTreeNode
      |> AssetUtils.getSpecificTreeNodeById(editorState |> AssetUtils.getTargetTreeNodeId);
    let currentAssetFileNode = editorState |> AssetEditorService.getCurrentAssetFileNode;
    let fileMap = editorState |> AssetEditorService.unsafeGetFileMap;
    switch currentAssetTreeNode {
    | Some((treeNode_: AssetTreeNodeType.assetTreeNodeType)) =>
      treeNode_.children
      |> showSpecificTreeNodeChildren(store, dispatch, currentAssetFileNode)
      |> Js.Array.concat(
           treeNode_.imgArray |> showSpecificTreeNodeImage(store, dispatch, fileMap, currentAssetFileNode)
         )
      |> Js.Array.concat(
           treeNode_.jsonArray |> showSpecificTreeNodeJson(store, dispatch, fileMap, currentAssetFileNode)
         )
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="buildContent",
          ~description={j|the treeNode:$currentAssetTreeNode not exist in assetTree|j},
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
};