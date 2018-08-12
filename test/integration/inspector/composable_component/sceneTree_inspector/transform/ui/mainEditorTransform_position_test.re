open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform;

let _ =
  describe("MainEditorTransform position", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    MainEditorTransformBaseTestTool.transformBaseTest(
      sandbox,
      "test change position value",
      (0., TransformUtils.getTransformPositionData),
      (
        TransformEventTool.triggerChangePositionX,
        TransformEventTool.triggerChangePositionY,
        TransformEventTool.triggerChangePositionZ,
      ),
    );
  });