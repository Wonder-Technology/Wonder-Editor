type retainedProps = {isEngineStart: bool};

module Method = {
  let _getCanvasParentSize = parent => (
    parent##offsetWidth,
    parent##offsetHeight,
  );

  let _setViewportAndSendUniformProjectionMatDataAndRefresh =
      ((canvasWidth, canvasHeight), engineState) =>
    engineState
    |> DeviceManagerEngineService.setViewport((
         0.,
         0.,
         canvasWidth,
         canvasHeight,
       ))
    |> ManageIMGUIEngineService.sendUniformProjectionMatData(
         DeviceManagerEngineService.unsafeGetGl(engineState),
         (
           canvasWidth |> NumberType.convertFloatToInt,
           canvasHeight |> NumberType.convertFloatToInt,
         ),
       );

  let _setAllAspectsWhoseAspectBasedOnCanvasSize = engineState =>
    GameObjectComponentEngineService.getAllPerspectiveCameraProjectionComponents(
      engineState,
    );

  let resizeCanvasAndViewPort = () => {
    let (width, height) =
      DomHelper.getElementById("editCanvasParent")
      |> DomHelperType.convertDomElementToJsObj
      |> _getCanvasParentSize;

    WonderLog.Log.print(("resize. width,height: ", width, height)) |> ignore;

    DomHelper.getElementById("editCanvas")
    |> DomHelperType.convertDomElementToJsObj
    |> ScreenEngineService.setScreenSize((width, height, width, height))
    |> ignore;

    DomHelper.getElementById("runCanvas")
    |> DomHelperType.convertDomElementToJsObj
    |> ScreenEngineService.setScreenSize((width, height, width, height))
    |> ignore;

    StateLogicService.getEditEngineState()
    |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjections
    |> _setViewportAndSendUniformProjectionMatDataAndRefresh((width, height))
    |> DirectorEngineService.loopBody(0.)
    |> StateLogicService.setEditEngineState;

    StateLogicService.getRunEngineState()
    |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjections
    |> _setViewportAndSendUniformProjectionMatDataAndRefresh((width, height))
    |> DirectorEngineService.loopBody(0.)
    |> StateLogicService.setRunEngineState;
  };

  let buildStartedRunWebglComponent = () =>
    SceneUtils.isSceneHaveNoCamera() ?
      <div className="runNoCamera">
        <span className="runNoCamera-text">
          (DomHelper.textEl("No Camera !"))
        </span>
      </div> :
      ReasonReact.null;
};

let component = ReasonReact.statelessComponentWithRetainedProps("MainEditor");

let _buildNotStartElement = () =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="leftComponent" className="left-component">
      <div className="top-widget">
        <div id="editCanvasParent" key="webglParent" className="webgl-parent">
          <canvas key="editWebgl" id="editCanvas" />
        </div>
        <div key="webglRun" className="webgl-parent">
          <canvas key="runWebgl" id="runCanvas" />
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
          <MainEditorSceneTree store dispatchFunc />
        </div>
        <div id="editCanvasParent" key="webglParent" className="webgl-parent">
          <canvas key="editWebgl" id="editCanvas" />
        </div>
        <div key="webglRun" className="webgl-parent">
          (Method.buildStartedRunWebglComponent())
          <canvas key="runWebgl" id="runCanvas" />
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

    DomHelper.onresize(Method.resizeCanvasAndViewPort);
  },
  render: self => render(store, dispatchFunc, self),
};