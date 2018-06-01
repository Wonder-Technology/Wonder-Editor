open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = (currentNodeParentId, id) =>
    AssetUtils.getTargetTreeNodeId(currentNodeParentId)
    |> StateLogicService.getEditorState === id ?
      true : false;

  let _isActive = currentNodeParentId =>
    switch (
      AssetCurrentNodeIdEditorService.getCurrentNodeId
      |> StateLogicService.getEditorState
    ) {
    | None => false
    | Some(currentNodeId) =>
      AssetUtils.isIdEqual(
        AssetUtils.getTargetTreeNodeId(currentNodeParentId)
        |> StateLogicService.getEditorState,
        currentNodeId,
      ) ?
        true : false
    };

  let _isNotRoot = uid =>
    (
      editorState =>
        editorState |> AssetTreeRootEditorService.getRootTreeNodeId != uid
    )
    |> StateLogicService.getEditorState;
  let buildAssetTreeNodeArray =
      ((currentNodeParentId, dragImg), (onSelect, onDrop), assetTreeRoot) => {
    let rec _iterateAssetTreeArray = (onSelect, onDrop, assetTreeArray) =>
      assetTreeArray
      |> Array.map(({id, children}: assetTreeNodeType) => {
           let nodeResult =
             StateEditorService.getState()
             |> AssetNodeMapEditorService.unsafeGetNodeMap
             |> WonderCommonlib.SparseMapService.unsafeGet(id);
           switch (nodeResult.type_) {
           | Folder =>
             ArrayService.hasItem(children) ?
               <TreeNode
                 key=(DomHelper.getRandomKey())
                 attributeTuple=(
                   id,
                   nodeResult.name,
                   _isSelected(currentNodeParentId, id),
                   _isActive(currentNodeParentId),
                   dragImg,
                   AssetTreeUtils.getAssetTreeSign(),
                   Some("./public/img/12.jpg"),
                   Some(_isNotRoot(id)),
                 )
                 eventHandleTuple=(
                   onSelect,
                   onDrop,
                   AssetTreeUtils.handleSign,
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
                   _isSelected(currentNodeParentId, id),
                   _isActive(currentNodeParentId),
                   dragImg,
                   AssetTreeUtils.getAssetTreeSign(),
                   Some("./public/img/12.jpg"),
                   Some(_isNotRoot(id)),
                 )
                 eventHandleTuple=(
                   onSelect,
                   onDrop,
                   AssetTreeUtils.handleSign,
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

let render =
    (
      store,
      (dragImg, currentNodeParentId),
      (dispatchFunc, setNodeParentId, silentSetNodeParentId),
      _self,
    ) =>
  <article key="assetTreeRoot" className="tree-content">
    (
      ReasonReact.arrayToElement(
        (
          editorState =>
            editorState
            |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
            |> Method.buildAssetTreeNodeArray(
                 (currentNodeParentId, dragImg),
                 (
                   AssetTreeUtils.onSelect((
                     setNodeParentId,
                     silentSetNodeParentId,
                     dispatchFunc,
                   )),
                   AssetTreeUtils.onDrop(dispatchFunc),
                 ),
               )
        )
        |> StateLogicService.getEditorState,
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