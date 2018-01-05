open EditorStateDataTypeEdit;

open MainEditorSceneTypeEdit;

open Wonderjs;

open Contract;

let getScene = (editorState) =>
  editorState.sceneData.scene
  |> Js.Option.getExn
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test("scene should exist", () => editorState.sceneData.scene |> assertExist)
         )
     );

let setScene = (scene: GameObjectType.gameObject, {sceneData} as editorState) => {
  sceneData.scene = Some(scene);
  editorState
};

let hasCurrentGameObject = (editorState) =>
  switch editorState.sceneData.currentGameObject {
  | None => false
  | Some(_) => true
  };

let getCurrentGameObject = (editorState) =>
  switch (hasCurrentGameObject(editorState)) {
  | false => WonderCommonlib.LogUtils.warn("the current gameObject is null") |> Obj.magic
  | true => editorState.sceneData.currentGameObject |> Js.Option.getExn
  };

let setCurrentGameObject = (gameObject: GameObjectType.gameObject, {sceneData} as editorState) => {
  sceneData.currentGameObject = Some(gameObject);
  editorState
};

let initData = () => {scene: None, currentGameObject: None};