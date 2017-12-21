open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

open MainEditorTransform.Method;

let _ =
  describe(
    "MainEditorTransform ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildMainEditorComponent = (sandbox) =>
        ReactTestRenderer.create(
          <MainEditorTransform
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "create mainEditor transform ui component",
        () => {
          TestToolUI.initMainEditor(sandbox);
          let component = _buildMainEditorComponent(sandbox);
          let json = ReactTestRenderer.toJSON(component);
          toMatchSnapshot(expect(json))
        }
      );
      describe(
        "changeX should set current gameObject local position's x",
        () => {
          let changeXEvent = (value, domChildren) => {
            let xDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 0);
            let xInput = WonderCommonlib.ArraySystem.unsafeGet(xDiv##children, 1);
            EventToolUI.triggerChangeEvent(xInput, EventToolUI.buildFormEvent(value))
          };
          test(
            "set x value to floatInput",
            () => {
              let value = "-10.1213";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeXEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "set engine value, value should within 6 decimal",
            () => {
              let value = "-11.11111";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeXEvent(value));
              let (xFromEngine, _, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(xFromEngine) == value
            }
          );
          test(
            "if value greater than 6, the x from engine should == last value",
            () => {
              let value = "-14.6613123";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeXEvent(value));
              let (xFromEngine, _, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(xFromEngine) == "-11.11111"
            }
          )
        }
      );
      describe(
        "changeY should set current gameObject local position's y",
        () => {
          let changeYEvent = (value, domChildren) => {
            let yDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 1);
            let yInput = WonderCommonlib.ArraySystem.unsafeGet(yDiv##children, 1);
            EventToolUI.triggerChangeEvent(yInput, EventToolUI.buildFormEvent(value))
          };
          test(
            "set y value to floatInput",
            () => {
              let value = "25.216";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeYEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "set engine value, value should within 6 decimal",
            () => {
              let value = "-12.546478";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeYEvent(value));
              let (_, yFromEngine, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(yFromEngine) == value
            }
          );
          test(
            "if value greater than 6, the y from engine should == last value",
            () => {
              let value = "-44.6613123";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeYEvent(value));
              let (_, yFromEngine, _) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(yFromEngine) == "-12.546478"
            }
          )
        }
      );
      describe(
        "changeZ should set current gameObject local position's z",
        () => {
          let changeZEvent = (value, domChildren) => {
            let zDiv = WonderCommonlib.ArraySystem.unsafeGet(domChildren, 2);
            let zInput = WonderCommonlib.ArraySystem.unsafeGet(zDiv##children, 1);
            EventToolUI.triggerChangeEvent(zInput, EventToolUI.buildFormEvent(value))
          };
          test(
            "set z value to floatInput",
            () => {
              let value = "155.2164";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeZEvent(value));
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "set engine value, value should within 6 decimal",
            () => {
              let value = "-9.34";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeZEvent(value));
              let (_, _, zFromEngine) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(zFromEngine) == value
            }
          );
          test(
            "if value greater than 6, the z from engine should == last value",
            () => {
              let value = "-12.6613123";
              let component = _buildMainEditorComponent(sandbox);
              EventToolUI.triggerComponentEvent(component, changeZEvent(value));
              let (_, _, zFromEngine) =
                getLocalPosition() |> ArrayTypeUtil.interceptTransformValue;
              expect(zFromEngine) == "-9.34"
            }
          )
        }
      )
    }
  );