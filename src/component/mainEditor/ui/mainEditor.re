let component = ReasonReact.statelessComponent("mainEditor");

let make = (~state: AppStore.appState, _children) => {
  ...component,
  render: (_self) =>
    <div className="mainEditor-component">
      (
        ReasonReact.arrayToElement(
          ParseSystem.buildSpecificComponents(
            "main_editor",
            state,
            BuildMainEditorComponent.buildComponentByName
          )
        )
      )
    </div>
};