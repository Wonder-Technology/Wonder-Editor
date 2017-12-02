let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) => <div key="sceneTree" className="sceneTree-component" />
};