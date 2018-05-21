Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  assetTree: option(array(AssetTreeNodeType.assetTreeNodeType)),
  currentAssetTreeNode: option(int),
  currentAssetFileNode: option(int),
  fileMap: array(FileType.fileResultType)
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = (store, dispatch, _self) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
      <MainEditorAssetHeader store dispatch />
      <MainEditorAssetTree store dispatch />
    </div>
    <MainEditorAssetFileContent store dispatch />
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    assetTree: AssetEditorService.getAssetTree |> StateLogicService.getEditorState,
    currentAssetTreeNode: AssetEditorService.getCurrentAssetTreeNode |> StateLogicService.getEditorState,
    currentAssetFileNode: AssetEditorService.getCurrentAssetFileNode |> StateLogicService.getEditorState,
    fileMap: AssetEditorService.unsafeGetFileMap |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};