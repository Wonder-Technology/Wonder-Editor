type retainedProps = {isEngineStart: bool};

module Method = {
  let _getCanvasParentSize = parent => (
    parent##offsetWidth,
    parent##offsetHeight,
  );

  let _setAllAspectsWhoseAspectBasedOnCanvasSize = engineState =>
    GameObjectComponentEngineService.getAllPerspectiveCameraProjectionComponents(
      engineState,
    );

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

    _updateViewRect(width, height) |> ignore;

    StateEngineService.unsafeGetState()
    |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjectionsDirty
    |> DeviceManagerEngineService.setViewport((
         0,
         0,
         width |> NumberType.convertFloatToInt,
         height |> NumberType.convertFloatToInt,
       ))
    |> DirectorEngineService.loopBody(0.)
    |> StateEngineService.setState
    |> ignore;
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
          dispatchFunc(
            AppStore.UpdateAction(Update([|UpdateStore.Inspector|])),
          )
          |> ignore;

          (engineState, event);
        },
      ~state=StateEngineService.unsafeGetState(),
      (),
    )
    |> StateEngineService.setState
    |> ignore;
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

let _buildNotStartElement = () =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="leftComponent" className="left-component">
      <div className="top-widget">
        <div id="canvasParent" key="webglParent" className="webgl-parent">
          <canvas key="webgl" id="canvas" />
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
        <div className="inline-component sceneTree-parent">
          <MainEditorSceneTreeHeader store dispatchFunc />
          <MainEditorSceneTree store dispatchFunc />
        </div>
        <div id="canvasParent" key="webglParent" className="webgl-parent">
          (Method.buildStartedRunWebglComponent())
          <canvas key="webgl" id="canvas" />
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
    _buildStartedElement(store, dispatchFunc) : _buildNotStartElement();

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
             editorState => {
               let (assetTree, editorState) =
                 editorState |> AssetTreeNodeUtils.initRootAssetTree;
               editorState
               |> AssetTreeRootEditorService.setAssetTreeRoot(assetTree);
             }
           )
           |> StateLogicService.getAndSetEditorState;
           dispatchFunc(
             AppStore.SceneTreeAction(
               SetSceneGraph(
                 Some(
                   SceneTreeUtils.getSceneGraphDataFromEngine
                   |> StateLogicService.getStateToGetData,
                 ),
               ),
             ),
           );
           dispatchFunc(AppStore.StartEngineAction) |> resolve;
         })
      |> ignore
    );

    Method.bindRefreshInspectorEvent(dispatchFunc);

    DomHelper.onresize(Method.resizeCanvasAndViewPort);
  },
  render: self => render(store, dispatchFunc, self),
};