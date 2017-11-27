let component = ReasonReact.statelessComponent("inspector");

let make = (~state: AppStore.appState, _children) => {
  ...component,
  render: (_self) =>
    <div key="inspector" className="inspector-component">
    </div>
};