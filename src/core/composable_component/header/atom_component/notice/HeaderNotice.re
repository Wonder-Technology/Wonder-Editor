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

  let buildWelComeUserModalContent = () => [|
    <div className="content-text">
      {
        DomHelper.textEl(
          {js| 欢迎来到Wonder，你可以通过访问我们的|js},
        )
      }
      <a href="http://www.wonder-3d.com/" target="view_window">
        {DomHelper.textEl({j|官方网站|j})}
      </a>
      {DomHelper.textEl({js|, 查看我们能为你提供什么服务|js})}
    </div>,
    <div className="content-white" />,
    <div className="content-text">
      {DomHelper.textEl({j|Wonder 科技为你服务|j})}
    </div>,
  |];
};

let component = ReasonReact.reducerComponent("HeaderNotice");

let reducer = (action, state) =>
  switch (action) {
  | HideWelComeUserModal =>
    ReasonReact.Update({...state, isShowWelComeUserModal: false})

  | HideVersionUpgradeModal =>
    ReasonReact.Update({...state, isShowVersionUpgradeModal: false})
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
            content={Method.buildWelComeUserModalContent()}
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

      | Some(value) => false
      },
    isShowVersionUpgradeModal:
      switch (LocalStorage.getValue(Method.getVersionKey())) {
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