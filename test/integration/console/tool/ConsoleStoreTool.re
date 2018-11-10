let buildStore = (~currentComponentType=BottomShowComponentStore.Project, ()) => {
  let store = TestTool.buildEmptyAppState();
  {
    ...store,
    showComponentState: {
      ...store.showComponentState,
      currentComponentType: Console,
    },
  };
};