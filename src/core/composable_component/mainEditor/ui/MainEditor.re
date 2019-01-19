type retainedProps = {isEngineStart: bool};

module Method = {
  let _getCanvasParentSize = parent => (
    parent##offsetWidth,
    parent##offsetHeight,
  );

  /* let _setAllAspectsWhoseAspectBasedOnCanvasSize = engineState =>
     GameObjectComponentEngineService.getAllPerspectiveCameraProjectionComponents(
       engineState,
     ); */

  let _updateViewRect = (canvasWidth, canvasHeight) =>
    StateEditorService.setState(
      StateEditorService.getState()
      |> SceneViewEditorService.updateViewRect(
           0,
           0,
           canvasWidth / 2,
           canvasHeight,
         )
      |> GameViewEditorService.updateViewRect(
           canvasWidth / 2,
           0,
           canvasWidth / 2,
           canvasHeight,
         ),
    );

  let resizeCanvasAndViewPort = () => {
    let (width, height) =
      DomHelper.getElementById("canvasParent")
      |> DomHelperType.convertDomElementToJsObj
      |> _getCanvasParentSize;

    DomHelper.getElementById("canvas")
    |> DomHelperType.convertDomElementToJsObj
    |> ScreenEngineService.setScreenSize((width, height, width, height))
    |> ignore;

    DeviceManagerEngineService.getGl(StateEngineService.unsafeGetState())
    |> Js.Option.isSome ?
      {
        _updateViewRect(width, height) |> ignore;

        StateEngineService.unsafeGetState()
        |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjectionsDirty
        |> DeviceManagerEngineService.setViewport((0, 0, width, height))
        |> DirectorEngineService.loopBody(0.)
        |> StateEngineService.setState
        |> ignore;
      } :
      ();
  };

  let buildStartedRunWebglComponent = () =>
    SceneUtils.isSceneHaveNoActiveCamera() ?
      switch (
        GameViewEditorService.getViewRect(StateEditorService.getState())
      ) {
      | None => ReasonReact.null
      | Some(_) =>
        <div className="gameViewNoCamera">
          <span className="gameViewNoCamera-text">
            (DomHelper.textEl("No Camera !"))
          </span>
        </div>
      } :
      ReasonReact.null;

  let bindRefreshInspectorEvent = dispatchFunc =>
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getRefreshInspectorEventName(),
      ~handleFunc=
        (. event, engineState) => {
          engineState |> StateEngineService.setState |> ignore;

          dispatchFunc(
            AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
          )
          |> ignore;

          (StateEngineService.unsafeGetState(), event);
        },
      ~state=StateEngineService.unsafeGetState(),
      (),
    )
    |> StateEngineService.setState
    |> ignore;

  let bindPickSuccessEvent = dispatchFunc =>
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPickSuccessEventName(),
      ~handleFunc=
        (. ({userData}: EventType.customEvent) as event, engineState) => {
          let pickedGameObject =
            userData
            |> OptionService.unsafeGet
            |> InitPickingJobType.userDataToGameObject;

          engineState |> StateEngineService.setState |> ignore;

          switch (
            UIHistoryService.getLastStoreInStack(
              AllStateData.getHistoryState(),
            )
          ) {
          | None =>
            SceneTreeSelectCurrentNodeUtils.select(
              dispatchFunc,
              pickedGameObject,
            )
          | Some(lastStore) =>
            SceneTreeSelectCurrentNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
              (lastStore, dispatchFunc),
              (),
              pickedGameObject,
            )
          };

          (StateEngineService.unsafeGetState(), event);
        },
      ~state=StateEngineService.unsafeGetState(),
      (),
    )
    |> StateEngineService.setState
    |> ignore;

  let dragWDB = MainEditorDragWDBEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

let _buildNotStartElement = (store, dispatchFunc) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="leftComponent" className="left-component">
      <div className="top-widget">
        <div id="canvasParent" key="webglParent" className="webgl-parent">
          <Canvas
            key="webgl"
            domId="canvas"
            dragWDB=(Method.dragWDB((store, dispatchFunc), ()))
            isWDBAssetFile=WDBNodeAssetEditorService.isWDBAssetFile
          />
        </div>
      </div>
      <div className="bottom-widget" />
    </div>
    <div key="rightComponent" className="right-component" />
  </article>;

let _buildStartedElement = (store, dispatchFunc) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="leftComponent" className="left-component">
      <div className="top-widget">
        <MainEditorLeftComponents store dispatchFunc />
        <div id="canvasParent" key="webglParent" className="webgl-parent">
          (Method.buildStartedRunWebglComponent())
          <Canvas
            key="webgl"
            domId="canvas"
            dragWDB=(Method.dragWDB((store, dispatchFunc), ()))
            isWDBAssetFile=WDBNodeAssetEditorService.isWDBAssetFile
          />
        </div>
      </div>
      <div className="bottom-widget">
        <MainEditorBottomComponents store dispatchFunc />
      </div>
    </div>
    <div key="rightComponent" className="right-component">
      <div className="inline-component inspector-parent">
        <MainEditorInspector
          store
          dispatchFunc
          addableComponentConfig=(
            GameObjectAllComponentParseUtils.getGameObjectAllComponentConfig()
          )
        />
      </div>
    </div>
  </article>;

let render = (store: AppStore.appState, dispatchFunc, _self) =>
  store.isEditorAndEngineStart ?
    _buildStartedElement(store, dispatchFunc) :
    _buildNotStartElement(store, dispatchFunc);

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  retainedProps: {
    isEngineStart: store.isEditorAndEngineStart,
  },
  didUpdate:
    ({oldSelf, newSelf}: ReasonReact.oldNewSelf('a, retainedProps, 'c)) =>
    store.isEditorAndEngineStart
    && oldSelf.retainedProps != newSelf.retainedProps ?
      Method.resizeCanvasAndViewPort() : (),
  didMount: _self => {
    Js.Promise.(
      MainUtils.start()
      |> then_(_ => {
           (
             editorState =>
               editorState
               |> TreeAssetEditorService.createTree
               |> StateEditorService.setState
           )
           |> StateLogicService.getAndSetEditorState;

           dispatchFunc(AppStore.StartEngineAction) |> resolve;
         })
      |> ignore
    );

    Method.bindRefreshInspectorEvent(dispatchFunc);
    Method.bindPickSuccessEvent(dispatchFunc);

    DomHelper.onresize(Method.resizeCanvasAndViewPort);
  },
  render: self => render(store, dispatchFunc, self),
};