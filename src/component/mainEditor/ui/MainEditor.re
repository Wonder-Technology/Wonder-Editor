Css.importCss("./css/mainEditor.css");

module Method = {
  let getSceneGraphFromEngine = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneTreeView.getSceneGraphDataFromEngine;
};

let component = ReasonReact.statelessComponent("MainEditor");

let _buildNotStartElement = () =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="verticalComponent" className="vertical-component">
      <div key="webglParent" className="webgl-parent"> <canvas key="webGL" id="webgl" /> </div>
    </div>
  </article>;

let _buildStartedElement = (store, dispatch) =>
  <article key="mainEditor" className="wonder-mainEditor-component">
    <div key="verticalComponent" className="vertical-component">
      <div className="inline-component inspector-parent">
        <MainEditorInspector store dispatch />
      </div>
      <div className="inline-component sceneTree-parent">
        <MainEditorSceneTree store dispatch />
      </div>
      <div key="webglParent" className="webgl-parent"> <canvas key="webGL" id="webgl" /> </div>
    </div>
  </article>;

let render = (store: AppStore.appState, dispatch, self) =>
  store.isEditorAndEngineStart ? _buildStartedElement(store, dispatch) : _buildNotStartElement();

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: (self) => {
    MainEditorMainView.start();
    dispatch(AppStore.StartEngineAction);
    dispatch(AppStore.SceneTreeAction(SetSceneGraph(Some(Method.getSceneGraphFromEngine()))));
    ReasonReact.NoUpdate
  },
  render: render(store, dispatch)
};