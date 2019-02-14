open AppStore;

open UpdateStore;

let getUpdateComponentTypeArr = uiState =>
  uiState.updateState.componentTypeArr;

let getBottomCurrentComponentType = uiState =>
  uiState.showComponentState.currentComponentType;

let geGameObjectisShowComponentFromStore = (uiState, componentType) =>
  switch (
    uiState.inspectorState.showComponentMap
    |> WonderCommonlib.ImmutableSparseMapService.get(componentType)
  ) {
  | None => true
  | Some(isShowComponent) => isShowComponent
  };

let shouldComponentUpdateWithAll = updateComponentTypeArr =>
  updateComponentTypeArr |> Js.Array.includes(All);

let shouldComponentUpdate = (componentType, updateComponentTypeArr) =>
  updateComponentTypeArr
  |> Js.Array.includes(componentType)
  || shouldComponentUpdateWithAll(updateComponentTypeArr);

let shouldComponentUpdateMany = (componentTypeArr, updateComponentTypeArr) =>
  ArrayService.hasIntersect(updateComponentTypeArr, componentTypeArr)
  || shouldComponentUpdateWithAll(updateComponentTypeArr);