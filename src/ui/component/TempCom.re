open DomHelper;

let component = ReasonReact.statelessComponent("App");

let make = (~record: Maketest.resType, ~store: AppStore.appState, _children) => {
  ...component,
  didMount: (_self) => {
    record.didMount();
    ReasonReact.NoUpdate
  },
  render: (_self) =>
    <div key="app" className="app-component">
      (
        ReasonReact.arrayToElement(
          ParseSystem.buildSpecificComponents(
            record.render,
            "temp",
            store,
            BuildAppComponent.buildComponentByName
          )
        )
      )
    </div>
};