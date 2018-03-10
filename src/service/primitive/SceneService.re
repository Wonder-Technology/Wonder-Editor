open Wonderjs;

open EditorType;

let unsafeGetScene = (editorState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|scene exist|j}, ~actual={j|not|j}),
              () => editorState.sceneRecord.root |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  editorState.sceneRecord.root |> Js.Option.getExn
};

let setScene = (scene: GameObjectType.gameObject, {sceneRecord} as editorState) => {
  ...editorState,
  sceneRecord: {...sceneRecord, root: Some(scene)}
};