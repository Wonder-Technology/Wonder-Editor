Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* TODO use extension names instead of the name */
  let addExtension = (text) => AppExtensionView.setExtension(getStorageParentKey(), text);
  let addBox = HeaderAddGameObjectEventHandler.MakeEventHandler.onClick;
  let disposeCurrentGameObject = HeaderDisposeGameObjectEventHandler.MakeEventHandler.onClick;
  let buildOperateHistoryComponent = (store, dispatch) =>
    <div>
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              OperateStateUtils.getAndSetState(StateHistoryView.undoHistoryState(store, dispatch))
          )>
          (DomHelper.textEl("undo"))
        </button>
      </div>
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              OperateStateUtils.getAndSetState(StateHistoryView.redoHistoryState(store, dispatch))
          )>
          (DomHelper.textEl("redo"))
        </button>
      </div>
    </div>;
  let buildOperateGameObjectComponent = (store, dispatch) =>
    <div>
      <div className="component-item">
        <button onClick=((_e) => addBox((store, dispatch), "box", ()))>
          (DomHelper.textEl("add box"))
        </button>
      </div>
      <div className="component-item">
        <button onClick=((_e) => disposeCurrentGameObject((store, dispatch), (), ()))>
          (DomHelper.textEl("dispose"))
        </button>
      </div>
    </div>;
  let buildOperateExtensionComponent = () =>
    <div className="component-item">
      <FileInput buttonText="show Input" onSubmit=((value) => addExtension(value)) />
    </div>;
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatch, _self) =>
  <article key="header" className="header-component">
    (Method.buildOperateHistoryComponent(store, dispatch))
    (Method.buildOperateGameObjectComponent(store, dispatch))
    (Method.buildOperateExtensionComponent())
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};