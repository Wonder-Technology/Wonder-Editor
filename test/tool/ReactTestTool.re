open Wonder_jest;

open Expect;

let createSnapshotJsonStringify = (component) => ReactTestRenderer.toJSON(component) |> Js.Json.stringify;

let createSnapshot = (component) => expect(ReactTestRenderer.toJSON(component));