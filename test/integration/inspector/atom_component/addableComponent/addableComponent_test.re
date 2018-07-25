open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("AddableComponent", () => {
    let _buildAddableComponent = (currentSceneTreeNode, addableComponentList) =>
      ReactTestRenderer.create(
        <AddableComponent
          reduxTuple=(TestTool.buildEmptyAppState(), TestTool.getDispatch())
          currentSceneTreeNode
          addableComponentList
        />,
      );
    let _triggerClickAddComponentEvent = domChildren => {
      let button = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
      BaseEventTool.triggerClickEvent(button);
    };
    let _triggerClickErrorComponentEvent = domChildren => {
      let errorComponent =
        WonderCommonlib.ArrayService.unsafeGet(domChildren, 2);
      BaseEventTool.triggerClickEvent(errorComponent);
    };
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();
      MainEditorSceneTool.initStateAndGl(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

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
          "else if currentSceneTreeNode is box, should show transform and material",
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
    });
    describe("test add component workflow", () => {
      beforeEach(() => {
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        );

        CurrentSelectSourceEditorService.setCurrentSelectSource(
          EditorType.SceneTree,
        )
        |> StateLogicService.getAndSetEditorState;
      });
      test("click the add component button, show addableComponent list", () => {
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

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
      test("click light component, add to inspector", () => {
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
          OperateComponentEventTool.triggerClickAddLightEvent,
        );

        BuildComponentTool.buildInspectorComponent(
          TestTool.buildEmptyAppState(),
          InspectorTool.buildFakeAllShowComponentConfig(),
        )
        |> ReactTestTool.createSnapshotAndMatch;
      });
    });
    describe("deal with specific case", () => {
      beforeEach(() =>
        MainEditorSceneTool.createDefaultScene(
          sandbox,
          MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
        )
      );
      test("if add component is error, should throw error", () =>
        expect(() => {
          let component =
            _buildAddableComponent(
              GameObjectTool.unsafeGetCurrentSceneTreeNode(),
              AddableComponentTool.buildFakeAddableComponentList(),
            );
          BaseEventTool.triggerComponentEvent(
            component,
            _triggerClickAddComponentEvent,
          );
          BaseEventTool.triggerComponentEvent(
            component,
            _triggerClickErrorComponentEvent,
          );
        })
        |> toThrowMessage("the type:transformError is not find")
      );
    });
  });