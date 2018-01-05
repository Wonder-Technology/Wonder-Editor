let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...ReasonReact.statelessComponent("MainEditorInspector"),
  render: (_self) =>
    <article key="inspector" className="inspector-component">
      <MainEditorTransform store dispatch />
    </article>
};