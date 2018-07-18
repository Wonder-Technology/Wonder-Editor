type mapAction('a) =
  | StoreMap('a);

type mapValue;

type componentMapType = Js.Dict.t(mapValue);

type componentsMapType = Js.Dict.t(componentMapType);

type componentsMap = option(componentsMapType);

type mapState = {componentsMap};

let mapReducer = (state: mapState, action: mapAction('a)) : mapState =>
  switch (action) {
  | StoreMap(map) => {...state, componentsMap: map}
  };