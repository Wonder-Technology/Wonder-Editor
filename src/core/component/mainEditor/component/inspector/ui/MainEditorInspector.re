module Method = {
  let _buildComponentBox = ((type_, component), (store, dispatch), isClose, buildComponentFunc) =>
    <ComponentBox
      key=(DomHelper.getRandomKey())
      header=type_
      closable=isClose
      gameObjectComponent=(buildComponentFunc(store, dispatch, component))
    />;
  let _buildTransform = (store, dispatch, component) =>
    <MainEditorTransform
      key=(DomHelper.getRandomKey())
      store
      dispatch
      transformComponent=component
    />;
  let _buildMaterial = (store, dispatch, component) =>
    <MainEditorMaterial
      key=(DomHelper.getRandomKey())
      store
      dispatch
      materialComponent=component
    />;
  let _buildSouceInstance = (store, dispatch, component) =>
    <div key=(DomHelper.getRandomKey())> (DomHelper.textEl("simulate source instance")) </div>;
  let _buildCameraController = (store, dispatch, component) =>
    <div key=(DomHelper.getRandomKey())> (DomHelper.textEl("simulate camera controller")) </div>;
  let _buildComponentUIComponent = ((type_, component), (store, dispatch)) =>
    switch type_ {
    | "transform" =>
      _buildTransform |> _buildComponentBox((type_, component), (store, dispatch), false)
    | "material" =>
      _buildMaterial |> _buildComponentBox((type_, component), (store, dispatch), false)
    | "sourceInstance" =>
      _buildSouceInstance |> _buildComponentBox((type_, component), (store, dispatch), true)
    | "cameraController" =>
      _buildCameraController |> _buildComponentBox((type_, component), (store, dispatch), true)
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
  let _buildGameObjectAllShowComponent = (componentList, store, dispatch) =>
    componentList
    |> Js.List.foldLeft(
         [@bs]
         (
           (componentArray, (type_, component)) =>
             componentArray
             |> ArrayService.push(
                  _buildComponentUIComponent((type_, component), (store, dispatch))
                )
         ),
         [||]
       );
  let buildCurrentGameObjectComponent = (store, dispatch, allShowComponentConfig) =>
    switch (SceneEditorService.getCurrentGameObject |> StateLogicService.getEditorState) {
    | None => [||]
    | Some(gameObject) =>
      let (addedComponentList, addableComponentList) =
        InspectorGameObjectUtils.buildCurrentGameObjectShowComponentList(
          gameObject,
          allShowComponentConfig
        )
        |> StateLogicService.getEngineState;
      _buildGameObjectAllShowComponent(addedComponentList, store, dispatch)
      |> ArrayService.push(
           <AddableComponent
             key=(DomHelper.getRandomKey())
             reduxTuple=(store, dispatch)
             currentGameObject=gameObject
             addableComponentList
           />
         )
    };
};

let component = ReasonReact.statelessComponent("MainEditorInspector");

let render = (store, dispatch, allShowComponentConfig, _self) =>
  <article key="inspector" className="inspector-component">
    (
      ReasonReact.arrayToElement(
        Method.buildCurrentGameObjectComponent(store, dispatch, allShowComponentConfig)
      )
    )
  </article>;

let make = (~store: AppStore.appState, ~dispatch, ~allShowComponentConfig, _children) => {
  ...component,
  render: (self) => render(store, dispatch, allShowComponentConfig, self)
};