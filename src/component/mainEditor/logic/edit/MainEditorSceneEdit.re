open EditorStateDataTypeEdit;

open MainEditorSceneTypeEdit;

open Wonderjs;

let unsafeGetScene = (editorState) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|scene exist|j}, ~actual={j|not|j}),
              () => editorState.sceneData.scene |> assertExist
            )
          )
        )
      ),
    EditorStateDataEdit.getStateIsDebug()
  );
  editorState.sceneData.scene |> Js.Option.getExn
};

let setScene = (scene: GameObjectType.gameObject, {sceneData} as editorState) => {
  ...editorState,
  sceneData: {...sceneData, scene: Some(scene)}
};

let hasCurrentGameObject = (editorState) =>
  switch editorState.sceneData.currentGameObject {
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
              () => editorState.sceneData.currentGameObject |> assertExist
            )
          )
        )
      ),
    EditorStateDataEdit.getStateIsDebug()
  );
  editorState.sceneData.currentGameObject |> Js.Option.getExn
};

let getCurrentGameObject = (editorState) => editorState.sceneData.currentGameObject;

let setCurrentGameObject = (gameObject: GameObjectType.gameObject, {sceneData} as editorState) => {
  ...editorState,
  sceneData: {...sceneData, currentGameObject: Some(gameObject)}
};