type updateAction('a) =
  | Update('a);

type updateComponentType =
  | All
  | Inspector
  | Asset
  | SceneTree;

type updateComponentTypeArr = array(updateComponentType);

type updateState = {componentTypeArr: updateComponentTypeArr};

let updateReducer =
    (state: updateState, action: updateAction('a))
    : updateState =>
  switch (action) {
  | Update(componentTypeArr) => {...state, componentTypeArr}
  };