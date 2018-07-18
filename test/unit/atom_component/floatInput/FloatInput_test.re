open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("FloatInput", () => {
    let _triggerChangeInputEvent = (value, domChildren) => {
      let input = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
      BaseEventTool.triggerChangeEvent(
        input,
        BaseEventTool.buildFormEvent(value),
      );
    };
    let _triggerBlurEvent = (value, domChildren) => {
      let input = WonderCommonlib.ArrayService.unsafeGet(domChildren, 1);
      BaseEventTool.triggerBlurEvent(
        input,
        BaseEventTool.buildFormEvent(value),
      );
    };
    describe("test FloatInput component set float value", () => {
      test("if float value's decimal digits <= 6, can set the whole value", () => {
        let component =
          ReactTestRenderer.create(
            <FloatInput defaultValue="2" label="xyz" />,
          );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerChangeInputEvent("351687.54654"),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerBlurEvent("351687.54654"),
        );
        component |> ReactTestTool.createSnapshotAndMatch;
      });
      test("else, can't set the value", () => {
        let component =
          ReactTestRenderer.create(
            <FloatInput defaultValue="0" label="xyz" />,
          );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerChangeInputEvent("3.524584654"),
        );
        component |> ReactTestTool.createSnapshotAndMatch;
      });
    });
    describe("deal with the specific case", () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(() => sandbox := createSandbox());
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test("key in value '', shouldn't trigger event", () => {
        let onChange = createEmptyStubWithJsObjSandbox(sandbox);
        let onBlur = createEmptyStubWithJsObjSandbox(sandbox);
        let component =
          ReactTestRenderer.create(
            <FloatInput defaultValue="22" label="xyz" onChange onBlur />,
          );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerChangeInputEvent(""),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerBlurEvent(""),
        );
        onChange |> expect |> not_ |> toCalled;
      });
      test("key in value '-', shouldn't trigger event", () => {
        let onChange = createEmptyStubWithJsObjSandbox(sandbox);
        let onBlur = createEmptyStubWithJsObjSandbox(sandbox);
        let component =
          ReactTestRenderer.create(
            <FloatInput defaultValue="22" label="xyz" onChange onBlur />,
          );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerChangeInputEvent("-"),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerBlurEvent("-"),
        );
        onChange |> expect |> not_ |> toCalled;
      });
    });
  });