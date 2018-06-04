Css.importCss("./css/mainEditorAsset.css");

type state = {
  currentNodeParentId: option(int),
  dragImg: DomHelper.domType,
};

type action =
  | ClearNodeParentId
  | SetNodeParentId(int)
  | SilentSetNodeParentId(int);

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentNodeId: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(AssetNodeType.nodeResultType),
};

module Method = {
  let clearNodeParentId = () => ClearNodeParentId;

  let setNodeParentId = parentNodeId => SetNodeParentId(parentNodeId);

  let silentSetNodeParentId = parentNodeId =>
    SilentSetNodeParentId(parentNodeId);
};

let component =
  ReasonReact.reducerComponentWithRetainedProps("MainEditorAsset");

let reducer = (action, state) =>
  switch (action) {
  | ClearNodeParentId =>
    ReasonReact.Update({...state, currentNodeParentId: None})
  | SetNodeParentId(parentNodeId) =>
    ReasonReact.Update({...state, currentNodeParentId: Some(parentNodeId)})
  | SilentSetNodeParentId(parentNodeId) =>
    /* cancel the silent update */
    ReasonReact.Update({...state, currentNodeParentId: Some(parentNodeId)})
  };

let render =
    (
      store,
      dispatchFunc,
      {state, handle, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader
        store
        dispatchFunc
        currentNodeParentId=state.currentNodeParentId
        clearNodeParentId=(_e => send(Method.clearNodeParentId(_e)))
      />
      <MainEditorAssetTree
        store
        dispatchFunc
        dragImg=state.dragImg
        currentNodeParentId=state.currentNodeParentId
        setNodeParentId=(_e => send(Method.setNodeParentId(_e)))
        silentSetNodeParentId=(_e => send(Method.silentSetNodeParentId(_e)))
      />
    </div>
    <MainEditorAssetChildrenNode
      store
      dispatchFunc
      dragImg=state.dragImg
      currentNodeParentId=state.currentNodeParentId
      setNodeParentId=(_e => send(Method.setNodeParentId(_e)))
      silentSetNodeParentId=(_e => send(Method.silentSetNodeParentId(_e)))
    />
  </article>;
let shouldUpdate =
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  (
    oldSelf.state.currentNodeParentId !== newSelf.state.currentNodeParentId
    || oldSelf.retainedProps != newSelf.retainedProps
  )
  |> WonderLog.Log.print;

let make = (~store, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    currentNodeParentId:
      Some(
        AssetTreeRootEditorService.getRootTreeNodeId
        |> StateLogicService.getEditorState,
      ),
    dragImg: DomHelper.createElement("img"),
  },
  retainedProps: {
    assetTreeRoot:
      AssetTreeRootEditorService.getAssetTreeRoot
      |> StateLogicService.getEditorState,
    currentNodeId:
      AssetCurrentNodeIdEditorService.getCurrentNodeId
      |> StateLogicService.getEditorState,
    nodeMap:
      AssetNodeMapEditorService.unsafeGetNodeMap
      |> StateLogicService.getEditorState,
  },
  shouldUpdate,
  reducer,
  render: self => render(store, dispatchFunc, self),
};