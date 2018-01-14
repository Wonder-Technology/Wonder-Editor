open EditorStateDataTypeEdit;

open MainEditorSceneTypeEdit;

open Wonderjs;

open Contract;

let unsafeGetScene = (editorState) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test("scene should exist", () => editorState.sceneData.scene |> assertExist)
      )
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
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "current gameObject should exist",
          () => editorState.sceneData.currentGameObject |> assertExist
        )
      )
  );
  editorState.sceneData.currentGameObject |> Js.Option.getExn
};

let getCurrentGameObject = (editorState) => editorState.sceneData.currentGameObject;

let setCurrentGameObject = (gameObject: GameObjectType.gameObject, {sceneData} as editorState) => {
  ...editorState,
  sceneData: {...sceneData, currentGameObject: Some(gameObject)}
};