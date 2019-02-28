type state = {isShowFileControlsModal: bool};

type action =
  | ShowControlsModal
  | HideControlsModal;

module Method = {
  let _handleRedo = (uiState, dispatchFunc) =>
    OperateStateHistoryService.hasRedoState(AllStateData.getHistoryState()) ?
      AllHistoryService.redoHistoryState(uiState, dispatchFunc)
      |> StateHistoryService.getAndRefreshStateForHistory :
      ();

  let buildFileComponentSelectNav = (send, uiState, dispatchFunc) =>
    <div className="item-content">
      <div
        className="content-section"
        onClick={_e => AllHistoryService.handleUndo(uiState, dispatchFunc)}>
        <span className="section-header"> {DomHelper.textEl("Undo")} </span>
      </div>
      <div
        className="content-section"
        onClick={_e => _handleRedo(uiState, dispatchFunc)}>
        <span className="section-header"> {DomHelper.textEl("Redo")} </span>
      </div>
      <div
        className="content-section" onClick={_e => send(ShowControlsModal)}>
        <span className="section-header">
          {DomHelper.textEl("Controls")}
        </span>
      </div>
    </div>;

  let _handleHotKeyValueByOS = values => {
    let isMac = DetectOSUtils.isMac();

    values
    |> Js.Array.filter(value =>
         isMac ? true : !(value |> Js.String.includes("command"))
       );
  };

  let buildControlModalContent = () =>
    HotKeysSettingEditorService.getHotKeys
    |> StateLogicService.getEditorState
    |> Js.Array.mapi(({name, values}: SettingType.hotKey, i) =>
         <div key={i |> string_of_int} className="content-field">
           <div className="field-title"> {DomHelper.textEl(name)} </div>
           <div className="field-content">
             {
               DomHelper.textEl(
                 _handleHotKeyValueByOS(values) |> Js.Array.joinWith("|"),
               )
             }
           </div>
         </div>
       );
};

let component = ReasonReact.reducerComponent("Header");

let reducer = (action, state) =>
  switch (action) {
  | ShowControlsModal =>
    ReasonReact.Update({...state, isShowFileControlsModal: true})

  | HideControlsModal =>
    ReasonReact.Update({...state, isShowFileControlsModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isFileNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isFileNav ? "item-title item-active" : "item-title";

  <div className="header-item">
    <div className="component-item">
      <span
        className
        onClick={e => toggleShowNavFunc()}
        onMouseOver={e => hoverNavFunc()}>
        {DomHelper.textEl("File")}
      </span>
    </div>
    {
      isFileNav ?
        Method.buildFileComponentSelectNav(send, uiState, dispatchFunc) :
        ReasonReact.null
    }
    {
      state.isShowFileControlsModal ?
        <Modal
          title="Controls"
          closeFunc={() => send(HideControlsModal)}
          content={Method.buildControlModalContent()}
        /> :
        ReasonReact.null
    }
  </div>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~isFileNav,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {isShowFileControlsModal: false},
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isFileNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};