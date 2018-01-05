open DomHelper;

let make =
    (~record: ExtensionParseType.panelType, ~name: string, ~store: AppStore.appState, _children) => {
  ...ReasonReact.statelessComponent("UserExtension"),
  didMount: (_self) => {
    record.didMount();
    ReasonReact.NoUpdate
  },
  initialState: () => record.initialState(),
  render: (_self) => {
    record.willRender();
    <article key="panelExtension">
      (
        ReasonReact.arrayToElement(
          ParseComponentSystem.buildSpecificComponents(record.render, name, store)
        )
      )
    </article>
  }
};