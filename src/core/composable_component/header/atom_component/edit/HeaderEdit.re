type state = {
  isShowExportPackageModal: bool,
  isShowExportSceneModal: bool,
};

type action =
  | ShowExportPackageModal
  | HideExportPackageModal
  | ShowExportSceneModal
  | HideExportSceneModal;

module Method = {
  let importPackage = ((uiState, dispatchFunc), closeNavFunc, event) => {
    StateEngineService.unsafeGetState()
    |> ProgressUtils.show
    |> ProgressUtils.changePercent(0)
    |> StateEngineService.setState
    |> ignore;

    StateHistoryService.getStateForHistory()
    |> StoreHistoryUtils.storeHistoryStateWithNoCopyEngineState(uiState);

    HeaderImportPackageUtils.importPackage(dispatchFunc, event)
    |> Js.Promise.then_(_ => {
         ProgressUtils.finish |> StateLogicService.getAndSetEngineState;

         closeNavFunc() |> Js.Promise.resolve;
       })
    |> Js.Promise.catch(e => {
         ProgressUtils.finish |> StateLogicService.getAndSetEngineState;

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

  let _buildImportUI = ((uiState, dispatchFunc), closeNavFunc, languageType) =>
    <div className="content-section">
      <input
        className="section-fileLoad"
        type_="file"
        multiple=false
        onChange={
          e =>
            importPackage((uiState, dispatchFunc), closeNavFunc, e) |> ignore
        }
      />
      <span className="section-header">
        {
          DomHelper.textEl(
            LanguageUtils.getHeaderLanguageDataByType(
              "edit-import-package",
              languageType,
            ),
          )
        }
      </span>
    </div>;

  let _buildExportUI = (send, languageType) =>
    <>
      <div
        className="content-section"
        onClick={_e => send(ShowExportPackageModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "edit-export-package",
                languageType,
              ),
            )
          }
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => send(ShowExportSceneModal)}>
        <span className="section-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "edit-export-scene",
                languageType,
              ),
            )
          }
        </span>
      </div>
    </>;

  let buildEditComponentSelectNav =
      ((uiState, dispatchFunc), send, closeNavFunc, languageType) =>
    <div className="item-content item-edit">
      {_buildImportUI((uiState, dispatchFunc), closeNavFunc, languageType)}
      {_buildExportUI(send, languageType)}
    </div>;
};

let component = ReasonReact.reducerComponent("HeaderEdit");

let reducer = (action, state) =>
  switch (action) {
  | ShowExportPackageModal =>
    ReasonReact.Update({...state, isShowExportPackageModal: true})

  | HideExportPackageModal =>
    ReasonReact.Update({...state, isShowExportPackageModal: false})

  | ShowExportSceneModal =>
    ReasonReact.Update({...state, isShowExportSceneModal: true})

  | HideExportSceneModal =>
    ReasonReact.Update({...state, isShowExportSceneModal: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      (isEditNav, toggleShowNavFunc, hoverNavFunc, closeNavFunc),
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let className = isEditNav ? "item-title item-active" : "item-title";
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
              "header-edit",
              languageType,
            ),
          )
        }
      </span>
    </div>
    {
      isEditNav ?
        Method.buildEditComponentSelectNav(
          (uiState, dispatchFunc),
          send,
          closeNavFunc,
          languageType,
        ) :
        ReasonReact.null
    }
    {
      state.isShowExportPackageModal ?
        <SingleInputModal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "edit-export-package",
              languageType,
            )
          }
          inputText="name"
          defaultValue="WonderPackage"
          closeFunc={() => send(HideExportPackageModal)}
          submitFunc={
            packageName => {
              HeaderExportPackageUtils.exportPackage(packageName);

              send(HideExportPackageModal);
            }
          }
        /> :
        ReasonReact.null
    }
    {
      state.isShowExportSceneModal ?
        <SingleInputModal
          title={
            LanguageUtils.getHeaderLanguageDataByType(
              "edit-export-scene",
              languageType,
            )
          }
          inputText="name"
          defaultValue="WonderScene"
          closeFunc={() => send(HideExportSceneModal)}
          submitFunc={
            sceneName => {
              HeaderExportSceneUtils.exportScene(sceneName);

              send(HideExportSceneModal);
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
      ~isEditNav,
      ~toggleShowNavFunc,
      ~hoverNavFunc,
      ~closeNavFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    isShowExportPackageModal: false,
    isShowExportSceneModal: false,
  },
  reducer,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (isEditNav, toggleShowNavFunc, hoverNavFunc, closeNavFunc),
      self,
    ),
};