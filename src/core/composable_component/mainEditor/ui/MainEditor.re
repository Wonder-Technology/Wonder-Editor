type retainedProps = {isEngineStart: bool};

module Method = {
  let _getCanvasParentSize = parent => (
    parent##offsetWidth,
    parent##offsetHeight,
  );

  let _setViewportAndRefresh = ((canvasWidth, canvasHeight), engineState) =>
    engineState
    |> DeviceManagerEngineService.setViewport((
         0.,
         0.,
         canvasWidth,
         canvasHeight,
       ))
    |> DirectorEngineService.loopBody(0.);

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
       )
    |> DirectorEngineService.loopBody(0.);

  let resizeCanvasAndViewPort = () => {
    let (width, height) =
      DomHelper.getElementById("editCanvasParent")
      |> DomHelperType.convertDomElementToJsObj
      |> _getCanvasParentSize;

    DomHelper.getElementById("editCanvas")
    |> DomHelperType.convertDomElementToJsObj
    |> ScreenEngineService.setScreenSize((width, height, width, height))
    |> ignore;

    DomHelper.getElementById("runCanvas")
    |> DomHelperType.convertDomElementToJsObj
    |> ScreenEngineService.setScreenSize((width, height, width, height))
    |> ignore;

    StateLogicService.getEditEngineState()
    |> _setViewportAndSendUniformProjectionMatDataAndRefresh((width, height))
    |> StateLogicService.setEditEngineState;

    StateLogicService.getRunEngineState()
    |> _setViewportAndRefresh((width, height))
    |> StateLogicService.setRunEngineState;
  };
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

let _buildStartedElement = (store, dispatchFunc, state, send) =>
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

let render =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  store.isEditorAndEngineStart ?
    _buildStartedElement(store, dispatchFunc, state, send) :
    _buildNotStartElement();

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
               let (asseTree, editorState) =
                 editorState |> AssetTreeNodeUtils.initRootAssetTree;
               editorState
               |> AssetTreeRootEditorService.setAssetTreeRoot(asseTree);
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