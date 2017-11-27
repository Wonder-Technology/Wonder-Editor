let buildSceneTree =
    (state_: option(AppStore.appState)) =>
  switch state_ {
  | Some(state) => <SceneTree state />
  | _ => ExcepetionHandleSystem.throwMessage({j|sceneTree build:the arguments is error|j})
  };