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

let initData = () => {scene: None};