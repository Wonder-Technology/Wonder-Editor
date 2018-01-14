let hasMaterialComponent = (gameObject, (editorState, engineState)) =>
  engineState |> MainEditorGameObjectOper.hasMaterialComponent(gameObject);

let getGameObjectAllComponent = () =>{
    GameObject_component.gameObject_component |> GameObjectComponentParseSystem.convertDataToRecord;
};
