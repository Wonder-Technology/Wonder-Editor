Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* TODO use extension names instead of the name */
  let addExtension = (text) => AppExtensionUtils.setExtension(getStorageParentKey(), text);
  let addBox = HeaderAddGameObjectEventHandler.MakeEventHandler.onClick;
  let disposeCurrentGameObject = HeaderDisposeGameObjectEventHandler.MakeEventHandler.onClick;
  let buildOperateHistoryComponent = (store, dispatch) =>
    <div>
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              AllHistoryService.undoHistoryState(store, dispatch)
              |> StateLogicService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("undo"))
        </button>
      </div>
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              AllHistoryService.redoHistoryState(store, dispatch)
              |> StateLogicService.getAndRefreshStateForHistory
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
  let buildOperateControllerComponent = (store, dispatch) =>
    <div>
      <div className="component-item">
        <button onClick=((_e) => ControllerUtils.run(store))> (DomHelper.textEl("run")) </button>
        <button onClick=((_e) => ControllerUtils.stop(dispatch))>
          (DomHelper.textEl("stop"))
        </button>
      </div>
    </div>;
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatch, _self) =>
  <article key="header" className="header-component">
    (Method.buildOperateHistoryComponent(store, dispatch))
    (Method.buildOperateGameObjectComponent(store, dispatch))
    (Method.buildOperateExtensionComponent())
    (Method.buildOperateControllerComponent(store, dispatch))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};