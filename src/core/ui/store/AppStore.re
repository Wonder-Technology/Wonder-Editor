open MapStore;

open UpdateStore;

open MainEditorSceneTreeStore;

open MainEditorInspectorStore;

open BottomShowComponentStore;

type appState = {
  isEditorAndEngineStart: bool,
  isDidMounted: bool,
  mapState,
  sceneTreeState,
  updateState,
  inspectorState,
  showComponentState,
};

type ReduxThunk.thunk('a) +=
  | ReplaceState('a);

type ReduxThunk.thunk(_) +=
  | IsDidMounted
  | StartEngineAction
  | SceneTreeAction(sceneTreeAction(sceneTreeDataType))
  | MapAction(mapAction(componentsMap))
  | InspectorAction(inspectorAction(int, bool))
  | UpdateAction(updateAction(updateComponentTypeArr))
  | ShowComponentAction(showComponentAction(bottomComponentType));

let state: appState = {
  isEditorAndEngineStart: false,
  isDidMounted: false,
  mapState: {
    componentsMap: None,
  },
  sceneTreeState: {
    sceneGraphData: None,
  },
  updateState: {
    componentTypeArr: [|All|],
  },
  inspectorState: {
    showComponentMap: WonderCommonlib.SparseMapService.createEmpty(),
  },
  showComponentState: {
    currentComponentType: Project
  },
};

let appReducter = (state: appState, action) =>
  switch (action) {
  | IsDidMounted => {...state, isDidMounted: true}
  | StartEngineAction => {...state, isEditorAndEngineStart: true}
  | SceneTreeAction(action) => {
      ...state,
      sceneTreeState: sceneTreeReducer(state.sceneTreeState, action),
    }
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
  | _ => state
  };