type updateAction('a) =
  | Update('a);

type updateComponentType =
  | All
  | Header
  | Inspector
  | Asset
  | SceneTree;

type updateComponentTypeArr = array(updateComponentType);

type updateState = {componentTypeArr: array(updateComponentType)};

let updateReducer =
    (state: updateState, action: updateAction('a))
    : updateState =>
  switch (action) {
  | Update(componentTypeArr) => {...state, componentTypeArr}
  };