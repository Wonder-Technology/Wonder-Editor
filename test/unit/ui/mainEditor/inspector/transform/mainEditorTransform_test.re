open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform.Method;

let buildMainEditorComponent = (sandbox) =>
  ReactTestRenderer.create(
    <MainEditorTransform
      store=(TestToolUI.buildFakeAppState())
      dispatch=(TestToolUI.getDispatch())
    />
  );

let _ =
  describe(
    "mainEditor transform component",
    (_) => {
      let sandbox = getSandboxDefaultVal();
      let component =
        beforeEach(
          () => {
            sandbox := createSandbox();
            TestToolEngine.prepare(sandbox)
          }
        );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "create mainEditor transform snapshot",
        (_) => {
          TestToolUI.initMainEditor(sandbox);
          let component = buildMainEditorComponent(sandbox);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      describe(
        "changeX should set current gameObject local position",
        () => {
          let changeXEvent = (value, domChildren) => {
            let xDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
            let xInput = WonderCommonlib.ArraySystem.unsafeGet(xDiv##children, 1);
            TestToolUI.execChangeEvent(xInput, value)
          };
          test(
            "create snap shot, set ui x floatInput value",
            (_) => {
              let value = "-10.1213";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeXEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "set engine value, value should within 6 decimal",
            (_) => {
              let value = "-16.1213";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeXEvent(value));
              let (xFromEngine, _, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(xFromEngine) == value
            }
          );
          test(
            "if value greater than 6, the x from engine should == last value",
            (_) => {
              let value = "-1.1213123";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeXEvent(value));
              let (xFromEngine, _, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(xFromEngine) == "-16.1213"
            }
          )
        }
      );
      describe(
        "changeY should set current gameObject local position",
        () => {
          let changeYEvent = (value, domChildren) => {
            let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
            let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
            TestToolUI.execChangeEvent(yInput, value)
          };
          test(
            "create snap shot, set ui y floatInput value",
            (_) => {
              let value = "25.216";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeYEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "set engine value, value should within 6 decimal",
            (_) => {
              let value = "-11.11111";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeYEvent(value));
              let (_, yFromEngine, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(yFromEngine) == value
            }
          );
          test(
            "if value greater than 6, the y from engine should == last value",
            (_) => {
              let value = "-14.6613123";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeYEvent(value));
              let (_, yFromEngine, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(yFromEngine) == "-11.11111"
            }
          )
        }
      );
      describe(
        "changeZ should set current gameObject local position",
        () => {
          let changeZEvent = (value, domChildren) => {
            let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
            let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
            TestToolUI.execChangeEvent(zInput, value)
          };
          test(
            "create snap shot, set ui z floatInput value",
            (_) => {
              let value = "155.2164";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeZEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "set engine value, value should within 6 decimal",
            (_) => {
              let value = "-9.34";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeZEvent(value));
              let (_, _, zFromEngine) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(zFromEngine) == value
            }
          );
          test(
            "if value greater than 6, the z from engine should == last value",
            (_) => {
              let value = "-12.6613123";
              let component = buildMainEditorComponent(sandbox);
              TestToolUI.execComponentEvent(component, changeZEvent(value));
              let (_, _, zFromEngine) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(zFromEngine) == "-9.34"
            }
          )
        }
      )
    }
  );