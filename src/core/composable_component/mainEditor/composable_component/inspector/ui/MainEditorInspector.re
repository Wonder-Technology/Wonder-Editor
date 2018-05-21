open EditorType;

type retainedProps = {
  currentSource: option(sourceType),
  currentSceneTreeNode: option(int),
  currentAssetTreeNode: option(int),
  currentAssetFileNode: option(int)
};

module Method = {
  let _buildAssetTreeInspector = (store, dispatch, folderId, treeNode) =>
    <AssetTreeInspector key=(DomHelper.getRandomKey()) store dispatch folderId treeNode />;
  let _buildAssetFileInspector = (store, dispatch, fileId, fileResult) =>
    <AssetFileInspector key=(DomHelper.getRandomKey()) store dispatch fileId fileResult />;
  let showInspectorBySourceType =
      (
        store,
        dispatch,
        allShowComponentConfig,
        (currentSource, currentSceneTreeNode, currentAssetTreeNode, currentAssetFileNode)
      ) => {
    let editorState = StateEditorService.getState();
    switch currentSource {
    | None => ReasonReact.nullElement
    | Some(SceneTree) =>
      <SceneTreeInspector store dispatch allShowComponentConfig currentSceneTreeNode />
    | Some(AssetTree) =>
      switch currentAssetTreeNode {
      | None => ReasonReact.nullElement
      | Some(folderId) =>
        _buildAssetTreeInspector(
          store,
          dispatch,
          folderId,
          editorState
          |> AssetUtils.getRootTreeNode
          |> AssetUtils.getSpecificTreeNodeById(folderId)
          |> Js.Option.getExn
        )
      }
    | Some(AssetFile) =>
      switch currentAssetFileNode {
      | None => ReasonReact.nullElement
      | Some(fileId) =>
        FolderArrayUtils.isFileBeFolder(fileId) |> StateLogicService.getEditorState ?
          _buildAssetTreeInspector(
            store,
            dispatch,
            fileId,
            editorState
            |> AssetUtils.getRootTreeNode
            |> AssetUtils.getSpecificTreeNodeById(fileId)
            |> Js.Option.getExn
          ) :
          _buildAssetFileInspector(
            store,
            dispatch,
            fileId,
            editorState
            |> AssetEditorService.unsafeGetFileMap
            |> WonderCommonlib.SparseMapService.unsafeGet(fileId)
          )
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
          self.retainedProps.currentAssetTreeNode,
          self.retainedProps.currentAssetFileNode
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
    currentSceneTreeNode: SceneEditorService.getCurrentSceneTreeNode |> StateLogicService.getEditorState,
    currentAssetTreeNode: AssetEditorService.getCurrentAssetTreeNode |> StateLogicService.getEditorState,
    currentAssetFileNode: AssetEditorService.getCurrentAssetFileNode |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, allShowComponentConfig, self)
};