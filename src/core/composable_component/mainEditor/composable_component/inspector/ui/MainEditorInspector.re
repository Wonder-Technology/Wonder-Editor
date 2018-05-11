open EditorType;

type retainedProps = {
  currentSource: option(sourceType),
  currentGameObject: option(int),
  currentTreeNode: option(int),
  currentFile: option(int)
};

module Method = {
  let showInspectorBySourceType =
      (
        store,
        dispatch,
        allShowComponentConfig,
        (currentSource, currentGameObject, currentTreeNode, currentFile)
      ) => {
    let editorState = StateEditorService.getState();
    switch currentSource {
    | None => ReasonReact.nullElement
    | Some(SceneTree) =>
      <SceneTreeInspector store dispatch allShowComponentConfig currentGameObject />
    | Some(AssetTree) =>
      switch currentTreeNode {
      | None => ReasonReact.nullElement
      | Some(folderId) =>
        <AssetTreeInspector
          key=(DomHelper.getRandomKey())
          store
          dispatch
          folderId
          treeNode=(
            editorState
            |> AssetUtils.getRootTreeNode
            |> AssetUtils.getSpecificTreeNodeById(folderId)
            |> Js.Option.getExn
          )
        />
      }
    | Some(AssetFile) =>
      switch currentFile {
      | None => ReasonReact.nullElement
      | Some(fileId) =>
        <AssetFileInspector
          key=(DomHelper.getRandomKey())
          store
          dispatch
          fileId
          fileResult=(
            editorState
            |> AssetEditorService.unsafeGetFileMap
            |> WonderCommonlib.SparseMapService.unsafeGet(fileId)
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
          self.retainedProps.currentGameObject,
          self.retainedProps.currentTreeNode,
          self.retainedProps.currentFile
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
    currentGameObject: SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState,
    currentTreeNode: AssetEditorService.getCurrentTreeNode |> StateLogicService.getEditorState,
    currentFile: AssetEditorService.getCurrentFile |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, allShowComponentConfig, self)
};