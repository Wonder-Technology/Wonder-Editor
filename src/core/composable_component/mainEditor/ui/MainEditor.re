let component = ReasonReact.statelessComponent("MainEditor");

let _buildNotStartElement = () =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="topComponent" className="top-component">
      <div id="editCanvasParent" key="webglParent" className="webgl-parent">
        <canvas key="editWebgl" id="editCanvas" />
      </div>
      <div key="webglRun" className="webgl-parent">
        <canvas key="runWebgl" id="runCanvas" />
      </div>
    </div>
    <div key="bottomComponent" className="bottom-component" />
  </article>;

let _buildStartedElement = (store, dispatchFunc) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="topComponent" className="top-component">
      <div className="inline-component inspector-parent">
        <MainEditorInspector
          store
          dispatchFunc
          addableComponentConfig=(
            GameObjectAllComponentParseUtils.getGameObjectAllComponentConfig()
          )
        />
      </div>
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
    <div key="bottomComponent" className="bottom-component">
      <MainEditorAsset store dispatchFunc />
    </div>
  </article>;

let render = (store: AppStore.appState, dispatchFunc, _self) =>
  store.isEditorAndEngineStart ?
    _buildStartedElement(store, dispatchFunc) : _buildNotStartElement();

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

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  didUpdate: ({newSelf}: ReasonReact.oldNewSelf('a, 'b, 'c)) => {
    /* TODO test */
    let canvas =
      DomHelper.getElementById("editCanvas")
      |> DomHelperType.convertDomElementToJsObj;

    let parent =
      DomHelper.getElementById("editCanvasParent")
      |> DomHelperType.convertDomElementToJsObj;

    /* let width = canvas##offsetWidth;
       let height = canvas##offsetHeight; */

    let width = parent##offsetWidth;
    let height = parent##offsetHeight;

    WonderLog.Log.print("did update") |> ignore;
    /* WonderLog.Log.print(canvas##offsetWidth) |> ignore;
       WonderLog.Log.print(canvas##offsetHeight) |> ignore; */
    WonderLog.Log.print((width, height)) |> ignore;

    ScreenEngineService.setScreenSize((width, height, width, height), canvas)
    |> ignore;

    StateLogicService.getEditEngineState()
    |> _setViewportAndSendUniformProjectionMatDataAndRefresh((width, height))
    |> StateLogicService.setEditEngineState;

    /* TODO set run canvas */

    StateLogicService.getRunEngineState()
    |> _setViewportAndRefresh((width, height))
    |> StateLogicService.setRunEngineState;
  },
  didMount: _self =>
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
    ),
  render: self => render(store, dispatchFunc, self),
};