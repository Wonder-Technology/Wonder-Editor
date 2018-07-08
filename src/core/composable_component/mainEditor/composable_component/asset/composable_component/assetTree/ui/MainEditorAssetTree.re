open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = id =>
    AssetUtils.getTargetTreeNodeId |> StateLogicService.getAssetState === id;

  let _isActive = () => {
    let assetState = StateAssetService.getState();
    switch (CurrentNodeDataAssetService.getCurrentNodeData(assetState)) {
    | None => false
    | Some({currentNodeId, nodeType}) =>
      AssetUtils.isIdEqual(
        AssetUtils.getTargetTreeNodeId(assetState),
        currentNodeId,
      )
    };
  };

  let _isNotRoot = id =>
    StateAssetService.getState()
    |> AssetTreeRootAssetService.getRootTreeNodeId != id;

  let buildAssetTreeArray =
      (dragImg, (onSelectFunc, onDropFunc), assetTreeRoot) => {
    let rec _iterateAssetTreeArray =
            (onSelectFunc, onDropFunc, assetTreeArray) =>
      assetTreeArray
      |> Js.Array.map(({id, type_, children}) =>
           switch (type_) {
           | Folder =>
             let {name}: folderResultType =
               StateAssetService.getState()
               |> FolderNodeMapAssetService.unsafeGetFolderNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(id);

             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(
                 id,
                 name,
                 _isSelected(id),
                 _isActive(),
                 dragImg,
                 AssetTreeUtils.getFlag(),
                 Some("./public/img/12.jpg"),
                 Some(_isNotRoot(id)),
               )
               funcTuple=(
                 onSelectFunc(type_),
                 onDropFunc,
                 AssetTreeUtils.handleFlag,
                 AssetUtils.isTreeNodeRelationError,
               )
               treeChildren=(
                 _iterateAssetTreeArray(onSelectFunc, onDropFunc, children)
               )
             />;

           | _ => ReasonReact.nullElement
           }
         );
    _iterateAssetTreeArray(onSelectFunc, onDropFunc, [|assetTreeRoot|]);
  };
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = ((store, dispatchFunc), dragImg, _self) =>
  <article key="assetTreeRoot" className="wonder-asset-assetTree">
    (
      ReasonReact.arrayToElement(
        (
          assetState =>
            assetState
            |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
            |> Method.buildAssetTreeArray(
                 dragImg,
                 (
                   AssetTreeUtils.onSelect(dispatchFunc),
                   AssetTreeUtils.onDrop(dispatchFunc),
                 ),
               )
        )
        |> StateLogicService.getAssetState,
      )
    )
  </article>;

let make = (~store, ~dispatchFunc, ~dragImg, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), dragImg, self),
};