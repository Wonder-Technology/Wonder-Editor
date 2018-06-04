Css.importCss("./css/mainEditor.css");

let component = ReasonReact.statelessComponent("MainEditor");

let _buildNotStartElement = () =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="topComponent" className="top-component">
      <div key="webglParent" className="webgl-parent">
        <canvas key="editWebgl" id="editCanvas" />
      </div>
      <div key="webglRun" className="webgl-parent"> <canvas key="runWebgl" id="runCanvas" /> </div>
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
          allShowComponentConfig=(
            GameObjectAllComponentParseUtils.getGameObjectAllComponentConfig()
          )
        />
      </div>
      <div className="inline-component sceneTree-parent">
        <MainEditorSceneTree store dispatchFunc />
      </div>
      <div key="webglParent" className="webgl-parent">
        <canvas key="editWebgl" id="editCanvas" />
      </div>
      <div key="webglRun" className="webgl-parent"> <canvas key="runWebgl" id="runCanvas" /> </div>
    </div>
    <div key="bottomComponent" className="bottom-component">
      <MainEditorAsset store dispatchFunc />
    </div>
  </article>;

let render = (store: AppStore.appState, dispatchFunc, _self) =>
  store.isEditorAndEngineStart ? _buildStartedElement(store, dispatchFunc) : _buildNotStartElement();

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  didMount: (_self) => {
    open Js.Promise;
    MainUtils.start()
    |> then_(
         (_) => {
           (
             (editorState) => {
               let (asseTree, editorState) = editorState |> AssetTreeNodeUtils.initRootAssetTree;
               editorState |> AssetTreeRootEditorService.setAssetTreeRoot(asseTree)
             }
           )
           |> StateLogicService.getAndSetEditorState;
           dispatchFunc(
             AppStore.SceneTreeAction(
               SetSceneGraph(
                 Some(
                   SceneTreeUtils.getSceneGraphDataFromEngine
                   |> StateLogicService.getStateToGetData
                 )
               )
             )
           );
           dispatchFunc(AppStore.StartEngineAction) |> resolve
         }
       )
    |> ignore;
  },
  render: (self) => render(store, dispatchFunc, self)
};