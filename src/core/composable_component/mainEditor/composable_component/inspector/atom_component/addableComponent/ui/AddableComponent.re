open GameObjectAllComponentParseType;

open Antd;

type state = {isShowAddableComponent: bool};

type action =
  | ToggleAddableComponent;

module Method = {
  let addSpecificComponent =
      ((store, dispatchFunc), currentSceneTreeNode, type_) => {
    let type_ = OperateComponentUtils.getInspectorComponentType(type_);

    InspectorHasComponentUtils.isHasSpecificComponentByType(
      type_,
      currentSceneTreeNode,
    )
    |> StateLogicService.getEngineStateToGetData ?
      Message.message
      |> Message.convertToJsObj
      |> (
        messageObj =>
          messageObj##warn("the game object already have this component !", 4)
      ) :
      AddableComponentAddComponentEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (store, dispatchFunc),
        currentSceneTreeNode,
        type_,
      );
  };

  let buildGameObjectAddableComponent =
      ((store, dispatchFunc), currentSceneTreeNode, componentArr) =>
    componentArr
    |> Js.Array.map(({type_, components}: componentCategory) =>
         <AddableComponentBox
           key=(DomHelper.getRandomKey())
           categoryType=type_
           componentArr=components
           addSpecificComponent=(
             addSpecificComponent(
               (store, dispatchFunc),
               currentSceneTreeNode,
             )
           )
         />
       );
};

let component = ReasonReact.reducerComponent("AddableComponent");

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
  <article className="wonder-addable-component">
    <div className="addable-component-content">
      <button
        className="addable-btn" onClick=(_e => send(ToggleAddableComponent))>
        (DomHelper.textEl("Add Component"))
      </button>
      (
        state.isShowAddableComponent ?
          <div className="component-list">
            (
              ReasonReact.array(
                addableComponentList
                |> Method.buildGameObjectAddableComponent(
                     (store, dispatchFunc),
                     currentSceneTreeNode,
                   ),
              )
            )
          </div> :
          ReasonReact.null
      )
    </div>
  </article>;

let make =
    (~reduxTuple, ~currentSceneTreeNode, ~addableComponentList, _children) => {
  ...component,
  initialState: () => {isShowAddableComponent: false},
  reducer,
  render: self =>
    render(reduxTuple, currentSceneTreeNode, addableComponentList, self),
};