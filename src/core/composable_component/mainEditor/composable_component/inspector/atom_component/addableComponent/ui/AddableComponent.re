open GameObjectAllComponentParseType;

type state = {
  isShowAddableComponent: bool,
  streamSubscription: option(WonderBsMost.Most.subscription),
};

type action =
  | SetSubscription(WonderBsMost.Most.subscription)
  | HideAddableComponent
  | ToggleAddableComponent;

module Method = {
  let addSpecificComponent =
      ((uiState, dispatchFunc), currentSceneTreeNode, type_) => {
    let type_ =
      OperateComponentUtils.getInspectorComponentType(
        type_,
        StateEditorService.getState(),
      );

    InspectorHasComponentUtils.isHasSpecificComponentByType(
      type_,
      currentSceneTreeNode,
    )
    |> StateLogicService.getStateToGetData ?
      ConsoleUtils.warn("the game object already have this component !")
      |> StateLogicService.getEditorState :
      AddableComponentAddComponentEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
        (uiState, dispatchFunc),
        currentSceneTreeNode,
        type_,
      );
  };

  let buildGameObjectAddableComponent =
      ((uiState, dispatchFunc), currentSceneTreeNode, componentArr) =>
    componentArr
    |> Js.Array.map(({type_, components}: componentCategory) =>
         <AddableComponentBox
           key=(DomHelper.getRandomKey())
           categoryType=type_
           componentArr=components
           addSpecificComponent=(
             addSpecificComponent(
               (uiState, dispatchFunc),
               currentSceneTreeNode,
             )
           )
         />
       );
};

let component = ReasonReact.reducerComponent("AddableComponent");

let reducer = (action, state) =>
  switch (action) {
  | SetSubscription(subscription) =>
    ReasonReact.Update({...state, streamSubscription: Some(subscription)})
  | ToggleAddableComponent =>
    ReasonReact.Update({
      ...state,
      isShowAddableComponent: ! state.isShowAddableComponent,
    })
  | HideAddableComponent =>
    ReasonReact.Update({...state, isShowAddableComponent: false})
  };

let render =
    (
      (uiState, dispatchFunc),
      currentSceneTreeNode,
      addableComponentList,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-addable-component">
    <div className="addable-component-content">
      <div className="content-btn">
        <button
          className="addable-btn"
          onClick=(_e => send(ToggleAddableComponent))>
          (DomHelper.textEl("Add Component"))
        </button>
      </div>
      (
        state.isShowAddableComponent ?
          <div className="content-components">
            <div className="component-list">
              (
                ReasonReact.array(
                  addableComponentList
                  |> Method.buildGameObjectAddableComponent(
                       (uiState, dispatchFunc),
                       currentSceneTreeNode,
                     ),
                )
              )
            </div>
          </div> :
          ReasonReact.null
      )
    </div>
  </article>;

let make =
    (~reduxTuple, ~currentSceneTreeNode, ~addableComponentList, _children) => {
  ...component,
  initialState: () => {
    isShowAddableComponent: false,
    streamSubscription: None,
  },
  reducer,
  render: self =>
    render(reduxTuple, currentSceneTreeNode, addableComponentList, self),
  didMount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.bindEventInDidMount(
      e => {
        let target = ReactEventRe.Form.target(Obj.magic(e));
        let targetArray = DomHelper.getElementsByClassName("addable-btn");
        let notCloseArray =
          DomHelper.getElementsByClassName("component-list");

        DomUtils.isSpecificDomChildrenHasTargetDom(target, targetArray)
        || DomUtils.isSpecificDomChildrenHasTargetDom(target, notCloseArray) ?
          () : send(HideAddableComponent);
      },
      subscription => send(SetSubscription(subscription)),
    ),
  willUnmount: ({state, send}: ReasonReact.self('a, 'b, 'c)) =>
    EventUtils.unmountStreamSubscription(state.streamSubscription),
};