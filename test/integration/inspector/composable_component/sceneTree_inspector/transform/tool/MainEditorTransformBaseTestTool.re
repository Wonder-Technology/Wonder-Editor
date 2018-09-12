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

              describe("changeX should set current gameObject local x", () => {
                test("set x value to floatInput", () => {
                  let currentGameObjectTransform =
                    GameObjectTool.getCurrentSceneTreeNodeTransform();
                  let value = "-10.1213";
                  let component =
                    BuildComponentTool.buildMainEditorTransformComponent(
                      TestTool.buildEmptyAppState(),
                      currentGameObjectTransform,
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    changeXFunc(value),
                  );
                  component |> ReactTestTool.createSnapshotAndMatch;
                });
                describe("set engine x value", () => {
                  describe(
                    "if value's decimal digits <= 5, can set the whole value to engine",
                    () => {
                    test("test < 5", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();

                      let value = "-11.1111";
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform,
                        );

                      BaseEventTool.triggerComponentEvent(
                        component,
                        changeXFunc(value),
                      );
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);

                      expect(xFromEngine) == (value |> float_of_string);
                    });
                    test("test = 5", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();
                      let value = "-11.11112";
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform,
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        changeXFunc(value),
                      );
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);
                      expect(xFromEngine) == (value |> float_of_string);
                    });
                  });
                  describe("else", () => {
                    test("can't set the value to engine", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();
                      let value = "-14.6613123";
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform,
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        changeXFunc(value),
                      );
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);

                      expect(xFromEngine) == defaultValue;
                    });
                    test("get the x from engine should == last value", () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentSceneTreeNodeTransform();
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform,
                        );
                      let value1 = "-1.11222";
                      let value2 = "-14.6613123";
                      BaseEventTool.triggerComponentEvent(
                        component,
                        changeXFunc(value1),
                      );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        changeXFunc(value2),
                      );
                      let (xFromEngine, _, _) =
                        getValueFunc(currentGameObjectTransform);

                      expect(xFromEngine) == (value1 |> float_of_string);
                    });
                  });
                });
              });

              describe("changeY should set current gameObject local y", () => {
                test("set y value to floatInput", () => {
                  let currentGameObjectTransform =
                    GameObjectTool.getCurrentSceneTreeNodeTransform();
                  let value = "25.21246";
                  let component =
                    BuildComponentTool.buildMainEditorTransformComponent(
                      TestTool.buildEmptyAppState(),
                      currentGameObjectTransform,
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    changeYFunc(value),
                  );
                  component |> ReactTestTool.createSnapshotAndMatch;
                });
                describe("set engine y value", () => {
                  test(
                    "if value's decimal digits <= 5, can set the whole value to engine",
                    () => {
                    let currentGameObjectTransform =
                      GameObjectTool.getCurrentSceneTreeNodeTransform();
                    let value = "-11.11112";
                    let component =
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform,
                      );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeYFunc(value),
                    );
                    let (_, yFromEngine, _) =
                      getValueFunc(currentGameObjectTransform);

                    expect(yFromEngine) == (value |> float_of_string);
                  });
                  test("if value is empty ", () => {
                    let currentGameObjectTransform =
                      GameObjectTool.getCurrentSceneTreeNodeTransform();
                    let value = "";
                    let component =
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform,
                      );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeYFunc(value),
                    );
                    let (_, yFromEngine, _) =
                      getValueFunc(currentGameObjectTransform);

                    expect(yFromEngine) == defaultValue;
                  });
                  test("else, get the y from engine should == last value", () => {
                    let currentGameObjectTransform =
                      GameObjectTool.getCurrentSceneTreeNodeTransform();
                    let component =
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform,
                      );
                    let value1 = "-1.11222";
                    let value2 = "-14.66132133";
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeYFunc(value1),
                    );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeYFunc(value2),
                    );
                    let (_, yFromEngine, _) =
                      getValueFunc(currentGameObjectTransform);

                    expect(yFromEngine) == (value1 |> float_of_string);
                  });
                });
              });
              describe("changeZ should set current gameObject local z", () => {
                test("set z value to floatInput", () => {
                  let currentGameObjectTransform =
                    GameObjectTool.getCurrentSceneTreeNodeTransform();
                  let value = "155.2164";
                  let component =
                    BuildComponentTool.buildMainEditorTransformComponent(
                      TestTool.buildEmptyAppState(),
                      currentGameObjectTransform,
                    );
                  BaseEventTool.triggerComponentEvent(
                    component,
                    changeZFunc(value),
                  );
                  component |> ReactTestTool.createSnapshotAndMatch;
                });
                describe("set engine z value", () => {
                  test(
                    "if value's decimal digits <= 5, can set the whole value to engine",
                    () => {
                    let currentGameObjectTransform =
                      GameObjectTool.getCurrentSceneTreeNodeTransform();
                    let value = "-11.1112";
                    let component =
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform,
                      );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeZFunc(value),
                    );
                    let (_, _, zFromEngine) =
                      getValueFunc(currentGameObjectTransform);

                    expect(zFromEngine) == (value |> float_of_string);
                  });
                  test("else, get the z from engine should == last value", () => {
                    let currentGameObjectTransform =
                      GameObjectTool.getCurrentSceneTreeNodeTransform();
                    let component =
                      BuildComponentTool.buildMainEditorTransformComponent(
                        TestTool.buildEmptyAppState(),
                        currentGameObjectTransform,
                      );
                    let value1 = "-1.23435";
                    let value2 = "-24.6613123";
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeZFunc(value1),
                    );
                    BaseEventTool.triggerComponentEvent(
                      component,
                      changeZFunc(value2),
                    );
                    let (_, _, zFromEngine) =
                      getValueFunc(currentGameObjectTransform);

                    expect(zFromEngine) == (value1 |> float_of_string);
                  });
                });
              });
            },
          )
        )
      )
    )
  );