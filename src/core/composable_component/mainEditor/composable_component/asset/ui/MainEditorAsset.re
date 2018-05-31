Css.importCss("./css/mainEditorAsset.css");

type state = {
  currentNodeParentId: option(int),
  dragImg: DomHelper.domType
};

type action =
  | ClearNodeParentId
  | SetNodeParentId(int)
  | SlientSetNodeParentId(int);

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentNodeId: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(AssetNodeType.nodeResultType)
};

module Method = {
  let clearNodeParentId = () => ClearNodeParentId;
  let setNodeParentId = (parentNodeId) => SetNodeParentId(parentNodeId);

  let slientSetNodeParentId = (parentNodeId) => SlientSetNodeParentId(parentNodeId);
};

let component = ReasonReact.reducerComponentWithRetainedProps("MainEditorAsset");

let reducer = (action, state) =>
  switch action {
  | ClearNodeParentId => ReasonReact.Update({...state, currentNodeParentId: None})
  | SetNodeParentId(parentNodeId) =>

    ReasonReact.Update({...state, currentNodeParentId: Some(parentNodeId)})
  | SlientSetNodeParentId(parentNodeId) =>
    ReasonReact.SilentUpdate({...state, currentNodeParentId: Some(parentNodeId)})
  };

let render = (store, dispatch, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>{
WonderLog.Log.print({j|render|j});
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader
        store
        dispatch
        currentNodeParentId=state.currentNodeParentId
        clearNodeParentId=(reduce(Method.clearNodeParentId))
      />
      <MainEditorAssetTree
        store
        dispatch
        attributeTuple=(state.dragImg, state.currentNodeParentId)
        eventTuple=(reduce(Method.setNodeParentId))
      />
    </div>
    <MainEditorAssetChildrenNode
      store
      dispatch
      attributeTuple=(state.dragImg, state.currentNodeParentId)
      eventTuple=(reduce(Method.slientSetNodeParentId))
    />
  </article>;

};
let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) => {
  /* WonderLog.Log.print("asdwdw") |> ignore; */
  
  (

  oldSelf.state.currentNodeParentId != newSelf.state.currentNodeParentId
  || oldSelf.retainedProps != newSelf.retainedProps
  )
  |>WonderLog.Log.print
  /* oldSelf.state.currentNodeParentId != newSelf.state.currentNodeParentId */
 
};

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  initialState: () => {
    currentNodeParentId:
      Some(AssetTreeRootEditorService.getRootTreeNodeId |> StateLogicService.getEditorState),
    dragImg: DomHelper.createElement("img")
  },
  retainedProps: {
    assetTreeRoot: AssetTreeRootEditorService.getAssetTreeRoot |> StateLogicService.getEditorState,
    currentNodeId:
      AssetCurrentNodeIdEditorService.getCurrentNodeId |> StateLogicService.getEditorState,
    nodeMap: AssetNodeMapEditorService.unsafeGetNodeMap |> StateLogicService.getEditorState
  },
  shouldUpdate,
  reducer,
  render: (self) => render(store, dispatch, self)
};