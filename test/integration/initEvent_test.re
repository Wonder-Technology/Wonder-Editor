/* TODO need finish */


/* open Wonder_jest;
open Expect;
open Expect.Operators;
open Sinon;
let _ =
describe(
"init event",
() => {
let sandbox = getSandboxDefaultVal();
beforeEach(()=>{
sandbox := createSandbox();

});
afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

/* TODO controller add one case */

describe(
"bind canvas dom event",
() => {
describe(
"bind mouse event",
() => {

describe(
"bind click event",
() => {

test(
"test bind",
() => {
/* TODO
prepare: 
build canvas dom

append to body


exec init event logic 




restore: remove canvas from body
*/



            let value = ref(0);

            let state =
             Wonderjs.ManageEventAPI.onMouseEvent(
                Click,
                0,
                (. event, state) => {
                  value := 1;
                  state;
                },
                state,
              );
              set state to stateData
            /* let state = MainStateTool.setState(state); */
            EventTool.triggerDomEvent(
              {j|click|j},
/* Click, */
canvas dom,
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;




 }
);

/* test(
"test unbind",
() => {

 }
); */


 }
);


 }
);
 }
);
 }
); */