let component = ReasonReact.statelessComponent("mainEditor");

let make = (~state: AppStore.appState, _children) => {
  ...component,
  didMount: (_self) => {
    MainEditorView.start();
    ReasonReact.NoUpdate
  },
  render: (_self) =>
    <div key="mainEditor" className="mainEditor-component">
      (
        ReasonReact.arrayToElement(
          ParseSystem.buildSpecificComponents(
            "main_editor",
            state,
            BuildMainEditorComponent.buildComponentByName
          )
        )
      )
      <canvas key="webGL" id="webgl" />
    </div>
};