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

  let buildWelComeUserModalContent = () => [|
    <div className="content-text" key="text1">
      {
        DomHelper.textEl(
          {j|欢迎使用Wonder编辑器，我们为您服务～|j},
        )
      }
    </div>,
    <div className="content-white" key="text2" />,
    <div className="content-text" key="text1">
      <a href="https://www.wonder-3d.com/" target="view_window">
        {DomHelper.textEl({j|官方网站|j})}
      </a>
    </div>,
    <div className="content-small-white" key="text2" />,
    <div className="content-text" key="text1">
      <a href="https://forum.wonder-3d.com/" target="view_window">
        {DomHelper.textEl({j|论坛|j})}
      </a>
    </div>,
    <div className="content-small-white" key="text2" />,
    <div className="content-text" key="text1">
      <a
        href="https://www.wonder-3d.com/docs/docs/doc1-1/"
        target="view_window">
        {DomHelper.textEl({j|文档|j})}
      </a>
    </div>,
    <div className="content-small-white" key="text2" />,
    <div className="content-text" key="text1">
      <a href="https://github.com/Wonder-Technology" target="view_window">
        {DomHelper.textEl({j|Github|j})}
      </a>
    </div>,
  |];

  let buildVersionUpgradeModalContent = () => {
    let newVersion = Copyright.getVersion();

    [|
      <div className="content-text" key="text1">
        {DomHelper.textEl({j|已为您升级为$newVersion版本。|j})}
      </div>,
      <div className="content-white" key="text2" />,
      <div className="content-text" key="text1">
        <a href="https://www.wonder-3d.com/" target="view_window">
          {DomHelper.textEl({j|官方网站|j})}
        </a>
      </div>,
      <div className="content-small-white" key="text2" />,
      <div className="content-text" key="text1">
        <a href="https://forum.wonder-3d.com/" target="view_window">
          {DomHelper.textEl({j|论坛|j})}
        </a>
      </div>,
      <div className="content-small-white" key="text2" />,
      <div className="content-text" key="text1">
        <a
          href="https://www.wonder-3d.com/docs/docs/doc1-1/"
          target="view_window">
          {DomHelper.textEl({j|文档|j})}
        </a>
      </div>,
      <div className="content-small-white" key="text2" />,
      <div className="content-text" key="text1">
        <a href="https://github.com/Wonder-Technology" target="view_window">
          {DomHelper.textEl({j|Github|j})}
        </a>
      </div>,
    |];
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
    ((uiState, dispatchFunc), {state, send}: ReasonReact.self('a, 'b, 'c)) =>
  <div className="header-item">
    {
      state.isShowWelComeUserModal ?
        <Modal
          title="Welcome to Wonder"
          closeFunc={() => send(HideWelComeUserModal)}
          content={Method.buildWelComeUserModalContent()}
        /> :
        state.isShowVersionUpgradeModal ?
          <Modal
            title="Version Upgrade"
            closeFunc={() => send(HideVersionUpgradeModal)}
            content={Method.buildVersionUpgradeModalContent()}
          /> :
          ReasonReact.null
    }
  </div>;

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