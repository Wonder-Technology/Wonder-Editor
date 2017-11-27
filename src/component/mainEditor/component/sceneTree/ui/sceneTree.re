let component = ReasonReact.statelessComponent("sceneTree");

let make = (~state: AppStore.appState, _children) => {
  ...component,
  render: (_self) =>
    <div key="sceneTree" className="sceneTree-component">
    </div>
};