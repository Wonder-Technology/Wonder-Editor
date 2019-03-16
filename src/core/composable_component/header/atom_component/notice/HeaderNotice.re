type state = {
  isShowWelComeUserModal: bool,
  isShowVersionUpgradeModal: bool,
};

type action =
  | HideWelComeUserModal
  | HideVersionUpgradeModal;

module Method = {
  let getWelComeUserKey = () => "welcomeUser";

  let getVersionKey = () => "version";

  let getVersion = () => LocalStorage.getValue(getVersionKey());

  let _buildLinkContent = languageType => [|
    <div className="content-white" key="text2" />,
    <div className="content-text" key="text3">
      <a href="https://www.wonder-3d.com/" target="view_window">
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "notice-website",
              languageType,
            ),
          )
        }
      </a>
    </div>,
    <div className="content-small-white" key="text4" />,
    <div className="content-text" key="text5">
      <a href="https://forum.wonder-3d.com/" target="view_window">
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "notice-forum",
              languageType,
            ),
          )
        }
      </a>
    </div>,
    <div className="content-small-white" key="text6" />,
    <div className="content-text" key="text7">
      <a
        href="https://www.wonder-3d.com/docs/docs/doc1-1/"
        target="view_window">
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "notice-doc",
              languageType,
            ),
          )
        }
      </a>
    </div>,
    <div className="content-small-white" key="text8" />,
    <div className="content-text" key="text9">
      <a href="https://github.com/Wonder-Technology" target="view_window">
        {DomHelper.textEl({j|Github|j})}
      </a>
    </div>,
  |];

  let buildWelComeUserModalContent = languageType =>
    [|
      <div className="content-text" key="text1">
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "welcome-content",
              languageType,
            ),
          )
        }
      </div>,
    |]
    |> ArrayService.fastConcat(_, _buildLinkContent(languageType));

  let buildVersionUpgradeModalContent = languageType => {
    let newVersion = Copyright.getVersion();

    [|
      <div className="content-text" key="text1">
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderVersionUpgradeContentLanguageDataByType(
              newVersion,
              languageType,
            ),
          )
        }
      </div>,
    |]
    |> ArrayService.fastConcat(_, _buildLinkContent(languageType));
  };
};

let component = ReasonReact.reducerComponent("HeaderNotice");

let reducer = (action, state) =>
  switch (action) {
  | HideWelComeUserModal =>
    ReasonReact.Update({
      ...state,
      isShowWelComeUserModal: false,
      isShowVersionUpgradeModal: false,
    })

  | HideVersionUpgradeModal =>
    ReasonReact.Update({
      ...state,
      isShowWelComeUserModal: false,
      isShowVersionUpgradeModal: false,
    })
  };

let render =
    ((uiState, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <div className="header-item">
    {
      state.isShowWelComeUserModal ?
        <Modal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "notice-welcome",
              languageType,
            )
          }
          closeFunc={() => send(HideWelComeUserModal)}
          content={Method.buildWelComeUserModalContent(languageType)}
        /> :
        state.isShowVersionUpgradeModal ?
          <Modal
            title={
              LanguageUtils.getHeaderLanguageDataByType(
                "notice-version",
                languageType,
              )
            }
            closeFunc={() => send(HideVersionUpgradeModal)}
            content={Method.buildVersionUpgradeModalContent(languageType)}
          /> :
          ReasonReact.null
    }
  </div>;
};

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    isShowWelComeUserModal:
      switch (LocalStorage.getValue(Method.getWelComeUserKey())) {
      | None =>
        LocalStorage.setValue(Method.getWelComeUserKey(), "ok");
        true;

      | Some(value) => value !== "ok"
      },
    isShowVersionUpgradeModal:
      switch (Method.getVersion()) {
      | None =>
        LocalStorage.setValue(Method.getVersionKey(), Copyright.getVersion());
        true;

      | Some(value) =>
        value === Copyright.getVersion() ?
          false :
          {
            LocalStorage.setValue(
              Method.getVersionKey(),
              Copyright.getVersion(),
            );
            true;
          }
      },
  },
  reducer,
  render: self => render((uiState, dispatchFunc), self),
};