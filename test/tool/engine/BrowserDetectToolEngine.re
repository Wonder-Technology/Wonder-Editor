open Wonderjs;

open BrowserDetectType;

let setChrome = () => {
  let state = StateEngineService.unsafeGetState();
  let state = {
    ...state,
    browserDetectRecord: {
      browser: Chrome,
    },
  };

  StateEngineService.setState(state) |> ignore;
};

/* let setFirefox = () => {
     let state = MainStateTool.unsafeGetState();
     let state = {
       ...state,
       browserDetectRecord: {
         browser: Firefox,
       },
     };
     MainStateTool.setState(state);
   };

   let setAndroid = () => {
     let state = MainStateTool.unsafeGetState();
     let state = {
       ...state,
       browserDetectRecord: {
         browser: Android,
       },
     };
     MainStateTool.setState(state);
   };

   let setIOS = () => {
     let state = MainStateTool.unsafeGetState();
     let state = {
       ...state,
       browserDetectRecord: {
         browser: IOS,
       },
     };
     MainStateTool.setState(state);
   };

   let setUnknown = () => {
     let state = MainStateTool.unsafeGetState();
     let state = {
       ...state,
       browserDetectRecord: {
         browser: Unknown,
       },
     };
     MainStateTool.setState(state);
   }; */