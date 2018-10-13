open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("Swicth", () => {
    let sandbox = getSandboxDefaultVal();

    let buildSwitch = isOpen =>
      ReactTestRenderer.create(
        <Switch
          openText="run"
          openFunc=(() => ())
          closeText="stop"
          closeFunc=(() => ())
          isOpen
        />,
      );

    beforeEach(() => {
      sandbox := createSandbox();
      WonderLog.Wonder_Console.makeObjInToWindow();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test workflow", () => {
      describe("test initial:is close", () => {
        test("show openText", () =>
          buildSwitch(false) |> ReactTestTool.createSnapshotAndMatch
        );
        test("click button should execute onOpen func", () => {
          open Switch;

          let state = {isOpen: false};

          let onCloseFunc = createEmptyStubWithJsObjSandbox(sandbox);
          let onOpenFunc = createEmptyStubWithJsObjSandbox(sandbox);

          let state =
            Switch.reducer(onOpenFunc, onCloseFunc, ChangeState, state)
            |> ReactTool.getUpdateState;

          (onOpenFunc |> getCallCount, state.isOpen) |> expect == (1, true);
        });
      });

      describe("test initial:is open", () => {
        test("show openText", () =>
          buildSwitch(true) |> ReactTestTool.createSnapshotAndMatch
        );
        test("click button should execute onClose func", () => {
          open Switch;

          let state = {isOpen: true};

          let onCloseFunc = createEmptyStubWithJsObjSandbox(sandbox);
          let onOpenFunc = createEmptyStubWithJsObjSandbox(sandbox);

          let state =
            Switch.reducer(onOpenFunc, onCloseFunc, ChangeState, state)
            |> ReactTool.getUpdateState;

          (onCloseFunc |> getCallCount, state.isOpen) |> expect == (1, false);
        });
      });
    });
  });