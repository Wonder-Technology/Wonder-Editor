import {FETCH_USER} from "../action/Action";
import "rxjs/add/operator/mergeMap";
import {ajax} from "rxjs/observable/dom/ajax";

const fetchUserEpic = action$ =>
        action$.ofType(FETCH_USER).mergeMap(action => ajax.getJSON(`https://api.github.com/users/${action.payload}`).map())
