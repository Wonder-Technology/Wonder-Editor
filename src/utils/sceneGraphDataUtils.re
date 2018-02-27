let unsafeGetSceneGraphDataFromStore = (store: AppStore.appState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|the store sceneTreeState sceneGraphData exist|j},
                ~actual={j|not|j}
              ),
              () => store.sceneTreeState.sceneGraphData |> Js.Option.isSome |> assertTrue
            )
          )
        )
      ),
    EditorStateDataEdit.getStateIsDebug()
  );
  store.sceneTreeState.sceneGraphData |> Js.Option.getExn
};