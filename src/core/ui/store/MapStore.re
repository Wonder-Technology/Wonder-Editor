type mapAction('a) =
  | StoreMap('a);

type mapValue;

type componentMapType = WonderCommonlib.MutableHashMapService.t(mapValue);

type componentsMapType =
  WonderCommonlib.MutableHashMapService.t(componentMapType);

type componentsMap = option(componentsMapType);

type mapState = {componentsMap};

let mapReducer = (state: mapState, action: mapAction('a)): mapState =>
  switch (action) {
  | StoreMap(map) => {...state, componentsMap: map}
  };