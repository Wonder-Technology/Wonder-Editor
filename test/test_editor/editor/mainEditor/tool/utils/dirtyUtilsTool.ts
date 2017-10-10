export const buildFakeReactComponentForJudgeDirty = () => {
    var fakeReactComponent = {
        setState:function (newState) {
            for(let item in newState){
                fakeReactComponent[item] = newState[item];
            }
        }
    };

    return fakeReactComponent;
};

export const judgeInvokeMarkDirty = (fakeReactComponent, expect) =>{
    expect(fakeReactComponent.isChange).toBeTruthy();
};

