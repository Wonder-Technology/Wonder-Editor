open MapStore;

open UpdateStore;

open MainEditorInspectorStore;

open BottomShowComponentStore;

open SelectTreeStore;

type appState = {
  isInitEngine: bool,
  mapState,
  updateState,
  inspectorState,
  showComponentState,
  selectTreeState,
};

type ReduxThunk.thunk('a) +=
  | ReplaceState('a);

type ReduxThunk.thunk(_) +=
  | InitEngineAction
  | MapAction(mapAction(componentsMap))
  | InspectorAction(inspectorAction(int, bool))
  | UpdateAction(updateAction(updateComponentTypeArr))
  | ShowComponentAction(showComponentAction(bottomComponentType));
/* | SelectTreeAction(selectTreeAction(SelectTreeType.tree)); */

let state: appState = {
  isInitEngine: false,
  mapState: {
    componentsMap: None,
  },
  updateState: {
    componentTypeArr: [|All|],
  },
  inspectorState: {
    showComponentMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
  showComponentState: {
    currentComponentType: Project,
  },
  selectTreeState: {
    tree: None,
  },
};

let appReducter = (state: appState, action) =>
  switch (action) {
  | InitEngineAction => {...state, isInitEngine: true}
  | MapAction(action) => {
      ...state,
      mapState: mapReducer(state.mapState, action),
    }
  | InspectorAction(action) => {
      ...state,
      inspectorState: inspectorReducer(state.inspectorState, action),
    }
  | UpdateAction(action) => {
      ...state,
      updateState: updateReducer(state.updateState, action),
    }
  | ShowComponentAction(action) => {
      ...state,
      showComponentState:
        showComponentReducer(state.showComponentState, action),
    }
  | ReplaceState(replacedState) => replacedState
  /* | SelectTreeAction(action) => {
       ...state,
       selectTreeState: selectTreeReducer(state.selectTreeState, action),
     } */
  | _ => state
  };