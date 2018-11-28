let transformBaseTest =
    (
      sandbox,
      describeName,
      (defaultValue, getValueFunc),
      (changeXFunc, changeYFunc, changeZFunc),
    ) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          describe(
            describeName,
            () => {
              beforeEach(() => {
                MainEditorSceneTool.initState(~sandbox, ());
                MainEditorSceneTool.createDefaultScene(
                  sandbox,
                  MainEditorSceneTool.setFirstBoxToBeCurrentSceneTreeNode,
                );
              });

              describe(
                "changeX should set current gameObject->transform->value x", () => {
                test("set x value to floatInput", () => {
                  let currentGameObjectTransform =
                    GameObjectTool.getCurrentSceneTreeNodeTransform();
                  let value = (-10.1213);

                  changeXFunc(currentGameObjectTransform, value);

                  BuildComponentTool.buildMainEditorTransformComponent(
                    TestTool.buildEmptyAppState(),
                    currentGameObjectTransform,
                  )
                  |> ReactTestTool.createSnapshotAndMatch;
                });
                describe("set engine x value", () => {
                  describe(
                    "if value's decimal digits <= 5, can set the whole value to engine",
                    () => {
                    test("test < 5", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();

                      let value = (-11.1111);
                      changeXFunc(currentGameObjectTransform, value);
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);

                      expect(xFromEngine) == value;
                    });
                    test("test = 5", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();
                      let value = (-11.11112);
                      changeXFunc(currentGameObjectTransform, value);
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);
                      expect(xFromEngine) == value;
                    });
                    test("get the x from engine should == last value", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform,
                        );
                      let value1 = (-1.11222);
                      let value2 = (-14.66131);
                      changeXFunc(currentGameObjectTransform, value1);
                      changeXFunc(currentGameObjectTransform, value2);
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);

                      expect(xFromEngine) == value2;
                    });
                  });

                  describe("else", () =>
                    test("should set truncated value to engine", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();
                      let value = (-14.6613123);
                      changeXFunc(currentGameObjectTransform, value);
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);

                      expect(xFromEngine) == (-14.66131);
                    })
                  );
                });
              });
            },
          )
        )
      )
    )
  );