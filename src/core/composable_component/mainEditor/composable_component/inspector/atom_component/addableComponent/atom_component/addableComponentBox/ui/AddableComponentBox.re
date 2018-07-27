open GameObjectAllComponentParseType;

type state = {isShowComponentList: bool};

type action =
  | ToggleShowList;

let component = ReasonReact.reducerComponent("AddableComponentBox");

let reducer = (action, state) =>
  switch (action) {
  | ToggleShowList =>
    ReasonReact.Update({
      ...state,
      isShowComponentList: ! state.isShowComponentList,
    })
  };

let render =
    (
      categoryType,
      componentArr,
      addSpecificComponent,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) =>
  <article className="wonder-addable-componentBox">
    <div className="category-header" onClick=(_e => send(ToggleShowList))>
      (DomHelper.textEl(categoryType))
    </div>
    (
      state.isShowComponentList ?
        <div className="category-content">
          (
            ReasonReact.arrayToElement(
              componentArr
              |> Js.Array.map(({type_}: componentType) =>
                   <div
                     key=(DomHelper.getRandomKey())
                     className="content-type"
                     onClick=(_e => addSpecificComponent(type_))>
                     (DomHelper.textEl(type_))
                   </div>
                 ),
            )
          )
        </div> :
        ReasonReact.nullElement
    )
  </article>;

let make = (~categoryType, ~componentArr, ~addSpecificComponent, _children) => {
  ...component,
  initialState: () => {isShowComponentList: false},
  reducer,
  render: self =>
    render(categoryType, componentArr, addSpecificComponent, self),
};