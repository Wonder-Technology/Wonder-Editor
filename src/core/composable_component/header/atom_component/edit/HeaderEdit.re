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
    StateHistoryService.getStateForHistory()
    |> StoreHistoryUtils.storeHistoryStateWithNoCopyEngineState(uiState);

    HeaderImportPackageUtils.importPackage(dispatchFunc, event)
    |> Js.Promise.then_(_ => closeNavFunc() |> Js.Promise.resolve)
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
  let buildEditComponentSelectNav =
      ((uiState, dispatchFunc), send, closeNavFunc) =>
    <div className="item-content item-edit">
      <div className="content-section">
        <input
          className="section-fileLoad"
          type_="file"
          multiple=false
          onChange={
            e =>
              importPackage((uiState, dispatchFunc), closeNavFunc, e)
              |> ignore
          }
        />
        <span className="section-header">
          {DomHelper.textEl("Import Package")}
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => send(ShowExportPackageModal)}>
        <span className="section-header">
          {DomHelper.textEl("Export Package")}
        </span>
      </div>
      <div
        className="content-section"
        onClick={_e => send(ShowExportSceneModal)}>
        <span className="section-header">
          {DomHelper.textEl("Export Scene")}
        </span>
      </div>
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

  <div className="header-item">
    <div className="component-item">
      <span
        className
        onClick={e => toggleShowNavFunc()}
        onMouseOver={e => hoverNavFunc()}>
        {DomHelper.textEl("Edit")}
      </span>
    </div>
    {
      isEditNav ?
        Method.buildEditComponentSelectNav(
          (uiState, dispatchFunc),
          send,
          closeNavFunc,
        ) :
        ReasonReact.null
    }
    {
      state.isShowExportPackageModal ?
        <SingleInputModal
          title="Export Package"
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
          title="Export Scene"
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