open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;

let _ =
  describe("MouseEventService", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("getMovementDeltaWhenPointerLockedAndFixBug", () =>
      describe("replace exception movement delta to zero data", () => {
        test("if movementX > 500, return zero", () =>
          MouseEventService.getMovementDeltaWhenPointerLockedAndFixBug(
            MouseEventTool.buildMouseDomEvent(
              ~movementX=501,
              ~movementY=1,
              (),
            ),
          )
          |> expect == (0, 0)
        );
        test("if movementY > 500, return zero", () =>
          MouseEventService.getMovementDeltaWhenPointerLockedAndFixBug(
            MouseEventTool.buildMouseDomEvent(
              ~movementX=1,
              ~movementY=501,
              (),
            ),
          )
          |> expect == (0, 0)
        );
        test("else, return data", () =>
          MouseEventService.getMovementDeltaWhenPointerLockedAndFixBug(
            MouseEventTool.buildMouseDomEvent(~movementX=1, ~movementY=2, ()),
          )
          |> expect == (1, 2)
        );
      })
    );
  });