module Method = {
  let _getCurrentGameObject = () =>
    MainEditorStateView.prepareState() |> MainEditorSceneView.getCurrentGameObject;
  let _buildComponentUIComponent = ((type_, component), (store, dispatch)) =>
    switch type_ {
    | "transform" =>
      <ComponentBox
        key=(DomHelper.getRandomKey())
        header=type_
        closable=false
        gameObjectComponent=
          <MainEditorTransform
            key=(DomHelper.getRandomKey())
            store
            dispatch
            transformComponent=component
          />
      />
    | "material" =>
      <ComponentBox
        key=(DomHelper.getRandomKey())
        header=type_
        closable=false
        gameObjectComponent=
          <MainEditorMaterial
            key=(DomHelper.getRandomKey())
            store
            dispatch
            materialComponent=component
          />
      />
    | "sourceInstance" =>
      <ComponentBox
        key=(DomHelper.getRandomKey())
        header=type_
        closable=true
        gameObjectComponent=<div key=(DomHelper.getRandomKey())> (DomHelper.textEl("simulate source instance")) </div>
      />
    | "cameraController" =>
      <ComponentBox
        key=(DomHelper.getRandomKey())
        header=type_
        closable=true
        gameObjectComponent=<div key=(DomHelper.getRandomKey())> (DomHelper.textEl("simulate camera controller")) </div>
      />
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
             |> OperateArrayUtils.push(
                  _buildComponentUIComponent((type_, component), (store, dispatch))
                )
         ),
         [||]
       );
  let buildCurrentGameObjectComponent = (store, dispatch, allShowComponentConfig) =>
    switch (_getCurrentGameObject()) {
    | None => [||]
    | Some(gameObject) =>
      let (existComponentList, notExistComponentList) =
        MainEditorStateView.prepareState()
        |> MainEditorGameObjectView.buildCurrentGameObjectShowComponentList(
             gameObject,
             allShowComponentConfig
           );
      _buildGameObjectAllShowComponent(existComponentList, store, dispatch)
      |> OperateArrayUtils.push(
           <AddableComponent
             key=(DomHelper.getRandomKey())
             store
             dispatch
             currentGameObject=gameObject
             addableComponentList=notExistComponentList
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