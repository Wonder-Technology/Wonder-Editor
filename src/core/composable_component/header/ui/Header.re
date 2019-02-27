open HeaderType;

type state = {
  isSelectNav: bool,
  currentSelectNav: navType,
  isShowFileControlsModal: bool,
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

  let importPackage = ((uiState, dispatchFunc), (send, blurNav), event) => {
    StateHistoryService.getStateForHistory()
    |> StoreHistoryUtils.storeHistoryStateWithNoCopyEngineState(uiState);

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

         AllHistoryService.handleUndo(uiState, dispatchFunc)
         |> Js.Promise.resolve;
       });
  };

  let _handleRedo = (uiState, dispatchFunc) =>
    OperateStateHistoryService.hasRedoState(AllStateData.getHistoryState()) ?
      AllHistoryService.redoHistoryState(uiState, dispatchFunc)
      |> StateHistoryService.getAndRefreshStateForHistory :
      ();

  let _buildFileComponentSelectNav = (send, uiState, dispatchFunc) =>
    <div className="item-content">
      <div
        className="content-section"
        onClick={_e => AllHistoryService.handleUndo(uiState, dispatchFunc)}>
        <span className="section-header"> {DomHelper.textEl("Undo")} </span>
      </div>
      <div
        className="content-section"
        onClick={_e => _handleRedo(uiState, dispatchFunc)}>
        <span className="section-header"> {DomHelper.textEl("Redo")} </span>
      </div>
      <div
        className="content-section"
        onClick={_e => send(ShowFileControlsModal)}>
        <span className="section-header">
          {DomHelper.textEl("Controls")}
        </span>
      </div>
    </div>;

  let _handleHotKeyValueByOS = values => {
    let isMac = DetectOSUtils.isMac();

    values
    |> Js.Array.filter(value =>
         isMac ? true : !(value |> Js.String.includes("command"))
       );
  };

  let _buildControlModalContent = () =>
    HotKeysSettingEditorService.getHotKeys
    |> StateLogicService.getEditorState
    |> Js.Array.mapi(({name, values}: SettingType.hotKey, i) =>
         <div key={i |> string_of_int} className="content-field">
           <div className="field-title"> {DomHelper.textEl(name)} </div>
           <div className="field-content">
             {
               DomHelper.textEl(
                 _handleHotKeyValueByOS(values) |> Js.Array.joinWith("|"),
               )
             }
           </div>
         </div>
       );

  let buildFileComponent = (state, send, uiState, dispatchFunc) => {
    let className =
      state.currentSelectNav === File ?
        "item-title item-active" : "item-title";

    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick={e => send(ToggleShowNav(File))}
          onMouseOver={e => send(HoverNav(File))}>
          {DomHelper.textEl("File")}
        </span>
      </div>
      {
        state.currentSelectNav === File ?
          _buildFileComponentSelectNav(send, uiState, dispatchFunc) :
          ReasonReact.null
      }
      {
        state.isShowFileControlsModal ?
          <Modal
            title="Controls"
            closeFunc={() => send(HideFileControlsModal)}
            content={_buildControlModalContent()}
          /> :
          ReasonReact.null
      }
    </div>;
  };

  let _buildEditComponentSelectNav = (send, uiState, dispatchFunc) =>
    <div className="item-content item-edit">
      <div className="content-section">
        <input
          className="section-fileLoad"
          type_="file"
          multiple=false
          onChange={
            e =>
              importPackage((uiState, dispatchFunc), (send, BlurNav), e)
              |> ignore
          }
        />
        <span className="section-header">
          {DomHelper.textEl("Import Package")}
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => send(ShowEditExportPackageModal)}>
        <span className="section-header">
          {DomHelper.textEl("Export Package")}
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => send(ShowEditExportSceneModal)}>
        <span className="section-header">
          {DomHelper.textEl("Export Scene")}
        </span>
      </div>
    </div>;

  let buildEditComponent = (state, send, uiState, dispatchFunc) => {
    let className =
      state.currentSelectNav === Edit ?
        "item-title item-active" : "item-title";
    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick={
            e =>
              state.isSelectNav ? send(BlurNav) : send(ToggleShowNav(Edit))
          }
          onMouseOver={e => send(HoverNav(Edit))}>
          {DomHelper.textEl("Edit")}
        </span>
      </div>
      {
        state.currentSelectNav === Edit ?
          _buildEditComponentSelectNav(send, uiState, dispatchFunc) :
          ReasonReact.null
      }
      {
        state.isShowEditExportPackageModal ?
          <SingleInputModal
            title="Export Package"
            defaultValue="WonderPackage"
            closeFunc={() => send(HideEditExportPackageModal)}
            submitFunc={
              packageName => {
                HeaderExportPackageUtils.exportPackage(packageName);

                send(HideEditExportPackageModal);
              }
            }
          /> :
          ReasonReact.null
      }
      {
        state.isShowEditExportSceneModal ?
          <SingleInputModal
            title="Export Scene"
            defaultValue="WonderScene"
            closeFunc={() => send(HideEditExportSceneModal)}
            submitFunc={
              sceneName => {
                HeaderExportSceneUtils.exportScene(sceneName);

                send(HideEditExportSceneModal);
              }
            }
          /> :
          ReasonReact.null
      }
    </div>;
  };

  let _buildPublishComponentSelectNav = send =>
    <div className="item-content">
      <div
        className="content-section"
        onClick={_e => send(ShowPublishLocalModal)}>
        <span className="section-header"> {DomHelper.textEl("Local")} </span>
      </div>
    </div>;

  let buildPublishComponent = (state, send, uiState, dispatchFunc) => {
    let className =
      state.currentSelectNav === Publish ?
        "item-title item-active" : "item-title";

    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick={
            e =>
              state.isSelectNav ?
                send(BlurNav) : send(ToggleShowNav(Publish))
          }
          onMouseOver={e => send(HoverNav(Publish))}>
          {DomHelper.textEl("Publish")}
        </span>
      </div>
      {
        state.currentSelectNav === Publish ?
          _buildPublishComponentSelectNav(send) : ReasonReact.null
      }
      {
        state.isShowPublishLocalModal ?
          <PublishLocalModal
            title="Local"
            defaultName="WonderLocal"
            defaultUseWorker=false
            closeFunc={() => send(HidePublishLocalModal)}
            submitFunc={
              (zipName, useWorker) => {
                HeaderPublishLocalUtils.Publish.publishZip(
                  (zipName, useWorker),
                  WonderBsJszip.Zip.create,
                  FetchUtils.fetch,
                );

                send(HidePublishLocalModal);
              }
            }
          /> :
          ReasonReact.null
      }
    </div>;
  };

  let _buildHelpComponentSelectNav = send =>
    <div className="item-content item-help">
      <div
        className="content-section"
        onClick={_e => send(ShowHelpVersionModal)}>
        <span className="section-header"> {DomHelper.textEl("About")} </span>
      </div>
    </div>;

  let buildHelpComponent = (state, send, uiState, dispatchFunc) => {
    let className =
      state.currentSelectNav === Help ?
        "item-title item-active" : "item-title";

    <div className="header-item">
      <div className="component-item">
        <span
          className
          onClick={e => send(ToggleShowNav(Help))}
          onMouseOver={e => send(HoverNav(Help))}>
          {DomHelper.textEl("Help")}
        </span>
      </div>
      {
        state.currentSelectNav === Help ?
          _buildHelpComponentSelectNav(send) : ReasonReact.null
      }
      {
        state.isShowHelpVersionModal ?
          <Modal
            title="About Wonder"
            closeFunc={() => send(HideHelpVersionModal)}
            content=[|
              <div className="content-field" key="aboutWonder">
                <div className="field-title">
                  {DomHelper.textEl("Version")}
                </div>
                <div className="field-content">
                  {DomHelper.textEl(Copyright.getVersion())}
                </div>
              </div>,
              <div className="content-field" key="aboutWonder">
                <div className="field-title">
                  {DomHelper.textEl("Website")}
                </div>
                <div className="field-content">
                  <a href="http://www.wonder-3d.com/" target="view_window">
                    {DomHelper.textEl("click this page")}
                  </a>
                </div>
              </div>,
              <div className="content-field" key="aboutWonder">
                <div className="field-title">
                  {DomHelper.textEl("Feedback")}
                </div>
                <div className="field-content">
                  <a href="http://forum.wonder-3d.com/" target="view_window">
                    {DomHelper.textEl("click this page")}
                  </a>
                </div>
              </div>,
              <div className="content-field" key="aboutWonder">
                <div className="field-title">
                  {DomHelper.textEl("Editor Github")}
                </div>
                <div className="field-content">
                  <a
                    href="https://github.com/Wonder-Technology/Wonder-Editor"
                    target="view_window">
                    {DomHelper.textEl("click this page")}
                  </a>
                </div>
              </div>,
              <div className="content-field" key="aboutWonder">
                <div className="field-title">
                  {DomHelper.textEl("Engine Github")}
                </div>
                <div className="field-content">
                  <a
                    href="https://github.com/Wonder-Technology/Wonder.js"
                    target="view_window">
                    {DomHelper.textEl("click this page")}
                  </a>
                </div>
              </div>,
            |]
          /> :
          ReasonReact.null
      }
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

  | ShowFileControlsModal =>
    ReasonReact.Update({...state, isShowFileControlsModal: true})

  | HideFileControlsModal =>
    ReasonReact.Update({...state, isShowFileControlsModal: false})

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
      uiState: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-header-component">
    <div className="header-nav">
      {Method.buildFileComponent(state, send, uiState, dispatchFunc)}
      {Method.buildEditComponent(state, send, uiState, dispatchFunc)}
      {Method.buildPublishComponent(state, send, uiState, dispatchFunc)}
      {Method.buildHelpComponent(state, send, uiState, dispatchFunc)}
    </div>
  </article>;

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {
    isSelectNav: false,
    currentSelectNav: None,
    isShowFileControlsModal: false,
    isShowHelpVersionModal: false,
    isShowEditExportPackageModal: false,
    isShowEditExportSceneModal: false,
    isShowPublishLocalModal: false,
  },
  reducer,
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventHelper.addEventListener(
      DomHelper.document,
      "click",
      e => {
        let target = ReactEventRe.Form.target(e);

        Method.isHeaderDom(target) || Method.isImportPackageDom(target) ?
          () : send(BlurNav);
      },
    ),
  render: self => render(uiState, dispatchFunc, self),
};