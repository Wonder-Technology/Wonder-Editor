Css.importCss("./css/mainEditorAsset.css");

type state = {currentNodeParentId: option(int)};

type action =
  | ClearNodeParentId
  | SetNodeParentId(int);

type retainedProps = {
  assetTreeRoot: option(AssetTreeNodeType.assetTreeNodeType),
  currentNodeId: option(int),
  nodeMap: WonderCommonlib.SparseMapService.t(AssetNodeType.nodeResultType)
};

module Method = {
  let clearNodeParentId = () => ClearNodeParentId;
  let setNodeParentId = (parentNodeId) => SetNodeParentId(parentNodeId);
};

let component = ReasonReact.reducerComponentWithRetainedProps("MainEditorAsset");

let reducer = (action, state) =>
  switch action {
  | ClearNodeParentId => ReasonReact.Update({...state, currentNodeParentId: None})
  | SetNodeParentId(parentNodeId) =>
    ReasonReact.Update({...state, currentNodeParentId: Some(parentNodeId)})
  };

let render = (store, dispatch, {state, handle, reduce}: ReasonReact.self('a, 'b, 'c)) =>
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
        currentNodeParentId=state.currentNodeParentId
        setNodeParentId=(reduce(Method.setNodeParentId))
      />
    </div>
    <MainEditorAssetChildrenNode
      store
      dispatch
      currentNodeParentId=state.currentNodeParentId
      setNodeParentId=(reduce(Method.setNodeParentId))
    />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.state.currentNodeParentId != newSelf.state.currentNodeParentId
  || oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  initialState: () => {
    currentNodeParentId:
      Some(AssetTreeRootEditorService.getRootTreeNodeId |> StateLogicService.getEditorState)
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