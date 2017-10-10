declare namespace jest {
    interface Matchers<R> {
        toCalledWith: Function;
        toCalled: Function;
        toCalledOnce: Function;
        toCalledTwice:Function;
        toCalledThrice:Function;
        toCalledBefore:Function;
        toCalledAfter:Function;
        toBeNumber:any;
    }
}
