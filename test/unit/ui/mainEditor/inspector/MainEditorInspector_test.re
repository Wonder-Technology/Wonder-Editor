open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

external toObject : ReactTestRenderer.t => Js.t({..}) = "%identity";

let _ =
  describe(
    "MainEditorInspector ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          test(
            "if hasn't currentGameObject, show nothing",
            () => {
              TestToolUI.initMainEditor(sandbox);
              let component =
                ReactTestRenderer.create(
                  <MainEditorInspector
                    store=(TestToolUI.buildEmptyAppState())
                    dispatch=(TestToolUI.getDispatch())
                    allComponents=(InspectorToolUI.buildFakeGameObjectComponentRecord())
                  />
                );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "else, should show transform component of it",
            () => {
              TestToolUI.initMainEditor(sandbox);
              MainEditorSceneToolEditor.recombineSceneChildrenAndSetBoxIsCurrentGameObject();
              let component =
                ReactTestRenderer.create(
                  <MainEditorInspector
                    store=(TestToolUI.buildEmptyAppState())
                    dispatch=(TestToolUI.getDispatch())
                    allComponents=(InspectorToolUI.buildFakeGameObjectComponentRecord())
                  />
                );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          test(
            "test if the gameObject is camera",
            () => {
              TestToolUI.initMainEditor(sandbox);
              MainEditorSceneToolEditor.recombineSceneChildrenAndSetCameraIsCurrentGameObject();
              let component =
                ReactTestRenderer.create(
                  <MainEditorInspector
                    store=(TestToolUI.buildEmptyAppState())
                    dispatch=(TestToolUI.getDispatch())
                    allComponents=(InspectorToolUI.buildFakeSpecificGameObjectComponentRecord())
                  />
                );
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          describe(
            "deal with specific case",
            () =>
              test(
                "if the component isn't defined in gameObject_inspector_show_component file, should hide in inspector",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEditor.recombineSceneChildrenAndSetBoxIsCurrentGameObject();
                  let component =
                    ReactTestRenderer.create(
                      <MainEditorInspector
                        store=(TestToolUI.buildEmptyAppState())
                        dispatch=(TestToolUI.getDispatch())
                        allComponents=(
                          InspectorToolUI.buildFakeSpecificGameObjectComponentRecord()
                        )
                      />
                    );
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              )
          )
        }
      )
    }
  );