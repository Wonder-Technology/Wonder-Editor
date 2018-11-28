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

    MainEditorTransformTestTool.transformBaseTest(
      sandbox,
      "test change position value",
      (0., TransformUtils.getTransformPositionData),
      (
        MainEditorTransformTool.changePositionX,
        MainEditorTransformTool.changePositionY,
        MainEditorTransformTool.changePositionZ,
      ),
    );
  });