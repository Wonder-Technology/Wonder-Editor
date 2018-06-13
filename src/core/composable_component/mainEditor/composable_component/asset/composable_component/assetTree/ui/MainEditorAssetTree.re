open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = id =>
    AssetUtils.getTargetTreeNodeId |> StateLogicService.getEditorState === id;

  let _isActive = () =>
    switch (
      AssetCurrentNodeIdEditorService.getCurrentNodeId
      |> StateLogicService.getEditorState
    ) {
    | None => false
    | Some(currentNodeId) =>
      AssetUtils.isIdEqual(
        AssetUtils.getTargetTreeNodeId |> StateLogicService.getEditorState,
        currentNodeId,
      )
    };

  let _isNotRoot = id =>
    (
      editorState =>
        editorState |> AssetTreeRootEditorService.getRootTreeNodeId != id
    )
    |> StateLogicService.getEditorState;

  let buildAssetTreeArray =
      (dragImg, (onSelectFunc, onDropFunc), assetTreeRoot) => {
    let nodeMap =
      StateEditorService.getState()
      |> AssetNodeMapEditorService.unsafeGetNodeMap;
    let rec _iterateAssetTreeArray =
            (onSelectFunc, onDropFunc, assetTreeArray) =>
      assetTreeArray
      |> Js.Array.map(({id, children}: assetTreeNodeType) => {
           let nodeResult =
             nodeMap |> WonderCommonlib.SparseMapService.unsafeGet(id);
           switch (nodeResult.type_) {
           | Folder =>
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(
                 id,
                 nodeResult.name,
                 _isSelected(id),
                 _isActive(),
                 dragImg,
                 AssetTreeUtils.getFlag(),
                 Some("./public/img/12.jpg"),
                 Some(_isNotRoot(id)),
               )
               funcTuple=(
                 onSelectFunc,
                 onDropFunc,
                 AssetTreeUtils.handleFlag,
                 AssetUtils.isTreeNodeRelationError,
               )
               treeChildren=(
                 _iterateAssetTreeArray(onSelectFunc, onDropFunc, children)
               )
             />

           | _ => ReasonReact.nullElement
           };
         });
    _iterateAssetTreeArray(onSelectFunc, onDropFunc, [|assetTreeRoot|]);
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = ((store, dispatchFunc), dragImg, _self) =>
  <article key="assetTreeRoot" className="wonder-asset-assetTree">
    (
      ReasonReact.arrayToElement(
        (
          editorState =>
            editorState
            |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
            |> Method.buildAssetTreeArray(
                 dragImg,
                 (
                   AssetTreeUtils.onSelect(dispatchFunc),
                   AssetTreeUtils.onDrop(dispatchFunc),
                 ),
               )
        )
        |> StateLogicService.getEditorState,
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, self),
};