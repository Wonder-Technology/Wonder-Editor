open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("componentBox", () => {
    let _buildComponentBoxComponent = (header, isDisposable, gameObject) =>
      ReactTestRenderer.create(
        <ComponentBox
          reduxTuple=(TestTool.buildEmptyAppState(), TestTool.getDispatch())
          header
          isDisposable
          type_=InspectorComponentType.Light
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
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test component arguments", () => {
      test("build componentBox component which can't be disposed should has no 'x'", () =>
        _buildComponentBoxComponent(
          "newBox",
          false,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test("build disposable componentBox component should has 'x'", () =>
        _buildComponentBoxComponent(
          "newBox",
          true,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
    });

    describe("test workflow", () => {
      let _triggerClickTriangle = domChildren => {
        let headerDiv = _getFromArray(domChildren, 0);
        let triangleDiv = _getFromArray(headerDiv##children, 0);
        BaseEventTool.triggerClickEvent(triangleDiv);
      };

      test("click triangle once to hide content component", () => {
        let component =
          _buildComponentBoxComponent(
            "newBox",
            true,
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          );
        BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
        component |> ReactTestTool.createSnapshotAndMatch;
      });
      test("click triangle twice to show content component", () => {
        let component =
          _buildComponentBoxComponent(
            "newBox",
            true,
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          );
        BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
        BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
        component |> ReactTestTool.createSnapshotAndMatch;
      });
    });
  });