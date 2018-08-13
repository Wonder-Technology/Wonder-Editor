open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("componentBox", () => {
    let _buildComponentBoxComponent =
        (header, type_, isDisposable, gameObject) =>
      ReactTestRenderer.create(
        <ComponentBox
          reduxTuple=(TestTool.buildEmptyAppState(), TestTool.getDispatch())
          header
          isDisposable
          isShowComponent=true
          type_
          gameObject
          gameObjectUIComponent={
            <div> (DomHelper.textEl("simulate div component")) </div>
          }
        />,
      );
    let _getFromArray = (array, index) => ArrayService.getNth(index, array);

    let sandbox = getSandboxDefaultVal();
    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());

      MainEditorSceneTool.createDefaultScene(
        sandbox,
        MainEditorSceneTool.setFirstBoxTobeCurrentSceneTreeNode,
      );

      CurrentSelectSourceEditorService.setCurrentSelectSource(
        EditorType.SceneTree,
      )
      |> StateLogicService.getAndSetEditorState;
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test component arguments", () => {
      test(
        "build componentBox component which can't be disposed should has no 'x'",
        () =>
        _buildComponentBoxComponent(
          "newBox",
          InspectorComponentType.Transform,
          false,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test("build disposable componentBox component should has 'x'", () =>
        _buildComponentBoxComponent(
          "newBox",
          InspectorComponentType.Transform,
          true,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
    });

    describe("test show component workflow", () => {
      let _triggerClickTransformTriangle = domChildren => {
        let inspector = _getFromArray(domChildren, 0);
        let transformArcticle = _getFromArray(inspector##children, 1);
        let headerDiv = _getFromArray(transformArcticle##children, 0);
        let triangleDiv = _getFromArray(headerDiv##children, 0);

        BaseEventTool.triggerClickEvent(triangleDiv);
      };

      describe(
        "test click triangle once to hide the common type component", () => {
        test(
          "test click close first box transform component, the component should be close",
          () => {
            let component =
              BuildComponentTool.buildInspectorComponent(
                TestTool.buildAppStateSceneGraphFromEngine(),
                InspectorTool.buildFakeAllShowComponentConfig(),
              );

            BaseEventTool.triggerComponentEvent(
              component,
              _triggerClickTransformTriangle,
            );

            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphAndInspectorState(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            )
            |> ReactTestTool.createSnapshotAndMatch;
          },
        );
        test(
          "test the other gameObject transform component should be close", () => {
          let component =
            BuildComponentTool.buildInspectorComponent(
              TestTool.buildAppStateSceneGraphFromEngine(),
              InspectorTool.buildFakeAllShowComponentConfig(),
            );

          BaseEventTool.triggerComponentEvent(
            component,
            _triggerClickTransformTriangle,
          );

          MainEditorSceneTool.setFirstCameraTobeCurrentSceneTreeNode();

          BuildComponentTool.buildInspectorComponent(
            TestTool.buildAppStateSceneGraphAndInspectorState(),
            InspectorTool.buildFakeAllShowComponentConfig(),
          )
          |> ReactTestTool.createSnapshotAndMatch;
        });
      });
    });
  });