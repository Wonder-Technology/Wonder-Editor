open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform.Method;

type retainedProps = {
  x: string,
  y: string,
  z: string
};

let _ =
  describe(
    /* TODO remove "ui component" */
    "MainEditorTransform ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test set currentGameObject",
        () => {
          beforeEach(
            () => {
              MainEditorSceneTool.initStateAndGl(sandbox);
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setFirstBoxTobeCurrentGameObject
              )
            }
          );
          describe(
            "changeX should set current gameObject local position's x",
            () => {
              describe(
                "test snapshot",
                () =>
                  test(
                    "set x value to floatInput",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      let value = "-10.1213";
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        TransformEventTool.triggerChangeXEvent(value)
                      );
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test logic",
                () => {
                  describe(
                    "test should update",
                    () => {
                      test(
                        "if localTransform not change, should not update",
                        () =>
                          MainEditorTransform.shouldUpdate(
                            OldNewSelfTool.buildOldNewSelf(
                              {x: "1", y: "1", z: "1"},
                              {x: "1", y: "1", z: "1"}
                            )
                          )
                          |> expect == false
                      );
                      test(
                        "else, should update",
                        () =>
                          MainEditorTransform.shouldUpdate(
                            OldNewSelfTool.buildOldNewSelf(
                              {x: "1", y: "1", z: "1"},
                              {x: "2", y: "2", z: "2"}
                            )
                          )
                          |> expect == true
                      )
                    }
                  );
                  describe(
                    "set engine x value",
                    () => {
                      describe(
                        "if value's decimal digits <= 6, can set the whole value to engine",
                        () => {
                          test(
                            "test < 6",
                            () => {
                              let currentGameObjectTransform =
                                GameObjectTool.getCurrentGameObjectTransform();
                              let value = "-11.11111";
                              let component =
                                BuildComponentTool.buildMainEditorTransformComponent(
                                  TestTool.buildEmptyAppState(),
                                  currentGameObjectTransform
                                );
                              BaseEventTool.triggerComponentEvent(
                                component,
                                TransformEventTool.triggerChangeXEvent(value)
                              );
                              let (xFromEngine, _, _) =
                                getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                                |> MainEditorTransform.Method.truncateTransformValue;
                              expect(xFromEngine) == value
                            }
                          );
                          test(
                            "test = 6",
                            () => {
                              let currentGameObjectTransform =
                                GameObjectTool.getCurrentGameObjectTransform();
                              let value = "-11.111112";
                              let component =
                                BuildComponentTool.buildMainEditorTransformComponent(
                                  TestTool.buildEmptyAppState(),
                                  currentGameObjectTransform
                                );
                              BaseEventTool.triggerComponentEvent(
                                component,
                                TransformEventTool.triggerChangeXEvent(value)
                              );
                              let (xFromEngine, _, _) =
                                getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                                |> MainEditorTransform.Method.truncateTransformValue;
                              expect(xFromEngine) == value
                            }
                          )
                        }
                      );
                      describe(
                        "else",
                        () => {
                          test(
                            "can't set the value to engine",
                            () => {
                              let currentGameObjectTransform =
                                GameObjectTool.getCurrentGameObjectTransform();
                              let value = "-14.6613123";
                              let component =
                                BuildComponentTool.buildMainEditorTransformComponent(
                                  TestTool.buildEmptyAppState(),
                                  currentGameObjectTransform
                                );
                              BaseEventTool.triggerComponentEvent(
                                component,
                                TransformEventTool.triggerChangeXEvent(value)
                              );
                              let (xFromEngine, _, _) =
                                getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                                |> MainEditorTransform.Method.truncateTransformValue;
                              expect(xFromEngine) == "0"
                            }
                          );
                          test(
                            "get the x from engine should == last value",
                            () => {
                              let currentGameObjectTransform =
                                GameObjectTool.getCurrentGameObjectTransform();
                              let component =
                                BuildComponentTool.buildMainEditorTransformComponent(
                                  TestTool.buildEmptyAppState(),
                                  currentGameObjectTransform
                                );
                              let value1 = "-1.111222";
                              let value2 = "-14.6613123";
                              BaseEventTool.triggerComponentEvent(
                                component,
                                TransformEventTool.triggerChangeXEvent(value1)
                              );
                              BaseEventTool.triggerComponentEvent(
                                component,
                                TransformEventTool.triggerChangeXEvent(value2)
                              );
                              let (xFromEngine, _, _) =
                                getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                                |> MainEditorTransform.Method.truncateTransformValue;
                              expect(xFromEngine) == value1
                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          );
          describe(
            "changeY should set current gameObject local position's y",
            () => {
              describe(
                "test snapshot",
                () =>
                  test(
                    "set y value to floatInput",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      let value = "25.21246";
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        TransformEventTool.triggerChangeYEvent(value)
                      );
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test logic",
                () =>
                  describe(
                    "set engine y value",
                    () => {
                      test(
                        "if value's decimal digits <= 6, can set the whole value to engine",
                        () => {
                          let currentGameObjectTransform =
                            GameObjectTool.getCurrentGameObjectTransform();
                          let value = "-11.111112";
                          let component =
                            BuildComponentTool.buildMainEditorTransformComponent(
                              TestTool.buildEmptyAppState(),
                              currentGameObjectTransform
                            );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeYEvent(value)
                          );
                          let (_, yFromEngine, _) =
                            getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                            |> MainEditorTransform.Method.truncateTransformValue;
                          expect(yFromEngine) == value
                        }
                      );
                      test(
                        "if value is empty ",
                        () => {
                          let currentGameObjectTransform =
                            GameObjectTool.getCurrentGameObjectTransform();
                          let value = "";
                          let component =
                            BuildComponentTool.buildMainEditorTransformComponent(
                              TestTool.buildEmptyAppState(),
                              currentGameObjectTransform
                            );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeYEvent(value)
                          );
                          let (_, yFromEngine, _) =
                            getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                            |> MainEditorTransform.Method.truncateTransformValue;
                          expect(yFromEngine) == "0"
                        }
                      );
                      test(
                        "else, get the y from engine should == last value",
                        () => {
                          let currentGameObjectTransform =
                            GameObjectTool.getCurrentGameObjectTransform();
                          let component =
                            BuildComponentTool.buildMainEditorTransformComponent(
                              TestTool.buildEmptyAppState(),
                              currentGameObjectTransform
                            );
                          let value1 = "-1.111222";
                          let value2 = "-14.66132133";
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeYEvent(value1)
                          );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeYEvent(value2)
                          );
                          let (_, yFromEngine, _) =
                            getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                            |> MainEditorTransform.Method.truncateTransformValue;
                          expect(yFromEngine) == value1
                        }
                      )
                    }
                  )
              )
            }
          );
          describe(
            "changeZ should set current gameObject local position's z",
            () => {
              describe(
                "test snapshot",
                () =>
                  test(
                    "set z value to floatInput",
                    () => {
                      let currentGameObjectTransform =
                        GameObjectTool.getCurrentGameObjectTransform();
                      let value = "155.2164";
                      let component =
                        BuildComponentTool.buildMainEditorTransformComponent(
                          TestTool.buildEmptyAppState(),
                          currentGameObjectTransform
                        );
                      BaseEventTool.triggerComponentEvent(
                        component,
                        TransformEventTool.triggerChangeZEvent(value)
                      );
                      component |> ReactTestTool.createSnapshotAndMatch
                    }
                  )
              );
              describe(
                "test logic",
                () =>
                  describe(
                    "set engine z value",
                    () => {
                      test(
                        "if value's decimal digits <= 6, can set the whole value to engine",
                        () => {
                          let currentGameObjectTransform =
                            GameObjectTool.getCurrentGameObjectTransform();
                          let value = "-11.111112";
                          let component =
                            BuildComponentTool.buildMainEditorTransformComponent(
                              TestTool.buildEmptyAppState(),
                              currentGameObjectTransform
                            );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeZEvent(value)
                          );
                          let (_, _, zFromEngine) =
                            getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                            |> MainEditorTransform.Method.truncateTransformValue;
                          expect(zFromEngine) == value
                        }
                      );
                      test(
                        "else, get the z from engine should == last value",
                        () => {
                          let currentGameObjectTransform =
                            GameObjectTool.getCurrentGameObjectTransform();
                          let component =
                            BuildComponentTool.buildMainEditorTransformComponent(
                              TestTool.buildEmptyAppState(),
                              currentGameObjectTransform
                            );
                          let value1 = "-1.23435";
                          let value2 = "-24.6613123";
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeZEvent(value1)
                          );
                          BaseEventTool.triggerComponentEvent(
                            component,
                            TransformEventTool.triggerChangeZEvent(value2)
                          );
                          let (_, _, zFromEngine) =
                            getCurrentGameObjectLocalPosition(currentGameObjectTransform)
                            |> MainEditorTransform.Method.truncateTransformValue;
                          expect(zFromEngine) == value1
                        }
                      )
                    }
                  )
              )
            }
          )
        }
      )
    }
  );