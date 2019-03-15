type state = {isShowLocalModal: bool};

type action =
  | ShowLocalModal
  | HideLocalModal;

module Method = {
  let buildPublishComponentSelectNav = (send, languageType) =>
    <div className="item-content">
      <div className="content-section" onClick={_e => send(ShowLocalModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "publish-local",
                languageType,
              ),
            )
          }
        </span>
      </div>
    </div>;
};

let component = ReasonReact.reducerComponent("HeaderPublish");

let reducer = (action, state) =>
  switch (action) {
  | ShowLocalModal => ReasonReact.Update({...state, isShowLocalModal: true})

  | HideLocalModal => ReasonReact.Update({...state, isShowLocalModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isPublishNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isPublishNav ? "item-title item-active" : "item-title";
  let languageType =
    LanguageUtils.getLanguageType(WindowType.window##wonderLanguage);

  <div className="header-item">
    <div className="component-item">
      <span
        className
        onClick={e => toggleShowNavFunc()}
        onMouseOver={e => hoverNavFunc()}>
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "header-publish",
              languageType,
            ),
          )
        }
      </span>
    </div>
    {
      isPublishNav ?
        Method.buildPublishComponentSelectNav(send, languageType) :
        ReasonReact.null
    }
    {
      state.isShowLocalModal ?
        <PublishLocalModal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "publish-local",
              languageType,
            )
          }
          defaultName="WonderLocal"
          defaultUseWorker=false
          closeFunc={() => send(HideLocalModal)}
          submitFunc={
            (zipName, useWorker) => {
              HeaderPublishLocalUtils.Publish.publishZip(
                (zipName, useWorker),
                WonderBsJszip.Zip.create,
                FetchUtils.fetch,
              );

              send(HideLocalModal);
            }
          }
        /> :
        ReasonReact.null
    }
  </div>;
};

let make =
    (
      ~uiState: AppStore.appState,
      ~dispatchFunc,
      ~isPublishNav,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {isShowLocalModal: false},
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isPublishNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};