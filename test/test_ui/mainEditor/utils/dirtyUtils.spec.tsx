import * as React from "react";
import * as sinon from "sinon";
import {isDirty, markDirty, markNotDirty} from "../../../../src/editor/mainEditor/utils/dirtyUtils";

describe("dirtyUtil", () => {
    var fakeUIComponent,
        sandbox;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        fakeUIComponent = {
            _state:null,
            state:()=>{
                return fakeUIComponent._state;
            },
            setState:(newState:any)=>{
                console.log(1,this)
                fakeUIComponent._state = newState;

                for(let item in newState){
                    fakeUIComponent[item] = newState[item];
                }
            }
        }
    });
    afterEach(()=>{
        sandbox.restore();
    });
    it("refresh ui component when call markDirty function", function(){
        markDirty(fakeUIComponent);

        expect(fakeUIComponent.state().isChange).toBeTruthy();
    });
    it("markNotDirty will called when componentWillMount and componentDidUpdate method called", function(){
        markNotDirty(fakeUIComponent);

        expect(fakeUIComponent.state().isChange).toBeFalsy();
    });
    it("isDirty is false when call markNotDirty", function(){
        markNotDirty(fakeUIComponent);

        expect(isDirty(fakeUIComponent)).toBeFalsy();
    });
    it("isDirty is false when call markDirty", function(){
        markDirty(fakeUIComponent);

        expect(isDirty(fakeUIComponent)).toBeTruthy();
    });
});
