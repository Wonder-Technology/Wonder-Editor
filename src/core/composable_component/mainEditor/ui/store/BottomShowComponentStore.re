type showComponentAction('a) =
  | ChangeComponent('a);

type bottomComponentType =
  | Project
  | Console;

type showComponentState = {currentComponentType: bottomComponentType};

let showComponentReducer =
    (state: showComponentState, action: showComponentAction('a))
    : showComponentState =>
  switch (action) {
  | ChangeComponent(componentType) =>
    Js.log(("change type", componentType)) |> ignore;
    {...state, currentComponentType: componentType};
  };