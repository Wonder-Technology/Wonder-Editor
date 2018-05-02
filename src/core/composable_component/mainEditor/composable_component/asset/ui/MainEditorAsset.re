open FileType;

open Js.Promise;

Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentTreeNode: option(int)
};

module Method = {
  let onSelect = (dispatch, id) => {
    AssetEditorService.setCurrentTreeNode(id) |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let onDrop = (dispatch, (targetId, removedId)) =>
    targetId === removedId ?
      dispatch(AppStore.ReLoad) :
      {
        let editorState = StateEditorService.getState();
        let (newAssetTree, removedTreeNode) =
          editorState
          |> AssetEditorService.unsafeGetAssetTree
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
        editorState
        |> AssetEditorService.setAsseTree(
             AssetUtils.insertNewTreeNodeToTargetTreeNode(targetId, removedTreeNode, newAssetTree)
           )
        |> StateEditorService.setState;
        dispatch(AppStore.ReLoad)
      };
  let removeFolder = (dispatch, _event) =>
    AssetUtils.isTargetIdEqualRootId |> StateLogicService.getEditorState ?
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="removeFolder",
          ~description={j|can't remove root folder|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j}
        )
      ) :
      {
        (
          (editorState) => {
            let (newAssetTree, _) =
              editorState
              |> AssetEditorService.unsafeGetAssetTree
              |> AssetUtils.removeSpecificTreeNodeFromAssetTree(
                   AssetUtils.getTargetTreeNodeId(editorState)
                 );
            editorState
            |> AssetEditorService.setAsseTree(newAssetTree)
            |> AssetEditorService.clearCurrentTreeNode
          }
        )
        |> StateLogicService.getAndSetEditorState;
        dispatch(AppStore.ReLoad) |> ignore
      };
  let addFolder = (dispatch, _event) => {
    (
      (editorState) => {
        let (nextIndex, editorState) = editorState |> AssetUtils.increaseIndex;
        editorState
        |> AssetEditorService.setAsseTree(
             editorState
             |> AssetEditorService.unsafeGetAssetTree
             |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
                  AssetUtils.getTargetTreeNodeId(editorState),
                  AssetUtils.buildAssetTreeNodeByIndex(nextIndex)
                )
           )
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let fileLoad = (dispatch, event) => {
    let e = ReactEvent.convertReactFormEventToJsEvent(event);
    DomHelper.preventDefault(e);
    let fileInfoArr =
      e##target##files
      |> Js.Dict.values
      |> Js.Array.map(FileUtils.convertFileJsObjectToFileInfoRecord);
    Most.from(fileInfoArr)
    |> Most.flatMap(
         (fileInfo: fileInfoType) =>
           Most.fromPromise(
             Js.Promise.make(
               (~resolve, ~reject) => {
                 let reader = File.createFileReader();
                 File.onload(
                   reader,
                   (result) => [@bs] resolve({name: fileInfo.name, type_: fileInfo.type_, result})
                 );
                 FileUtils.readFileByType(reader, fileInfo)
               }
             )
           )
       )
    |> Most.forEach(FileUtils.handleFileByType)
    |> then_((_) => dispatch(AppStore.ReLoad) |> resolve)
    |> ignore
  };
  let _isCurrentTreeNode = (id) =>
    switch (AssetEditorService.getCurrentTreeNode |> StateLogicService.getEditorState) {
    | None => false
    | Some(treeNode) => treeNode === id ? true : false
    };
  let _isNotRoot = (uid) =>
    ((editorState) => editorState |> AssetUtils.getRootTreeNodeId != uid)
    |> StateLogicService.getEditorState;
  let rec buildAssetTreeArray = (onSelect, onDrop, assetTree) =>
    assetTree
    |> Array.map(
         ({id, name, imgArray, children}: AssetTreeNodeType.assetTreeNodeType) =>
           ArrayService.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentTreeNode(id))
               eventHandleTuple=(onSelect, onDrop)
               sign="asset"
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
               treeChildren=(buildAssetTreeArray(onSelect, onDrop, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentTreeNode(id))
               eventHandleTuple=(onSelect, onDrop)
               sign="asset"
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
             />
       );
  let showSpecificTreeNodeJson = (fileMap, jsonArr) =>
    jsonArr
    |> Js.Array.map(
         (json) =>
           fileMap
           |> WonderCommonlib.SparseMapService.unsafeGet(json)
           |> (
             ({name, result} as jsonResult) =>
               <div className="file-item" key=(DomHelper.getRandomKey())>
                 <img src="./public/img/12.jpg" />
                 <span className="item-text"> (DomHelper.textEl(name)) </span>
               </div>
           )
       );
  let showSpecificTreeNodeImage = (fileMap, imgArr) =>
    imgArr
    |> Js.Array.map(
         (img) =>
           fileMap
           |> WonderCommonlib.SparseMapService.unsafeGet(img)
           |> (
             ({name, result} as imgResult) =>
               <div className="file-item" key=(DomHelper.getRandomKey())>
                 <img src=result />
                 <span className="item-text"> (DomHelper.textEl(name)) </span>
               </div>
           )
       );
  let buildContent = () => {
    let editorState = StateEditorService.getState();
    switch (editorState |> AssetEditorService.getAssetTree) {
    | Some(assetTree) =>
      let currentTreeNode =
        assetTree
        |> ArrayService.getFirst
        |> AssetUtils.getTreeNodeById(editorState |> AssetUtils.getTargetTreeNodeId);
      let fileMap = editorState |> AssetEditorService.getFileMap;
      switch currentTreeNode {
      | Some(treeNode_) =>
        treeNode_.imgArray
        |> showSpecificTreeNodeImage(fileMap)
        |> Js.Array.concat(treeNode_.jsonArray |> showSpecificTreeNodeJson(fileMap))
      | None =>
        WonderLog.Log.fatal(
          WonderLog.Log.buildFatalMessage(
            ~title="buildContent",
            ~description={j|the treeNode:$currentTreeNode not exist in assetTree|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j}
          )
        )
      }
    | None => [||]
    }
  };
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = (store, dispatch, _self) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <div className="tree-header">
        <button onClick=(Method.addFolder(dispatch))> (DomHelper.textEl("addFolder")) </button>
        <button
          onClick=(Method.removeFolder(dispatch))
          disabled=(
            Js.Boolean.to_js_boolean(
              AssetUtils.isTargetIdEqualRootId |> StateLogicService.getEditorState
            )
          )>
          (DomHelper.textEl("remove"))
        </button>
        <input
          className="file-upload"
          multiple=Js.true_
          onChange=((e) => Method.fileLoad(dispatch, e))
          _type="file"
        />
      </div>
      (
        ReasonReact.arrayToElement(
          (
            (editorState) =>
              editorState
              |> AssetEditorService.unsafeGetAssetTree
              |> Method.buildAssetTreeArray(Method.onSelect(dispatch), Method.onDrop(dispatch))
          )
          |> StateLogicService.getEditorState
        )
      )
    </div>
    <div className="asset-content"> (ReasonReact.arrayToElement(Method.buildContent())) </div>
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    assetTree: AssetEditorService.getAssetTree |> StateLogicService.getEditorState,
    currentTreeNode: AssetEditorService.getCurrentTreeNode |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};