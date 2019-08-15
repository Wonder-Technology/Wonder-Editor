type state = {isShowControlsModal: bool};

type action =
  | ShowControlsModal
  | HideControlsModal;

module Method = {
  let _handleRedo = (uiState, dispatchFunc) =>
    OperateStateHistoryService.hasRedoState(AllStateData.getHistoryState()) ?
      AllHistoryService.redoHistoryState(uiState, dispatchFunc)
      |> StateHistoryService.getAndRefreshStateForHistory :
      ();

  let buildFileComponentSelectNav =
      (send, uiState, dispatchFunc, languageType) =>
    <div className="item-content">
      <div
        className="content-section"
        onClick={
          _e =>
            HeaderFileNewSceneUtils.handleNewScene(dispatchFunc)
            |> StateLogicService.getAndSetState
        }>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "file-new-scene",
                languageType,
              ),
            )
          }
        </span>
      </div>
      <div
        className="content-section"
        onClick={
          _e =>
            HeaderFileSaveUtils.savePackage(Fetch.fetchWithInit)
            |> WonderBsMost.Most.drain
            |> ignore
        }>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "file-save",
                languageType,
              ),
            )
          }
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => AllHistoryService.handleUndo(uiState, dispatchFunc)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "file-undo",
                languageType,
              ),
            )
          }
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => _handleRedo(uiState, dispatchFunc)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "file-redo",
                languageType,
              ),
            )
          }
        </span>
      </div>
      <div
        className="content-section" onClick={_e => send(ShowControlsModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "file-controls",
                languageType,
              ),
            )
          }
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

  let buildFileComponent =
      (
        (state, send),
        (uiState, dispatchFunc),
        (isFileNav, toggleShowNavFunc, hoverNavFunc),
      ) => {
    let className = isFileNav ? "item-title item-active" : "item-title";
    let languageType =
      LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick={e => toggleShowNavFunc()}
          onMouseOver={e => hoverNavFunc()}>
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "header-file",
                languageType,
              ),
            )
          }
        </span>
      </div>
      {
        isFileNav ?
          buildFileComponentSelectNav(
            send,
            uiState,
            dispatchFunc,
            languageType,
          ) :
          ReasonReact.null
      }
      {
        state.isShowControlsModal ?
          <Modal
            title={
              LanguageUtils.getHeaderLanguageDataByType(
                "file-controls",
                languageType,
              )
            }
            closeFunc={() => send(HideControlsModal)}
            content={buildControlModalContent()}
          /> :
          ReasonReact.null
      }
    </div>;
  };
};

let component = ReasonReact.reducerComponent("HeaderFile");

let reducer = (action, state) =>
  switch (action) {
  | ShowControlsModal =>
    ReasonReact.Update({...state, isShowControlsModal: true})

  | HideControlsModal =>
    ReasonReact.Update({...state, isShowControlsModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isFileNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  Method.buildFileComponent(
    (state, send),
    (uiState, dispatchFunc),
    (isFileNav, toggleShowNavFunc, hoverNavFunc),
  );

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
  initialState: () => {isShowControlsModal: false},
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isFileNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};