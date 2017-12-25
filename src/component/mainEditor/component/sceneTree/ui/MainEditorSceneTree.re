let component = ReasonReact.statelessComponent("MainEditorSceneTree");

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (_self) =>
    <article key="sceneTree" className="sceneTree-component">
    </article>
};