type state = {isShowAboutWonderModal: bool};

type action =
  | ShowAboutWonderModal
  | HideAboutWonderModal;

module Method = {
  let buildHelpComponentSelectNav = send =>
    <div className="item-content item-help">
      <div
        className="content-section"
        onClick={_e => send(ShowAboutWonderModal)}>
        <span className="section-header"> {DomHelper.textEl("About")} </span>
      </div>
    </div>;

  let getAboutWonderModalArray = () => [|
    ("Version", Copyright.getVersion(), false, ""),
    ("Website", "www.wonder-3d.com/", true, "http://www.wonder-3d.com/"),
    ("Feedback", "forum.wonder-3d.com/", true, "http://forum.wonder-3d.com/"),
    (
      "Editor Github",
      "github.com/Wonder-Technology/Wonder-Editor",
      true,
      "https://github.com/Wonder-Technology/Wonder-Editor",
    ),
    (
      "Engine Github",
      "github.com/Wonder-Technology/Wonder.js",
      true,
      "https://github.com/Wonder-Technology/Wonder.js",
    ),
  |];

  let buildHelpComponent = (state, send, uiState, dispatchFunc) => {};
};

let component = ReasonReact.reducerComponent("HeaderPublish");

let reducer = (action, state) =>
  switch (action) {
  | ShowAboutWonderModal =>
    ReasonReact.Update({...state, isShowAboutWonderModal: true})

  | HideAboutWonderModal =>
    ReasonReact.Update({...state, isShowAboutWonderModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isHelpNav, toggleShowNavFunc, hoverNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isHelpNav ? "item-title item-active" : "item-title";

  <div className="header-item">
    <div className="component-item">
      <span
        className
        onClick={e => toggleShowNavFunc()}
        onMouseOver={e => hoverNavFunc()}>
        {DomHelper.textEl("Help")}
      </span>
    </div>
    {isHelpNav ? Method.buildHelpComponentSelectNav(send) : ReasonReact.null}
    {
      state.isShowAboutWonderModal ?
        <Modal
          title="About Wonder"
          closeFunc={() => send(HideAboutWonderModal)}
          content={
            ModalUtils.iterateModalArrayBuildComponent(
              Method.getAboutWonderModalArray(),
            )
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
      ~isHelpNav,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {isShowAboutWonderModal: false},
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isHelpNav, toggleShowNavFunc, hoverNavFunc),
      self,
    ),
};