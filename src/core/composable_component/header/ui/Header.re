Css.importCss("./css/header.css");

open ColorType;

open Color;

type state = {
  isShowColorPick: bool,
  colorHex: string,
};

type action =
  | ToggleShowColorPick;

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* todo use extension names instead of the name */

  let addExtension = text =>
    AppExtensionUtils.setExtension(getStorageParentKey(), text);

  let addBox = HeaderAddGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let disposeCurrentSceneTreeNode = HeaderDisposeGameObjectEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildOperateHistoryComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <button
          onClick=(
            _e =>
              AllHistoryService.undoHistoryState(store, dispatchFunc)
              |> StateHistoryService.getAndRefreshStateForHistory
          )>
          (DomHelper.textEl("undo"))
        </button>
      </div>
      <div className="component-item">
        <button
          onClick=(
            _e =>
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
        <button onClick=(_e => addBox((store, dispatchFunc), "box", ()))>
          (DomHelper.textEl("add box"))
        </button>
      </div>
      <div className="component-item">
        <button
          disabled=(
            HeaderUtils.isGameObjectNotRemoveable(
              SceneEditorService.getCurrentSceneTreeNode
              |> StateLogicService.getEditorState,
            )
          )
          onClick=(
            _e => disposeCurrentSceneTreeNode((store, dispatchFunc), (), ())
          )>
          (DomHelper.textEl("dispose"))
        </button>
      </div>
    </div>;

  let buildOperateExtensionComponent = () =>
    <div className="header-item">
      <div className="component-item">
        <FileInput
          buttonText="show Input"
          onSubmit=(value => addExtension(value))
        />
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
          isOpen=(
            SceneEditorService.getIsRun |> StateLogicService.getEditorState
          )
        />
      </div>
    </div>;

  let changeColor = value =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> SceneEngineService.setAmbientLightColor
    |> StateLogicService.getAndRefreshEditAndRunEngineState;

  let buildAmbientLightComponent = (state, send) =>
    <div className="header-item">
      <div className="component-item">
        <span className=""> (DomHelper.textEl("ambient light : ")) </span>
        <span className=""> (DomHelper.textEl(state.colorHex)) </span>
        <button className="" onClick=(_e => send(ToggleShowColorPick))>
          (DomHelper.textEl("pick color"))
        </button>
        (
          state.isShowColorPick ?
            <div className="color-pick-item">
              <ReactColor.Sketch
                color=state.colorHex
                onChange=((value, e) => changeColor(value))
              />
            </div> :
            ReasonReact.nullElement
        )
      </div>
    </div>;
};

let component = ReasonReact.reducerComponent("Header");

let reducer = ((store, dispatchFunc), action, state) =>
  switch (action) {
  | ToggleShowColorPick =>
    state.isShowColorPick ?
      ReasonReact.Update({
        ...state,
        isShowColorPick: false,
        colorHex:
          SceneEngineService.getAmbientLightColor
          |> StateLogicService.getEngineStateToGetData
          |> getHexString,
      }) :
      ReasonReact.Update({...state, isShowColorPick: true})
  };

let render =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-header-component">
    (Method.buildOperateHistoryComponent(store, dispatchFunc))
    (Method.buildOperateGameObjectComponent(store, dispatchFunc))
    (Method.buildOperateExtensionComponent())
    (Method.buildOperateControllerComponent(store, dispatchFunc))
    (Method.buildAmbientLightComponent(state, send))
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    isShowColorPick: false,
    colorHex:
      SceneEngineService.getAmbientLightColor
      |> StateLogicService.getEngineStateToGetData
      |> getHexString,
  },
  reducer: reducer((store, dispatchFunc)),
  render: self => render(store, dispatchFunc, self),
};