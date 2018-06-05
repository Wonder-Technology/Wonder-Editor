open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = (currentNodeId, id) =>
    switch (currentNodeId) {
    | None => false
    | Some(nodeId) => AssetUtils.isIdEqual(id, nodeId)
    };

  let showSpecificTreeNodeChildren =
      (
        store,
        (dragImg, nodeMap, currentNodeId),
        dispatchFunc,
        assetTreeNodeChildren,
      ) =>
    assetTreeNodeChildren
    |> Js.Array.map(({id}: assetTreeNodeType) => {
         let {name, type_, result} =
           nodeMap |> WonderCommonlib.SparseMapService.unsafeGet(id);
         switch (type_) {
         | Folder =>
           <FolderBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             attributeTuple=(
               dragImg,
               "./public/img/11.jpg",
               id,
               name,
               _isSelected(currentNodeId, id),
               AssetTreeUtils.getAssetTreeSign(),
             )
             funcTuple=(
               AssetTreeUtils.onDrop(dispatchFunc),
               AssetTreeUtils.handleSign,
               AssetUtils.isTreeNodeRelationError,
             )
           />
         | Image =>
           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             attributeTuple=(
               dragImg,
               result |> OptionService.unsafeGet,
               id,
               name,
               AssetTreeUtils.getAssetTreeSign(),
               _isSelected(currentNodeId, id),
             )
           />
         | Json =>
           <FileBox
             key=(DomHelper.getRandomKey())
             store
             dispatchFunc
             attributeTuple=(
               dragImg,
               "./public/img/12.jpg",
               id,
               name,
               AssetTreeUtils.getAssetTreeSign(),
               _isSelected(currentNodeId, id),
             )
           />
         | _ =>
           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="showSpecificTreeNodeChildren",
               ~description={j||j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
           )
         };
       });

  let buildContent = ((store, dragImg), dispatchFunc) => {
    let editorState = StateEditorService.getState();
    editorState
    |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(
         editorState |> AssetUtils.getTargetTreeNodeId,
       )
    |> OptionService.unsafeGet
    |> (currentParentNode => currentParentNode.children)
    |> showSpecificTreeNodeChildren(
         store,
         (
           dragImg,
           editorState |> AssetNodeMapEditorService.unsafeGetNodeMap,
           editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId,
         ),
         dispatchFunc,
       );
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dragImg, dispatchFunc, _self) =>
  <article key="assetChildrenNode" className="asset-content">
    (
      ReasonReact.arrayToElement(
        Method.buildContent((store, dragImg), dispatchFunc),
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render(store, dragImg, dispatchFunc, self),
};