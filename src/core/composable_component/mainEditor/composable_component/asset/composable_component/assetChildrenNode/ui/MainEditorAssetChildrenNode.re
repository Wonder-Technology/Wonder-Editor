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
        (store, dispatchFunc),
        (dragImg, nodeMap, currentNodeId),
        assetTreeNodeChildrenArr,
      ) =>
    assetTreeNodeChildrenArr
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
               AssetTreeUtils.getFlag(),
             )
             funcTuple=(
               AssetTreeUtils.onDrop(dispatchFunc),
               AssetTreeUtils.handleFlag,
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
               AssetTreeUtils.getFlag(),
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
               AssetTreeUtils.getFlag(),
               _isSelected(currentNodeId, id),
             )
           />
         | _ =>
           WonderLog.Log.fatal(
             WonderLog.Log.buildFatalMessage(
               ~title="showSpecificTreeNodeChildren",
               ~description={j|unknown type_: $type_|j},
               ~reason="",
               ~solution={j||j},
               ~params={j||j},
             ),
           )
         };
       });

  let buildContent = ((store, dispatchFunc), dragImg) => {
    let editorState = StateEditorService.getState();

    editorState
    |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(
         editorState |> AssetUtils.getTargetTreeNodeId,
       )
    |> OptionService.unsafeGet
    |> (currentParentNode => currentParentNode.children)
    |> showSpecificTreeNodeChildren(
         (store, dispatchFunc),
         (
           dragImg,
           editorState |> AssetNodeMapEditorService.unsafeGetNodeMap,
           editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId,
         ),
       );
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = ((store, dispatchFunc), dragImg, _self) =>
  <article key="assetChildrenNode" className="wonder-asset-assetChildren">
    (
      ReasonReact.arrayToElement(
        Method.buildContent((store, dispatchFunc), dragImg),
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, self),
};