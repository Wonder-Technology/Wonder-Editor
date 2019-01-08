let handleError =
    (result: Result.SameDataResult.t(array(ReasonReact.reactElement))) =>
  Result.SameDataResult.handleError(
    result => result,
    (msg, result) => {
      let editorState = StateEditorService.getState();

      ConsoleUtils.error(msg, editorState);

      result;
    },
    result,
  );