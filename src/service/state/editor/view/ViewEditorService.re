let getSize = editorState => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect=
                  {j|scene view->y1,height1 === game view->y2,height2|j},
                ~actual={j|not|j},
              ),
              () => {
                let (x1, y1, width1, height1) =
                  SceneViewEditorService.unsafeGetViewRect(editorState);

                let (x2, y2, width2, height2) =
                  GameViewEditorService.unsafeGetViewRect(editorState);

                y1 == y2;
                height1 == height2;
              },
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  let (x1, y1, width1, height1) =
    SceneViewEditorService.unsafeGetViewRect(editorState);

  let (x2, y2, width2, height2) =
    GameViewEditorService.unsafeGetViewRect(editorState);

  (x1, y1, width1 + width2, height1);
};