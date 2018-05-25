open AssetNodeType;

open AssetTreeNodeType;

module Method = {
  let getSign = () => "assetChildrenNode";
  let isIdEqualCurrentNodeId = (currentNodeId, id) =>
    switch currentNodeId {
    | None => false
    | Some(nodeId) => AssetUtils.isIdEqual(id, nodeId)
    };
  let showSpecificTreeNodeChildren =
      (store, dispatch, setNodeParentId, nodeMap, currentNodeId, assetTreeNodeChildren) =>
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
               imgSrc="./public/img/11.jpg"
               folderId=id
               name
               isSelected=(isIdEqualCurrentNodeId(currentNodeId, id))
               sign=(AssetTreeUtils.getSign())
               setNodeParentId
             />
           | Image =>
             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatch
               imgSrc=(result |> Js.Option.getExn)
               fileId=id
               fileName=name
               sign=(getSign())
               isSelected=(isIdEqualCurrentNodeId(currentNodeId, id))
             />
           | Json =>
             <FileBox
               key=(DomHelper.getRandomKey())
               store
               dispatch
               imgSrc="./public/img/12.jpg"
               fileId=id
               fileName=name
               sign=(getSign())
               isSelected=(isIdEqualCurrentNodeId(currentNodeId, id))
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
  let buildContent = (store, dispatch, currentNodeParentId, setNodeParentId) => {
    let editorState = StateEditorService.getState();
    editorState
    |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
    |> AssetUtils.getSpecificTreeNodeById(editorState |> AssetUtils.getTargetTreeNodeId(currentNodeParentId))
    |> OptionService.unsafeGet
    |> ((currentNodeParentId) => currentNodeParentId.children)
    |> showSpecificTreeNodeChildren(
         store,
         dispatch,
         setNodeParentId,
         editorState |> AssetNodeMapEditorService.unsafeGetNodeMap,
         editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId
       )
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dispatch, currentNodeParentId, setNodeParentId, _self) =>
  <article key="assetChildrenNode" className="asset-content">
    (
      ReasonReact.arrayToElement(
        Method.buildContent(store, dispatch, currentNodeParentId, setNodeParentId)
      )
    )
  </article>;

let make = (~store, ~dispatch, ~currentNodeParentId, ~setNodeParentId, _children) => {
  ...component,
  render: (self) => render(store, dispatch, currentNodeParentId, setNodeParentId, self)
};