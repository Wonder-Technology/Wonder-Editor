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
      /* TODO change to log */
        ReactTestRenderer.create(
          <Switch
            openText="run"
            openFunc=(() => WonderLog.Log.print("start run") |> ignore)
            closeText="stop"
            closeFunc=(() => WonderLog.Log.print("start stop") |> ignore)
            initState=false
          />
        );
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test workflow",
        () => {
          describe(
          /* TODO rename to "test initial: is close" */
            "if initState == false",
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
            /* TODO rename to "click button to open" */
            "click button",
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
      )
    }
  );