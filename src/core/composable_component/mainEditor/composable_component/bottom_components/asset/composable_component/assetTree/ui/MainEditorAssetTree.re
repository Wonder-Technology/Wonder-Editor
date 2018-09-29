open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = id =>
    AssetUtils.getTargetTreeNodeId |> StateLogicService.getEditorState === id;

  let _isActive = () => {
    let editorState = StateEditorService.getState();

    switch (AssetCurrentNodeDataEditorService.getCurrentNodeData(editorState)) {
    | None => false
    | Some({currentNodeId}) =>
      AssetUtils.isIdEqual(
        AssetUtils.getTargetTreeNodeId(editorState),
        currentNodeId,
      )
    };
  };

  let _isNotRoot = id =>
    StateEditorService.getState()
    |> AssetTreeRootEditorService.getRootTreeNodeId != id;

  let buildAssetTreeArray =
      (dragImg, (onSelectFunc, onDropFunc), assetTreeRoot) => {
    let rec _iterateAssetTreeArray = assetTreeArray =>
      assetTreeArray
      |> Js.Array.map(({id, type_, children}) =>
           switch (type_) {
           | Folder =>
             let {name}: folderResultType =
               StateEditorService.getState()
               |> AssetFolderNodeMapEditorService.getFolderNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(id);

             <TreeNode
               key=(DomHelper.getRandomKey())
               uid=id
               name
               isSelected=(_isSelected(id))
               isActive=(_isActive())
               dragImg
               widge=(AssetUtils.getWidge())
               icon="./public/img/12.jpg"
               isDragable=(_isNotRoot(id))
               onSelect=(onSelectFunc(type_))
               onDrop=onDropFunc
               isWidge=AssetUtils.isWidge
               handleRelationError=AssetTreeEditorService.isTreeNodeRelationError
               treeChildren=(_iterateAssetTreeArray(children))
             />;

           | _ => ReasonReact.null
           }
         );
    _iterateAssetTreeArray([|assetTreeRoot|]);
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = ((store, dispatchFunc), dragImg, _self) =>
  <article key="assetTreeRoot" className="wonder-asset-assetTree">
    (
      ReasonReact.array(
        StateEditorService.getState()
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> Method.buildAssetTreeArray(
             dragImg,
             (
               AssetTreeUtils.onSelect(dispatchFunc),
               AssetTreeUtils.dragNodeToFolderFunc(
                 (store, dispatchFunc),
                 (),
               ),
             ),
           ),
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, self),
};