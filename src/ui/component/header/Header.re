Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* TODO use extension names instead of the name */
  let addExtension = (text) => AppExtensionView.setExtension(getStorageParentKey(), text);
  let addBox = HeaderAddGameObjectEventHandler.MakeEventHandler.onClick;
  let disposeCurrentGameObject = HeaderDisposeGameObjectEventHandler.MakeEventHandler.onClick;
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatch, _self) =>
  <article key="header" className="header-component">
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
    <div className="component-item">
      <button onClick=((_e) => Method.addBox((store, dispatch), "box", ()))>
        (DomHelper.textEl("add box"))
      </button>
    </div>
    <div className="component-item">
      <button onClick=((_e) => Method.disposeCurrentGameObject((store, dispatch), (), ()))>
        (DomHelper.textEl("dispose"))
      </button>
    </div>
    <div className="component-item">
      <FileInput buttonText="show Input" onSubmit=((value) => Method.addExtension(value)) />
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};