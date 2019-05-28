open Wonderjs;

open StateDataMainType;

open BrowserDetectType;

let setChromeFromEngineState = engineState => {
  ...engineState,
  browserDetectRecord: {
    browser: Chrome,
  },
};

let setChrome = () =>
  setChromeFromEngineState |> StateLogicService.getAndSetEngineState;

/* let setFirefox = () => {
     let engineState = MainStateTool.unsafeGetState();
     let engineState = {
       ...engineState,
       browserDetectRecord: {
         browser: Firefox,
       },
     };
     MainStateTool.setState(engineState);
   };

   let setAndroid = () => {
     let engineState = MainStateTool.unsafeGetState();
     let engineState = {
       ...engineState,
       browserDetectRecord: {
         browser: Android,
       },
     };
     MainStateTool.setState(engineState);
   };

   let setIOS = () => {
     let engineState = MainStateTool.unsafeGetState();
     let engineState = {
       ...engineState,
       browserDetectRecord: {
         browser: IOS,
       },
     };
     MainStateTool.setState(engineState);
   };

   let setUnknown = () => {
     let engineState = MainStateTool.unsafeGetState();
     let engineState = {
       ...engineState,
       browserDetectRecord: {
         browser: Unknown,
       },
     };
     MainStateTool.setState(engineState);
   }; */