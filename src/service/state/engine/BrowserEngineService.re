open Wonderjs;

open StateDataMainType;

let isPC = ({browserDetectRecord}) =>
  switch (browserDetectRecord.browser) {
  | Chrome
  | Firefox => true
  | _ => false
  };