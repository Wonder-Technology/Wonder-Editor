open EditorType;

open Wonderjs;

let hasCurrentGameObject = (editorState) =>
  switch editorState.sceneRecord.currentGameObject {
  | None => false
  | Some(_) => true
  };

let unsafeGetCurrentGameObject = (editorState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|current gameObject exist|j}, ~actual={j|not|j}),
              () => editorState.sceneRecord.currentGameObject |> assertExist
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug()
  );
  editorState.sceneRecord.currentGameObject |> Js.Option.getExn
};

let getCurrentGameObject = (editorState) => editorState.sceneRecord.currentGameObject;

let setCurrentGameObject = (gameObject: GameObjectType.gameObject, {sceneRecord} as editorState) => {
  ...editorState,
  sceneRecord: {...sceneRecord, currentGameObject: Some(gameObject)}
};

let clearCurrentGameObject = ({sceneRecord} as editorState) => {
  ...editorState,
  sceneRecord: {...sceneRecord, currentGameObject: None}
};