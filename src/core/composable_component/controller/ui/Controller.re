open ColorType;

open Color;

type state = {isReload: bool};

type action =
  | Reload;

module Method = {
  /* let buildOperateGameObjectComponent = (store, dispatchFunc) =>
     <div className="header-item">
       <div className="component-item">
         <button
           onClick=(
             _e =>
               addGameObjectByType(
                 (store, dispatchFunc),
                 AddGameObjectType.Box,
                 (),
               )
           )>
           (DomHelper.textEl("add box"))
         </button>
       </div>
       <div className="component-item">
         <button
           disabled=(
             SceneEditorService.getCurrentSceneTreeNode
             |> StateLogicService.getEditorState
             |> Js.Option.isNone
           )
           onClick=(
             _e => disposeCurrentSceneTreeNode((store, dispatchFunc), (), ())
           )>
           (DomHelper.textEl("dispose"))
         </button>
       </div>
     </div>; */

  /* let buildOperateExtensionComponent = () =>
     <div className="header-item">
       <div className="component-item">
         <FileInput
           buttonText="show Input"
           onSubmit=(value => addExtension(value))
         />
       </div>
     </div>; */

  let changeColor = value =>
    value
    |> convertColorObjToColorPickType
    |> getEngineColorRgbArr
    |> SceneEngineService.setAmbientLightColor
    |> StateLogicService.getAndRefreshEngineStateWithFunc;

  let getColor = () =>
    SceneEngineService.getAmbientLightColor
    |> StateLogicService.getEngineStateToGetData
    |> getHexString;

  let closeColorPick = HeaderAmbientLightCloseColorPickEventHandler.MakeEventHandler.pushUndoStackWithCopiedEngineState;

  let buildAmbientLightComponent = (store, dispatchFunc) =>
    <div className="header-item">
      <div className="component-item">
        <PickColorComponent
          key=(DomHelper.getRandomKey())
          label="ambient color : "
          getColorFunc=getColor
          changeColorFunc=changeColor
          closeColorPickFunc=(closeColorPick((store, dispatchFunc), ()))
        />
      </div>
    </div>;
  /* let buildEmptyGameObject = (store, dispatchFunc) =>
     <div className="header-item">
       <div className="component-item">
         <button
           onClick=(
             _e =>
               addGameObjectByType(
                 (store, dispatchFunc),
                 AddGameObjectType.EmptyGameObject,
                 (),
               )
           )>
           (DomHelper.textEl("add empty gameObject"))
         </button>
       </div>
     </div>; */
};

let component = ReasonReact.reducerComponent("Controller");

let reducer = (action, state) =>
  switch (action) {
  | Reload => ReasonReact.Update({...state, isReload: ! state.isReload})
  };

let render =
    (
      store: AppStore.appState,
      dispatchFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article key="header" className="wonder-controller-component">
    <div className="header-controller">
      <div className="controller-transform">
        (Method.buildAmbientLightComponent(store, dispatchFunc))
      </div>
      <div
        className="controller-runAndStop"
        onClick=(
          _e => {
            SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
              ControllerUtils.stop(dispatchFunc) : ControllerUtils.run(store);

            send(Reload);
          }
        )>
        (
          SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
            <img src="./public/img/stop.png" /> :
            <img src="./public/img/run.png" />
        )
      </div>
      <div className="controller-other" />
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  initialState: () => {isReload: false},
  reducer,
  render: self => render(store, dispatchFunc, self),
};