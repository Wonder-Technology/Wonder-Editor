Css.importCss("./css/header.css");

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* todo use extension names instead of the name */
  let addExtension = (text) => AppExtensionUtils.setExtension(getStorageParentKey(), text);
  let addBox = HeaderAddGameObjectEventHandler.MakeEventHandler.onClick;
  let disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler.MakeEventHandler.onClick;
  let buildOperateHistoryComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              AllHistoryService.undoHistoryState(store, dispatchFunc)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("undo"))
        </button>
      </div>
      <div className="component-item">
        <button
          onClick=(
            (_e) =>
              AllHistoryService.redoHistoryState(store, dispatchFunc)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("redo"))
        </button>
      </div>
    </div>;
  let buildOperateGameObjectComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <button onClick=((_e) => addBox((store, dispatchFunc), "box", ()))>
          (DomHelper.textEl("add box"))
        </button>
      </div>
      <div className="component-item">
        <button
          disabled=(
            HeaderUtils.isGameObjectNotRemoveable(
              SceneEditorService.getCurrentSceneTreeNode |> StateLogicService.getEditorState
            )
          )
          onClick=((_e) => disposeCurrentSceneTreeNode((store, dispatchFunc), (), ()))>
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
  let buildOperateControllerComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <Switch
          openText="run"
          openFunc=(ControllerUtils.run(store))
          closeText="stop"
          closeFunc=(ControllerUtils.stop(dispatchFunc))
          isOpen=(SceneEditorService.getIsRun |> StateLogicService.getEditorState)
        />
      </div>
    </div>;
};

let component = ReasonReact.statelessComponent("Header");

let render = (store: AppStore.appState, dispatchFunc, _self) =>
  <article key="header" className="wonder-header-component">
    (Method.buildOperateHistoryComponent(store, dispatchFunc))
    (Method.buildOperateGameObjectComponent(store, dispatchFunc))
    (Method.buildOperateExtensionComponent())
    (Method.buildOperateControllerComponent(store, dispatchFunc))
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  render: (self) => render(store, dispatchFunc, self)
};