type state = {
  isShowLocalModal: bool,
  isShowHostPlatformModal: bool,
};

type action =
  | ShowLocalModal
  | HideLocalModal
  | ShowHostPlatformModal
  | HideHostPlatformModal;

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
      <div
        className="content-section"
        onClick={_e => send(ShowHostPlatformModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "publish-hostPlatform",
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
  | ShowHostPlatformModal =>
    ReasonReact.Update({...state, isShowHostPlatformModal: true})
  | HideHostPlatformModal =>
    ReasonReact.Update({...state, isShowHostPlatformModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isPublishNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isPublishNav ? "item-title item-active" : "item-title";
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
      state.isShowHostPlatformModal ?
        <PublishHostPlatformModal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "publish-hostPlatform",
              languageType,
            )
          }
          defaultUseWorker=false
          defaultUseAssetBundle=false
          closeFunc={() => send(HideHostPlatformModal)}
          submitFunc={
            (useWorker, (useAssetBundle, selectTreeForAssetBundle)) => {
              HeaderPublishHostPlatformUtils.publishToHostPlatform(
                useWorker,
                useAssetBundle,
                selectTreeForAssetBundle,
                FetchUtils.fetch,
              );

              send(HideHostPlatformModal);
            }
          }
        /> :
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
          defaultUseAssetBundle=false
          closeFunc={() => send(HideLocalModal)}
          submitFunc={
            (zipName, useWorker, (useAssetBundle, selectTreeForAssetBundle)) => {
              HeaderPublishLocalUtils.Publish.publishZip(
                (zipName, useWorker),
                (useAssetBundle, selectTreeForAssetBundle),
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
  initialState: () => {
    isShowLocalModal: false,
    isShowHostPlatformModal: false,
  },
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isPublishNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};