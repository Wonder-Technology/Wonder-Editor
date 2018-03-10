/* open EditorStateDataTypeEdit; */
/* open MainEditorSceneTypeEdit; */
open EditorStateDataType;

open EditorType;

open Wonderjs;

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