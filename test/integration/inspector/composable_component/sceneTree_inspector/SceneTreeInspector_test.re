open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("SceneTreeInspector", () => {
    let sandbox = getSandboxDefaultVal();
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe("prepare currentSelectSource is SceneTree", () => {
      beforeEach(() =>
        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState
      );
      describe("test show component", () => {
        test("if hasn't currentSceneTreeNode, show nothing", () => {
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          );
          BuildComponentTool.buildInspectorComponent(
            TestTool.buildEmptyAppState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
        describe("else", () => {
          test(
            "if currentSceneTreeNode is camera, should show transform and basicCameraView and perspectiveCameraProjection",
            () => {
              MainEditorSceneTool.createDefaultScene(
                sandbox,
                MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
              );
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            },
          );
          test(
            "else if currentSceneTreeNode is box, should show transform and basicMaterial",
            () => {
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
            );
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
        });
        describe("test add component workflow", () => {
          beforeEach(() =>
            MainEditorSceneTool.createDefaultScene(
              sandbox,
              MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
            )
          );
          test(
            "click the add component button, show addableComponent list", () => {
            let component =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateComponentEventTool.triggerClickAddComponentEvent,
            );
            component |> ReactTestTool.createSnapshotAndMatch;
          });
          test("click sourceInstance component, add to inspector", () => {
            let component =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateComponentEventTool.triggerClickAddComponentEvent,
            );
            BaseEventTool.triggerComponentEvent(
              component,
              OperateComponentEventTool.triggerClickAddSourceInstanceEvent,
            );
            let component2 =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildEmptyAppState(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            component2 |> ReactTestTool.createSnapshotAndMatch;
          });
        });
      });
      describe("test gameObject rename", () => {
        let triggerChangeEvent = (value, domChildren) => {
          let article = _getFromArray(domChildren, 0);
          let nameArticle = _getFromArray(article##children, 0);
          let div = _getFromArray(nameArticle##children, 1);
          let inputArticle = _getFromArray(div##children, 0);
          let input = _getFromArray(inputArticle##children, 0);
          BaseEventTool.triggerChangeEvent(
            input,
            BaseEventTool.buildFormEvent(value),
          );
        };
        let triggerBlurEvent = (value, domChildren) => {
          let article = _getFromArray(domChildren, 0);
          let nameArticle = _getFromArray(article##children, 0);
          let div = _getFromArray(nameArticle##children, 1);
          let inputArticle = _getFromArray(div##children, 0);
          let input = _getFromArray(inputArticle##children, 0);
          BaseEventTool.triggerBlurEvent(
            input,
            BaseEventTool.buildFormEvent(value),
          );
        };
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
          )
        );
        describe("test snapshot", () => {
          test("test rename to specific name", () => {
            let newName = "gameObjectNewName";
            let inspectorComponent =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildAppStateSceneGraphFromEngine(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              triggerChangeEvent(newName),
            );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              triggerBlurEvent(newName),
            );
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          });
          describe("deal with specific case", () =>
            test(
              "ket in '', trigger onBlur, the input value should be original name",
              () => {
              let newName = "";
              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(newName),
              );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerBlurEvent(newName),
              );
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildAppStateSceneGraphFromEngine(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              )
              |> ReactTestTool.createSnapshotAndMatch;
            })
          );
        });
        describe("test logic", () =>
          describe("test set engine", () =>
            test("test rename gameObject ", () => {
              let newName = "gameObjectNewName";
              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerChangeEvent(newName),
              );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                triggerBlurEvent(newName),
              );

              GameObjectEngineService.unsafeGetGameObjectName(
                SceneEditorService.unsafeGetCurrentSceneTreeNode
                |> StateLogicService.getEditorState,
              )
              |> StateLogicService.getEngineStateToGetData
              |> expect == newName;
            })
          )
        );
      });
      describe("deal with specific case", () => {
        beforeEach(() =>
          MainEditorSceneTool.createDefaultScene(
            sandbox,
            MainEditorSceneTool.setCameraTobeCurrentSceneTreeNode,
          )
        );
        test(
          "test if specific component not exist, should throw error when parse config from json data",
          () =>
          expect(() =>
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildEmptyAppState(),
              InspectorTool.buildFakeErrorAllShowComponentConfig(),
            )
          )
          |> toThrowMessageRe([%re {|/specific\scomponent.+is\serror/mg|}])
        );
        test(
          "test if specific component not exist, should throw error when build component",
          () =>
          expect(() =>
            InspectorTool.buildComponentUIComponent(
              ("SceneTree", 0),
              (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
            )
          )
          |> toThrowMessage("the component: SceneTree not exist")
        );
      });
    });
  });