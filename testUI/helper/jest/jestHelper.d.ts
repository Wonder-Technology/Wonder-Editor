interface Matchers<T> {
//
//     new (env: Env, actual: T, spec: Env, isNot?: boolean): any;
//
// env: Env;
// actual: T;
// spec: Env;
// isNot?: boolean;
// message(): any;
//
// /**
//  *
//  * @param expected the actual value to be === to the expected value.
//  * @param expectationFailOutput
//  * @returns {}
//  */
// toBe(expected: Expected<T>, expectationFailOutput?: any): boolean;
//
// /**
//  *
//  * @param expected the actual value to be equal to the expected, using deep equality comparison.
//  * @param expectationFailOutput
//  * @returns {}
//  */
// toEqual(expected: Expected<T>, expectationFailOutput?: any): boolean;
// toMatch(expected: string | RegExp, expectationFailOutput?: any): boolean;
// toBeDefined(expectationFailOutput?: any): boolean;
// toBeUndefined(expectationFailOutput?: any): boolean;
// toBeNull(expectationFailOutput?: any): boolean;
// toBeNaN(): boolean;
// toBeTruthy(expectationFailOutput?: any): boolean;
// toBeFalsy(expectationFailOutput?: any): boolean;
// toHaveBeenCalled(): boolean;
// toHaveBeenCalledWith(...params: any[]): boolean;
// toHaveBeenCalledTimes(expected: number): boolean;
// toContain(expected: any, expectationFailOutput?: any): boolean;
// toBeLessThan(expected: number, expectationFailOutput?: any): boolean;
// toBeLessThanOrEqual(expected: number, expectationFailOutput?: any): boolean;
// toBeGreaterThan(expected: number, expectationFailOutput?: any): boolean;
// toBeGreaterThanOrEqual(expected: number, expectationFailOutput?: any): boolean;
// toBeCloseTo(expected: number, precision?: any, expectationFailOutput?: any): boolean;
// toThrow(expected?: any): boolean;
// toThrowError(message?: string | RegExp): boolean;
// toThrowError(expected?: new (...args: any[]) => Error, message?: string | RegExp): boolean;
// not: Matchers<T>;
//
// Any: Any;

    toCalledWith:Function;
}
