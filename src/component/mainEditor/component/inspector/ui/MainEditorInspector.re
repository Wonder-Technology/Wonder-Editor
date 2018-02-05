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
    | "cameraController" =>
      <div key=(DomHelper.getRandomKey())> (DomHelper.textEl("camera controller")) </div>
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
  let _buildGameObjectAllShowComponent = (list, store, dispatch) =>
    list
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
  let _buildGameObjectAddableComponent = (list) => WonderLog.Log.print(list) |> ignore;
  let buildCurrentGameObjectComponent = (store, dispatch) =>
    switch (_getCurrentGameObject()) {
    | None => [||]
    | Some(gameObject) =>
      let (existComponentList, notExistComponentList) =
        MainEditorStateView.prepareState()
        |> MainEditorGameObjectView.buildCurrentGameObjectShowComponentList(gameObject);
      _buildGameObjectAddableComponent(notExistComponentList);
      _buildGameObjectAllShowComponent(existComponentList, store, dispatch)
    };
};

let component = ReasonReact.statelessComponent("MainEditorInspector");

let render = (store, dispatch, _self) =>
  <article key="inspector" className="inspector-component">
    (ReasonReact.arrayToElement(Method.buildCurrentGameObjectComponent(store, dispatch)))
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};