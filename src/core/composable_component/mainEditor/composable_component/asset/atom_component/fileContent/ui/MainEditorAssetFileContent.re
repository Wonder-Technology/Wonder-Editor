open FileType;

module Method = {
  let getSign = () => "fileContent";
  let showSpecificTreeNodeJson = (fileMap, jsonArr) =>
    jsonArr
    |> Js.Array.map(
         (jsonId) =>
           fileMap
           |> WonderCommonlib.SparseMapService.unsafeGet(jsonId)
           |> (
             ({name, result} as jsonResult) =>
               <div className="file-item" key=(DomHelper.getRandomKey())>
                 <img
                   src="./public/img/12.jpg"
                   onDragStart=(EventUtils.dragStart(jsonId, getSign()))
                 />
                 <span className="item-text"> (DomHelper.textEl(name)) </span>
               </div>
           )
       );
  let showSpecificTreeNodeImage = (fileMap, imgArr) =>
    imgArr
    |> Js.Array.map(
         (imgId) =>
           fileMap
           |> WonderCommonlib.SparseMapService.unsafeGet(imgId)
           |> (
             ({name, result} as imgResult) =>
               <div className="file-item" key=(DomHelper.getRandomKey())>
                 <img src=result onDragStart=(EventUtils.dragStart(imgId, getSign())) />
                 <span className="item-text"> (DomHelper.textEl(name)) </span>
               </div>
           )
       );
  let buildContent = () => {
    let editorState = StateEditorService.getState();
    let currentTreeNode =
      editorState
      |> AssetUtils.getRootTreeNode
      |> AssetUtils.getSpecificTreeNodeById(editorState |> AssetUtils.getTargetTreeNodeId);
    let fileMap = editorState |> AssetEditorService.getFileMap;
    switch currentTreeNode {
    | Some(treeNode_) =>
      treeNode_.imgArray
      |> showSpecificTreeNodeImage(fileMap)
      |> Js.Array.concat(treeNode_.jsonArray |> showSpecificTreeNodeJson(fileMap))
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="buildContent",
          ~description={j|the treeNode:$currentTreeNode not exist in assetTree|j},
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
    (ReasonReact.arrayToElement(Method.buildContent()))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};