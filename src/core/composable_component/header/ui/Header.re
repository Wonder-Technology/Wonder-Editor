type navType =
  | None
  | File
  | Edit
  | Help;

type state = {
  isSelectNav: bool,
  currentSelectNav: navType,
  isShowEditExportModal: bool,
  isShowHelpVersionModal: bool,
};

type action =
  | HoverNav(navType)
  | ToggleShowNav(navType)
  | BlurNav
  | ShowEditExportModal
  | HideEditExportModal
  | ShowHelpVersionModal
  | HideHelpVersionModal;

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
                  e =>
                    HeaderImportPackageUtils.importPackage(dispatchFunc, e)
                    |> Js.Promise.then_(_ =>
                         send(BlurNav) |> Js.Promise.resolve
                       )
                    |> ignore
                )
                onFocus=(
                  e =>
                    UIEditorService.markFileInputClose
                    |> StateLogicService.getAndSetEditorState
                )
                onClick=(
                  e =>
                    UIEditorService.markFileInputOpen
                    |> StateLogicService.getAndSetEditorState
                )
              />
              <span className="section-header">
                (DomHelper.textEl("Import Package"))
              </span>
            </div>
            <div
              className="content-section"
              onClick=(
                _e =>
                  send(ShowEditExportModal)
                  /* HeaderExportUtils.exportPackage(
                       WonderBsJszip.Zip.create,
                       Fetch.fetch,
                     )
                     |> ignore */
              )>
              <span className="section-header">
                (DomHelper.textEl("Export Package"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
      (
        /*TODO not use modal */
        state.isShowEditExportModal ?
          <SingleInputModal
            title="Export Package"
            defaultValue="wonderPackage"
            closeFunc=(() => send(HideEditExportModal))
            submitFunc=(
              packageName => {
                HeaderExportPackageUtils.exportPackage();

                send(HideEditExportModal);
              }
            )
          /> :
          ReasonReact.null
      )
    </div>;
  };

  let buildHelpComponent = (state, send, store, dispatchFunc) => {
    let className =
      state.currentSelectNav === Help ?
        "item-title item-active" : "item-title";

    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick=(e => send(ToggleShowNav(Help)))
          onMouseOver=(e => send(HoverNav(Help)))>
          (DomHelper.textEl("Help"))
        </span>
      </div>
      (
        state.currentSelectNav === Help ?
          <div className="item-content item-help">
            <div
              className="content-section"
              onClick=(_e => send(ShowHelpVersionModal))>
              <span className="section-header">
                (DomHelper.textEl("Version"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
      (
        state.isShowHelpVersionModal ?
          <Modal
            title="About Wonder"
            closeFunc=(() => send(HideHelpVersionModal))
            content={
              <div className="content-field">
                <div className="field-title">
                  (DomHelper.textEl("Version:"))
                </div>
                <div className="field-content">
                  (DomHelper.textEl("1.0.0"))
                </div>
              </div>
            }
          /> :
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

  | ShowHelpVersionModal =>
    ReasonReact.Update({...state, isShowHelpVersionModal: true})

  | HideHelpVersionModal =>
    ReasonReact.Update({...state, isShowHelpVersionModal: false})

  | ShowEditExportModal =>
    ReasonReact.Update({...state, isShowEditExportModal: true})

  | HideEditExportModal =>
    ReasonReact.Update({...state, isShowEditExportModal: false})
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
      (Method.buildHelpComponent(state, send, store, dispatchFunc))
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    isSelectNav: false,
    currentSelectNav: None,
    isShowHelpVersionModal: false,
    isShowEditExportModal: false,
  },
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    DomHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);
        let targetArray = DomHelper.getElementsByClassName("item-title");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray)
        || UIEditorService.isFileInputOpen(StateEditorService.getState()) ?
          /* ? */
          () : send(BlurNav);
      },
    ),
  render: self => render(store, dispatchFunc, self),
};