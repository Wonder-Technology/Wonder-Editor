module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _isSpecificComponentExistShowInspector = (allComponents, name) =>
    allComponents
    |> Js.Array.filter(
         (item: GameObjectComponentParseType.gameObjectCompoent) => item.componentName == name
       )
    |> OperateArrayUtils.hasItem;
  let _buildGameObjectAllComponents = (currentGameObject, store, dispatch, allComponents) =>
    MainEditorStateView.prepareState()
    |> MainEditorGameObjectView.getCurrentGameObjectAllComponentsList(currentGameObject)
    |> WonderCommonlib.DebugUtils.log
    |> Js.List.foldLeft(
         [@bs]
         (
           (componentArray, (name, gameObjectComponent)) =>
             _isSpecificComponentExistShowInspector(allComponents, name) ?
               switch name {
               | "transform" =>
                 componentArray
                 |> OperateArrayUtils.push(
                      <MainEditorTransform key=(DomHelper.getRandomKey()) store dispatch />
                    )
               | "material" =>
                 Js.log("material");
                 componentArray
               | _ =>
                 Js.log("other");
                 componentArray
               } :
               componentArray
         ),
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