let importCss = (css: string) => {};

importCss("./css/mainEditor.css");

let component = ReasonReact.statelessComponent("MainEditor");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: (_self) => {
    MainEditorMainView.start();
    dispatch(AppStore.StartEngineAction);
    ReasonReact.NoUpdate
  },
  render: (_self) =>
    if (store.isEditorAndEngineStart) {
      <div key="mainEditor" className="mainEditor-component">
        <div key="verticalComponent" className="vertical-component">
          /* (
               ReasonReact.arrayToElement(
                 ParseSystem.buildSpecificComponents(
                   "main_editor",
                   store,
                   BuildMainEditorComponent.buildComponentByName
                 )
               )
             ) */

            <div className="inline-component inspector-parent">
              <MainEditorInspector store dispatch />
            </div>
            <div className="inline-component sceneTree-parent">
              <MainEditorSceneTree store dispatch />
            </div>
            <canvas key="webGL" id="webgl" />
          </div>
      </div>
    } else {
      <div key="mainEditor" className="mainEditor-component">
        <div key="verticalComponent" className="vertical-component">
          <canvas key="webGL" id="webgl" />
        </div>
      </div>
    }
};