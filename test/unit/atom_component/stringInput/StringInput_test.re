open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe("StringInput", () => {
    let sandbox = getSandboxDefaultVal();
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
    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test input value", () =>
      test("component can set any string", () => {
        let component =
          ReactTestRenderer.create(
            <StringInput defaultValue="2" label="xyz" />,
          );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerChangeInputEvent("hello world"),
        );
        BaseEventTool.triggerComponentEvent(
          component,
          _triggerChangeInputEvent("351687.5445456654"),
        );
        component |> ReactTestTool.createSnapshotAndMatch;
      })
    );
    describe("test trigger event", () => {
      describe("test onChange", () =>
        test("exec onChange handle on change event", () => {
          let value = ref("");
          let str = "-2313";
          let onChange = str => value := str;
          let component =
            ReactTestRenderer.create(
              <StringInput defaultValue="22" label="xyz" onChange />,
            );

          BaseEventTool.triggerComponentEvent(
            component,
            _triggerChangeInputEvent(str),
          );

          value^ |> expect == str;
        })
      );
      describe("test onBlur", () =>
        test("exec onBlur handle on change event", () => {
          let value = ref("");
          let str = "I am the content";
          let onBlur = str => value := str;
          let component =
            ReactTestRenderer.create(
              <StringInput defaultValue="22" label="xyz" onBlur />,
            );

          BaseEventTool.triggerComponentEvent(
            component,
            _triggerChangeInputEvent(str),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            _triggerBlurEvent(str),
          );

          value^ |> expect == str;
        })
      );
    });

    describe("deal with specific case", () => {
      test(
        "if canBeNull == true, key in '', trigger onBlur, the input value should be ''",
        () => {
          let value = ref("");
          let str = "";
          let onBlur = str => value := str;
          let component =
            ReactTestRenderer.create(
              <StringInput defaultValue="I am content" label="xyz" onBlur />,
            );

          BaseEventTool.triggerComponentEvent(
            component,
            _triggerChangeInputEvent(str),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            _triggerBlurEvent(str),
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
      test(
        "if canBeNull == false, key in '', trigger onBlur, the input value should be original name",
        () => {
          let value = ref("");
          let str = "";
          let onBlur = str => value := str;
          let component =
            ReactTestRenderer.create(
              <StringInput
                defaultValue="I am content"
                label="xyz"
                onBlur
                canBeNull=false
              />,
            );

          BaseEventTool.triggerComponentEvent(
            component,
            _triggerChangeInputEvent(str),
          );
          BaseEventTool.triggerComponentEvent(
            component,
            _triggerBlurEvent(str),
          );

          component |> ReactTestTool.createSnapshotAndMatch;
        },
      );
    });
  });