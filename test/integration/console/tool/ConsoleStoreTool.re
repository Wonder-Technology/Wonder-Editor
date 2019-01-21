let buildStore = (~currentComponentType=BottomShowComponentStore.Project, ()) => {
  let uiState = TestTool.buildEmptyAppState();
  {
    ...uiState,
    showComponentState: {
      ...uiState.showComponentState,
      currentComponentType,
    },
  };
};