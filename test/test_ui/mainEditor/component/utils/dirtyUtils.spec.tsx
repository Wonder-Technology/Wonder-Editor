import * as React from "react";
import * as sinon from "sinon";
import {isDirty, markDirty, markNotDirty} from "../../../../../src/editor/mainEditor/component/utils/ui/dirtyUtils";

describe("dirtyUtil", () => {
    var fakeUIComponent,
        sandbox;

    beforeEach(()=>{
        sandbox = sinon.sandbox.create();

        fakeUIComponent = {
            setState:(newState:any)=>{
                for(let item in newState){
                    fakeUIComponent[item] = newState[item];
                }
            }
        }
    });
    afterEach(()=>{
        sandbox.restore();
    });

    describe("markDirty", function(){
        it("refresh ui component", function(){
            markDirty(fakeUIComponent);

            expect(fakeUIComponent.isChange).toBeTruthy();
        });
    });

    describe("markNotDirty", function(){
        it("mark that not refresh ui component", function(){
            markNotDirty(fakeUIComponent);

            expect(fakeUIComponent.isChange).toBeFalsy();
        });
    });

    describe("isDirty", function(){
        it("return false after invoke markNotDirty", function(){
            markNotDirty(fakeUIComponent);

            expect(isDirty(fakeUIComponent)).toBeFalsy();
        });
        it("return true after invoke markDirty", function(){
            markDirty(fakeUIComponent);

            expect(isDirty(fakeUIComponent)).toBeTruthy();
        });
    });
});
