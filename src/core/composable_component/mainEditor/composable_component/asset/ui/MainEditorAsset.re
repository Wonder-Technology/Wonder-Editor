Css.importCss("./css/mainEditorAsset.css");

type retainedProps = {
  currentGameObject: option(Wonderjs.GameObjectType.gameObject)
};

module Method = {
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

let render = (store, dispatch, _self) =>
  <article key="asset" className="asset-component">
    <div className="asset-tree">
    </div>
    <div className="asset-content">
    </div>
  </article>;

let shouldUpdate = ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
  oldSelf.retainedProps != newSelf.retainedProps;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  retainedProps: {
    currentGameObject: SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState
  },
  shouldUpdate,
  render: (self) => render(store, dispatch, self)
};