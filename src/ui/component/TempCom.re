open DomHelper;

let component = ReasonReact.statelessComponent("UserExtend");

let make =
    (~record: ExtendParseType.panelType, ~name: string, ~store: AppStore.appState, _children) => {
  ...component,
  didMount: (_self) => {
    record.didMount();
    ReasonReact.NoUpdate
  },
  
  render: (_self) => {
    record.willRender();
    <div key="fck">
      (
        ReasonReact.arrayToElement(
          ParseSystem.buildSpecificComponents(
            record.render,
            name,
            store
          )
        )
      )
    </div>
  }
};