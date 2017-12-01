let importCss = (css: string) => {};

importCss("./css/mainEditor.css");

let component = ReasonReact.statelessComponent("mainEditor");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  ...component,
  didMount: (_self) => {
    MainEditorMainView.start();
    dispatch(AppStore.StartEngineAction);
    ReasonReact.NoUpdate
  },
  render: (_self) =>
    if (state.isEngineStart) {
      <div key="mainEditor" className="mainEditor-component">
        <div key="verticalComponent" className="vertical-component">
          /* (
               ReasonReact.arrayToElement(
                 ParseSystem.buildSpecificComponents(
                   "main_editor",
                   state,
                   BuildMainEditorComponent.buildComponentByName
                 )
               )
             ) */

            <div className="inline-component inspector-parent">
              <MainEditorInspector state dispatch />
            </div>
            <div className="inline-component sceneTree-parent">
              <MainEditorSceneTree state dispatch />
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