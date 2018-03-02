let buildCurrentGameObjectShowComponentList:(
  Wonderjs.GameObjectType.gameObject,
  Js.Array.t(GameObjectAllComponentParseType.gameObjectComponent),
  (EditorStateDataTypeEdit.editorState, Wonderjs.StateDataType.state)
) => (list((string,int)),list(string));