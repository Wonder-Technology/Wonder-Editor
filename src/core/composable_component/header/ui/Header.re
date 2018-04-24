Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* todo use extension names instead of the name */
  let addExtension = (text) => AppExtensionUtils.setExtension(getStorageParentKey(), text);
  let addBox = HeaderAddGameObjectEventHandler.MakeEventHandler.onClick;
  let disposeCurrentGameObject = HeaderDisposeGameObjectEventHandler.MakeEventHandler.onClick;
  let buildOperateHistoryComponent = (store, dispatch) =>
    <div className="header-item">
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              AllHistoryService.undoHistoryState(store, dispatch)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("undo"))
        </button>
      </div>
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              AllHistoryService.redoHistoryState(store, dispatch)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("redo"))
        </button>
      </div>
    </div>;
  let buildOperateGameObjectComponent = (store, dispatch) =>
    <div className="header-item">
      <div className="component-item">
        <button onClick=((_e) => addBox((store, dispatch), "box", ()))>
          (DomHelper.textEl("add box"))
        </button>
      </div>
      <div className="component-item">
        <button
          disabled=(
            HeaderUtils.isGameObjectNotRemoveable(
              SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState
            )
          )
          onClick=((_e) => disposeCurrentGameObject((store, dispatch), (), ()))>
          (DomHelper.textEl("dispose"))
        </button>
      </div>
    </div>;
  let buildOperateExtensionComponent = () =>
    <div className="header-item">
      <div className="component-item">
        <FileInput buttonText="show Input" onSubmit=((value) => addExtension(value)) />
      </div>
    </div>;
  let buildOperateControllerComponent = (store, dispatch) =>
    <div className="header-item">
      <div className="component-item">
        <Switch
          openText="run"
          openFunc=(ControllerUtils.run(store))
          closeText="stop"
          closeFunc=(ControllerUtils.stop(dispatch))
          isOpen=(SceneEditorService.getIsRun |> StateLogicService.getEditorState)
        />
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