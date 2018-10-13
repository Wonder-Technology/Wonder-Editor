open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let _isSelected = nodeId =>
    AssetUtils.getTargetTreeNodeId
    |> StateLogicService.getEditorState === nodeId;

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

  let _isNotRoot = nodeId =>
    StateEditorService.getState()
    |> AssetTreeRootEditorService.getRootTreeNodeId != nodeId;

  let buildAssetTreeArray =
      (dragImg, (onSelectFunc, onDropFunc), assetTreeRoot) => {
    let rec _iterateAssetTreeArray = assetTreeArray =>
      assetTreeArray
      |> WonderLog.Log.printJson
      |> Js.Array.map(({nodeId, type_, children}) =>
           switch (type_) {
           | Folder =>
             let {name}: folderResultType =
               StateEditorService.getState()
               |> AssetFolderNodeMapEditorService.getFolderNodeMap
               |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

             <TreeNode
               key=(DomHelper.getRandomKey())
               id=nodeId
               name
               isSelected=(_isSelected(nodeId))
               isActive=(_isActive())
               dragImg
               widget=(AssetUtils.getWidget())
               icon="./public/img/12.jpg"
               isDragable=(_isNotRoot(nodeId))
               onSelect=(onSelectFunc(type_))
               onDrop=onDropFunc
               isWidget=AssetUtils.isWidget
               handleRelationError=AssetUtils.isTreeNodeRelationError
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