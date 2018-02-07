open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

let _ =
  describe(
    "MainEditorInspector ui component",
    () => {
      let sandbox = getSandboxDefaultVal();
      let _buildInspectorComponent = (allShowComponentConfig) =>
        ReactTestRenderer.create(
          <MainEditorInspector
            store=(TestToolUI.buildEmptyAppState())
            dispatch=(TestToolUI.getDispatch())
            allShowComponentConfig
          />
        );
      beforeEach(
        () => {
          sandbox := createSandbox();
          TestToolEngine.prepare(sandbox);
          TestToolUI.initMainEditor(sandbox)
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "test snapshot",
        () => {
          test(
            "if hasn't currentGameObject, show nothing",
            () => {
              let component =
                _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
              let json = ReactTestRenderer.toJSON(component);
              toMatchSnapshot(expect(json))
            }
          );
          describe(
            "esle",
            () => {
              test(
                "if currentGameObject is camera, should show transform and cameraController",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEditor.prepareDefaultScene(
                    MainEditorSceneToolEditor.setCameraTobeCurrentGameObject
                  );
                  let component =
                    _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              );
              test(
                "else if currentGameObject is box, should show transform and material",
                () => {
                  TestToolUI.initMainEditor(sandbox);
                  MainEditorSceneToolEditor.prepareDefaultScene(
                    MainEditorSceneToolEditor.setFirstBoxTobeCurrentGameObject
                  );
                  let component =
                    _buildInspectorComponent(InspectorToolUI.buildFakeAllShowComponentConfig());
                  let json = ReactTestRenderer.toJSON(component);
                  toMatchSnapshot(expect(json))
                }
              )
            }
          );
          describe(
            "deal with specific case",
            () =>
              /* test(
                   "test if the current gameObject is camera, should show transform and cameraController component",
                   () => {
                     MainEditorSceneToolEditor.recombineSceneChildrenAndSetCameraIsCurrentGameObject
                       ();
                     let component =
                       ReactTestRenderer.create(
                         <MainEditorInspector
                           store=(TestToolUI.buildEmptyAppState())
                           dispatch=(TestToolUI.getDispatch())
                           allShowComponentsConfig=(
                             InspectorToolUI.buildFakeSpecificGameObjectComponentRecord()
                           )
                         />
                       );
                     let json = ReactTestRenderer.toJSON(component);
                     toMatchSnapshot(expect(json))
                   }
                 );
                 test(
                   "test if the gameObject is box, should show transform and material component",
                   () => {
                     MainEditorSceneToolEditor.recombineSceneChildrenAndSetBoxIsCurrentGameObject();
                     let component =
                       ReactTestRenderer.create(
                         <MainEditorInspector
                           store=(TestToolUI.buildEmptyAppState())
                           dispatch=(TestToolUI.getDispatch())
                           allShowComponentsConfig=(
                             InspectorToolUI.buildFakeSpecificGameObjectComponentRecord()
                           )
                         />
                       );
                     let json = ReactTestRenderer.toJSON(component);
                     toMatchSnapshot(expect(json))
                   }
                 ); */
              test(
                "test if specific component not exist, should throw error",
                () =>
                  expect(
                    () =>
                      InspectorToolUI.buildComponentUIComponent(
                        ("SceneTree", 0),
                        (TestToolUI.buildEmptyAppState(), TestToolUI.getDispatch())
                      )
                  )
                  |> toThrowMessage("the component: SceneTree not exist")
              )
          )
        }
      )
    }
  );