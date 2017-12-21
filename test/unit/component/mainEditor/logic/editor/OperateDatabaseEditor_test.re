open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Operate database",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeAll(() => sandbox := createSandbox());
      afterAll(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test("test 1", () => expect(1) == 1)
    }
  );