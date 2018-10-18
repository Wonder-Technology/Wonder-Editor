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
  | ChangeComponent(componentType) => {
      ...state,
      currentComponentType: componentType,
    }
  };