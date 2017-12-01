let component = ReasonReact.statelessComponent("sceneTree");

let make = (~state: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) => <div key="sceneTree" className="sceneTree-component" />
};