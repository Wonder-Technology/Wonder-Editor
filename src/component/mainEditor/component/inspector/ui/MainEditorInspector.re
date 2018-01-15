module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _getAllShowComponentList = (allShowComponentsConfig, allComponentList) =>
    allComponentList
    |> Js.List.filter(
         [@bs]
         (
           ((type_, _)) =>
             /* _isSpecificComponentExistShowInspector(allShowComponentsConfig, type_) */
             allShowComponentsConfig
             |> OperateArrayUtils.hasItemByFunc(
                  ({componentName}: GameObjectComponentParseType.gameObjectCompoent) =>
                    componentName == type_
                )
         )
       );
  let _buildComponentUIComponent = (type_, component, store, dispatch, componentArray) =>
    switch type_ {
    | "transform" =>
      componentArray
      |> OperateArrayUtils.push(
           <MainEditorTransform
             key=(DomHelper.getRandomKey())
             store
             dispatch
             transformComponent=component
           />
         )
    | "material" => componentArray
    | "cameraController" => componentArray
    | _ => ExcepetionHandleSystem.throwMessage({j|"the component: $type_ not exist"|j})
    };
  let _buildGameObjectallShowComponentsConfig =
      (currentGameObject, store, dispatch, allShowComponentsConfig) =>
    MainEditorStateView.prepareState()
    |> MainEditorGameObjectView.getCurrentGameObjectAllComponentList(currentGameObject)
    |> _getAllShowComponentList(allShowComponentsConfig)
    |> Js.List.foldLeft(
         [@bs]
         (
           (componentArray, (type_, component)) =>
             _buildComponentUIComponent(type_, component, store, dispatch, componentArray)
         ),
         [||]
       );
  let buildCurrentGameObjectComponent = (store, dispatch, allShowComponentsConfig) =>
    switch (_getCurrentGameObject()) {
    | None => [||]
    | Some(gameObject) =>
      _buildGameObjectallShowComponentsConfig(gameObject, store, dispatch, allShowComponentsConfig)
    };
};

let component = ReasonReact.statelessComponent("MainEditorInspector");

let render = (store, dispatch, allShowComponentsConfig, _self) =>
  <article key="inspector" className="inspector-component">
    (
      ReasonReact.arrayToElement(
        Method.buildCurrentGameObjectComponent(store, dispatch, allShowComponentsConfig)
      )
    )
  </article>;

let make = (~store: AppStore.appState, ~dispatch, ~allShowComponentsConfig, _children) => {
  ...component,
  render: (self) => render(store, dispatch, allShowComponentsConfig, self)
};