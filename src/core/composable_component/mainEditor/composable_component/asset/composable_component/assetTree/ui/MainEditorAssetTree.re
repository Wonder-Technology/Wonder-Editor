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

  let _isNotRoot = uid =>
    (
      editorState =>
        editorState |> AssetTreeRootEditorService.getRootTreeNodeId != uid
    )
    |> StateLogicService.getEditorState;

  let buildAssetTreeNodeArray = (dragImg, (onSelect, onDrop), assetTreeRoot) => {
    let nodeMap =
      StateEditorService.getState()
      |> AssetNodeMapEditorService.unsafeGetNodeMap;
    let rec _iterateAssetTreeArray = (onSelect, onDrop, assetTreeArray) =>
      assetTreeArray
      |> Js.Array.map(({id, children}: assetTreeNodeType) => {
           let nodeResult =
             nodeMap |> WonderCommonlib.SparseMapService.unsafeGet(id);
           switch (nodeResult.type_) {
           | Folder =>
             /* TODO not judge hasItem; treeChildren not be option */
             ArrayService.hasItem(children) ?
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
                   onSelect,
                   onDrop,
                   AssetTreeUtils.handleFlag,
                   AssetUtils.isTreeNodeRelationError,
                 )
                 treeChildren=(
                   _iterateAssetTreeArray(onSelect, onDrop, children)
                 )
               /> :
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
                   onSelect,
                   onDrop,
                   AssetTreeUtils.handleFlag,
                   AssetUtils.isTreeNodeRelationError,
                 )
               />
           | _ => ReasonReact.nullElement
           };
         });
    _iterateAssetTreeArray(onSelect, onDrop, [|assetTreeRoot|]);
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = (store, dragImg, dispatchFunc, _self) =>
  <article key="assetTreeRoot" className="tree-content">
    (
      ReasonReact.arrayToElement(
        (
          editorState =>
            editorState
            |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
            |> Method.buildAssetTreeNodeArray(
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
  render: self => render(store, dragImg, dispatchFunc, self),
};