open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "Swicth ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _triggerClickSwitch = (domChildren) => {
        let btn = WonderCommonlib.ArrayService.unsafeGet(domChildren, 0);
        BaseEventTool.triggerClickEvent(btn)
      };
      let buildSwitch = () =>
        ReactTestRenderer.create(
          <Switch
            openText="run"
            openFunc=(() => WonderLog.Log.log("start run") |> ignore)
            closeText="stop"
            closeFunc=(() => WonderLog.Log.log("start stop") |> ignore)
            isOpen=false
          />
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test workflow",
        () => {
          describe(
            "test initial:is close",
            () => {
              test("show openText", () => buildSwitch() |> ReactTestTool.createSnapshotAndMatch);
              test(
                "click button should execute openFunc",
                () => {
                  let log = createMethodStubWithJsObjSandbox(sandbox, Console.console, "log");
                  let component = buildSwitch();
                  BaseEventTool.triggerComponentEvent(component, _triggerClickSwitch);
                  LogTool.getMessage(log) |> expect |> toContain("start run")
                }
              )
            }
          );
          describe(
            "click button to open",
            () => {
              test(
                "show closeText",
                () => {
                  let component = buildSwitch();
                  BaseEventTool.triggerComponentEvent(component, _triggerClickSwitch);
                  component |> ReactTestTool.createSnapshotAndMatch
                }
              );
              test(
                "click button should execute closeFunc",
                () => {
                  let component = buildSwitch();
                  BaseEventTool.triggerComponentEvent(component, _triggerClickSwitch);
                  let log = createMethodStubWithJsObjSandbox(sandbox, Console.console, "log");
                  BaseEventTool.triggerComponentEvent(component, _triggerClickSwitch);
                  LogTool.getMessage(log) |> expect |> toContain("start stop")
                }
              )
            }
          )
        }
      );
    }
  );