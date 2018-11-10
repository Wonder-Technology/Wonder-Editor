type updateAction('a) =
  | Update('a);

type updateComponentType =
  | NoUpdate
  | All
  | Inspector
  | BottomHeader
  | Project
  | Console
  | SceneTree;

type updateComponentTypeArr = array(updateComponentType);

type updateState = {componentTypeArr: updateComponentTypeArr};

let updateReducer =
    (state: updateState, action: updateAction('a))
    : updateState =>
  switch (action) {
  | Update(componentTypeArr) => {...state, componentTypeArr}
  };