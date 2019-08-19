open WonderBsMost;

open UserDataType;

type retainedProps = {isInitEngine: bool};

module Method = {
  let rec startLoopForCameraChangeDirection = (time: float, state): int => {
    StateEngineService.setState(state);

    AnimationFrame.requestAnimationFrame((time: float) =>
      StateEngineService.unsafeGetState()
      |> CameraControllerUtils.loopBodyWhenCameraChangeDirectionAndStop(
           StateEditorService.getState(),
         )
      |> StateEngineService.setState
      |> startLoopForCameraChangeDirection(time)
      |> ignore
    );
  };

  let buildNoCameraElement = () =>
    SceneUtils.isSceneHaveNoActiveCamera() ?
      switch (
        GameViewEditorService.getViewRect(StateEditorService.getState())
      ) {
      | None => ReasonReact.null
      | Some(_) =>
        <div className="gameViewNoCamera">
          <span className="gameViewNoCamera-text">
            {DomHelper.textEl("No Camera !")}
          </span>
        </div>
      } :
      ReasonReact.null;

  let execFuncOnlyOnceInDidUpdate =
      (
        {oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c),
        func,
      ) =>
    oldSelf.retainedProps != newSelf.retainedProps ? func() : ();

  let didUpdate = oldNewSelf =>
    execFuncOnlyOnceInDidUpdate(
      oldNewSelf,
      () => {
        ResizeUtils.resizeMainCanvasScreen();
        ResizeUtils.resizeInspectorCanvasScreen();

        InspectorCanvasUtils.hideInspectorCanvas();
      },
    );

  let dragWDB = MainEditorDragWDBEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildElementBeforeInitEngine = (uiState, dispatchFunc) =>
    <article key="mainEditor" className="wonder-mainEditor-component">
      <div key="leftComponent" className="left-component">
        <div className="top-widget">
          <div
            id="mainCanvasParent" key="webglParent" className="webgl-parent">
            <Canvas
              key="webgl"
              domId="main-canvas"
              dragWDB={dragWDB((uiState, dispatchFunc), ())}
              isWDBAssetFile=WDBNodeAssetEditorService.isWDBAssetFile
            />
          </div>
        </div>
        <div className="bottom-widget" />
      </div>
      <div key="rightComponent" className="right-component">
        <div className="inline-component inspector-parent">
          <div
            id="inspectorCanvasParent"
            key="inspectorCanvasParent"
            className="inspector-parent">
            <canvas id="inspector-canvas" key="inspectorCanvas" />
          </div>
        </div>
      </div>
    </article>;

  let buildElementAfterInitEngine = (uiState, dispatchFunc) =>
    <article key="mainEditor" className="wonder-mainEditor-component">
      <div key="leftComponent" className="left-component">
        <div className="top-widget">
          <MainEditorLeftComponents uiState dispatchFunc />
          <div
            id="mainCanvasParent" key="webglParent" className="webgl-parent">
            {buildNoCameraElement()}
            <Canvas
              key="webgl"
              domId="main-canvas"
              dragWDB={dragWDB((uiState, dispatchFunc), ())}
              isWDBAssetFile=WDBNodeAssetEditorService.isWDBAssetFile
            />
          </div>
        </div>
        <div className="bottom-widget">
          <MainEditorBottomComponents uiState dispatchFunc />
        </div>
      </div>
      <div key="rightComponent" className="right-component">
        <div className="inline-component inspector-parent">
          <div
            id="inspectorCanvasParent"
            key="inspectorCanvasParent"
            className="inspector-canvas-parent">
            <canvas id="inspector-canvas" key="inspectorCanvas" />
          </div>
          <MainEditorInspector
            uiState
            dispatchFunc
            addableComponentConfig={
              GameObjectAllComponentParseUtils.getGameObjectAllComponentConfig()
            }
          />
        </div>
      </div>
    </article>;

  let onResize = domElement => {
    DomHelper.isDomVisible(domElement) ?
      ResizeUtils.resizeInspectorCanvasScreen() : ();

    ResizeUtils.resizeMainCanvasScreen();
  };
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

let render =
    (
      uiState: AppStore.appState,
      dispatchFunc,
      {retainedProps}: ReasonReact.self('a, 'b, 'c),
    ) =>
  retainedProps.isInitEngine ?
    Method.buildElementAfterInitEngine(uiState, dispatchFunc) :
    Method.buildElementBeforeInitEngine(uiState, dispatchFunc);

let make = (~uiState: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    isInitEngine: uiState.isInitEngine,
  },
  didUpdate: oldNewSelf => Method.didUpdate(oldNewSelf),
  didMount: _self => {
    EventHelper.onresize(() =>
      DomHelper.getElementById("inspectorCanvasParent") |> Method.onResize
    );

    MainUtils.initEditor()
    |> Most.merge(MainUtils.initEngine())
    |> Most.concat(
         MostUtils.callStreamFunc(() => {
           let editorState = StateEditorService.getState();

           DebugSettingEditorService.getIsTestLocal(editorState) ?
             UserDataUtils.handleFetchUserDataStoreEditorState(editorState) :
             Most.just();
         }),
       )
    |> Most.concat(
         MostUtils.callStreamFunc(() => {
           let editorState = StateEditorService.getState();

           DebugSettingEditorService.getIsTestLocal(editorState) ?
             {
               ResizeUtils.resizeMainCanvasScreen();

               LoadUserRepoWpkFileUtils.loadUserRepoWpkFile(
                 dispatchFunc,
                 Fetch.fetch,
                 editorState,
               );
             } :
             Most.just();
         }),
       )
    |> MostUtils.subscribe(
         ~stream=_,
         ~errorFunc=
           errMsg => {
             let editorState = StateEditorService.getState();

             DebugSettingEditorService.getIsTestLocal(editorState) ?
               UserDataUtils.showErrorMsgAndGoToHostPlatform(errMsg)
               |> StateLogicService.getEditorState :
               ConsoleUtils.error(errMsg, editorState);
           },
         ~completeFunc=
           () => {
             StateEngineService.unsafeGetState()
             |> Method.startLoopForCameraChangeDirection(0.);

             dispatchFunc(AppStore.InitEngineAction);
           },
         (),
       )
    |> ignore;
  },
  render: self => render(uiState, dispatchFunc, self),
};