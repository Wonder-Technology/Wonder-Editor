
open Wonder_jest;

open Expect;

open Expect.Operators;

open Sinon;

/* open Header; */

/* open Js.Promise; */

let _ =
  describe("Header Setting", () => {
    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();

      MainEditorSceneTool.initState(~sandbox, ());
      MainEditorSceneTool.prepareScene(sandbox);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));


    describe
    ("test Scene",
    (
    () => {
        describe
        ("test ambient light",
        (
        () => {

      test("test change color should set into engine", () => {
        let newColor = PickColorTool.buildColor1();

        HeaderSettingTool.Scene.Ambient.changeColor(newColor);

        SceneEngineService.getAmbientLightColor
        |> StateLogicService.getEngineStateToGetData
        |> Color.getHexString
        |> expect == newColor##hex;
      });


        
        })
        );

        /* describe
        ("test skybox",
        (
        () => {
        
        })
        ); */
    
    })
    );
})