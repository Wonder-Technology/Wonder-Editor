open Jest;

let _ =
  describe(
    "expect",
    () => {
      open Expect;
      open! Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      beforeAll(() => sandbox := createSandbox());
      afterAll(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "expect",
        () => {
          test("tobe1", () => expect(1 + 2) |> toBe(3));
          test("tobe2", () => expect(1 + 213) == 214)
        }
      )
    }
  );