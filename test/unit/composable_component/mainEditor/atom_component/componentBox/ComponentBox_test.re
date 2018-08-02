open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("componentBox", () => {
    let _buildComponentBoxComponent = (header, isClosable, gameObject) =>
      ReactTestRenderer.create(
        <ComponentBox
          reduxTuple=(TestTool.buildEmptyAppState(), TestTool.getDispatch())
          header
          isClosable
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
      test("create can't close componentBox component", () =>
        _buildComponentBoxComponent(
          "newBox",
          false,
          GameObjectTool.unsafeGetCurrentSceneTreeNode(),
        )
        |> ReactTestTool.createSnapshotAndMatch
      );
      test("create closable componentBox component", () =>
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
      test("click once triangle to hide content component", () => {
        let component =
          _buildComponentBoxComponent(
            "newBox",
            true,
            GameObjectTool.unsafeGetCurrentSceneTreeNode(),
          );
        BaseEventTool.triggerComponentEvent(component, _triggerClickTriangle);
        component |> ReactTestTool.createSnapshotAndMatch;
      });
      test("click twice triangle to show content component", () => {
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