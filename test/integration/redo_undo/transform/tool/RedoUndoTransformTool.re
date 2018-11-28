let simulateTwiceChangePosition = (~firstValue=11.25, ~secondValue=15., ()) => {
  let currentGameObjectTransform =
    GameObjectTool.getCurrentSceneTreeNodeTransform();

  MainEditorTransformTool.changePositionXAndBlur(
    ~transform=currentGameObjectTransform,
    ~value=firstValue,
    (),
  );

  MainEditorTransformTool.changePositionYAndBlur(
    ~transform=currentGameObjectTransform,
    ~value=secondValue,
    (),
  );
};