module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _getAllShowComponentList = (allShowComponentsConfig, allComponentList) =>
    allComponentList
    |> Js.List.filter(
         [@bs]
         (
           ((type_, _)) =>
             allShowComponentsConfig
             |> OperateArrayUtils.hasItemByFunc(
                  ({componentName}: GameObjectComponentParseType.gameObjectCompoent) =>
                    componentName == type_
                )
         )
       );
  let _buildComponentUIComponent = ((type_, component), (store, dispatch), componentArray) =>
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
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_buildComponentUIComponent",
          ~description={j|the component: $type_ not exist|j},
          ~reason="",
          ~solution={j||j},
          ~params={j|type:$type_, component:$component|j}
        )
      )
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
             _buildComponentUIComponent((type_, component), (store, dispatch), componentArray)
         ),
         [||]
       );
  let buildCurrentGameObjectComponent = (store, dispatch, allShowComponentsConfig) =>
    switch (_getCurrentGameObject()) {
    | None => [||]
    | Some(gameObject) =>
      WonderLog.Log.print(("current gameobjetc", gameObject)) |> ignore;
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