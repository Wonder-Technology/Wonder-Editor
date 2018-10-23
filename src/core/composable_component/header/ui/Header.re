type navType =
  | None
  | File
  | Edit;

type state = {
  isSelectNav: bool,
  currentSelectNav: navType,
};

type action =
  | HoverNav(navType)
  | ToggleShowNav(navType)
  | BlurNav;

module Method = {
  let getStorageParentKey = () => "userExtension";
  /* todo use extension names instead of the name */

  let addExtension = text =>
    AppExtensionUtils.setExtension(getStorageParentKey(), text);

  let buildFileComponent = (state, send, store, dispatchFunc) => {
    let className =
      state.currentSelectNav === File ?
        "item-title item-active" : "item-title";

    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick=(e => send(ToggleShowNav(File)))
          onMouseOver=(e => send(HoverNav(File)))>
          (DomHelper.textEl("File"))
        </span>
      </div>
      (
        state.currentSelectNav === File ?
          <div className="item-content">
            <div
              className="content-section"
              onClick=(
                _e =>
                  AllHistoryService.undoHistoryState(store, dispatchFunc)
                  |> StateHistoryService.getAndRefreshStateForHistory
              )>
              <span className="section-header">
                (DomHelper.textEl("Undo"))
              </span>
              <span className="section-tail">
                (DomHelper.textEl("Ctrl+Z"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(
                _e =>
                  AllHistoryService.redoHistoryState(store, dispatchFunc)
                  |> StateHistoryService.getAndRefreshStateForHistory
              )>
              <span className="section-header">
                (DomHelper.textEl("Redo"))
              </span>
              <span className="section-tail">
                (DomHelper.textEl("Ctrl+U"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
    </div>;
  };

  let buildEditComponent = (state, send, store, dispatchFunc) => {
    let className =
      state.currentSelectNav === Edit ?
        "item-title item-active" : "item-title";
    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick=(
            e =>
              state.isSelectNav ? send(BlurNav) : send(ToggleShowNav(Edit))
          )
          onMouseOver=(e => send(HoverNav(Edit)))>
          (DomHelper.textEl("Edit"))
        </span>
      </div>
      (
        state.currentSelectNav === Edit ?
          <div className="item-content item-edit">
            <div className="content-section">
              <input
                className="section-fileLoad"
                _type="file"
                multiple=false
                onChange=(
                  e => HeaderImportPackageUtils.importPackage(dispatchFunc, e)
                )
              />
              <span className="section-header">
                (DomHelper.textEl("Import Package"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(_e => HeaderExportPackageUtils.exportPackage())>
              <span className="section-header">
                (DomHelper.textEl("Export Package"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
    </div>;
  };
};

let component = ReasonReact.reducerComponent("Header");

let reducer = (action, state) =>
  switch (action) {
  | ToggleShowNav(selectNav) =>
    state.isSelectNav ?
      ReasonReact.Update({
        ...state,
        isSelectNav: false,
        currentSelectNav: None,
      }) :
      ReasonReact.Update({
        ...state,
        isSelectNav: true,
        currentSelectNav: selectNav,
      })

  | BlurNav =>
    ReasonReact.Update({...state, isSelectNav: false, currentSelectNav: None})

  | HoverNav(selectNav) =>
    state.isSelectNav ?
      ReasonReact.Update({...state, currentSelectNav: selectNav}) :
      ReasonReact.NoUpdate
  };

let render =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-header-component">
    <div className="header-nav">
      (Method.buildFileComponent(state, send, store, dispatchFunc))
      (Method.buildEditComponent(state, send, store, dispatchFunc))
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isSelectNav: false, currentSelectNav: None},
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    DomHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray = DomHelper.getElementsByClassName("item-title");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray) ?
          () : send(BlurNav);
      },
    ),
  render: self => render(store, dispatchFunc, self),
};