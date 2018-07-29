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

      describe("test gameObject rename", () => {
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
              GameObjectRenameTool.triggerRenameChangeEvent(newName),
            );
            BaseEventTool.triggerComponentEvent(
              inspectorComponent,
              GameObjectRenameTool.triggerRenameBlurEvent(newName),
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
                GameObjectRenameTool.triggerRenameChangeEvent(newName),
              );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                GameObjectRenameTool.triggerRenameBlurEvent(newName),
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
          describe("test engine", () =>
            test("test rename gameObject ", () => {
              let newName = "gameObjectNewName";
              let inspectorComponent =
                BuildComponentTool.buildInspectorComponent(
                  TestTool.buildAppStateSceneGraphFromEngine(),
                  InspectorTool.buildFakeAllShowComponentConfig(),
                );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                GameObjectRenameTool.triggerRenameChangeEvent(newName),
              );
              BaseEventTool.triggerComponentEvent(
                inspectorComponent,
                GameObjectRenameTool.triggerRenameBlurEvent(newName),
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
              (TestTool.buildEmptyAppState(), TestTool.getDispatch()),
              10 |> Obj.magic,
              0,
            )
          )
          |> toThrowMessage("the component: SceneTree not exist")
        );
      });
    });
  });