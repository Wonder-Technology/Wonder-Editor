open DomHelper;

let component = ReasonReact.statelessComponent("UserExtension");

let render = (record: ExtensionParseType.panelType, name, store, self) => {
  record.willRender();
  <article key="panelExtension">
    (
      ReasonReact.arrayToElement(
        ParseComponentSystem.buildSpecificComponents(record.render, name, store)
      )
    )
  </article>
};

let make =
    (~record: ExtensionParseType.panelType, ~name: string, ~store: AppStore.appState, _children) => {
  ...component,
  didMount: (self) => {
    record.didMount();
    ReasonReact.NoUpdate
  },
  initialState: () => record.initialState(),
  render: render(record, name, store)
};