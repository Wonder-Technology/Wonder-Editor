open DomHelper;

let component = ReasonReact.statelessComponent("UserExtension");

let render = (record: ExtensionParseType.panelType, name, uiState, _self) => {
  record.willRender();
  <article key="panelExtension">
    (
      ReasonReact.array(
        ParseComponentUtils.buildSpecificComponents(record.render, name, uiState)
      )
    )
  </article>
};

let make =
    (~record: ExtensionParseType.panelType, ~name: string, ~uiState: AppStore.appState, _children) => {
  ...component,
  didMount: (self) => {
    record.didMount();
  },
  initialState: () => record.initialState(),
  render: (self) => render(record, name, uiState, self)
};