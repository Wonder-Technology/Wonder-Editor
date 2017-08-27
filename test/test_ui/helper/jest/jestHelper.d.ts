declare namespace jasmine {
    interface Matchers<T> {
        toCalledWith: Function;
        toCalled: Function;
        toCalledOnce: Function;
        toCalledTwice:Function;
        toCalledThrice:Function;
        toCalledBefore:Function;
        toCalledAfter:Function;
    }
}
