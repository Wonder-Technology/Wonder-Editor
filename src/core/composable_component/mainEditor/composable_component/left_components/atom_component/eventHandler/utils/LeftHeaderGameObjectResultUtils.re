let getTargetGameObject = () => {

  let editorState = StateEditorService.getState();

  switch (SceneTreeEditorService.getCurrentSceneTreeNode(editorState)) {
  | None =>
    Result.Result.fail(
      LogUtils.buildErrorMessage(
        ~description={j|current gameObject should exist, but actual is None|j},
        ~reason="",
        ~solution={j|set current gameObject|j},
        ~params={j||j},
      ),
    )
  | Some(gameObject) => Result.Result.success(gameObject)
  };
};