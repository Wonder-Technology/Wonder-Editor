module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _hasMaterialComponent = (gameObject) =>
    MainEditorStateView.prepareState() |> MainEditorGameObjectView.hasMaterialComponent(gameObject);
  /* TODO add component by gameObject type */
  let buildCurrentGameObjectComponent = (store, dispatch) =>
    switch (_getCurrentGameObject()) {
    | None =>
      Js.log("no current game object");
      ReasonReact.nullElement
    | Some(gameObject) =>
      /* _buildComponentByType(gameObject); */
      Js.log(_hasMaterialComponent(gameObject));
      <MainEditorTransform store dispatch />
    };
};

let component = ReasonReact.statelessComponent("MainEditorInspector");

let render = (store, dispatch, _self) =>
  <article key="inspector" className="inspector-component">
    (Method.buildCurrentGameObjectComponent(store, dispatch))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};