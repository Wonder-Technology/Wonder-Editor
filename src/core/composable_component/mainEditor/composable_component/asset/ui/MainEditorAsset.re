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
  let onDrop = (dispatch, (id, target)) => WonderLog.Log.print(("drop", id, target)) |> ignore;
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
  let fileLoad = (dispatch,event) => {
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
    |> then_((_) => {
      dispatch(AppStore.ReLoad) |> resolve
    })
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
  
  let buildContent = () =>{
    let editorState = StateEditorService.getState();

    editorState
    |> AssetUtils.getTargetTreeNodeId

  }
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = (store, dispatch, _self) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <div className="tree-header">
        <button onClick=(Method.addFolder(dispatch))> (DomHelper.textEl("addFolder")) </button>
        <button> (DomHelper.textEl("remove")) </button>
        <input
          className="file-upload"
          multiple=Js.true_
          onChange=((e) => Method.fileLoad(dispatch,e))
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
    <div className="asset-content">
    (Method.buildContent())
    </div>
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