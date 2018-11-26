open HeaderType;

type state = {
  isSelectNav: bool,
  currentSelectNav: navType,
  isShowEditExportPackageModal: bool,
  isShowEditExportSceneModal: bool,
  isShowPublishLocalModal: bool,
  isShowHelpVersionModal: bool,
};

module Method = {
  /* let getStorageParentKey = () => "userExtension";
     /* todo use extension names instead of the name */

     let addExtension = text =>
       AppExtensionUtils.setExtension(getStorageParentKey(), text); */

  let importPackage = ((store, dispatchFunc), (send, blurNav), event) => {
    StateHistoryService.getStateForHistory()
    |> StoreHistoryUtils.storeHistoryStateWithNoCopyEngineState(store);

    HeaderImportPackageUtils.importPackage(dispatchFunc, event)
    |> Js.Promise.then_(_ => send(blurNav) |> Js.Promise.resolve)
    |> Js.Promise.catch(e => {
         let e = Obj.magic(e);
         let editorState = StateEditorService.getState();

         let message = e##message;
         let stack = e##stack;

         ConsoleUtils.error(
           LogUtils.buildErrorMessage(
             ~description={j|$message|j},
             ~reason="",
             ~solution={j||j},
             ~params={j||j},
           ),
           editorState,
         );
         ConsoleUtils.logStack(stack) |> ignore;

         AllHistoryService.handleUndo(store, Obj.magic(dispatchFunc))
         |> Js.Promise.resolve;
       });
  };

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
                  AllHistoryService.handleUndo(
                    store,
                    Obj.magic(dispatchFunc),
                  )
              )>
              <span className="section-header">
                (DomHelper.textEl("Undo"))
              </span>
            </div>
            /* <span className="section-tail">
                 (DomHelper.textEl("Ctrl+Z"))
               </span> */
            <div
              className="content-section"
              onClick=(
                _e =>
                  OperateStateHistoryService.hasRedoState(
                    AllStateData.getHistoryState(),
                  ) ?
                    AllHistoryService.redoHistoryState(store, dispatchFunc)
                    |> StateHistoryService.getAndRefreshStateForHistory :
                    ()
              )>
              <span className="section-header">
                (DomHelper.textEl("Redo"))
              </span>
            </div>
          </div> :
          /* <span className="section-tail">
               (DomHelper.textEl("Ctrl+U"))
             </span> */
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
                    importPackage((store, dispatchFunc), (send, BlurNav), e)
                    |> ignore
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
                  send(ShowEditExportPackageModal)
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
            <div
              className="content-section"
              onClick=(_e => send(ShowEditExportSceneModal))>
              <span className="section-header">
                (DomHelper.textEl("Export Scene"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
      (
        /*TODO not use modal */
        state.isShowEditExportPackageModal ?
          <SingleInputModal
            title="Export Package"
            defaultValue="WonderPackage"
            closeFunc=(() => send(HideEditExportPackageModal))
            submitFunc=(
              packageName => {
                HeaderExportPackageUtils.exportPackage(packageName);

                send(HideEditExportPackageModal);
              }
            )
          /> :
          ReasonReact.null
      )
      (
        state.isShowEditExportSceneModal ?
          <SingleInputModal
            title="Export Scene"
            defaultValue="WonderScene"
            closeFunc=(() => send(HideEditExportSceneModal))
            submitFunc=(
              sceneName => {
                HeaderExportSceneUtils.exportScene(sceneName);

                send(HideEditExportSceneModal);
              }
            )
          /> :
          ReasonReact.null
      )
    </div>;
  };

  let buildPublishComponent = (state, send, store, dispatchFunc) => {
    let className =
      state.currentSelectNav === Publish ?
        "item-title item-active" : "item-title";
    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick=(
            e =>
              state.isSelectNav ?
                send(BlurNav) : send(ToggleShowNav(Publish))
          )
          onMouseOver=(e => send(HoverNav(Publish)))>
          (DomHelper.textEl("Publish"))
        </span>
      </div>
      (
        state.currentSelectNav === Publish ?
          <div className="item-content">
            <div
              className="content-section"
              onClick=(_e => send(ShowPublishLocalModal))>
              <span className="section-header">
                (DomHelper.textEl("Local"))
              </span>
            </div>
          </div> :
          ReasonReact.null
      )
      (
        state.isShowPublishLocalModal ?
          <PublishLocalModal
            title="Local"
            defaultName="WonderLocal"
            defaultUseWorker=false
            closeFunc=(() => send(HidePublishLocalModal))
            submitFunc=(
              (zipName, useWorker) => {
                HeaderPublishLocalUtils.Publish.publishZip(
                  (zipName, useWorker),
                  WonderBsJszip.Zip.create,
                  Fetch.fetch,
                );

                send(HidePublishLocalModal);
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
                  (DomHelper.textEl(Copyright.getVersion()))
                </div>
              </div>
            }
          /> :
          ReasonReact.null
      )
    </div>;
  };

  let isHeaderDom = target =>
    DomUtils.isSpecificDomChildrenHasTargetDom(
      target,
      DomHelper.getElementsByClassName("item-title"),
    );

  let isImportPackageDom = target =>
    DomUtils.isSpecificDomChildrenHasTargetDom(
      target,
      DomHelper.getElementsByClassName("section-fileLoad"),
    );
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

  | ShowEditExportPackageModal =>
    ReasonReact.Update({...state, isShowEditExportPackageModal: true})

  | HideEditExportPackageModal =>
    ReasonReact.Update({...state, isShowEditExportPackageModal: false})

  | ShowEditExportSceneModal =>
    ReasonReact.Update({...state, isShowEditExportSceneModal: true})

  | ShowPublishLocalModal =>
    ReasonReact.Update({...state, isShowPublishLocalModal: true})

  | HidePublishLocalModal =>
    ReasonReact.Update({...state, isShowPublishLocalModal: false})

  | HideEditExportSceneModal =>
    ReasonReact.Update({...state, isShowEditExportSceneModal: false})
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
      (Method.buildPublishComponent(state, send, store, dispatchFunc))
      (Method.buildHelpComponent(state, send, store, dispatchFunc))
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    isSelectNav: false,
    currentSelectNav: None,
    isShowHelpVersionModal: false,
    isShowEditExportPackageModal: false,
    isShowEditExportSceneModal: false,
    isShowPublishLocalModal: false,
  },
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    DomHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);

        Method.isHeaderDom(target) || Method.isImportPackageDom(target) ?
          () : send(BlurNav);
      },
    ),
  render: self => render(store, dispatchFunc, self),
};