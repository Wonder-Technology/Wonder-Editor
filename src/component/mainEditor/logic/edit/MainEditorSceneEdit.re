open EditorStateDataTypeEdit;

open MainEditorSceneTypeEdit;

open Wonderjs;

/* TODO rename to unsafeGet
   TODO add contract */
let getScene = (editorState) => editorState.sceneData.scene |> Js.Option.getExn;

let setScene = (scene: GameObjectType.gameObject, {sceneData} as editorState) => {
  sceneData.scene = Some(scene);
  editorState
};

let hasCurrentGameObject = (editorState) =>
  switch editorState.sceneData.currentGameObject {
  | None => false
  | Some(_) => true
  };

/* TODO return option */
let getCurrentGameObject = (editorState) =>
  editorState.sceneData.currentGameObject |> Js.Option.getExn;

let setCurrentGameObject = (gameObject: GameObjectType.gameObject, {sceneData} as editorState) => {
  /* {
       ...editorState,
       sceneData:{
         ...sceneData,
         currentGameObject:Some(gameObject)
       }
     } */
  sceneData.currentGameObject = Some(gameObject);
  editorState
};

let initData = () => {scene: None, currentGameObject: None};