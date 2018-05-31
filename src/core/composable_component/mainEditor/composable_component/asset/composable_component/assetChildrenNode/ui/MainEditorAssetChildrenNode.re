open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let isIdEqualCurrentNodeId = (currentNodeId, id) =>
    switch currentNodeId {
    | None => false
    | Some(nodeId) => AssetUtils.isIdEqual(id, nodeId)
    };
  let showSpecificTreeNodeChildren =
      (store, dispatch, dragImg, setNodeParentId, nodeMap, currentNodeId, assetTreeNodeChildren) =>
    assetTreeNodeChildren
    |> Js.Array.map(
         ({id}: assetTreeNodeType) => {
           let {name, type_, result} = nodeMap |> WonderCommonlib.SparseMapService.unsafeGet(id);
           switch type_ {
           | Folder =>
             <FolderBox
               key=(DomHelper.getRandomKey())
               store
               dispatch
               attributeTuple=(
                 dragImg,
                 "./public/img/11.jpg",
                 id,
                 name,
                 isIdEqualCurrentNodeId(currentNodeId, id),
                 AssetTreeUtils.getAssetTreeSign()
               )
               eventTuple=(
                 AssetTreeUtils.onDrop(dispatch),
                 AssetTreeUtils.handleSign,
                 AssetUtils.isTreeNodeRelationError,
                 setNodeParentId
               )
             />
           | Image =>
             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatch
               attributeTuple=(
                 dragImg,
                 result |> OptionService.unsafeGet,
                 id,
                 name,
                 AssetTreeUtils.getAssetTreeSign(),
                 isIdEqualCurrentNodeId(currentNodeId, id)
               )
             />
           | Json =>
             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatch
               attributeTuple=(
                 dragImg,
                 "./public/img/12.jpg",
                 id,
                 name,
                 AssetTreeUtils.getAssetTreeSign(),
                 isIdEqualCurrentNodeId(currentNodeId, id)
               )
             />
           | _ =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="showSpecificTreeNodeChildren",
                 ~description={j||j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j}
               )
             )
           }
         }
       );
  let buildContent = (store, dispatch, dragImg, currentNodeParentId, setNodeParentId) => {
    let editorState = StateEditorService.getState();
    editorState
    |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(
         editorState |> AssetUtils.getTargetTreeNodeId(currentNodeParentId)
       )
    |> OptionService.unsafeGet
    |> ((currentNodeParentId) => currentNodeParentId.children)
    |> showSpecificTreeNodeChildren(
         store,
         dispatch,
         dragImg,
         setNodeParentId,
         editorState |> AssetNodeMapEditorService.unsafeGetNodeMap,
         editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId
       )
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dispatch, (dragImg, currentNodeParentId), setNodeParentId, _self) =>
  <article key="assetChildrenNode" className="asset-content">
    (
      ReasonReact.arrayToElement(
        Method.buildContent(store, dispatch, dragImg, currentNodeParentId, setNodeParentId)
      )
    )
  </article>;

let make = (~store, ~dispatch, ~attributeTuple, ~eventTuple, _children) => {
  ...component,
  render: (self) => render(store, dispatch, attributeTuple, eventTuple, self)
};