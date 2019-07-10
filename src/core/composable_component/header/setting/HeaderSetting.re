type state = {isShowSceneModal: bool};

type action =
  | ShowSceneModal
  | HideSceneModal;

module Method = {
  let buildSettingComponentSelectNav = (send, languageType) =>
    <div className="item-content">
      <div className="content-section" onClick={_e => send(ShowSceneModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "setting-scene",
                languageType,
              ),
            )
          }
        </span>
      </div>
    </div>;
};

let component = ReasonReact.reducerComponent("HeaderSetting");

let reducer = (action, state) =>
  switch (action) {
  | ShowSceneModal => ReasonReact.Update({...state, isShowSceneModal: true})
  | HideSceneModal => ReasonReact.Update({...state, isShowSceneModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isSettingNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isSettingNav ? "item-title item-active" : "item-title";
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
              "header-setting",
              languageType,
            ),
          )
        }
      </span>
    </div>
    {
      isSettingNav ?
        Method.buildSettingComponentSelectNav(send, languageType) :
        ReasonReact.null
    }
    {
      state.isShowSceneModal ?
        <SettingSceneModal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "setting-scene",
              languageType,
            )
          }
          uiState
          dispatchFunc
          isShowCubemapGroup=false
          closeFunc={() => send(HideSceneModal)}
        /> :
        ReasonReact.null
    }
  </div>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~isSettingNav,
      ~isShowSceneModal,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {isShowSceneModal: isShowSceneModal},
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isSettingNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};