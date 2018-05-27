open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = (currentNodeParentId, id) =>
    AssetUtils.getTargetTreeNodeId(currentNodeParentId) |> StateLogicService.getEditorState === id ?
      true : false;
  let _isActive = (currentNodeParentId) =>
    switch (AssetCurrentNodeIdEditorService.getCurrentNodeId |> StateLogicService.getEditorState) {
    | None => false
    | Some(currentNodeId) =>
      AssetUtils.isIdEqual(
        AssetUtils.getTargetTreeNodeId(currentNodeParentId) |> StateLogicService.getEditorState,
        currentNodeId
      ) ?
        true : false
    };
  let _isNotRoot = (uid) =>
    ((editorState) => editorState |> AssetTreeRootEditorService.getRootTreeNodeId != uid)
    |> StateLogicService.getEditorState;
  let buildAssetTreeNodeArray = (currentNodeParentId, onSelect, onDrop, assetTreeRoot) => {
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
                   attributeTuple=(
                     id,
                     nodeResult.name,
                     _isSelected(currentNodeParentId, id),
                     _isActive(currentNodeParentId)
                   )
                   eventHandleTuple=(
                     onSelect,
                     onDrop,
                     AssetTreeUtils.handleSign,
                     AssetUtils.isTreeNodeRelationError
                   )
                   sign=(AssetTreeUtils.getAssetTreeSign())
                   icon="./public/img/12.jpg"
                   dragable=(_isNotRoot(id))
                   treeChildren=(_iterateAssetTreeArray(onSelect, onDrop, children))
                 /> :
                 <TreeNode
                   key=(DomHelper.getRandomKey())
                   attributeTuple=(
                     id,
                     nodeResult.name,
                     _isSelected(currentNodeParentId, id),
                     _isActive(currentNodeParentId)
                   )
                   eventHandleTuple=(
                     onSelect,
                     onDrop,
                     AssetTreeUtils.handleSign,
                     AssetUtils.isTreeNodeRelationError
                   )
                   sign=(AssetTreeUtils.getAssetTreeSign())
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

let render = (store, dispatch, currentNodeParentId, setNodeParentId, _self) =>
  <article key="assetTreeRoot" className="tree-content">
    (
      ReasonReact.arrayToElement(
        (
          (editorState) =>
            editorState
            |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
            |> Method.buildAssetTreeNodeArray(
                 currentNodeParentId,
                 AssetTreeUtils.onSelect(dispatch, setNodeParentId),
                 AssetTreeUtils.onDrop(dispatch)
               )
        )
        |> StateLogicService.getEditorState
      )
    )
  </article>;

let make =
    (~store: AppStore.appState, ~dispatch, ~currentNodeParentId, ~setNodeParentId, _children) => {
  ...component,
  render: (self) => render(store, dispatch, currentNodeParentId, setNodeParentId, self)
};