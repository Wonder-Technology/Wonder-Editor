module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _hasMaterialComponent = (gameObject) =>
    MainEditorStateView.prepareState() |> MainEditorGameObjectView.hasMaterialComponent(gameObject);
  /* TODO add component by gameObject type */
  let _buildGameObjectAllComponents = (currentGameObject, store, dispatch, allComponents) =>
    allComponents
    |> Js.Array.reduce(
         (componentArray, {componentName}: GameObjectComponentParseType.gameObjectCompoent) =>
           switch componentName {
           | "transform" =>
             componentArray
             |> OperateArrayUtils.push(
                  <MainEditorTransform key=(DomHelper.getRandomKey()) store dispatch />
                )
           | "material" =>
             Js.log(_hasMaterialComponent(currentGameObject));
             componentArray
           | _ => componentArray
           },
         [||]
       );
  let buildCurrentGameObjectComponent = (store, dispatch, allComponents) =>
    switch (_getCurrentGameObject()) {
    | None =>
      Js.log("no current game object");
      [||]
    | Some(gameObject) => _buildGameObjectAllComponents(gameObject, store, dispatch, allComponents)
    };
};

let component = ReasonReact.statelessComponent("MainEditorInspector");

let render = (store, dispatch, allComponents, _self) =>
  <article key="inspector" className="inspector-component">
    (
      ReasonReact.arrayToElement(
        Method.buildCurrentGameObjectComponent(store, dispatch, allComponents)
      )
    )
  </article>;

let make = (~store: AppStore.appState, ~dispatch, ~allComponents, _children) => {
  ...component,
  render: (self) => render(store, dispatch, allComponents, self)
};