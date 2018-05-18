Css.importCss("./css/mainEditor.css");

let component = ReasonReact.statelessComponent("MainEditor");

let _buildNotStartElement = () =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="topComponent" className="top-component">
      <div key="webglParent" className="webgl-parent">
      </div>
      <canvas key="editWebgl" id="editCanvas" />
      <div key="webglRun" className="webgl-parent"> <canvas key="runWebgl" id="runCanvas" /> </div>
    </div>
    <div key="bottomComponent" className="bottom-component" />
  </article>;

let _buildStartedElement = (store, dispatch) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="topComponent" className="top-component">
      <div className="inline-component inspector-parent">
        <MainEditorInspector
          store
          dispatch
          allShowComponentConfig=(
            GameObjectAllComponentParseUtils.getGameObjectAllComponentConfig()
          )
        />
      </div>
      <div className="inline-component sceneTree-parent">
        <MainEditorSceneTree store dispatch />
      </div>
      <div key="webglParent" className="webgl-parent">
        <canvas key="editWebgl" id="editCanvas" />
      </div>
      <div key="webglRun" className="webgl-parent"> <canvas key="runWebgl" id="runCanvas" /> </div>
    </div>
    <div key="bottomComponent" className="bottom-component">
      <MainEditorAsset store dispatch />
    </div>
  </article>;

let render = (store: AppStore.appState, dispatch, _self) =>
  store.isEditorAndEngineStart ? _buildStartedElement(store, dispatch) : _buildNotStartElement();

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: (_self) => {
    open Js.Promise;
    MainUtils.start()
    |> then_(
         (_) => {
           (
             (editorState) =>
               editorState
               |> AssetEditorService.setAsseTree(editorState |> AssetUtils.initRootAssetTree)
           )
           |> StateLogicService.getAndSetEditorState;
           dispatch(
             AppStore.SceneTreeAction(
               SetSceneGraph(
                 Some(
                   SceneTreeUtils.getSceneGraphDataFromEngine
                   |> StateLogicService.getStateToGetData
                 )
               )
             )
           );
           dispatch(AppStore.StartEngineAction) |> resolve
         }
       )
    |> ignore;
    ReasonReact.NoUpdate
  },
  render: (self) => render(store, dispatch, self)
};