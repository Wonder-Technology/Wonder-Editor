module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _hasMaterialComponent = (gameObject) =>
    MainEditorStateView.prepareState() |> MainEditorGameObjectView.hasMaterialComponent(gameObject);
  /* TODO add component by gameObject type */
  let _buildComponentByType = (currentGameObject) =>
    Js.log(_hasMaterialComponent(currentGameObject));
  let buildCurrentGameObjectComponent = (store, dispatch) =>
    switch (_getCurrentGameObject()) {
    | None =>
      Js.log("no current game object");
      ReasonReact.nullElement
    | Some(gameObject) =>
      _buildComponentByType(gameObject);
      <MainEditorTransform store dispatch />
    };
};

let component = ReasonReact.statelessComponent("MainEditorInspector");

let render = (store, dispatch, self) =>
  <article key="inspector" className="inspector-component">
    (Method.buildCurrentGameObjectComponent(store, dispatch))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: render(store, dispatch)
};