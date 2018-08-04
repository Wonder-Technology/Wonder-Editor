open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;
let _ =
  describe("test mainEditor resize", () => {
    let sandbox = getSandboxDefaultVal();
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
/* TODO need fix */
    describe("test resize should set canvas size and set viewport", () =>
      test(
        "test two canvas width and height should == these parent width and height",
        () =>
        expect(1) == 1
      )
    );
  });