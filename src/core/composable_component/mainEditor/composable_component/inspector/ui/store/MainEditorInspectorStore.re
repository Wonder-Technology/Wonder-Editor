type inspectorAction('a, 'b) =
  | SetShowComponent('a, 'b);

type showComponentMapType = WonderCommonlib.ImmutableSparseMapService.t(bool);

type inspectorState = {showComponentMap: showComponentMapType};

let inspectorReducer =
    (state: inspectorState, action: inspectorAction('a, 'b)) =>
  switch (action) {
  | SetShowComponent(index, isShowComponent) => {
      ...state,
      showComponentMap:
        state.showComponentMap
        |> WonderCommonlib.ImmutableSparseMapService.set(index, isShowComponent),
    }
  };