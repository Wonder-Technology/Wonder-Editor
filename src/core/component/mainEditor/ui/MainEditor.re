Css.importCss("./css/mainEditor.css");

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
        <MainEditorInspector
          store
          dispatch
          allShowComponentConfig=(
            GameObjectAllComponentParseSystem.getGameObjectAllComponentConfig()
          )
        />
      </div>
      <div className="inline-component sceneTree-parent">
        <MainEditorSceneTree store dispatch />
      </div>
      <div key="webglParent" className="webgl-parent"> <canvas key="webGL" id="webgl" /> </div>
    </div>
  </article>;

let render = (store: AppStore.appState, dispatch, _self) =>
  store.isEditorAndEngineStart ? _buildStartedElement(store, dispatch) : _buildNotStartElement();

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: (_self) => {
    MainLogicService.start() |> ignore;
    dispatch(AppStore.StartEngineAction);
    dispatch(
      AppStore.SceneTreeAction(
        SetSceneGraph(
          Some(MainEditorSceneTreeView.getSceneGraphDataFromEngine |> StateLogicService.getState)
        )
      )
    );
    ReasonReact.NoUpdate
  },
  render: (self) => render(store, dispatch, self)
};