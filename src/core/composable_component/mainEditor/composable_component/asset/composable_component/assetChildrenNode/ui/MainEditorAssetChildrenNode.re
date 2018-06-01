open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let isIdEqualCurrentNodeId = (currentNodeId, id) =>
    switch (currentNodeId) {
    | None => false
    | Some(nodeId) => AssetUtils.isIdEqual(id, nodeId)
    };
  /* TODO refactor make param: store, attributeTuple, funcTuple, any other option params */
  let showSpecificTreeNodeChildren =
      (
        store,
        (dragImg, nodeMap, currentNodeId),
        (setNodeParentId, silentSetNodeParentId, dispatchFunc),
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
               isIdEqualCurrentNodeId(currentNodeId, id),
               AssetTreeUtils.getAssetTreeSign(),
             )
             funcTuple=(
               AssetTreeUtils.onDrop(dispatchFunc),
               AssetTreeUtils.handleSign,
               AssetUtils.isTreeNodeRelationError,
               setNodeParentId,
               silentSetNodeParentId,
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
               isIdEqualCurrentNodeId(currentNodeId, id),
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
               isIdEqualCurrentNodeId(currentNodeId, id),
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
  let buildContent =
      (
        (store, dragImg, currentNodeParentId),
        (setNodeParentId, silentSetNodeParentId, dispatchFunc),
      ) => {
    let editorState = StateEditorService.getState();
    editorState
    |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(
         editorState |> AssetUtils.getTargetTreeNodeId(currentNodeParentId),
       )
    |> OptionService.unsafeGet
    |> (currentNodeParentId => currentNodeParentId.children)
    |> showSpecificTreeNodeChildren(
         store,
         (
           dragImg,
           editorState |> AssetNodeMapEditorService.unsafeGetNodeMap,
           editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId,
         ),
         (setNodeParentId, silentSetNodeParentId, dispatchFunc),
       );
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render =
    (
      store,
      (dragImg, currentNodeParentId),
      (dispatchFunc, setNodeParentId, silentSetNodeParentId),
      self,
    ) =>
  <article key="assetChildrenNode" className="asset-content">
    (
      ReasonReact.arrayToElement(
        Method.buildContent(
          (store, dragImg, currentNodeParentId),
          (setNodeParentId, silentSetNodeParentId, dispatchFunc),
        ),
      )
    )
  </article>;

let make =
    (
      ~store,
      ~dispatchFunc,
      ~dragImg,
      ~currentNodeParentId,
      ~setNodeParentId,
      ~silentSetNodeParentId,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      store,
      (dragImg, currentNodeParentId),
      (dispatchFunc, setNodeParentId, silentSetNodeParentId),
      self,
    ),
};