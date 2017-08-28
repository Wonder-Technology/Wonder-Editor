import { Map } from "immutable";
export declare const getState: () => Map<any, any>;
export declare const setState: (state: Map<any, any>) => void;
export declare const createState: () => Map<{}, {}>;
export declare const saveLoop: (name: string, state: Map<any, any>, loop: any) => Map<any, any>;
export declare const initEditor: (state: Map<any, any>) => Map<any, any>;
export declare const initContainer: () => void;
export declare const loopBody: (state: Map<any, any>, time: number) => Map<any, any>;
