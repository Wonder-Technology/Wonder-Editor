type state = {
  isShowAddableComponent: bool,
  isListEmpty: bool
};

type action =
  | ToggleAddableComponent;

module Method = {
  let addSpecificComponent = AddableComponentAddComponentEventHandler.MakeEventHandler.onClick;
  let buildGameObjectAddableComponent = (store, dispatch, currentGameObject, componentList) =>
    switch (componentList |> Js.List.length) {
    | 0 => [||]
    | _ =>
      componentList
      |> Js.List.foldLeft(
           [@bs]
           (
             (componentArray, type_) =>
               componentArray
               |> OperateArrayUtils.push(
                    <div
                      key=(DomHelper.getRandomKey())
                      onClick=(
                        (event) =>
                          addSpecificComponent((store, dispatch), type_, currentGameObject)
                      )>
                      (DomHelper.textEl(type_))
                    </div>
                  )
           ),
           [||]
         )
    };
  let toggleAddableComponent = (_event) => ToggleAddableComponent;
};

let component = ReasonReact.reducerComponent("addableComponent");

let reducer = (action, state) =>
  switch action {
  | ToggleAddableComponent =>
    ReasonReact.Update({...state, isShowAddableComponent: ! state.isShowAddableComponent})
  };

let render =
    (
      store,
      dispatch,
      currentGameObject,
      addableComponentList,
      {state, reduce}: ReasonReact.self('a, 'b, 'c)
    ) =>
  <article className="addable-component">
    <button
      disabled=(Js.Boolean.to_js_boolean(state.isListEmpty))
      onClick=(reduce(Method.toggleAddableComponent))>
      (DomHelper.textEl("add component"))
    </button>
    (
      state.isShowAddableComponent ?
        ReasonReact.arrayToElement(
          addableComponentList
          |> Method.buildGameObjectAddableComponent(store, dispatch, currentGameObject)
        ) :
        ReasonReact.nullElement
    )
  </article>;

let make =
    (~store: AppStore.appState, ~dispatch, ~currentGameObject, ~addableComponentList, _children) => {
  ...component,
  initialState: () =>
    switch (addableComponentList |> Js.List.length) {
    | 0 => {isListEmpty: true, isShowAddableComponent: false}
    | _ => {isListEmpty: false, isShowAddableComponent: false}
    },
  reducer,
  render: (self) => render(store, dispatch, currentGameObject, addableComponentList, self)
};