type state = {
  isShowAddableComponent: bool,
  isListEmpty: bool,
};

type action =
  | ToggleAddableComponent;

module Method = {
  let addSpecificComponent = AddableComponentAddComponentEventHandler.MakeEventHandler.onClick;
  let buildGameObjectAddableComponent =
      ((store, dispatchFunc), currentSceneTreeNode, componentList) =>
    switch (componentList |> Js.List.length) {
    | 0 => [||]
    | _ =>
      componentList
      |> Js.List.foldLeft(
           (. componentArray, type_) =>
             componentArray
             |> ArrayService.push(
                  <div
                    key=(DomHelper.getRandomKey())
                    onClick=(
                      event =>
                        addSpecificComponent(
                          (store, dispatchFunc),
                          type_,
                          currentSceneTreeNode,
                        )
                    )>
                    (DomHelper.textEl(type_))
                  </div>,
                ),
           [||],
         )
    };
  let toggleAddableComponent = _event => ToggleAddableComponent;
};

let component = ReasonReact.reducerComponent("addableComponent");

let reducer = (action, state) =>
  switch (action) {
  | ToggleAddableComponent =>
    ReasonReact.Update({
      ...state,
      isShowAddableComponent: ! state.isShowAddableComponent,
    })
  };

let render =
    (
      (store, dispatchFunc),
      currentSceneTreeNode,
      addableComponentList,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="addable-component">
    <button
      disabled=state.isListEmpty
      onClick=(_e => send(Method.toggleAddableComponent(_e)))>
      (DomHelper.textEl("add component"))
    </button>
    (
      state.isShowAddableComponent ?
        ReasonReact.arrayToElement(
          addableComponentList
          |> Method.buildGameObjectAddableComponent(
               (store, dispatchFunc),
               currentSceneTreeNode,
             ),
        ) :
        ReasonReact.nullElement
    )
  </article>;

let make =
    (~reduxTuple, ~currentSceneTreeNode, ~addableComponentList, _children) => {
  ...component,
  initialState: () =>
    switch (addableComponentList |> Js.List.length) {
    | 0 => {isListEmpty: true, isShowAddableComponent: false}
    | _ => {isListEmpty: false, isShowAddableComponent: false}
    },
  reducer,
  render: self =>
    render(reduxTuple, currentSceneTreeNode, addableComponentList, self),
};