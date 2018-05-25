open EditorType;

type retainedProps = {
  currentSource: option(sourceType),
  currentSceneTreeNode: option(int),
  currentAssetTreeNode: option(int)
};

module Method = {
  let showInspectorBySourceType =
      (
        store,
        dispatch,
        allShowComponentConfig,
        (currentSource, currentSceneTreeNode, currentAssetTreeNode)
      ) => {
    let editorState = StateEditorService.getState();
    switch currentSource {
    | None => ReasonReact.nullElement
    | Some(SceneTree) =>
      <SceneTreeInspector store dispatch allShowComponentConfig currentSceneTreeNode />
    | Some(AssetTree) =>
      switch currentAssetTreeNode {
      | None => ReasonReact.nullElement
      | Some(nodeId) =>
        <AssetTreeInspector
          key=(DomHelper.getRandomKey())
          store
          dispatch
          nodeId
          nodeResult=(
            editorState
            |> AssetNodeMapEditorService.unsafeGetNodeMap
            |> WonderCommonlib.SparseMapService.unsafeGet(nodeId)
          )
        />
      }
    }
  };
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

let render = (store, dispatch, allShowComponentConfig, self: ReasonReact.self('a, 'b, 'c)) =>
  <article key="inspector" className="inspector-component">
    (
      Method.showInspectorBySourceType(
        store,
        dispatch,
        allShowComponentConfig,
        (
          self.retainedProps.currentSource,
          self.retainedProps.currentSceneTreeNode,
          self.retainedProps.currentAssetTreeNode
        )
      )
    )
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, ~allShowComponentConfig, _children) => {
  ...component,
  retainedProps: {
    currentSource: CurrentSourceEditorService.getCurrentSource |> StateLogicService.getEditorState,
    currentSceneTreeNode:
      SceneEditorService.getCurrentSceneTreeNode |> StateLogicService.getEditorState,
    currentAssetTreeNode:
      AssetCurrentAssetTreeNodeEditorService.getCurrentAssetTreeNode |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, allShowComponentConfig, self)
};