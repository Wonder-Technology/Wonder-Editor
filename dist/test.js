(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.we = global.we || {})));
}(this, (function (exports) { 'use strict';

var Entity = (function () {
    function Entity() {
        this.uid = Entity._count;
        Entity._count++;
    }
    return Entity;
}());
Entity._count = 1;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var JudgeUtils_1$2 = createCommonjsModule(function (module, exports) {
"use strict";
var JudgeUtils = (function () {
    function JudgeUtils() {
    }
    JudgeUtils.isArray = function (arr) {
        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
        var length = arr && arr.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    JudgeUtils.isArrayExactly = function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    };
    JudgeUtils.isNumber = function (num) {
        return typeof num == "number";
    };
    JudgeUtils.isNumberExactly = function (num) {
        return Object.prototype.toString.call(num) === "[object Number]";
    };
    JudgeUtils.isString = function (str) {
        return typeof str == "string";
    };
    JudgeUtils.isStringExactly = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };
    JudgeUtils.isBoolean = function (bool) {
        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
    };
    JudgeUtils.isDom = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    JudgeUtils.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    /**
     * 判断是否为对象字面量（{}）
     */
    JudgeUtils.isDirectObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
    /**
     * 检查宿主对象是否可调用
     *
     * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
     环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

     该方法用于特性检测，判断对象是否可用。用法如下：

     MyEngine addEvent():
     if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
        dom.addEventListener(sEventType, fnHandler, false);
        }
     */
    JudgeUtils.isHostMethod = function (object, property) {
        var type = typeof object[property];
        return type === "function" ||
            (type === "object" && !!object[property]);
        // || type == "unknown";
    };
    JudgeUtils.isNodeJs = function () {
        return ((typeof commonjsGlobal != "undefined" && commonjsGlobal.module) || ('object' != "undefined")) && 'object' != "undefined";
    };
    //overwrite it in the end of this file
    JudgeUtils.isFunction = function (func) {
        return true;
    };
    return JudgeUtils;
}());
exports.JudgeUtils = JudgeUtils;
// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), and in Safari 8 (#1929).
if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    JudgeUtils.isFunction = function (func) {
        return typeof func == 'function';
    };
}
else {
    JudgeUtils.isFunction = function (func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    };
}

});

var $BREAK = {
    break: true
};
var $REMOVE = void 0;


var Const = {
	$BREAK: $BREAK,
	$REMOVE: $REMOVE
};

var JudgeUtils_1$1 = JudgeUtils_1$2;
var Const_1$1 = Const;
var List = (function () {
    function List() {
        this.children = null;
    }
    List.prototype.getCount = function () {
        return this.children.length;
    };
    List.prototype.hasChild = function (child) {
        var c = null, children = this.children;
        for (var i = 0, len = children.length; i < len; i++) {
            c = children[i];
            if (child.uid && c.uid && child.uid == c.uid) {
                return true;
            }
            else if (child === c) {
                return true;
            }
        }
        return false;
    };
    List.prototype.hasChildWithFunc = function (func) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (func(this.children[i], i)) {
                return true;
            }
        }
        return false;
    };
    List.prototype.getChildren = function () {
        return this.children;
    };
    List.prototype.getChild = function (index) {
        return this.children[index];
    };
    List.prototype.addChild = function (child) {
        this.children.push(child);
        return this;
    };
    List.prototype.addChildren = function (arg) {
        if (JudgeUtils_1$1.JudgeUtils.isArray(arg)) {
            var children = arg;
            this.children = this.children.concat(children);
        }
        else if (arg instanceof List) {
            var children = arg;
            this.children = this.children.concat(children.getChildren());
        }
        else {
            var child = arg;
            this.addChild(child);
        }
        return this;
    };
    //todo test
    List.prototype.setChildren = function (children) {
        this.children = children;
        return this;
    };
    List.prototype.unShiftChild = function (child) {
        this.children.unshift(child);
    };
    List.prototype.removeAllChildren = function () {
        this.children = [];
        return this;
    };
    List.prototype.forEach = function (func, context) {
        this._forEach(this.children, func, context);
        return this;
    };
    //public removeChildAt (index) {
    //    Log.error(index < 0, "序号必须大于等于0");
    //
    //    this.children.splice(index, 1);
    //}
    //
    List.prototype.toArray = function () {
        return this.children;
    };
    List.prototype.copyChildren = function () {
        return this.children.slice(0);
    };
    List.prototype.removeChildHelper = function (arg) {
        var result = null;
        if (JudgeUtils_1$1.JudgeUtils.isFunction(arg)) {
            var func = arg;
            result = this._removeChild(this.children, func);
        }
        else if (arg.uid) {
            result = this._removeChild(this.children, function (e) {
                if (!e.uid) {
                    return false;
                }
                return e.uid === arg.uid;
            });
        }
        else {
            result = this._removeChild(this.children, function (e) {
                return e === arg;
            });
        }
        return result;
    };
    List.prototype._forEach = function (arr, func, context) {
        var scope = context, i = 0, len = arr.length;
        for (i = 0; i < len; i++) {
            if (func.call(scope, arr[i], i) === Const_1$1.$BREAK) {
                break;
            }
        }
    };
    List.prototype._removeChild = function (arr, func) {
        var self = this, removedElementArr = [], remainElementArr = [];
        this._forEach(arr, function (e, index) {
            if (!!func.call(self, e)) {
                removedElementArr.push(e);
            }
            else {
                remainElementArr.push(e);
            }
        });
        this.children = remainElementArr;
        return removedElementArr;
    };
    return List;
}());
var List_2 = List;


var List_1$1 = {
	List: List_2
};

var JudgeUtils_1$4 = JudgeUtils_1$2;
var ExtendUtils = (function () {
    function ExtendUtils() {
    }
    /**
     * 深拷贝
     *
     * 示例：
     * 如果拷贝对象为数组，能够成功拷贝（不拷贝Array原型链上的成员）
     * expect(extend.extendDeep([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]])).toEqual([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);
     *
     * 如果拷贝对象为对象，能够成功拷贝（能拷贝原型链上的成员）
     * var result = null;
     function A() {
            };
     A.prototype.a = 1;

     function B() {
            };
     B.prototype = new A();
     B.prototype.b = { x: 1, y: 1 };
     B.prototype.c = [{ x: 1 }, [2]];

     var t = new B();

     result = extend.extendDeep(t);

     expect(result).toEqual(
     {
         a: 1,
         b: { x: 1, y: 1 },
         c: [{ x: 1 }, [2]]
     });
     * @param parent
     * @param child
     * @returns
     */
    ExtendUtils.extendDeep = function (parent, child, filter) {
        if (filter === void 0) { filter = function (val, i) { return true; }; }
        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
        //数组的话，不获得Array原型上的成员。
        if (toStr.call(parent) === sArr) {
            _child = child || [];
            for (i = 0, len = parent.length; i < len; i++) {
                var member = parent[i];
                if (!filter(member, i)) {
                    continue;
                }
                if (member.clone) {
                    _child[i] = member.clone();
                    continue;
                }
                type = toStr.call(member);
                if (type === sArr || type === sOb) {
                    _child[i] = type === sArr ? [] : {};
                    ExtendUtils.extendDeep(member, _child[i]);
                }
                else {
                    _child[i] = member;
                }
            }
        }
        else if (toStr.call(parent) === sOb) {
            _child = child || {};
            for (i in parent) {
                var member = parent[i];
                if (!filter(member, i)) {
                    continue;
                }
                if (member.clone) {
                    _child[i] = member.clone();
                    continue;
                }
                type = toStr.call(member);
                if (type === sArr || type === sOb) {
                    _child[i] = type === sArr ? [] : {};
                    ExtendUtils.extendDeep(member, _child[i]);
                }
                else {
                    _child[i] = member;
                }
            }
        }
        else {
            _child = parent;
        }
        return _child;
    };
    /**
     * 浅拷贝
     */
    ExtendUtils.extend = function (destination, source) {
        var property = "";
        for (property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
        return destination;
    };
    ExtendUtils.assign = function (source, target) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                if (target[property] === void 0 || target[property] === null) {
                    target[property] = source[property];
                }
            }
        }
        return target;
    };
    ExtendUtils.copyPublicAttri = function (source) {
        var property = null, destination = {};
        this.extendDeep(source, destination, function (item, property) {
            return property.slice(0, 1) !== "_"
                && !JudgeUtils_1$4.JudgeUtils.isFunction(item);
        });
        return destination;
    };
    return ExtendUtils;
}());
var ExtendUtils_2 = ExtendUtils;


var ExtendUtils_1$1 = {
	ExtendUtils: ExtendUtils_2
};

var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var List_1 = List_1$1;
var JudgeUtils_1 = JudgeUtils_1$2;
var ExtendUtils_1 = ExtendUtils_1$1;
var Const_1 = Const;
var Collection = (function (_super) {
    __extends$3(Collection, _super);
    function Collection(children) {
        if (children === void 0) { children = []; }
        _super.call(this);
        this.children = children;
    }
    Collection.create = function (children) {
        if (children === void 0) { children = []; }
        var obj = new this(children);
        return obj;
    };
    Collection.prototype.clone = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var target = null, isDeep = null;
        if (args.length === 0) {
            isDeep = false;
            target = Collection.create();
        }
        else if (args.length === 1) {
            if (JudgeUtils_1.JudgeUtils.isBoolean(args[0])) {
                target = Collection.create();
                isDeep = args[0];
            }
            else {
                target = args[0];
                isDeep = false;
            }
        }
        else {
            target = args[0];
            isDeep = args[1];
        }
        if (isDeep === true) {
            target.setChildren(ExtendUtils_1.ExtendUtils.extendDeep(this.children));
        }
        else {
            target.setChildren(ExtendUtils_1.ExtendUtils.extend([], this.children));
        }
        return target;
    };
    Collection.prototype.filter = function (func) {
        var children = this.children, result = [], value = null;
        for (var i = 0, len = children.length; i < len; i++) {
            value = children[i];
            if (func.call(children, value, i)) {
                result.push(value);
            }
        }
        return Collection.create(result);
    };
    Collection.prototype.findOne = function (func) {
        var scope = this.children, result = null;
        this.forEach(function (value, index) {
            if (!func.call(scope, value, index)) {
                return;
            }
            result = value;
            return Const_1.$BREAK;
        });
        return result;
    };
    Collection.prototype.reverse = function () {
        return Collection.create(this.copyChildren().reverse());
    };
    Collection.prototype.removeChild = function (arg) {
        return Collection.create(this.removeChildHelper(arg));
    };
    Collection.prototype.sort = function (func, isSortSelf) {
        if (isSortSelf === void 0) { isSortSelf = false; }
        if (isSortSelf) {
            this.children.sort(func);
            return this;
        }
        return Collection.create(this.copyChildren().sort(func));
    };
    Collection.prototype.map = function (func) {
        var resultArr = [];
        this.forEach(function (e, index) {
            var result = func(e, index);
            if (result !== Const_1.$REMOVE) {
                resultArr.push(result);
            }
            //e && e[handlerName] && e[handlerName].apply(context || e, valueArr);
        });
        return Collection.create(resultArr);
    };
    Collection.prototype.removeRepeatItems = function () {
        var noRepeatList = Collection.create();
        this.forEach(function (item) {
            if (noRepeatList.hasChild(item)) {
                return;
            }
            noRepeatList.addChild(item);
        });
        return noRepeatList;
    };
    Collection.prototype.hasRepeatItems = function () {
        var noRepeatList = Collection.create(), hasRepeat = false;
        this.forEach(function (item) {
            if (noRepeatList.hasChild(item)) {
                hasRepeat = true;
                return Const_1.$BREAK;
            }
            noRepeatList.addChild(item);
        });
        return hasRepeat;
    };
    return Collection;
}(List_1.List));
var Collection_2 = Collection;


var Collection_1 = {
	Collection: Collection_2
};

var Util = (function () {
    function Util() {
    }
    Util.isArray = function (target) {
        return {}.toString.call(target).slice(8, -1).toLowerCase() == "array";
    };
    Util.ajax = function (config) {
        var url = config.url;
        var success = config.success;
        var error = config.error;
        var data = config.data;
        var type = config.data == void 0 ? "GET" : config.data;
        var xhr = this._createAjax(error);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (success !== null) {
                    success(xhr.responseText);
                }
            }
            else {
                if (this.error !== void 0) {
                    this.error("出错了");
                }
            }
        };
        xhr.open(type, url, true);
        xhr.send(null);
    };
    Util._createAjax = function (error) {
        var xhr = null;
        try {
            xhr = new ActiveXObject("microsoft.xmlhttp");
        }
        catch (e1) {
            try {
                xhr = new XMLHttpRequest();
            }
            catch (e2) {
                error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                return null;
            }
        }
        return xhr;
    };
    return Util;
}());

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EntityManager = (function (_super) {
    __extends$2(EntityManager, _super);
    function EntityManager(_entityDispatcher) {
        var _this = _super.call(this) || this;
        _this._entityDispatcher = _entityDispatcher;
        _this._objectList = new Collection_2();
        return _this;
    }
    EntityManager.create = function (entityDispatcher) {
        var obj = new this(entityDispatcher);
        return obj;
    };
    EntityManager.prototype.init = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityManager.prototype.dispose = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityManager.prototype.hasChild = function (child) {
        return this._objectList.hasChild(child);
    };
    EntityManager.prototype.addChild = function (child) {
        this._objectList.addChild(child);
        return this;
    };
    EntityManager.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var addChild = args[1] == void 0 ? this.addChild : args[1];
        if (Util.isArray(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                addChild(child);
            }
        }
        else
            addChild(args[0]);
        return this;
    };
    EntityManager.prototype.forEach = function (func) {
        this._objectList.forEach(func);
        return this;
    };
    EntityManager.prototype.filter = function (func) {
        return this._objectList.filter(func);
    };
    EntityManager.prototype.getChildren = function () {
        return this._objectList;
    };
    EntityManager.prototype.getAllChildren = function () {
        var res = Collection_2.create();
        var getChildren = function (children) {
            res.addChildren(children.getChildren());
            children.forEach(function (child) {
                getChildren(child);
            });
        };
        getChildren(this._entityDispatcher);
        return res;
    };
    EntityManager.prototype.getChild = function (index) {
        return this._objectList.getChild(index);
    };
    EntityManager.prototype.findChildById = function (uid) {
        return this._objectList.findOne(function (child) {
            return child.uid == uid;
        });
    };
    EntityManager.prototype.findChildByName = function (name) {
        return this._objectList.findOne(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityManager.prototype.findChildrenByName = function (name) {
        return this.filter(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityManager.prototype.removeChild = function (child) {
        this._objectList.removeChild(child);
        return this;
    };
    EntityManager.prototype.removeAllChildren = function () {
        var _this = this;
        this._objectList.forEach(function (child) {
            _this.removeChild(child);
        }, this);
    };
    return EntityManager;
}(Entity));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = (function (_super) {
    __extends$5(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entityObject = null;
        return _this;
    }
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            if (this.entityObject == void 0)
                return null;
            return this.entityObject.transform;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.init = function () {
    };
    Component.prototype.addToObject = function (entityObject) {
        this.entityObject = entityObject;
        this.addToComponentContainer();
    };
    Component.prototype.addToComponentContainer = function () {
    };
    return Component;
}(Entity));

var GeometryData = (function () {
    function GeometryData() {
        this.vertice = null;
        this.color = null;
        this.indice = null;
        this.normal = null;
        this.texCoord = null;
    }
    GeometryData.create = function () {
        var obj = new this();
        return obj;
    };
    return GeometryData;
}());

var EBufferDataType;
(function (EBufferDataType) {
    EBufferDataType[EBufferDataType["VERTICE"] = "VERTICE"] = "VERTICE";
    EBufferDataType[EBufferDataType["INDICE"] = "INDICE"] = "INDICE";
    EBufferDataType[EBufferDataType["NORMAL"] = "NORMAL"] = "NORMAL";
    EBufferDataType[EBufferDataType["TEXCOORD"] = "TEXCOORD"] = "TEXCOORD";
    EBufferDataType[EBufferDataType["COLOR"] = "COLOR"] = "COLOR";
})(EBufferDataType || (EBufferDataType = {}));

var Variable = createCommonjsModule(function (module, exports) {
"use strict";
var JudgeUtils_1 = JudgeUtils_1$2;
var Log_1 = Log_1$1;
if (JudgeUtils_1.JudgeUtils.isNodeJs() && typeof commonjsGlobal != "undefined") {
    exports.root = commonjsGlobal;
}
else if (typeof window != "undefined") {
    exports.root = window;
}
else if (typeof self != "undefined") {
    /*!
     in web worker
     */
    exports.root = self;
}
else {
    Log_1.Log.error("no avaliable root!");
}

});

var Variable_1 = Variable;
var Log = (function () {
    function Log() {
    }
    /**
     * Output Debug message.
     * @function
     * @param {String} message
     */
    Log.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i - 0] = arguments[_i];
        }
        if (!this._exec("log", messages)) {
            Variable_1.root.alert(messages.join(","));
        }
        this._exec("trace", messages);
    };
    /**
     * 断言失败时，会提示错误信息，但程序会继续执行下去
     * 使用断言捕捉不应该发生的非法情况。不要混淆非法情况与错误情况之间的区别，后者是必然存在的并且是一定要作出处理的。
     *
     * 1）对非预期错误使用断言
     断言中的布尔表达式的反面一定要描述一个非预期错误，下面所述的在一定情况下为非预期错误的一些例子：
     （1）空指针。
     （2）输入或者输出参数的值不在预期范围内。
     （3）数组的越界。
     非预期错误对应的就是预期错误，我们通常使用错误处理代码来处理预期错误，而使用断言处理非预期错误。在代码执行过程中，有些错误永远不应该发生，这样的错误是非预期错误。断言可以被看成是一种可执行的注释，你不能依赖它来让代码正常工作（《Code Complete 2》）。例如：
     int nRes = f(); // nRes 由 f 函数控制， f 函数保证返回值一定在 -100 ~ 100
     Assert(-100 <= nRes && nRes <= 100); // 断言，一个可执行的注释
     由于 f 函数保证了返回值处于 -100 ~ 100，那么如果出现了 nRes 不在这个范围的值时，就表明一个非预期错误的出现。后面会讲到“隔栏”，那时会对断言有更加深刻的理解。
     2）不要把需要执行的代码放入断言中
     断言用于软件的开发和维护，而通常不在发行版本中包含断言。
     需要执行的代码放入断言中是不正确的，因为在发行版本中，这些代码通常不会被执行，例如：
     Assert(f()); // f 函数通常在发行版本中不会被执行
     而使用如下方法则比较安全：
     res = f();
     Assert(res); // 安全
     3）对来源于内部系统的可靠的数据使用断言，而不要对外部不可靠的数据使用断言，对于外部不可靠数据，应该使用错误处理代码。
     再次强调，把断言看成可执行的注释。
     * @param cond 如果cond返回false，则断言失败，显示message
     * @param message
     */
    Log.assert = function (cond) {
        var messages = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            messages[_i - 1] = arguments[_i];
        }
        if (cond) {
            if (!this._exec("assert", arguments, 1)) {
                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        }
    };
    Log.error = function (cond) {
        var message = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            message[_i - 1] = arguments[_i];
        }
        if (cond) {
            /*!
            console.error will not interrupt, it will throw error and continue exec the left statements

            but here need interrupt! so not use it here.
             */
            //if (!this._exec("error", arguments, 1)) {
            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
        }
    };
    Log.warn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i - 0] = arguments[_i];
        }
        var result = this._exec("warn", arguments);
        if (!result) {
            this.log.apply(this, arguments);
        }
        else {
            this._exec("trace", ["warn trace"]);
        }
    };
    Log._exec = function (consoleMethod, args, sliceBegin) {
        if (sliceBegin === void 0) { sliceBegin = 0; }
        if (Variable_1.root.console && Variable_1.root.console[consoleMethod]) {
            Variable_1.root.console[consoleMethod].apply(Variable_1.root.console, Array.prototype.slice.call(args, sliceBegin));
            return true;
        }
        return false;
    };
    Log.info = {
        INVALID_PARAM: "invalid parameter",
        helperFunc: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = "";
            args.forEach(function (val) {
                result += String(val) + " ";
            });
            return result.slice(0, -1);
        },
        assertion: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length === 2) {
                return this.helperFunc(args[0], args[1]);
            }
            else if (args.length === 3) {
                return this.helperFunc(args[1], args[0], args[2]);
            }
            else {
                throw new Error("args.length must <= 3");
            }
        },
        FUNC_INVALID: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("invalid");
            return this.assertion.apply(this, args);
        },
        FUNC_MUST: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("must");
            return this.assertion.apply(this, args);
        },
        FUNC_MUST_BE: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("must be");
            return this.assertion.apply(this, args);
        },
        FUNC_MUST_NOT_BE: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("must not be");
            return this.assertion.apply(this, args);
        },
        FUNC_SHOULD: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("should");
            return this.assertion.apply(this, args);
        },
        FUNC_SHOULD_NOT: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("should not");
            return this.assertion.apply(this, args);
        },
        FUNC_SUPPORT: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("support");
            return this.assertion.apply(this, args);
        },
        FUNC_NOT_SUPPORT: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("not support");
            return this.assertion.apply(this, args);
        },
        FUNC_MUST_DEFINE: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("must define");
            return this.assertion.apply(this, args);
        },
        FUNC_MUST_NOT_DEFINE: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("must not define");
            return this.assertion.apply(this, args);
        },
        FUNC_UNKNOW: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("unknow");
            return this.assertion.apply(this, args);
        },
        FUNC_EXPECT: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("expect");
            return this.assertion.apply(this, args);
        },
        FUNC_UNEXPECT: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("unexpect");
            return this.assertion.apply(this, args);
        },
        FUNC_EXIST: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("exist");
            return this.assertion.apply(this, args);
        },
        FUNC_NOT_EXIST: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("not exist");
            return this.assertion.apply(this, args);
        },
        FUNC_ONLY: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("only");
            return this.assertion.apply(this, args);
        },
        FUNC_CAN_NOT: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args.unshift("can't");
            return this.assertion.apply(this, args);
        }
    };
    return Log;
}());
var Log_2 = Log;


var Log_1$1 = {
	Log: Log_2
};

var Collection_1$2 = Collection_1;
var JudgeUtils_1$5 = JudgeUtils_1$2;
var Const_1$2 = Const;
var Log_1 = Log_1$1;
var ExtendUtils_1$3 = ExtendUtils_1$1;
var Hash = (function () {
    function Hash(children) {
        if (children === void 0) { children = {}; }
        this._children = null;
        this._children = children;
    }
    Hash.create = function (children) {
        if (children === void 0) { children = {}; }
        var obj = new this(children);
        return obj;
    };
    Hash.prototype.getChildren = function () {
        return this._children;
    };
    Hash.prototype.getCount = function () {
        var result = 0, children = this._children, key = null;
        for (key in children) {
            if (children.hasOwnProperty(key)) {
                result++;
            }
        }
        return result;
    };
    Hash.prototype.getKeys = function () {
        var result = Collection_1$2.Collection.create(), children = this._children, key = null;
        for (key in children) {
            if (children.hasOwnProperty(key)) {
                result.addChild(key);
            }
        }
        return result;
    };
    Hash.prototype.getValues = function () {
        var result = Collection_1$2.Collection.create(), children = this._children, key = null;
        for (key in children) {
            if (children.hasOwnProperty(key)) {
                result.addChild(children[key]);
            }
        }
        return result;
    };
    Hash.prototype.getChild = function (key) {
        return this._children[key];
    };
    Hash.prototype.setValue = function (key, value) {
        this._children[key] = value;
        return this;
    };
    Hash.prototype.addChild = function (key, value) {
        this._children[key] = value;
        return this;
    };
    Hash.prototype.addChildren = function (arg) {
        var i = null, children = null;
        if (arg instanceof Hash) {
            children = arg.getChildren();
        }
        else {
            children = arg;
        }
        for (i in children) {
            if (children.hasOwnProperty(i)) {
                this.addChild(i, children[i]);
            }
        }
        return this;
    };
    Hash.prototype.appendChild = function (key, value) {
        if (this._children[key] instanceof Collection_1$2.Collection) {
            var c = (this._children[key]);
            c.addChild(value);
        }
        else {
            this._children[key] = (Collection_1$2.Collection.create().addChild(value));
        }
        return this;
    };
    Hash.prototype.setChildren = function (children) {
        this._children = children;
    };
    Hash.prototype.removeChild = function (arg) {
        var result = [];
        if (JudgeUtils_1$5.JudgeUtils.isString(arg)) {
            var key = arg;
            result.push(this._children[key]);
            this._children[key] = void 0;
            delete this._children[key];
        }
        else if (JudgeUtils_1$5.JudgeUtils.isFunction(arg)) {
            var func_1 = arg, self_1 = this;
            this.forEach(function (val, key) {
                if (func_1(val, key)) {
                    result.push(self_1._children[key]);
                    self_1._children[key] = void 0;
                    delete self_1._children[key];
                }
            });
        }
        return Collection_1$2.Collection.create(result);
    };
    Hash.prototype.removeAllChildren = function () {
        this._children = {};
    };
    Hash.prototype.hasChild = function (key) {
        return this._children[key] !== void 0;
    };
    Hash.prototype.hasChildWithFunc = function (func) {
        var result = false;
        this.forEach(function (val, key) {
            if (func(val, key)) {
                result = true;
                return Const_1$2.$BREAK;
            }
        });
        return result;
    };
    Hash.prototype.forEach = function (func, context) {
        var children = this._children;
        for (var i in children) {
            if (children.hasOwnProperty(i)) {
                if (func.call(context, children[i], i) === Const_1$2.$BREAK) {
                    break;
                }
            }
        }
        return this;
    };
    Hash.prototype.filter = function (func) {
        var result = {}, children = this._children, value = null;
        for (var key in children) {
            if (children.hasOwnProperty(key)) {
                value = children[key];
                if (func.call(children, value, key)) {
                    result[key] = value;
                }
            }
        }
        return Hash.create(result);
    };
    Hash.prototype.findOne = function (func) {
        var result = [], self = this, scope = this._children;
        this.forEach(function (val, key) {
            if (!func.call(scope, val, key)) {
                return;
            }
            result = [key, self.getChild(key)];
            return Const_1$2.$BREAK;
        });
        return result;
    };
    Hash.prototype.map = function (func) {
        var resultMap = {};
        this.forEach(function (val, key) {
            var result = func(val, key);
            if (result !== Const_1$2.$REMOVE) {
                Log_1.Log.error(!JudgeUtils_1$5.JudgeUtils.isArray(result) || result.length !== 2, Log_1.Log.info.FUNC_MUST_BE("iterator", "[key, value]"));
                resultMap[result[0]] = result[1];
            }
        });
        return Hash.create(resultMap);
    };
    Hash.prototype.toCollection = function () {
        var result = Collection_1$2.Collection.create();
        this.forEach(function (val, key) {
            if (val instanceof Collection_1$2.Collection) {
                result.addChildren(val);
            }
            else {
                result.addChild(val);
            }
        });
        return result;
    };
    Hash.prototype.toArray = function () {
        var result = [];
        this.forEach(function (val, key) {
            if (val instanceof Collection_1$2.Collection) {
                result = result.concat(val.getChildren());
            }
            else {
                result.push(val);
            }
        });
        return result;
    };
    Hash.prototype.clone = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var target = null, isDeep = null;
        if (args.length === 0) {
            isDeep = false;
            target = Hash.create();
        }
        else if (args.length === 1) {
            if (JudgeUtils_1$5.JudgeUtils.isBoolean(args[0])) {
                target = Hash.create();
                isDeep = args[0];
            }
            else {
                target = args[0];
                isDeep = false;
            }
        }
        else {
            target = args[0];
            isDeep = args[1];
        }
        if (isDeep === true) {
            target.setChildren(ExtendUtils_1$3.ExtendUtils.extendDeep(this._children));
        }
        else {
            target.setChildren(ExtendUtils_1$3.ExtendUtils.extend({}, this._children));
        }
        return target;
    };
    return Hash;
}());
var Hash_2 = Hash;

function singleton(isInitWhenCreate) {
    if (isInitWhenCreate === void 0) { isInitWhenCreate = false; }
    return function (target) {
        target._instance = null;
        if (isInitWhenCreate) {
            target.getInstance = function () {
                if (target._instance == null) {
                    var instance = new target();
                    target._instance = instance;
                    instance.initWhenCreate();
                }
                return target._instance;
            };
        }
        else {
            target.getInstance = function () {
                if (target._instance == null) {
                    target._instance = new target();
                }
                return target._instance;
            };
        }
    };
}

var View = (function () {
    function View(_dom) {
        this._dom = _dom;
    }
    View.create = function (view) {
        var obj = new this(view);
        return obj;
    };
    Object.defineProperty(View.prototype, "offset", {
        get: function () {
            var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
            while (view = view.offsetParent) {
                offset.x += view.offsetLeft;
                offset.y += view.offsetTop;
            }
            return offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "dom", {
        get: function () {
            return this._dom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        get: function () {
            return this._dom.style.x;
        },
        set: function (val) {
            this._dom.style.x = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        get: function () {
            return this.dom.style.y;
        },
        set: function (val) {
            this._dom.style.y = val + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        get: function () {
            return this.dom.clientWidth;
        },
        set: function (width) {
            this._dom.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return this.dom.clientHeight;
        },
        set: function (height) {
            this._dom.height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleWidth", {
        get: function () {
            return this._dom.style.width;
        },
        set: function (width) {
            this._dom.style.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleHeight", {
        get: function () {
            return this._dom.style.height;
        },
        set: function (height) {
            this._dom.style.height = height;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.getContext = function (contextConfig) {
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var gl;
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var item = names_1[_i];
            try {
                gl = this._dom.getContext(item, contextConfig);
            }
            catch (e) {
            }
            if (gl) {
                break;
            }
        }
        return gl;
    };
    View.prototype.initCanvas = function () {
        this._dom.style.cssText = "position:absolute;left:0;top:0;";
    };
    return View;
}());

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Device = (function () {
    function Device() {
    }
    Device.getInstance = function () { };
    Device.prototype.createGL = function (canvasId, contextConfigData, parentId) {
        var canvas = document.createElement("canvas");
        if (canvasId) {
            canvas.setAttribute("id", canvasId);
        }
        if (parentId) {
            this._parentEle = document.querySelector("#" + parentId);
            if (this._parentEle == void 0)
                alert("找不到指定parentId的dom节点");
        }
        if (this._parentEle)
            this._parentEle.appendChild(canvas);
        else {
            var body = document.createElement("body");
            body.style.margin = "0";
            body.appendChild(canvas);
            document.querySelector("html").appendChild(body);
        }
        this.canvas = canvas;
        this.view = View.create(this.canvas);
        this.gl = this.view.getContext(contextConfigData);
        if (!this.gl)
            alert("你的浏览器不支持webgl");
    };
    Device.prototype.setViewport = function (width, height) {
        this.gl.viewport(0, 0, width, height);
    };
    Device.prototype.setScreen = function () {
        var width = 0, height = 0, x = 0, y = 0, styleWidth = null, styleHeight = null;
        if (this._parentEle) {
            x = this._parentEle.offsetLeft;
            y = this._parentEle.offsetTop;
            width = this._parentEle.offsetWidth;
            height = this._parentEle.offsetHeight;
            styleWidth = width + "px";
            styleHeight = height + "px";
        }
        else {
            width = window.innerWidth;
            height = window.innerHeight;
            styleWidth = "100%";
            styleHeight = "100%";
        }
        this.view.initCanvas();
        this.view.x = x;
        this.view.y = y;
        this.view.width = width;
        this.view.height = height;
        this.view.styleWidth = styleWidth;
        this.view.styleHeight = styleHeight;
        this.gl.viewport(0, 0, width, height);
        this._parentEle = null;
    };
    return Device;
}());
Device = __decorate([
    singleton()
], Device);

var Buffer = (function () {
    function Buffer() {
        this.buffer = null;
    }
    Buffer.prototype.dispose = function () {
        Device.getInstance().gl.deleteBuffer(this.buffer);
        delete this.buffer;
    };
    return Buffer;
}());

var EBufferType;
(function (EBufferType) {
    EBufferType[EBufferType["BYTE"] = "BYTE"] = "BYTE";
    EBufferType[EBufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
    EBufferType[EBufferType["SHORT"] = "SHORT"] = "SHORT";
    EBufferType[EBufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
    EBufferType[EBufferType["INT"] = "INT"] = "INT";
    EBufferType[EBufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
    EBufferType[EBufferType["FLOAT"] = "FLOAT"] = "FLOAT";
})(EBufferType || (EBufferType = {}));

var EBufferUseage;
(function (EBufferUseage) {
    EBufferUseage[EBufferUseage["STREAM_DRAW"] = "STREAM_DRAW"] = "STREAM_DRAW";
    EBufferUseage[EBufferUseage["STATIC_DRAW"] = "STATIC_DRAW"] = "STATIC_DRAW";
    EBufferUseage[EBufferUseage["DYNAMIC_DRAW"] = "DYNAMIC_DRAW"] = "DYNAMIC_DRAW";
})(EBufferUseage || (EBufferUseage = {}));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ArrayBuffer$1 = (function (_super) {
    __extends$6(ArrayBuffer, _super);
    function ArrayBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = null;
        _this.data = null;
        _this.type = null;
        _this.usage = null;
        _this.count = null;
        return _this;
    }
    ArrayBuffer.create = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUseage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, size, type, usage);
        return obj;
    };
    ArrayBuffer.prototype.initWhenCreate = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUseage.STATIC_DRAW; }
        if (data == void 0)
            return null;
        var gl = Device.getInstance().gl;
        var typeData = new Float32Array(data);
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            console.log("the bufferContainer create error");
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, typeData, gl[usage]);
        this._saveData(typeData, size, type, usage);
        return this.buffer;
    };
    ArrayBuffer.prototype._saveData = function (data, size, type, usage) {
        this.data = data;
        this.size = size;
        this.count = data.length / size;
        this.type = type;
        this.usage = usage;
    };
    return ArrayBuffer;
}(Buffer));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ElementBuffer = (function (_super) {
    __extends$7(ElementBuffer, _super);
    function ElementBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = null;
        _this.count = null;
        _this.usage = null;
        _this.data = null;
        return _this;
    }
    ElementBuffer.create = function (data, type, useage) {
        if (type === void 0) { type = EBufferType.UNSIGNED_BYTE; }
        if (useage === void 0) { useage = EBufferUseage.STATIC_DRAW; }
        var obj = new this();
        var result = obj.initWhenCreate(data, type, useage);
        if (result == void 0)
            return null;
        return obj;
    };
    ElementBuffer.prototype.initWhenCreate = function (data, type, useage) {
        if (data == void 0)
            return null;
        var gl = Device.getInstance().gl;
        var typeData = new Uint8Array(data);
        var buffer = gl.createBuffer();
        if (!buffer)
            console.log("element Buffer create buffer error");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typeData, gl[useage]);
        this._saveData(typeData, type, useage);
        this.buffer = buffer;
    };
    ElementBuffer.prototype._saveData = function (data, type, useage) {
        this.data = data;
        this.type = type;
        this.usage = useage;
        this.count = data.length;
    };
    return ElementBuffer;
}(Buffer));

var BufferContainer = (function () {
    function BufferContainer() {
        this.geometryData = null;
        this._bufferList = new Hash_2();
    }
    BufferContainer.create = function () {
        var obj = new this();
        return obj;
    };
    BufferContainer.prototype.init = function () {
        this.getChild(EBufferDataType.VERTICE);
        this.getChild(EBufferDataType.COLOR);
        this.getChild(EBufferDataType.INDICE);
        this.getChild(EBufferDataType.NORMAL);
        this.getChild(EBufferDataType.TEXCOORD);
    };
    BufferContainer.prototype.addChild = function (bufferName, buffer) {
        this._bufferList.addChild(bufferName, buffer);
    };
    BufferContainer.prototype.hasChild = function (bufferName) {
        return this._bufferList.hasChild(bufferName);
    };
    BufferContainer.prototype.getChildren = function () {
        return this._bufferList.getChildren();
    };
    BufferContainer.prototype.getChild = function (type) {
        var buffer = null;
        switch (type) {
            case EBufferDataType.VERTICE:
                buffer = this._getVerticeBuffer(type);
                break;
            case EBufferDataType.COLOR:
                buffer = this._getColorBuffer(type);
                break;
            case EBufferDataType.INDICE:
                buffer = this._getIndiceBuffer(type);
                break;
            case EBufferDataType.NORMAL:
                buffer = this._getNormalBuffer(type);
                break;
            case EBufferDataType.TEXCOORD:
                buffer = this._getTexCoordBuffer(type);
                break;
        }
        return buffer;
    };
    BufferContainer.prototype._getVerticeBuffer = function (type) {
        var buffer = ArrayBuffer$1.create(this.geometryData.vertice, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getColorBuffer = function (type) {
        var buffer = ArrayBuffer$1.create(this.geometryData.color, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getNormalBuffer = function (type) {
        var buffer = ArrayBuffer$1.create(this.geometryData.normal, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getIndiceBuffer = function (type) {
        var buffer = ElementBuffer.create(this.geometryData.indice);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getTexCoordBuffer = function (type) {
        var buffer = ArrayBuffer$1.create(this.geometryData.texCoord, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._bufferCache = function (type, buffer) {
        if (this._bufferList.hasChild(type)) {
            return this._bufferList.getChild(type);
        }
        else {
            this.addChild(type, buffer);
            return buffer;
        }
    };
    return BufferContainer;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Geometry = (function (_super) {
    __extends$4(Geometry, _super);
    function Geometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bufferContainer = null;
        _this.material = null;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "geometryData", {
        get: function () {
            return this.bufferContainer.geometryData;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.init = function () {
        var computeData = this.computeData();
        this.bufferContainer = BufferContainer.create();
        this.bufferContainer.geometryData = this.createGeometryData(computeData);
        this.bufferContainer.init();
        this.material.init();
    };
    Geometry.prototype.createGeometryData = function (computeData) {
        var vertice = computeData.vertice, color = computeData.color, texCoord = computeData.texCoord, normal = computeData.normal, indice = computeData.indice;
        var geometryData = GeometryData.create();
        geometryData.vertice = vertice;
        geometryData.color = color;
        geometryData.texCoord = texCoord;
        geometryData.normal = normal;
        geometryData.indice = indice;
        return geometryData;
    };
    return Geometry;
}(Component));

var Vector3 = (function () {
    function Vector3(opt_src) {
        var v = new Float32Array(3);
        if (opt_src && typeof opt_src === 'object') {
            v[0] = opt_src[0];
            v[1] = opt_src[1];
            v[2] = opt_src[2];
        }
        this.elements = v;
    }
    Vector3.prototype.normalize = function () {
        var v = this.elements;
        var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c * c + d * d + e * e);
        if (g) {
            if (g == 1)
                return this;
        }
        else {
            v[0] = 0;
            v[1] = 0;
            v[2] = 0;
            return this;
        }
        g = 1 / g;
        v[0] = c * g;
        v[1] = d * g;
        v[2] = e * g;
        return this;
    };
    return Vector3;
}());

var Vector4 = (function () {
    function Vector4(opt_src) {
        var v = new Float32Array(4);
        if (opt_src && typeof opt_src === 'object') {
            v[0] = opt_src[0];
            v[1] = opt_src[1];
            v[2] = opt_src[2];
            v[3] = opt_src[3];
        }
        this.elements = v;
    }
    return Vector4;
}());

var Matrix4 = (function () {
    function Matrix4(opt_src) {
        var i, s, d;
        if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
            s = opt_src.elements;
            d = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                d[i] = s[i];
            }
            this.elements = d;
        }
        else {
            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
    }
    
    Matrix4.prototype.setIdentity = function () {
        var e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.set = function (src) {
        var i, s, d;
        s = src.elements;
        d = this.elements;
        if (s === d) {
            return;
        }
        for (i = 0; i < 16; ++i) {
            d[i] = s[i];
        }
        return this;
    };
    Matrix4.prototype.concat = function (other) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
        e = this.elements;
        a = this.elements;
        b = other.elements;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    };
    Matrix4.prototype.multiply = function (other) {
        var i, e, a, b, ai0, ai1, ai2, ai3;
        e = this.elements;
        a = this.elements;
        b = other.elements;
        if (e === b) {
            b = new Float32Array(16);
            for (i = 0; i < 16; ++i) {
                b[i] = e[i];
            }
        }
        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return this;
    };
    Matrix4.prototype.multiplyVector3 = function (pos) {
        var e = this.elements;
        var p = pos.elements;
        var v = new Vector3();
        var result = v.elements;
        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[11];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[12];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[13];
        return v;
    };
    Matrix4.prototype.multiplyVector4 = function (pos) {
        var e = this.elements;
        var p = pos.elements;
        var v = new Vector4();
        var result = v.elements;
        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
        result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];
        return v;
    };
    Matrix4.prototype.transpose = function () {
        var e, t;
        e = this.elements;
        t = e[1];
        e[1] = e[4];
        e[4] = t;
        t = e[2];
        e[2] = e[8];
        e[8] = t;
        t = e[3];
        e[3] = e[12];
        e[12] = t;
        t = e[6];
        e[6] = e[9];
        e[9] = t;
        t = e[7];
        e[7] = e[13];
        e[13] = t;
        t = e[11];
        e[11] = e[14];
        e[14] = t;
        return this;
    };
    Matrix4.prototype.setInverseOf = function (other) {
        var i, s, d, inv, det;
        s = other.elements;
        d = this.elements;
        inv = new Float32Array(16);
        inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
            + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
        inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
            - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
        inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
            + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
        inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
            - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
        inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
            - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
        inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
            + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
        inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
            - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
        inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
            + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
        inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
            + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
        inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
            - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
        inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
            + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
        inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
            - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
        inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
            - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
        inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
            + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
        inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
            - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
        inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
            + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
        if (det === 0) {
            return this;
        }
        det = 1 / det;
        for (i = 0; i < 16; i++) {
            d[i] = inv[i] * det;
        }
        return this;
    };
    Matrix4.prototype.invert = function () {
        return this.setInverseOf(this);
    };
    Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
        var e, rw, rh, rd;
        if (left === right || bottom === top || near === far) {
            throw 'null frustum';
        }
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e = this.elements;
        e[0] = 2 * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -2 * rd;
        e[11] = 0;
        e[12] = -(right + left) * rw;
        e[13] = -(top + bottom) * rh;
        e[14] = -(far + near) * rd;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
    };
    Matrix4.prototype.setFrustum = function (left, right, bottom, top, near, far) {
        var e, rw, rh, rd;
        if (left === right || top === bottom || near === far) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }
        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);
        e = this.elements;
        e[0] = 2 * near * rw;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 2 * near * rh;
        e[6] = 0;
        e[7] = 0;
        e[8] = (right + left) * rw;
        e[9] = (top + bottom) * rh;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.frustum = function (left, right, bottom, top, near, far) {
        return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
    };
    Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
        var e, rd, s, ct;
        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }
        fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        if (s === 0) {
            throw 'null frustum';
        }
        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;
        e = this.elements;
        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
        return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
    };
    Matrix4.prototype.setScale = function (x, y, z) {
        var e = this.elements;
        e[0] = x;
        e[4] = 0;
        e[8] = 0;
        e[12] = 0;
        e[1] = 0;
        e[5] = y;
        e[9] = 0;
        e[13] = 0;
        e[2] = 0;
        e[6] = 0;
        e[10] = z;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.scale = function (x, y, z) {
        var e = this.elements;
        e[0] *= x;
        e[4] *= y;
        e[8] *= z;
        e[1] *= x;
        e[5] *= y;
        e[9] *= z;
        e[2] *= x;
        e[6] *= y;
        e[10] *= z;
        e[3] *= x;
        e[7] *= y;
        e[11] *= z;
        return this;
    };
    Matrix4.prototype.setTranslate = function (x, y, z) {
        var e = this.elements;
        e[0] = 1;
        e[4] = 0;
        e[8] = 0;
        e[12] = x;
        e[1] = 0;
        e[5] = 1;
        e[9] = 0;
        e[13] = y;
        e[2] = 0;
        e[6] = 0;
        e[10] = 1;
        e[14] = z;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        return this;
    };
    Matrix4.prototype.translate = function (x, y, z) {
        var e = this.elements;
        e[12] += e[0] * x + e[4] * y + e[8] * z;
        e[13] += e[1] * x + e[5] * y + e[9] * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    };
    Matrix4.prototype.setRotate = function (angle, x, y, z) {
        var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
        angle = Math.PI * angle / 180;
        e = this.elements;
        s = Math.sin(angle);
        c = Math.cos(angle);
        if (0 !== x && 0 === y && 0 === z) {
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 !== y && 0 === z) {
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else if (0 === x && 0 === y && 0 !== z) {
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        }
        else {
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;
            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;
            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;
            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        return this;
    };
    Matrix4.prototype.rotate = function (angle, x, y, z) {
        return this.concat(new Matrix4().setRotate(angle, x, y, z));
    };
    Matrix4.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;
        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;
        e = this.elements;
        e[0] = sx;
        e[1] = ux;
        e[2] = -fx;
        e[3] = 0;
        e[4] = sy;
        e[5] = uy;
        e[6] = -fy;
        e[7] = 0;
        e[8] = sz;
        e[9] = uz;
        e[10] = -fz;
        e[11] = 0;
        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
        return this.translate(-eyeX, -eyeY, -eyeZ);
    };
    Matrix4.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
        return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
    };
    Matrix4.prototype.dropShadow = function (plane, light) {
        var mat = new Matrix4();
        var e = mat.elements;
        var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];
        e[0] = dot - light[0] * plane[0];
        e[1] = -light[1] * plane[0];
        e[2] = -light[2] * plane[0];
        e[3] = -light[3] * plane[0];
        e[4] = -light[0] * plane[1];
        e[5] = dot - light[1] * plane[1];
        e[6] = -light[2] * plane[1];
        e[7] = -light[3] * plane[1];
        e[8] = -light[0] * plane[2];
        e[9] = -light[1] * plane[2];
        e[10] = dot - light[2] * plane[2];
        e[11] = -light[3] * plane[2];
        e[12] = -light[0] * plane[3];
        e[13] = -light[1] * plane[3];
        e[14] = -light[2] * plane[3];
        e[15] = dot - light[3] * plane[3];
        return this.concat(mat);
    };
    Matrix4.prototype.dropShadowDirectionally = function (normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
        var a = planeX * normX + planeY * normY + planeZ * normZ;
        return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
    };
    return Matrix4;
}());

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Transform = (function (_super) {
    __extends$8(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mMatrix = new Matrix4();
        return _this;
    }
    Transform.create = function () {
        var obj = new this();
        return obj;
    };
    Transform.prototype.rotate = function (angle, x, y, z) {
        this.mMatrix.rotate(angle, x, y, z);
    };
    Transform.prototype.scale = function (x, y, z) {
        this.mMatrix.scale(x, y, z);
    };
    Transform.prototype.translate = function (x, y, z) {
        this.mMatrix.translate(x, y, z);
    };
    return Transform;
}(Component));

var __extends$10 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RendererComponent = (function (_super) {
    __extends$10(RendererComponent, _super);
    function RendererComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RendererComponent;
}(Component));

var EDrawMode;
(function (EDrawMode) {
    EDrawMode[EDrawMode["POINTS"] = "POINTS"] = "POINTS";
    EDrawMode[EDrawMode["LINES"] = "LINES"] = "LINES";
    EDrawMode[EDrawMode["LINE_LOOP"] = "LINE_LOOP"] = "LINE_LOOP";
    EDrawMode[EDrawMode["LINE_STRIP"] = "LINE_STRIP"] = "LINE_STRIP";
    EDrawMode[EDrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    EDrawMode[EDrawMode["TRIANGLE_STRIP"] = "TRIANGLE_STRIP"] = "TRIANGLE_STRIP";
    EDrawMode[EDrawMode["TRIANGLE_FAN"] = "TRIANGLE_FAN"] = "TRIANGLE_FAN";
})(EDrawMode || (EDrawMode = {}));

var RenderCommand = (function () {
    function RenderCommand() {
        this.buffers = null;
        this.mMatrix = null;
        this.vMatrix = null;
        this.pMatrix = null;
        this.targetObject = null;
        this.material = null;
        this._drawMode = EDrawMode.TRIANGLES;
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(RenderCommand.prototype, "color", {
        get: function () {
            return this.material.color.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderCommand.prototype, "opacity", {
        get: function () {
            return this.material.opacity;
        },
        enumerable: true,
        configurable: true
    });
    RenderCommand.prototype.draw = function () {
        var startOffset = 0, gl = Device.getInstance().gl;
        this.material.update(this);
        var elementBuffer = this.buffers.getChild(EBufferDataType.INDICE);
        var verticeBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
        if (elementBuffer != void 0)
            gl.drawElements(gl[this._drawMode], elementBuffer.count, gl[elementBuffer.type], 0);
        else
            gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    };
    return RenderCommand;
}());

var __extends$11 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CameraController = (function (_super) {
    __extends$11(CameraController, _super);
    function CameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        return _this;
    }
    CameraController.create = function (camera) {
        var obj = new this();
        obj.camera = camera;
        return obj;
    };
    Object.defineProperty(CameraController.prototype, "pMatrix", {
        get: function () {
            return this.camera.pMatrix;
        },
        set: function (pMatrix) {
            this.camera.pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "vMatrix", {
        get: function () {
            return this.camera.vMatrix;
        },
        enumerable: true,
        configurable: true
    });
    CameraController.prototype.init = function () {
        this.camera.entityObject = this.entityObject;
        this.camera.init();
    };
    return CameraController;
}(Component));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MeshRenderer = (function (_super) {
    __extends$9(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRenderer.prototype.render = function (renderer, targetObject, camera) {
        renderer.addCommand(this._createCmd(targetObject, camera));
    };
    MeshRenderer.prototype._createCmd = function (targetObject, camera) {
        var geometry = targetObject.geometry;
        var renderCmd = RenderCommand.create();
        var cameraComponent = camera.getComponent(CameraController);
        renderCmd.material = geometry.material;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.targetObject = targetObject;
        renderCmd.mMatrix = targetObject.transform.mMatrix;
        renderCmd.vMatrix = cameraComponent.vMatrix;
        renderCmd.pMatrix = cameraComponent.pMatrix;
        return renderCmd;
    };
    return MeshRenderer;
}(RendererComponent));

var ComponentManager = (function () {
    function ComponentManager(_entityObject) {
        this._entityObject = _entityObject;
        this.transform = null;
        this.geometry = null;
        this._componentList = new Collection_2();
        this._renderComponent = null;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
        this._componentList.forEach(function (component) {
            component.init();
        });
    };
    ComponentManager.prototype.addComponent = function (component) {
        if (component instanceof Geometry) {
            this.geometry = component;
        }
        else if (component instanceof Transform) {
            this.transform = component;
        }
        else if (component instanceof MeshRenderer) {
            this._renderComponent = component;
        }
        this._componentList.addChild(component);
        component.addToObject(this._entityObject);
    };
    ComponentManager.prototype.getComponent = function (componentClass) {
        return this._componentList.findOne(function (component) {
            return component instanceof componentClass;
        });
    };
    ComponentManager.prototype.hasComponent = function (componentClass) {
        var res = this._componentList.hasChildWithFunc(function (component) {
            return component instanceof componentClass;
        });
        return res;
    };
    ComponentManager.prototype.removeComponent = function (component) {
        this._componentList.removeChild(component);
    };
    ComponentManager.prototype.getRenderComponent = function () {
        return this._renderComponent;
    };
    ComponentManager.prototype.removeAllComponent = function () {
        this._componentList.removeAllChildren();
    };
    return ComponentManager;
}());

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EntityObject = (function (_super) {
    __extends$1(EntityObject, _super);
    function EntityObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parent = null;
        _this.name = null;
        _this._entityManager = EntityManager.create(_this);
        _this._componentManager = ComponentManager.create(_this);
        return _this;
    }
    Object.defineProperty(EntityObject.prototype, "transform", {
        get: function () {
            return this._componentManager.transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "geometry", {
        get: function () {
            return this._componentManager.geometry;
        },
        enumerable: true,
        configurable: true
    });
    EntityObject.prototype.initWhenCreate = function () {
        this._componentManager.addComponent(this.createTransform());
    };
    EntityObject.prototype.init = function () {
        this._componentManager.init();
        this._entityManager.init();
        return this;
    };
    EntityObject.prototype.render = function (renderer, camera) {
        var renderComponent = this._componentManager.getRenderComponent();
        if (renderComponent != void 0)
            renderComponent.render(renderer, this, camera);
        this.getChildren().forEach(function (child) {
            child.render(renderer, camera);
        });
    };
    EntityObject.prototype.dispose = function () {
        this._entityManager.dispose();
        return this;
    };
    EntityObject.prototype.hasChild = function (child) {
        return this._entityManager.hasChild(child);
    };
    EntityObject.prototype.addChild = function (child) {
        this._entityManager.addChild(child);
        return this;
    };
    EntityObject.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._entityManager.addChildren(args);
        return this;
    };
    EntityObject.prototype.forEach = function (func) {
        this._entityManager.forEach(func);
        return this;
    };
    EntityObject.prototype.filter = function (func) {
        return this._entityManager.filter(func);
    };
    EntityObject.prototype.getChildren = function () {
        return this._entityManager.getChildren();
    };
    EntityObject.prototype.getAllChildren = function () {
        return this._entityManager.getAllChildren();
    };
    EntityObject.prototype.getChild = function (index) {
        return this._entityManager.getChild(index);
    };
    EntityObject.prototype.findChildById = function (uid) {
        return this._entityManager.findChildById(uid);
    };
    EntityObject.prototype.findChildByName = function (name) {
        return this._entityManager.findChildByName(name);
    };
    EntityObject.prototype.findChildrenByName = function (name) {
        return this._entityManager.findChildrenByName(name);
    };
    EntityObject.prototype.removeChild = function (child) {
        return this._entityManager.removeChild(child);
    };
    EntityObject.prototype.removeAllChildren = function () {
        this._entityManager.removeAllChildren();
    };
    EntityObject.prototype.addComponent = function (component) {
        this._componentManager.addComponent(component);
    };
    EntityObject.prototype.getComponent = function (componentClass) {
        return this._componentManager.getComponent(componentClass);
    };
    EntityObject.prototype.hasComponent = function (componentClass) {
        return this._componentManager.hasComponent(componentClass);
    };
    EntityObject.prototype.removeComponent = function (component) {
        this._componentManager.removeComponent(component);
    };
    EntityObject.prototype.removeAllComponent = function () {
        this._componentManager.removeAllComponent();
    };
    return EntityObject;
}(Entity));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObject.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    GameObject.prototype.initWhenCreate = function () {
        _super.prototype.initWhenCreate.call(this);
        this.name = "GameObject" + this.uid;
    };
    GameObject.prototype.createTransform = function () {
        return Transform.create();
    };
    return GameObject;
}(EntityObject));

var create = function () {
    return GameObject.create();
};
var addComponent = function (gameObject, component) {
    gameObject.addComponent(component);
};
var getTransform = function (gameObject) {
    return gameObject.transform;
};
var translate = function (gameObject, x, y, z) {
    var transform = getTransform(gameObject);
    transform.translate(x, y, z);
};
var rotate = function (gameObject, angle, x, y, z) {
    var transform = getTransform(gameObject);
    transform.rotate(angle, x, y, z);
};

var Vector = (function () {
    function Vector(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 1; }
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    return Vector;
}());

var Camera = (function () {
    function Camera() {
        this._pMatrix = new Matrix4();
        this._vMatrix = new Matrix4();
        this.view = new Vector();
        this.entityObject = null;
    }
    Object.defineProperty(Camera.prototype, "near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "pMatrix", {
        get: function () {
            return this._pMatrix;
        },
        set: function (pMatrix) {
            this._pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "vMatrix", {
        get: function () {
            return this._vMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.translate = function (x, y, z) {
        this.view.x = x;
        this.view.y = y;
        this.view.z = z;
    };
    Camera.prototype.init = function () {
        this.updateProjectionMatrix();
    };
    return Camera;
}());

var __extends$13 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PerspectiveCamera = (function (_super) {
    __extends$13(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerspectiveCamera.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
        get: function () {
            return this._fovy;
        },
        set: function (fovy) {
            this._fovy = fovy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (aspect) {
            this._aspect = aspect;
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveCamera.prototype.updateProjectionMatrix = function () {
        this.pMatrix.perspective(this._fovy, this._aspect, this.near, this.far);
        this.vMatrix.lookAt(this.view.x, this.view.y, this.view.z, 0, 0, 0, 0, 1, 0);
    };
    return PerspectiveCamera;
}(Camera));

var createPerspectiveCamera = function () {
    return PerspectiveCamera.create();
};
var createCameraControll = function (cameraComponent) {
    return CameraController.create(cameraComponent);
};
var setCameraNear = function (camera, near) {
    camera.near = near;
};
var setCameraFar = function (camera, far) {
    camera.far = far;
};
var setPerspectiveCameraAspect = function (camera, aspect) {
    camera.aspect = aspect;
};
var setPerspectiveCameraFovy = function (camera, fovy) {
    camera.fovy = fovy;
};
var translate$1 = function (camera, x, y, z) {
    camera.translate(x, y, z);
};

var createCamera = function () {
    var camera = create(), cameraComponent = createPerspectiveCamera();
    var cameraControll = createCameraControll(cameraComponent);
    setCameraNear(cameraComponent, 1);
    setCameraFar(cameraComponent, 1000);
    setPerspectiveCameraAspect(cameraComponent, 1);
    setPerspectiveCameraFovy(cameraComponent, 45);
    translate$1(cameraComponent, 0, 0, -3);
    addComponent(camera, cameraControll);
    return camera;
};

var JudgeUtils_1$7 = createCommonjsModule(function (module, exports) {
"use strict";
var JudgeUtils = (function () {
    function JudgeUtils() {
    }
    JudgeUtils.isArray = function (arr) {
        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
        var length = arr && arr.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    JudgeUtils.isArrayExactly = function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    };
    JudgeUtils.isNumber = function (num) {
        return typeof num == "number";
    };
    JudgeUtils.isNumberExactly = function (num) {
        return Object.prototype.toString.call(num) === "[object Number]";
    };
    JudgeUtils.isString = function (str) {
        return typeof str == "string";
    };
    JudgeUtils.isStringExactly = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };
    JudgeUtils.isBoolean = function (bool) {
        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
    };
    JudgeUtils.isDom = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    JudgeUtils.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    /**
     * 判断是否为对象字面量（{}）
     */
    JudgeUtils.isDirectObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
    /**
     * 检查宿主对象是否可调用
     *
     * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
     环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

     该方法用于特性检测，判断对象是否可用。用法如下：

     MyEngine addEvent():
     if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
        dom.addEventListener(sEventType, fnHandler, false);
        }
     */
    JudgeUtils.isHostMethod = function (object, property) {
        var type = typeof object[property];
        return type === "function" ||
            (type === "object" && !!object[property]);
        // || type == "unknown";
    };
    JudgeUtils.isNodeJs = function () {
        return ((typeof commonjsGlobal != "undefined" && commonjsGlobal.module) || ('object' != "undefined")) && 'object' != "undefined";
    };
    //overwrite it in the end of this file
    JudgeUtils.isFunction = function (func) {
        return true;
    };
    return JudgeUtils;
}());
exports.JudgeUtils = JudgeUtils;
// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), and in Safari 8 (#1929).
if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    JudgeUtils.isFunction = function (func) {
        return typeof func == 'function';
    };
}
else {
    JudgeUtils.isFunction = function (func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    };
}

});

var $BREAK$1 = {
    break: true
};
var $REMOVE$1 = void 0;


var Const$2 = {
	$BREAK: $BREAK$1,
	$REMOVE: $REMOVE$1
};

var JudgeUtils_1$6 = JudgeUtils_1$7;
var Const_1$3 = Const$2;
var List$1 = (function () {
    function List() {
        this.children = null;
    }
    List.prototype.getCount = function () {
        return this.children.length;
    };
    List.prototype.hasChild = function (child) {
        var c = null, children = this.children;
        for (var i = 0, len = children.length; i < len; i++) {
            c = children[i];
            if (child.uid && c.uid && child.uid == c.uid) {
                return true;
            }
            else if (child === c) {
                return true;
            }
        }
        return false;
    };
    List.prototype.hasChildWithFunc = function (func) {
        for (var i = 0, len = this.children.length; i < len; i++) {
            if (func(this.children[i], i)) {
                return true;
            }
        }
        return false;
    };
    List.prototype.getChildren = function () {
        return this.children;
    };
    List.prototype.getChild = function (index) {
        return this.children[index];
    };
    List.prototype.addChild = function (child) {
        this.children.push(child);
        return this;
    };
    List.prototype.addChildren = function (arg) {
        if (JudgeUtils_1$6.JudgeUtils.isArray(arg)) {
            var children = arg;
            this.children = this.children.concat(children);
        }
        else if (arg instanceof List) {
            var children = arg;
            this.children = this.children.concat(children.getChildren());
        }
        else {
            var child = arg;
            this.addChild(child);
        }
        return this;
    };
    //todo test
    List.prototype.setChildren = function (children) {
        this.children = children;
        return this;
    };
    List.prototype.unShiftChild = function (child) {
        this.children.unshift(child);
    };
    List.prototype.removeAllChildren = function () {
        this.children = [];
        return this;
    };
    List.prototype.forEach = function (func, context) {
        this._forEach(this.children, func, context);
        return this;
    };
    //public removeChildAt (index) {
    //    Log.error(index < 0, "序号必须大于等于0");
    //
    //    this.children.splice(index, 1);
    //}
    //
    List.prototype.toArray = function () {
        return this.children;
    };
    List.prototype.copyChildren = function () {
        return this.children.slice(0);
    };
    List.prototype.removeChildHelper = function (arg) {
        var result = null;
        if (JudgeUtils_1$6.JudgeUtils.isFunction(arg)) {
            var func = arg;
            result = this._removeChild(this.children, func);
        }
        else if (arg.uid) {
            result = this._removeChild(this.children, function (e) {
                if (!e.uid) {
                    return false;
                }
                return e.uid === arg.uid;
            });
        }
        else {
            result = this._removeChild(this.children, function (e) {
                return e === arg;
            });
        }
        return result;
    };
    List.prototype._forEach = function (arr, func, context) {
        var scope = context, i = 0, len = arr.length;
        for (i = 0; i < len; i++) {
            if (func.call(scope, arr[i], i) === Const_1$3.$BREAK) {
                break;
            }
        }
    };
    List.prototype._removeChild = function (arr, func) {
        var self = this, removedElementArr = [], remainElementArr = [];
        this._forEach(arr, function (e, index) {
            if (!!func.call(self, e)) {
                removedElementArr.push(e);
            }
            else {
                remainElementArr.push(e);
            }
        });
        this.children = remainElementArr;
        return removedElementArr;
    };
    return List;
}());
var List_2$1 = List$1;


var List_1$4 = {
	List: List_2$1
};

var __extends$15 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var List_1$3 = List_1$4;
var Queue = (function (_super) {
    __extends$15(Queue, _super);
    function Queue(children) {
        if (children === void 0) { children = []; }
        _super.call(this);
        this.children = children;
    }
    Queue.create = function (children) {
        if (children === void 0) { children = []; }
        var obj = new this(children);
        return obj;
    };
    Object.defineProperty(Queue.prototype, "front", {
        get: function () {
            return this.children[this.children.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queue.prototype, "rear", {
        get: function () {
            return this.children[0];
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.push = function (element) {
        this.children.unshift(element);
    };
    Queue.prototype.pop = function () {
        return this.children.pop();
    };
    Queue.prototype.clear = function () {
        this.removeAllChildren();
    };
    return Queue;
}(List_1$3.List));
var Queue_2 = Queue;

var WebglState = (function () {
    function WebglState() {
    }
    WebglState.create = function () {
        var obj = new this();
        return obj;
    };
    WebglState.prototype.setClearColor = function (r, g, b, a) {
        var gl = Device.getInstance().gl;
        gl.clearColor(r, g, b, a);
    };
    WebglState.prototype.init = function () {
        this._depthTest();
        this._clear();
    };
    WebglState.prototype._depthTest = function () {
        var gl = Device.getInstance().gl;
        gl.enable(gl.DEPTH_TEST);
    };
    WebglState.prototype._clear = function () {
        var gl = Device.getInstance().gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    return WebglState;
}());

var Renderer = (function () {
    function Renderer() {
        this._wegbglState = WebglState.create();
    }
    Object.defineProperty(Renderer.prototype, "webglState", {
        get: function () {
            return this._wegbglState;
        },
        set: function (webglState) {
            this._wegbglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.setClearColor = function (r, g, b, a) {
        this._wegbglState.setClearColor(r, g, b, a);
    };
    return Renderer;
}());

var __extends$14 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WebglRenderer = (function (_super) {
    __extends$14(WebglRenderer, _super);
    function WebglRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._commandQueue = new Queue_2();
        return _this;
    }
    WebglRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    WebglRenderer.prototype.init = function () {
        this.webglState.init();
    };
    WebglRenderer.prototype.render = function () {
        this._commandQueue.forEach(function (renderCmd) {
            renderCmd.draw();
        });
    };
    WebglRenderer.prototype.addCommand = function (renderCmd) {
        this._commandQueue.addChild(renderCmd);
    };
    WebglRenderer.prototype.hasCommand = function () {
        return this._commandQueue.getCount() > 0;
    };
    return WebglRenderer;
}(Renderer));

var __extends$17 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObjectScene = (function (_super) {
    __extends$17(GameObjectScene, _super);
    function GameObjectScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObjectScene.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Object.defineProperty(GameObjectScene.prototype, "currentCamera", {
        get: function () {
            return this._currentCamera;
        },
        enumerable: true,
        configurable: true
    });
    GameObjectScene.prototype.initWhenCreate = function () {
        this.name = "GameObjectScene" + this.uid;
    };
    GameObjectScene.prototype.render = function (renderer) {
        _super.prototype.render.call(this, renderer, this.currentCamera);
    };
    GameObjectScene.prototype.addChild = function (child) {
        if (child.hasComponent(CameraController)) {
            this._currentCamera = child;
        }
        _super.prototype.addChild.call(this, child);
        return this;
    };
    GameObjectScene.prototype.createTransform = function () {
        return null;
    };
    return GameObjectScene;
}(EntityObject));

var __extends$16 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scene = (function (_super) {
    __extends$16(Scene, _super);
    function Scene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameObjectScene = GameObjectScene.create();
        return _this;
    }
    Scene.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Scene.prototype.initWhenCreate = function () {
        this.name = "Scene" + this.uid;
    };
    Scene.prototype.createTransform = function () {
        return null;
    };
    Scene.prototype.addChild = function (child) {
        if (child instanceof GameObject) {
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;
        return this;
    };
    return Scene;
}(EntityObject));

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Director = (function () {
    function Director() {
        this.renderer = null;
        this.scene = null;
    }
    Director.getInstance = function () { };
    Director.prototype.initWhenCreate = function () {
        this.renderer = WebglRenderer.create();
        this.scene = Scene.create();
    };
    Director.prototype.init = function () {
        this.renderer.init();
        this.scene.gameObjectScene.init();
    };
    Director.prototype.Render = function () {
        this.scene.gameObjectScene.render(this.renderer);
        this.renderer.render();
    };
    Director.prototype.start = function () {
        this.init();
        this.Render();
    };
    return Director;
}());
Director = __decorate$2([
    singleton(true)
], Director);

var getDirector = function () {
    return Director.getInstance();
};
var init = function () {
    getDirector().init();
};
var render = function () {
    getDirector().Render();
};
var setClearColor = function (r, g, b, a) {
    getDirector().renderer.setClearColor(r, b, g, a);
};

var directorRender = render;
var directorInit = init;
var directorSetClearColor = setClearColor;

var objectTranslate = translate;
var objectRotate = rotate;

var Main = (function () {
    function Main() {
    }
    Main.setCanvas = function (canvasId, parentId) {
        this._parentId = parentId;
        this._canvasId = canvasId;
        this._config = {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        };
        return this;
    };
    Main.init = function () {
        Device.getInstance().createGL(this._canvasId, this._config, this._parentId);
        Device.getInstance().setScreen();
        return this;
    };
    return Main;
}());
Main._parentId = null;

var init$1 = function (webglId, parentId) {
    Main.setCanvas(webglId, parentId).init();
};

var mainInit = init$1;

var Color = (function () {
    function Color() {
        this._r = null;
        this._g = null;
        this._b = null;
        this._a = null;
    }
    Color.create = function (colorVal) {
        var obj = new this();
        obj.initWhenCreate(colorVal);
        return obj;
    };
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (r) {
            if (this._r !== r)
                this._r = r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._g;
        },
        set: function (g) {
            if (this._g !== g)
                this._g = g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._b;
        },
        set: function (b) {
            if (this._b !== b)
                this._b = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: function () {
            return this._a;
        },
        set: function (a) {
            if (this._a !== a)
                this._a = a;
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.initWhenCreate = function (colorVal) {
        if (colorVal == void 0)
            return;
        this._setColor(colorVal);
    };
    Color.prototype.toArray = function () {
        return [this.r, this.g, this.b];
    };
    Color.prototype._setColor = function (colorVal) {
        var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i, REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i, REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i, REGEX_NUM = /^\#([0-9a-f]{6})$/i;
        var color = null;
        if (REGEX_RGBA.test(colorVal)) {
            color = REGEX_RGBA.exec(colorVal);
            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = Number(color[4]);
            return this;
        }
        if (REGEX_RGBA_2.test(colorVal)) {
            color = REGEX_RGBA_2.exec(colorVal);
            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = Number(color[4]);
            return this;
        }
        if (REGEX_RGB.test(colorVal)) {
            color = REGEX_RGB.exec(colorVal);
            this.r = this._getColorValue(color, 1);
            this.g = this._getColorValue(color, 2);
            this.b = this._getColorValue(color, 3);
            this.a = 1;
            return this;
        }
        if (REGEX_RGB_2.test(colorVal)) {
            color = REGEX_RGB_2.exec(colorVal);
            this.r = parseFloat(color[1]);
            this.g = parseFloat(color[2]);
            this.b = parseFloat(color[3]);
            this.a = 1;
            return this;
        }
        if (REGEX_NUM.test(colorVal)) {
            color = REGEX_NUM.exec(colorVal);
            this._setHex(parseInt(color[1], 16));
            return this;
        }
    };
    Color.prototype._getColorValue = function (color, index, num) {
        if (num === void 0) { num = 255; }
        return Math.min(num, parseInt(color[index], 10)) / num;
    };
    Color.prototype._setHex = function (hex) {
        hex = Math.floor(hex);
        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;
        this.a = 1;
        return this;
    };
    return Color;
}());

var Material = (function () {
    function Material() {
        this._color = Color.create("#ffffff");
        this.opacity = 1.0;
        this._shader = null;
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            return this._shader.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (this._color !== color) {
                this._color = color;
            }
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.initWhenCreate = function () {
        this._shader = this.getShader();
    };
    Material.prototype.init = function () {
        this._shader.init();
    };
    Material.prototype.update = function (cmd) {
        this._shader.update(cmd, this);
    };
    return Material;
}());

var EVariableType;
(function (EVariableType) {
    EVariableType[EVariableType["FLOAT_1"] = "FLOAT_1"] = "FLOAT_1";
    EVariableType[EVariableType["FLOAT_2"] = "FLOAT_2"] = "FLOAT_2";
    EVariableType[EVariableType["FLOAT_3"] = "FLOAT_3"] = "FLOAT_3";
    EVariableType[EVariableType["FLOAT_4"] = "FLOAT_4"] = "FLOAT_4";
    EVariableType[EVariableType["VECTOR_2"] = "VECTOR_2"] = "VECTOR_2";
    EVariableType[EVariableType["VECTOR_3"] = "VECTOR_3"] = "VECTOR_3";
    EVariableType[EVariableType["VECTOR_4"] = "VECTOR_4"] = "VECTOR_4";
    EVariableType[EVariableType["COLOR_3"] = "COLOR_3"] = "COLOR_3";
    EVariableType[EVariableType["FLOAT_MAT3"] = "FLOAT_MAT3"] = "FLOAT_MAT3";
    EVariableType[EVariableType["FLOAT_MAT4"] = "FLOAT_MAT4"] = "FLOAT_MAT4";
    EVariableType[EVariableType["BUFFER"] = "BUFFER"] = "BUFFER";
    EVariableType[EVariableType["SAMPLER_CUBE"] = "SAMPLER_CUBE"] = "SAMPLER_CUBE";
    EVariableType[EVariableType["SAMPLER_2D"] = "SAMPLER_2D"] = "SAMPLER_2D";
    EVariableType[EVariableType["NUMBER_1"] = "NUMBER_1"] = "NUMBER_1";
    EVariableType[EVariableType["STRUCTURE"] = "STRUCTURE"] = "STRUCTURE";
    EVariableType[EVariableType["STRUCTURES"] = "STRUCTURES"] = "STRUCTURES";
    EVariableType[EVariableType["SAMPLER_ARRAY"] = "SAMPLER_ARRAY"] = "SAMPLER_ARRAY";
    EVariableType[EVariableType["FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY";
})(EVariableType || (EVariableType = {}));

var GLSLDataSender = (function () {
    function GLSLDataSender(_program) {
        this._program = _program;
        this._getUniformLocationCache = {};
        this._toSendBufferArr = [];
    }
    GLSLDataSender.create = function (program) {
        var obj = new this(program);
        return obj;
    };
    GLSLDataSender.prototype.addBufferToSendList = function (pos, buffer) {
        this._toSendBufferArr[pos] = buffer;
    };
    GLSLDataSender.prototype.sendAllBufferData = function () {
        for (var pos = 0, len = this._toSendBufferArr.length; pos < len; pos++) {
            this.sendBuffer(pos, this._toSendBufferArr[pos]);
        }
    };
    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
        this._getGl().bindBuffer(this._getGl().ARRAY_BUFFER, buffer.buffer);
        this._getGl().vertexAttribPointer(pos, buffer.size, this._getGl()[buffer.type], false, 0, 0);
        this._getGl().enableVertexAttribArray(pos);
    };
    GLSLDataSender.prototype.sendFloat1 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform1f(uniform, data);
    };
    GLSLDataSender.prototype.sendFloat2 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform2f(uniform, data[0], data[1]);
    };
    GLSLDataSender.prototype.sendFloat3 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform3f(uniform, data[0], data[1], data[2]);
    };
    GLSLDataSender.prototype.sendFloat4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform4f(uniform, data[0], data[1], data[2], data[3]);
    };
    GLSLDataSender.prototype.sendVector2 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform2f(uniform, data.x, data.y);
    };
    GLSLDataSender.prototype.sendVector3 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform3f(uniform, data.x, data.y, data.z);
    };
    GLSLDataSender.prototype.sendVector4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform4f(uniform, data.x, data.y, data.z, data.w);
    };
    GLSLDataSender.prototype.sendNum1 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform1i(uniform, data);
    };
    GLSLDataSender.prototype.sendMatrix4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniformMatrix4fv(uniform, false, data.elements);
    };
    GLSLDataSender.prototype.sendMatrix4Array = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniformMatrix4fv(uniform, false, data);
    };
    GLSLDataSender.prototype.getUniformLocation = function (name) {
        if (this._getUniformLocationCache[name] != void 0) {
            return this._getUniformLocationCache[name];
        }
        var uniform = this._getGl().getUniformLocation(this._program.glProgram, name);
        if (uniform == void 0) {
            throw new TypeError("the uniform is not find");
        }
        this._getUniformLocationCache[name] = uniform;
        return uniform;
    };
    GLSLDataSender.prototype._getGl = function () {
        return Device.getInstance().gl;
    };
    return GLSLDataSender;
}());

var __extends$21 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Program = (function (_super) {
    __extends$21(Program, _super);
    function Program() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.glProgram = null;
        _this._attributeList = new Hash_2();
        _this._glslSend = GLSLDataSender.create(_this);
        return _this;
    }
    Program.create = function () {
        var obj = new this();
        return obj;
    };
    Program.prototype.use = function () {
        this._getGl().useProgram(this.glProgram);
    };
    Program.prototype.getAttribLocation = function (name) {
        var pos = this._attributeList.getChild(name);
        if (pos !== void 0)
            return pos;
        var attribute = this._getGl().getAttribLocation(this.glProgram, name);
        this._attributeList.addChild(name, attribute);
        return attribute;
    };
    Program.prototype.getUniformLocation = function (name) {
        return this._glslSend.getUniformLocation(name);
    };
    Program.prototype.sendAttributeBuffer = function (name, buffer) {
        var pos = this.getAttribLocation(name);
        if (pos == -1) {
            throw new TypeError("the attribute is not find");
        }
        
        this._glslSend.addBufferToSendList(pos, buffer);
    };
    Program.prototype.sendAllBufferData = function () {
        this._glslSend.sendAllBufferData();
    };
    Program.prototype.sendUniformData = function (name, type, data) {
        if (data === null) {
            return;
        }
        switch (type) {
            case EVariableType.FLOAT_1:
                this._glslSend.sendFloat1(name, data);
                break;
            case EVariableType.FLOAT_2:
                this._glslSend.sendFloat2(name, data);
                break;
            case EVariableType.FLOAT_3:
                this._glslSend.sendFloat3(name, data);
                break;
            case EVariableType.FLOAT_4:
                this._glslSend.sendFloat4(name, data);
                break;
            case EVariableType.VECTOR_2:
                this._glslSend.sendVector2(name, data);
                break;
            case EVariableType.VECTOR_3:
                this._glslSend.sendVector3(name, data);
                break;
            case EVariableType.VECTOR_4:
                this._glslSend.sendVector4(name, data);
                break;
            case EVariableType.FLOAT_MAT4:
                this._glslSend.sendMatrix4(name, data);
                break;
            case EVariableType.NUMBER_1:
            case EVariableType.SAMPLER_CUBE:
            case EVariableType.SAMPLER_2D:
                this._glslSend.sendNum1(name, data);
                break;
            case EVariableType.FLOAT_MAT4_ARRAY:
                this._glslSend.sendMatrix4Array(name, data);
                break;
            default:
                console.log("the type is not find");
                break;
        }
    };
    Program.prototype.sendFloat1 = function (name, data) {
        this._glslSend.sendFloat1(name, data);
    };
    Program.prototype.sendFloat2 = function (name, data) {
        this._glslSend.sendFloat2(name, data);
    };
    Program.prototype.sendFloat3 = function (name, data) {
        this._glslSend.sendFloat3(name, data);
    };
    Program.prototype.sendFloat4 = function (name, data) {
        this._glslSend.sendFloat4(name, data);
    };
    Program.prototype.sendVector2 = function (name, data) {
        this._glslSend.sendVector2(name, data);
    };
    Program.prototype.sendVector3 = function (name, data) {
        this._glslSend.sendVector3(name, data);
    };
    Program.prototype.sendVector4 = function (name, data) {
        this._glslSend.sendVector4(name, data);
    };
    Program.prototype.sendNum1 = function (name, data) {
        this._glslSend.sendNum1(name, data);
    };
    Program.prototype.sendMatrix4 = function (name, data) {
        this._glslSend.sendMatrix4(name, data);
    };
    Program.prototype.sendMatrix4Array = function (name, data) {
        this._glslSend.sendMatrix4Array(name, data);
    };
    Program.prototype.initProgramWithShader = function (shader) {
        var gl = Device.getInstance().gl;
        var program = gl.createProgram();
        var vshader = this._loadShader(gl, gl.VERTEX_SHADER, shader.VSource);
        var fshader = this._loadShader(gl, gl.FRAGMENT_SHADER, shader.FSource);
        if (!vshader || !fshader) {
            return;
        }
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var err = gl.getProgramInfoLog(program);
            console.log("faild to link _program:" + err);
            gl.deleteProgram(program);
            gl.deleteShader(vshader);
            gl.deleteShader(vshader);
            return;
        }
        if (!program)
            console.log("program error");
        this.glProgram = program;
    };
    Program.prototype._loadShader = function (gl, type, value) {
        var shader = gl.createShader(type);
        if (shader == null) {
            console.log("unable to create shader");
            return;
        }
        gl.shaderSource(shader, value);
        gl.compileShader(shader);
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log("faild to compile shader:" + error);
            gl.deleteShader(shader);
            return;
        }
        return shader;
    };
    Program.prototype._getGl = function () {
        return Device.getInstance().gl;
    };
    return Program;
}(Entity));

var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_position = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.VERTICE
};
VariableLib.a_color = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.COLOR
};
VariableLib.a_normal = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.NORMAL
};
VariableLib.u_color = {
    type: EVariableType.FLOAT_3,
    buffer: "color"
};
VariableLib.u_a = {
    type: EVariableType.FLOAT_1,
    buffer: "opacity"
};
VariableLib.u_mMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "mMatrix"
};
VariableLib.u_vMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "vMatrix"
};
VariableLib.u_pMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "pMatrix"
};
VariableLib.u_mvpMatrix = {
    type: EVariableType.FLOAT_MAT4,
};

var __extends$20 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shader = (function (_super) {
    __extends$20(Shader, _super);
    function Shader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.program = Program.create();
        _this._shaderLib = _this.createShaderLib();
        return _this;
    }
    Object.defineProperty(Shader.prototype, "VSource", {
        get: function () {
            return this._shaderLib.VSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "FSource", {
        get: function () {
            return this._shaderLib.FSource;
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.init = function () {
        this.initProgram();
        this._shaderLib.init();
    };
    Shader.prototype.sendAttributeBuffer = function (name, data) {
        this.program.sendAttributeBuffer(name, data);
    };
    Shader.prototype.sendUniformData = function (name, data) {
        this.program.sendUniformData(name, VariableLib[name].type, data);
    };
    return Shader;
}(Component));

var ShaderLib = (function () {
    function ShaderLib() {
        this._attributes = [];
        this._uniforms = [];
    }
    ShaderLib.prototype.getAttributes = function () {
        return this._attributes;
    };
    ShaderLib.prototype.getUniforms = function () {
        return this._uniforms;
    };
    
    return ShaderLib;
}());

var __extends$22 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicShaderLib = (function (_super) {
    __extends$22(BasicShaderLib, _super);
    function BasicShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSource = "attribute vec4 a_position;" +
            "uniform mat4 u_mMatrix;" +
            "uniform mat4 u_vMatrix;" +
            "uniform mat4 u_pMatrix;" +
            "void main(){" +
            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
            "}";
        _this.FSource = "#ifdef GL_ES\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "uniform vec3 u_color;" +
            "uniform float u_a;" +
            "void main(){" +
            "   gl_FragColor = vec4(u_color,u_a);" +
            "}";
        return _this;
    }
    BasicShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    BasicShaderLib.prototype.init = function () {
        this._attributes.push("a_position");
        this._uniforms.push("u_color");
        this._uniforms.push("u_a");
        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    };
    return BasicShaderLib;
}(ShaderLib));

var __extends$19 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicShader = (function (_super) {
    __extends$19(BasicShader, _super);
    function BasicShader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicShader.create = function () {
        var obj = new this();
        return obj;
    };
    BasicShader.prototype.initProgram = function () {
        this.program.initProgramWithShader(this);
    };
    BasicShader.prototype.createShaderLib = function () {
        return BasicShaderLib.create();
    };
    BasicShader.prototype.update = function (cmd, material) {
        var _this = this;
        this.program.use();
        this._shaderLib.getAttributes().forEach(function (item) {
            var buffer = cmd.buffers.getChild(VariableLib[item].buffer);
            _this.sendAttributeBuffer(item, buffer);
        });
        this.program.sendAllBufferData();
        this._shaderLib.getUniforms().forEach(function (item) {
            _this.sendUniformData(item, cmd[VariableLib[item].buffer]);
        });
    };
    return BasicShader;
}(Shader));

var __extends$18 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BasicMaterial = (function (_super) {
    __extends$18(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicMaterial.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    BasicMaterial.prototype.getShader = function () {
        return BasicShader.create();
    };
    return BasicMaterial;
}(Material));

var createBasic = function () {
    return BasicMaterial.create();
};
var setMaterialColor = function (material, color) {
    material.color = color;
};
var setMaterialOpacity = function (material, opacity) {
    material.opacity = opacity;
};

var create$1 = function () {
    return MeshRenderer.create();
};

var create$2 = function (webColor) {
    return Color.create(webColor);
};

var __extends$23 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TriangleGeometry = (function (_super) {
    __extends$23(TriangleGeometry, _super);
    function TriangleGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 1;
        _this.height = 1;
        return _this;
    }
    TriangleGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    TriangleGeometry.prototype.computeData = function () {
        var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertice = null, texCoord = null, indice = null, color = null, normal = null;
        vertice = [
            0.0, up, 0,
            left, down, 0,
            right, down, 0
        ];
        indice = [
            0, 1, 2
        ];
        texCoord = [
            0.5, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];
        normal = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
        return {
            vertice: vertice,
            texCoord: texCoord,
            normal: normal,
            indice: indice
        };
    };
    return TriangleGeometry;
}(Geometry));

var __extends$24 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoxGeometry = (function (_super) {
    __extends$24(BoxGeometry, _super);
    function BoxGeometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoxGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    BoxGeometry.prototype.computeData = function () {
        var vertices = [], texCoords = [], normals = [], indices = [];
        normals = [
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0
        ];
        indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];
        texCoords = [
            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
        ];
        vertices = [
            1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
            1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
            1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,
            -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
            1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0
        ];
        return {
            vertice: vertices,
            texCoord: texCoords,
            indice: indices,
            normal: normals
        };
    };
    return BoxGeometry;
}(Geometry));

var setMaterial = function (geometry, material) {
    geometry.material = material;
};
var createTriangle$1 = function () {
    return TriangleGeometry.create();
};
var createBox$1 = function () {
    return BoxGeometry.create();
};

var createTriangle$$1 = function (material) {
    var mat = null, geo = null, obj = null;
    if (material) {
        mat = material;
    }
    else {
        mat = createBasic();
        setMaterialColor(mat, create$2("#ff0000"));
        setMaterialOpacity(mat, 1);
    }
    geo = createTriangle$1();
    setMaterial(geo, mat);
    obj = create();
    addComponent(obj, geo);
    addComponent(obj, create$1());
    return obj;
};
var createBox$$1 = function (material) {
    var mat = null, geo = null, obj = null;
    if (material) {
        mat = material;
    }
    else {
        mat = createBasic();
        setMaterialColor(mat, create$2("#ff0000"));
        setMaterialOpacity(mat, 1);
    }
    geo = createBox$1();
    setMaterial(geo, mat);
    obj = create();
    addComponent(obj, geo);
    addComponent(obj, create$1());
    return obj;
};

var getScene = function () {
    return getDirector().scene;
};


var addGameObject = function (gameObject) {
    getScene().addChild(gameObject);
};

var addSceneChildren = addGameObject;

var _describeContext = null;
function assert(cond, message) {
    if (message === void 0) { message = "contract error"; }
    console.log("contract success =", cond, ",", message);
}

function it(message, func, context) {
    try {
        if (arguments.length === 3) {
            func.call(context, null);
        }
        else {
            if (_describeContext) {
                func.call(_describeContext, null);
            }
            else {
                func();
            }
        }
    }
    catch (e) {
        assert(false, message + "->" + e.message);
    }
}

function requireCheckFunc(checkFunc, bodyFunc) {
    return function () {
        var paramArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paramArr[_i] = arguments[_i];
        }
        checkFunc.apply(null, paramArr);
        return bodyFunc.apply(null, paramArr);
    };
}

var wdet = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	factory(exports);
}(commonjsGlobal, (function (exports) { 'use strict';

	function __extends(d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var ExpectData = (function () {
	    function ExpectData() {
	    }
	    return ExpectData;
	}());
	ExpectData.assertion = null;
	ExpectData.source = null;
	ExpectData.isNot = null;

	var JudgeUtils = (function () {
	    function JudgeUtils() {
	    }
	    JudgeUtils.isArray = function (arr) {
	        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	        var length = arr && arr.length;
	        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	    };
	    JudgeUtils.isArrayExactly = function (arr) {
	        return Object.prototype.toString.call(arr) === "[object Array]";
	    };
	    JudgeUtils.isNumber = function (num) {
	        return typeof num == "number";
	    };
	    JudgeUtils.isNumberExactly = function (num) {
	        return Object.prototype.toString.call(num) === "[object Number]";
	    };
	    JudgeUtils.isString = function (str) {
	        return typeof str == "string";
	    };
	    JudgeUtils.isStringExactly = function (str) {
	        return Object.prototype.toString.call(str) === "[object String]";
	    };
	    JudgeUtils.isBoolean = function (bool) {
	        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
	    };
	    JudgeUtils.isDom = function (obj) {
	        return !!(obj && obj.nodeType === 1);
	    };
	    JudgeUtils.isObject = function (obj) {
	        var type = typeof obj;
	        return type === 'function' || type === 'object' && !!obj;
	    };
	    JudgeUtils.isDirectObject = function (obj) {
	        return Object.prototype.toString.call(obj) === "[object Object]";
	    };
	    JudgeUtils.isHostMethod = function (object, property) {
	        var type = typeof object[property];
	        return type === "function" ||
	            (type === "object" && !!object[property]);
	    };
	    JudgeUtils.isNodeJs = function () {
	        return ((typeof commonjsGlobal != "undefined" && commonjsGlobal.module) || ('object' != "undefined")) && 'object' != "undefined";
	    };
	    JudgeUtils.isFunction = function (func) {
	        return true;
	    };
	    return JudgeUtils;
	}());
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    JudgeUtils.isFunction = function (func) {
	        return typeof func == 'function';
	    };
	}
	else {
	    JudgeUtils.isFunction = function (func) {
	        return Object.prototype.toString.call(func) === "[object Function]";
	    };
	}

	var $BREAK = {
	    break: true
	};
	var $REMOVE = void 0;

	var List = (function () {
	    function List() {
	        this.children = null;
	    }
	    List.prototype.getCount = function () {
	        return this.children.length;
	    };
	    List.prototype.hasChild = function (child) {
	        var c = null, children = this.children;
	        for (var i = 0, len = children.length; i < len; i++) {
	            c = children[i];
	            if (child.uid && c.uid && child.uid == c.uid) {
	                return true;
	            }
	            else if (child === c) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.hasChildWithFunc = function (func) {
	        for (var i = 0, len = this.children.length; i < len; i++) {
	            if (func(this.children[i], i)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.getChildren = function () {
	        return this.children;
	    };
	    List.prototype.getChild = function (index) {
	        return this.children[index];
	    };
	    List.prototype.addChild = function (child) {
	        this.children.push(child);
	        return this;
	    };
	    List.prototype.addChildren = function (arg) {
	        if (JudgeUtils.isArray(arg)) {
	            var children = arg;
	            this.children = this.children.concat(children);
	        }
	        else if (arg instanceof List) {
	            var children = arg;
	            this.children = this.children.concat(children.getChildren());
	        }
	        else {
	            var child = arg;
	            this.addChild(child);
	        }
	        return this;
	    };
	    List.prototype.setChildren = function (children) {
	        this.children = children;
	        return this;
	    };
	    List.prototype.unShiftChild = function (child) {
	        this.children.unshift(child);
	    };
	    List.prototype.removeAllChildren = function () {
	        this.children = [];
	        return this;
	    };
	    List.prototype.forEach = function (func, context) {
	        this._forEach(this.children, func, context);
	        return this;
	    };
	    List.prototype.toArray = function () {
	        return this.children;
	    };
	    List.prototype.copyChildren = function () {
	        return this.children.slice(0);
	    };
	    List.prototype.removeChildHelper = function (arg) {
	        var result = null;
	        if (JudgeUtils.isFunction(arg)) {
	            var func = arg;
	            result = this._removeChild(this.children, func);
	        }
	        else if (arg.uid) {
	            result = this._removeChild(this.children, function (e) {
	                if (!e.uid) {
	                    return false;
	                }
	                return e.uid === arg.uid;
	            });
	        }
	        else {
	            result = this._removeChild(this.children, function (e) {
	                return e === arg;
	            });
	        }
	        return result;
	    };
	    List.prototype._forEach = function (arr, func, context) {
	        var scope = context, i = 0, len = arr.length;
	        for (i = 0; i < len; i++) {
	            if (func.call(scope, arr[i], i) === $BREAK) {
	                break;
	            }
	        }
	    };
	    List.prototype._removeChild = function (arr, func) {
	        var self = this, removedElementArr = [], remainElementArr = [];
	        this._forEach(arr, function (e, index) {
	            if (!!func.call(self, e)) {
	                removedElementArr.push(e);
	            }
	            else {
	                remainElementArr.push(e);
	            }
	        });
	        this.children = remainElementArr;
	        return removedElementArr;
	    };
	    return List;
	}());

	var ExtendUtils = (function () {
	    function ExtendUtils() {
	    }
	    ExtendUtils.extendDeep = function (parent, child, filter) {
	        if (filter === void 0) { filter = function (val, i) { return true; }; }
	        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
	        if (toStr.call(parent) === sArr) {
	            _child = child || [];
	            for (i = 0, len = parent.length; i < len; i++) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else if (toStr.call(parent) === sOb) {
	            _child = child || {};
	            for (i in parent) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else {
	            _child = parent;
	        }
	        return _child;
	    };
	    ExtendUtils.extend = function (destination, source) {
	        var property = "";
	        for (property in source) {
	            destination[property] = source[property];
	        }
	        return destination;
	    };
	    ExtendUtils.copyPublicAttri = function (source) {
	        var property = null, destination = {};
	        this.extendDeep(source, destination, function (item, property) {
	            return property.slice(0, 1) !== "_"
	                && !JudgeUtils.isFunction(item);
	        });
	        return destination;
	    };
	    return ExtendUtils;
	}());

	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Collection.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Collection.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Collection.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils.isBoolean(args[0])) {
	                target = Collection.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils.extendDeep(this.children));
	        }
	        else {
	            target.setChildren(ExtendUtils.extend([], this.children));
	        }
	        return target;
	    };
	    Collection.prototype.filter = function (func) {
	        var children = this.children, result = [], value = null;
	        for (var i = 0, len = children.length; i < len; i++) {
	            value = children[i];
	            if (func.call(children, value, i)) {
	                result.push(value);
	            }
	        }
	        return Collection.create(result);
	    };
	    Collection.prototype.findOne = function (func) {
	        var scope = this.children, result = null;
	        this.forEach(function (value, index) {
	            if (!func.call(scope, value, index)) {
	                return;
	            }
	            result = value;
	            return $BREAK;
	        });
	        return result;
	    };
	    Collection.prototype.reverse = function () {
	        return Collection.create(this.copyChildren().reverse());
	    };
	    Collection.prototype.removeChild = function (arg) {
	        return Collection.create(this.removeChildHelper(arg));
	    };
	    Collection.prototype.sort = function (func, isSortSelf) {
	        if (isSortSelf === void 0) { isSortSelf = false; }
	        if (isSortSelf) {
	            this.children.sort(func);
	            return this;
	        }
	        return Collection.create(this.copyChildren().sort(func));
	    };
	    Collection.prototype.map = function (func) {
	        var resultArr = [];
	        this.forEach(function (e, index) {
	            var result = func(e, index);
	            if (result !== $REMOVE) {
	                resultArr.push(result);
	            }
	        });
	        return Collection.create(resultArr);
	    };
	    Collection.prototype.removeRepeatItems = function () {
	        var noRepeatList = Collection.create();
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                return;
	            }
	            noRepeatList.addChild(item);
	        });
	        return noRepeatList;
	    };
	    Collection.prototype.hasRepeatItems = function () {
	        var noRepeatList = Collection.create(), hasRepeat = false;
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                hasRepeat = true;
	                return $BREAK;
	            }
	            noRepeatList.addChild(item);
	        });
	        return hasRepeat;
	    };
	    return Collection;
	}(List));

	var Log = (function () {
	    function Log() {
	    }
	    Log.log = function () {
	        var messages = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            messages[_i] = arguments[_i];
	        }
	        if (!this._exec("log", messages)) {
	            root.alert(messages.join(","));
	        }
	        this._exec("trace", messages);
	    };
	    Log.assert = function (cond) {
	        var messages = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            messages[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            if (!this._exec("assert", arguments, 1)) {
	                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	        }
	    };
	    Log.error = function (cond) {
	        var message = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            message[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
	        }
	    };
	    Log.warn = function () {
	        var message = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            message[_i] = arguments[_i];
	        }
	        var result = this._exec("warn", arguments);
	        if (!result) {
	            this.log.apply(this, arguments);
	        }
	        else {
	            this._exec("trace", ["warn trace"]);
	        }
	    };
	    Log._exec = function (consoleMethod, args, sliceBegin) {
	        if (sliceBegin === void 0) { sliceBegin = 0; }
	        if (root.console && root.console[consoleMethod]) {
	            root.console[consoleMethod].apply(root.console, Array.prototype.slice.call(args, sliceBegin));
	            return true;
	        }
	        return false;
	    };
	    return Log;
	}());
	Log.info = {
	    INVALID_PARAM: "invalid parameter",
	    helperFunc: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var result = "";
	        args.forEach(function (val) {
	            result += String(val) + " ";
	        });
	        return result.slice(0, -1);
	    },
	    assertion: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 2) {
	            return this.helperFunc(args[0], args[1]);
	        }
	        else if (args.length === 3) {
	            return this.helperFunc(args[1], args[0], args[2]);
	        }
	        else {
	            throw new Error("args.length must <= 3");
	        }
	    },
	    FUNC_INVALID: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("invalid");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_BE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must be");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_NOT_BE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must not be");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_SHOULD: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("should");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_SHOULD_NOT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("should not");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_SUPPORT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("support");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_NOT_SUPPORT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("not support");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_DEFINE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must define");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_NOT_DEFINE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must not define");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_UNKNOW: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("unknow");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_EXPECT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("expect");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_UNEXPECT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("unexpect");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_EXIST: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("exist");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_NOT_EXIST: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("not exist");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_ONLY: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("only");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_CAN_NOT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("can't");
	        return this.assertion.apply(this, args);
	    }
	};

	var root;
	if (JudgeUtils.isNodeJs() && typeof commonjsGlobal != "undefined") {
	    root = commonjsGlobal;
	}
	else if (typeof window != "undefined") {
	    root = window;
	}
	else if (typeof self != "undefined") {
	    root = self;
	}
	else {
	    Log.error("no avaliable root!");
	}

	var Queue = (function (_super) {
	    __extends(Queue, _super);
	    function Queue(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Queue.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Object.defineProperty(Queue.prototype, "front", {
	        get: function () {
	            return this.children[this.children.length - 1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "rear", {
	        get: function () {
	            return this.children[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Queue.prototype.push = function (element) {
	        this.children.unshift(element);
	    };
	    Queue.prototype.pop = function () {
	        return this.children.pop();
	    };
	    Queue.prototype.clear = function () {
	        this.removeAllChildren();
	    };
	    return Queue;
	}(List));

	var Stack = (function (_super) {
	    __extends(Stack, _super);
	    function Stack(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Stack.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Object.defineProperty(Stack.prototype, "top", {
	        get: function () {
	            return this.children[this.children.length - 1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Stack.prototype.push = function (element) {
	        this.children.push(element);
	    };
	    Stack.prototype.pop = function () {
	        return this.children.pop();
	    };
	    Stack.prototype.clear = function () {
	        this.removeAllChildren();
	    };
	    Stack.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Stack.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils.isBoolean(args[0])) {
	                target = Stack.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils.extendDeep(this.children));
	        }
	        else {
	            target.setChildren(ExtendUtils.extend([], this.children));
	        }
	        return target;
	    };
	    Stack.prototype.filter = function (func) {
	        var children = this.children, result = [], value = null;
	        for (var i = 0, len = children.length; i < len; i++) {
	            value = children[i];
	            if (func.call(children, value, i)) {
	                result.push(value);
	            }
	        }
	        return Collection.create(result);
	    };
	    Stack.prototype.findOne = function (func) {
	        var scope = this.children, result = null;
	        this.forEach(function (value, index) {
	            if (!func.call(scope, value, index)) {
	                return;
	            }
	            result = value;
	            return $BREAK;
	        });
	        return result;
	    };
	    Stack.prototype.reverse = function () {
	        return Collection.create(this.copyChildren().reverse());
	    };
	    Stack.prototype.removeChild = function (arg) {
	        return Collection.create(this.removeChildHelper(arg));
	    };
	    Stack.prototype.sort = function (func, isSortSelf) {
	        if (isSortSelf === void 0) { isSortSelf = false; }
	        if (isSortSelf) {
	            this.children.sort(func);
	            return this;
	        }
	        return Collection.create(this.copyChildren().sort(func));
	    };
	    Stack.prototype.map = function (func) {
	        var resultArr = [];
	        this.forEach(function (e, index) {
	            var result = func(e, index);
	            if (result !== $REMOVE) {
	                resultArr.push(result);
	            }
	        });
	        return Collection.create(resultArr);
	    };
	    Stack.prototype.removeRepeatItems = function () {
	        var noRepeatList = Collection.create();
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                return;
	            }
	            noRepeatList.addChild(item);
	        });
	        return noRepeatList;
	    };
	    Stack.prototype.hasRepeatItems = function () {
	        var noRepeatList = Collection.create(), hasRepeat = false;
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                hasRepeat = true;
	                return $BREAK;
	            }
	            noRepeatList.addChild(item);
	        });
	        return hasRepeat;
	    };
	    return Stack;
	}(List));

	var Assertion = (function () {
	    function Assertion() {
	    }
	    Assertion.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Assertion.prototype, "not", {
	        get: function () {
	            ExpectData.isNot = true;
	            return this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Assertion.prototype, "be", {
	        get: function () {
	            return this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Assertion.prototype, "true", {
	        get: function () {
	            var source = ExpectData.source;
	            this._assert(!!source === true, "true");
	            return this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Assertion.prototype, "false", {
	        get: function () {
	            var source = ExpectData.source;
	            this._assert(!!source === false, "false");
	            return this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Assertion.prototype, "exist", {
	        get: function () {
	            var source = ExpectData.source;
	            this._assert(source !== null && source !== void 0, "exist");
	            return this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Assertion.prototype.equal = function (n) {
	        var source = ExpectData.source;
	        this._assert(source === n, "equal", n);
	        return this;
	    };
	    Assertion.prototype.gt = function (n) {
	        var source = ExpectData.source;
	        this._assert(source > n, ">", n);
	        return this;
	    };
	    Assertion.prototype.gte = function (n) {
	        var source = ExpectData.source;
	        this._assert(source >= n, ">=", n);
	        return this;
	    };
	    Assertion.prototype.lt = function (n) {
	        var source = ExpectData.source;
	        this._assert(source < n, "<", n);
	        return this;
	    };
	    Assertion.prototype.lte = function (n) {
	        var source = ExpectData.source;
	        this._assert(source <= n, "<=", n);
	        return this;
	    };
	    Assertion.prototype.a = function (type) {
	        var source = ExpectData.source;
	        switch (type) {
	            case "number":
	                this._assert(JudgeUtils.isNumber(source), "number");
	                break;
	            case "array":
	                this._assert(JudgeUtils.isArrayExactly(source), "array");
	                break;
	            case "boolean":
	                this._assert(JudgeUtils.isBoolean(source), "boolean");
	                break;
	            case "string":
	                this._assert(JudgeUtils.isStringExactly(source), "string");
	                break;
	            default:
	                break;
	        }
	    };
	    Assertion.prototype._buildFailMsg = function (operationStr, target) {
	        if (!!target) {
	            return "expected " + this._format(ExpectData.source) + " to be " + operationStr + " " + target;
	        }
	        return "expected " + this._format(ExpectData.source) + " to be " + operationStr;
	    };
	    Assertion.prototype._assert = function (passCondition, failMsg, target) {
	        var pass = null, failMessage = null;
	        if (ExpectData.isNot) {
	            pass = !passCondition;
	        }
	        else {
	            pass = passCondition;
	        }
	        if (pass) {
	            ExpectData.isNot = false;
	            return;
	        }
	        failMessage = this._buildFailMsg(failMsg, target);
	        if (ExpectData.isNot) {
	            ExpectData.isNot = false;
	            failMessage = failMessage.replace("to be", "not to be");
	        }
	        throw new Error(failMessage);
	    };
	    Assertion.prototype._format = function (source) {
	        return source;
	    };
	    return Assertion;
	}());

	var expect = function (source) {
	    var assertion = ExpectData.assertion;
	    ExpectData.source = source;
	    return assertion;
	};
	var _initData = function () {
	    ExpectData.assertion = Assertion.create();
	    ExpectData.isNot = false;
	};
	_initData();

	exports.Assertion = Assertion;
	exports.expect = expect;
	exports.ExpectData = ExpectData;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

});

var wdet_1 = wdet.expect;

var mainBussInit = function (state) {
    var resultState = null, obj = null;
    mainInit("webgl", "parent");
    directorSetClearColor(0, 0, 0, 1);
    obj = createTriangle$$1();
    resultState = state.setIn(["MainBuss", "triangle"], obj);
    addSceneChildren(obj);
    addSceneChildren(createCamera());
    directorInit();
    return resultState;
};
var changeTranslate = requireCheckFunc(function (state, x, y, z) {
    it("state should have triangle", function () {
        wdet_1(state.getIn(["MainBuss", "triangle"])).exist;
    });
}, function (state, x, y, z) {
    objectTranslate(getCurrentTriangle(state), x, y, z);
});
var changeRotate = function (state, angle) {
    objectRotate(getCurrentTriangle(state), angle, 0, 1, 0);
};
var render$1 = function (state) {
    directorRender();
    return state;
};
var getCurrentTriangle = function (state) {
    var triangle = state.getIn(["MainBuss", "triangle"]);
    return triangle;
};

var MainViewData = (function () {
    function MainViewData() {
    }
    MainViewData.state = null;
    return MainViewData;
}());

var _freeGlobal = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
exports.default = freeGlobal;
});

var _root = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _freeGlobal_js_1 = _freeGlobal;
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = _freeGlobal_js_1.default || freeSelf || Function('return this')();
exports.default = root;
});

var _Symbol = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var Symbol = _root_js_1.default.Symbol;
exports.default = Symbol;
});

var _getRawTag = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = _Symbol_js_1.default ? _Symbol_js_1.default.toStringTag : undefined;
function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
        value[symToStringTag] = undefined;
        var unmasked = true;
    }
    catch (e) { }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        }
        else {
            delete value[symToStringTag];
        }
    }
    return result;
}
exports.default = getRawTag;
});

var _objectToString = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
function objectToString(value) {
    return nativeObjectToString.call(value);
}
exports.default = objectToString;
});

var _baseGetTag = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var _getRawTag_js_1 = _getRawTag;
var _objectToString_js_1 = _objectToString;
var nullTag = '[object Null]', undefinedTag = '[object Undefined]';
var symToStringTag = _Symbol_js_1.default ? _Symbol_js_1.default.toStringTag : undefined;
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
        ? _getRawTag_js_1.default(value)
        : _objectToString_js_1.default(value);
}
exports.default = baseGetTag;
});

var isObjectLike_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObjectLike(value) {
    return value != null && typeof value == 'object';
}
exports.default = isObjectLike;
});

var isSymbol_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var symbolTag = '[object Symbol]';
function isSymbol(value) {
    return typeof value == 'symbol' ||
        (isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == symbolTag);
}
exports.default = isSymbol;
});

var _baseToNumber = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSymbol_js_1 = isSymbol_1;
var NAN = 0 / 0;
function baseToNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol_js_1.default(value)) {
        return NAN;
    }
    return +value;
}
exports.default = baseToNumber;
});

var _arrayMap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
exports.default = arrayMap;
});

var isArray_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray = Array.isArray;
exports.default = isArray;
});

var _baseToString = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var _arrayMap_js_1 = _arrayMap;
var isArray_js_1 = isArray_1;
var isSymbol_js_1 = isSymbol_1;
var INFINITY = 1 / 0;
var symbolProto = _Symbol_js_1.default ? _Symbol_js_1.default.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
function baseToString(value) {
    if (typeof value == 'string') {
        return value;
    }
    if (isArray_js_1.default(value)) {
        return _arrayMap_js_1.default(value, baseToString) + '';
    }
    if (isSymbol_js_1.default(value)) {
        return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}
exports.default = baseToString;
});

var _createMathOperation = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToNumber_js_1 = _baseToNumber;
var _baseToString_js_1 = _baseToString;
function createMathOperation(operator, defaultValue) {
    return function (value, other) {
        var result;
        if (value === undefined && other === undefined) {
            return defaultValue;
        }
        if (value !== undefined) {
            result = value;
        }
        if (other !== undefined) {
            if (result === undefined) {
                return other;
            }
            if (typeof value == 'string' || typeof other == 'string') {
                value = _baseToString_js_1.default(value);
                other = _baseToString_js_1.default(other);
            }
            else {
                value = _baseToNumber_js_1.default(value);
                other = _baseToNumber_js_1.default(other);
            }
            result = operator(value, other);
        }
        return result;
    };
}
exports.default = createMathOperation;
});

var add_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createMathOperation_js_1 = _createMathOperation;
var add = _createMathOperation_js_1.default(function (augend, addend) {
    return augend + addend;
}, 0);
exports.default = add;
});

var isObject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}
exports.default = isObject;
});

var toNumber_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_js_1 = isObject_1;
var isSymbol_js_1 = isSymbol_1;
var NAN = 0 / 0;
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
    if (typeof value == 'number') {
        return value;
    }
    if (isSymbol_js_1.default(value)) {
        return NAN;
    }
    if (isObject_js_1.default(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject_js_1.default(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
        return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
}
exports.default = toNumber;
});

var toFinite_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toNumber_js_1 = toNumber_1;
var INFINITY = 1 / 0, MAX_INTEGER = 1.7976931348623157e+308;
function toFinite(value) {
    if (!value) {
        return value === 0 ? value : 0;
    }
    value = toNumber_js_1.default(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
exports.default = toFinite;
});

var toInteger_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toFinite_js_1 = toFinite_1;
function toInteger(value) {
    var result = toFinite_js_1.default(value), remainder = result % 1;
    return result === result ? (remainder ? result - remainder : result) : 0;
}
exports.default = toInteger;
});

var after_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toInteger_js_1 = toInteger_1;
var FUNC_ERROR_TEXT = 'Expected a function';
function after(n, func) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger_js_1.default(n);
    return function () {
        if (--n < 1) {
            return func.apply(this, arguments);
        }
    };
}
exports.default = after;
});

var identity_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function identity(value) {
    return value;
}
exports.default = identity;
});

var isFunction_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObject_js_1 = isObject_1;
var asyncTag = '[object AsyncFunction]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', proxyTag = '[object Proxy]';
function isFunction(value) {
    if (!isObject_js_1.default(value)) {
        return false;
    }
    var tag = _baseGetTag_js_1.default(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
exports.default = isFunction;
});

var _coreJsData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var coreJsData = _root_js_1.default['__core-js_shared__'];
exports.default = coreJsData;
});

var _isMasked = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _coreJsData_js_1 = _coreJsData;
var maskSrcKey = (function () {
    var uid = /[^.]+$/.exec(_coreJsData_js_1.default && _coreJsData_js_1.default.keys && _coreJsData_js_1.default.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
}());
function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
}
exports.default = isMasked;
});

var _toSource = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        }
        catch (e) { }
        try {
            return (func + '');
        }
        catch (e) { }
    }
    return '';
}
exports.default = toSource;
});

var _baseIsNative = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_js_1 = isFunction_1;
var _isMasked_js_1 = _isMasked;
var isObject_js_1 = isObject_1;
var _toSource_js_1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
function baseIsNative(value) {
    if (!isObject_js_1.default(value) || _isMasked_js_1.default(value)) {
        return false;
    }
    var pattern = isFunction_js_1.default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource_js_1.default(value));
}
exports.default = baseIsNative;
});

var _getValue = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getValue(object, key) {
    return object == null ? undefined : object[key];
}
exports.default = getValue;
});

var _getNative = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsNative_js_1 = _baseIsNative;
var _getValue_js_1 = _getValue;
function getNative(object, key) {
    var value = _getValue_js_1.default(object, key);
    return _baseIsNative_js_1.default(value) ? value : undefined;
}
exports.default = getNative;
});

var _WeakMap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var _root_js_1 = _root;
var WeakMap = _getNative_js_1.default(_root_js_1.default, 'WeakMap');
exports.default = WeakMap;
});

var _metaMap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _WeakMap_js_1 = _WeakMap;
var metaMap = _WeakMap_js_1.default && new _WeakMap_js_1.default;
exports.default = metaMap;
});

var _baseSetData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_js_1 = identity_1;
var _metaMap_js_1 = _metaMap;
var baseSetData = !_metaMap_js_1.default ? identity_js_1.default : function (func, data) {
    _metaMap_js_1.default.set(func, data);
    return func;
};
exports.default = baseSetData;
});

var _baseCreate = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_js_1 = isObject_1;
var objectCreate = Object.create;
var baseCreate = (function () {
    function object() { }
    return function (proto) {
        if (!isObject_js_1.default(proto)) {
            return {};
        }
        if (objectCreate) {
            return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
    };
}());
exports.default = baseCreate;
});

var _createCtor = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseCreate_js_1 = _baseCreate;
var isObject_js_1 = isObject_1;
function createCtor(Ctor) {
    return function () {
        var args = arguments;
        switch (args.length) {
            case 0: return new Ctor;
            case 1: return new Ctor(args[0]);
            case 2: return new Ctor(args[0], args[1]);
            case 3: return new Ctor(args[0], args[1], args[2]);
            case 4: return new Ctor(args[0], args[1], args[2], args[3]);
            case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = _baseCreate_js_1.default(Ctor.prototype), result = Ctor.apply(thisBinding, args);
        return isObject_js_1.default(result) ? result : thisBinding;
    };
}
exports.default = createCtor;
});

var _createBind = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCtor_js_1 = _createCtor;
var _root_js_1 = _root;
var WRAP_BIND_FLAG = 1;
function createBind(func, bitmask, thisArg) {
    var isBind = bitmask & WRAP_BIND_FLAG, Ctor = _createCtor_js_1.default(func);
    function wrapper() {
        var fn = (this && this !== _root_js_1.default && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
    }
    return wrapper;
}
exports.default = createBind;
});

var _apply = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function apply(func, thisArg, args) {
    switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
}
exports.default = apply;
});

var _composeArgs = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeMax = Math.max;
function composeArgs(args, partials, holders, isCurried) {
    var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried;
    while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
    }
    while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
            result[holders[argsIndex]] = args[argsIndex];
        }
    }
    while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
    }
    return result;
}
exports.default = composeArgs;
});

var _composeArgsRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeMax = Math.max;
function composeArgsRight(args, partials, holders, isCurried) {
    var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried;
    while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
    }
    var offset = argsIndex;
    while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
    }
    while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
    }
    return result;
}
exports.default = composeArgsRight;
});

var _countHolders = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countHolders(array, placeholder) {
    var length = array.length, result = 0;
    while (length--) {
        if (array[length] === placeholder) {
            ++result;
        }
    }
    return result;
}
exports.default = countHolders;
});

var _baseLodash = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseLodash() {
}
exports.default = baseLodash;
});

var _LazyWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseCreate_js_1 = _baseCreate;
var _baseLodash_js_1 = _baseLodash;
var MAX_ARRAY_LENGTH = 4294967295;
function LazyWrapper(value) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = MAX_ARRAY_LENGTH;
    this.__views__ = [];
}
LazyWrapper.prototype = _baseCreate_js_1.default(_baseLodash_js_1.default.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
exports.default = LazyWrapper;
});

var noop_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function noop() {
}
exports.default = noop;
});

var _getData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _metaMap_js_1 = _metaMap;
var noop_js_1 = noop_1;
var getData = !_metaMap_js_1.default ? noop_js_1.default : function (func) {
    return _metaMap_js_1.default.get(func);
};
exports.default = getData;
});

var _realNames = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var realNames = {};
exports.default = realNames;
});

var _getFuncName = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _realNames_js_1 = _realNames;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function getFuncName(func) {
    var result = (func.name + ''), array = _realNames_js_1.default[result], length = hasOwnProperty.call(_realNames_js_1.default, result) ? array.length : 0;
    while (length--) {
        var data = array[length], otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
            return data.name;
        }
    }
    return result;
}
exports.default = getFuncName;
});

var _LodashWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseCreate_js_1 = _baseCreate;
var _baseLodash_js_1 = _baseLodash;
function LodashWrapper(value, chainAll) {
    this.__wrapped__ = value;
    this.__actions__ = [];
    this.__chain__ = !!chainAll;
    this.__index__ = 0;
    this.__values__ = undefined;
}
LodashWrapper.prototype = _baseCreate_js_1.default(_baseLodash_js_1.default.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
exports.default = LodashWrapper;
});

var _copyArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}
exports.default = copyArray;
});

var _wrapperClone = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _LodashWrapper_js_1 = _LodashWrapper;
var _copyArray_js_1 = _copyArray;
function wrapperClone(wrapper) {
    if (wrapper instanceof _LazyWrapper_js_1.default) {
        return wrapper.clone();
    }
    var result = new _LodashWrapper_js_1.default(wrapper.__wrapped__, wrapper.__chain__);
    result.__actions__ = _copyArray_js_1.default(wrapper.__actions__);
    result.__index__ = wrapper.__index__;
    result.__values__ = wrapper.__values__;
    return result;
}
exports.default = wrapperClone;
});

var wrapperLodash = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _LodashWrapper_js_1 = _LodashWrapper;
var _baseLodash_js_1 = _baseLodash;
var isArray_js_1 = isArray_1;
var isObjectLike_js_1 = isObjectLike_1;
var _wrapperClone_js_1 = _wrapperClone;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function lodash(value) {
    if (isObjectLike_js_1.default(value) && !isArray_js_1.default(value) && !(value instanceof _LazyWrapper_js_1.default)) {
        if (value instanceof _LodashWrapper_js_1.default) {
            return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
            return _wrapperClone_js_1.default(value);
        }
    }
    return new _LodashWrapper_js_1.default(value);
}
lodash.prototype = _baseLodash_js_1.default.prototype;
lodash.prototype.constructor = lodash;
exports.default = lodash;
});

var _isLaziable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _getData_js_1 = _getData;
var _getFuncName_js_1 = _getFuncName;
var wrapperLodash_js_1 = wrapperLodash;
function isLaziable(func) {
    var funcName = _getFuncName_js_1.default(func), other = wrapperLodash_js_1.default[funcName];
    if (typeof other != 'function' || !(funcName in _LazyWrapper_js_1.default.prototype)) {
        return false;
    }
    if (func === other) {
        return true;
    }
    var data = _getData_js_1.default(other);
    return !!data && func === data[0];
}
exports.default = isLaziable;
});

var _shortOut = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function () {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
            if (++count >= HOT_COUNT) {
                return arguments[0];
            }
        }
        else {
            count = 0;
        }
        return func.apply(undefined, arguments);
    };
}
exports.default = shortOut;
});

var _setData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSetData_js_1 = _baseSetData;
var _shortOut_js_1 = _shortOut;
var setData = _shortOut_js_1.default(_baseSetData_js_1.default);
exports.default = setData;
});

var _getWrapDetails = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
function getWrapDetails(source) {
    var match = source.match(reWrapDetails);
    return match ? match[1].split(reSplitDetails) : [];
}
exports.default = getWrapDetails;
});

var _insertWrapDetails = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function insertWrapDetails(source, details) {
    var length = details.length;
    if (!length) {
        return source;
    }
    var lastIndex = length - 1;
    details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
    details = details.join(length > 2 ? ', ' : ' ');
    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}
exports.default = insertWrapDetails;
});

var constant_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function constant(value) {
    return function () {
        return value;
    };
}
exports.default = constant;
});

var _defineProperty = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var defineProperty = (function () {
    try {
        var func = _getNative_js_1.default(Object, 'defineProperty');
        func({}, '', {});
        return func;
    }
    catch (e) { }
}());
exports.default = defineProperty;
});

var _baseSetToString = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_js_1 = constant_1;
var _defineProperty_js_1 = _defineProperty;
var identity_js_1 = identity_1;
var baseSetToString = !_defineProperty_js_1.default ? identity_js_1.default : function (func, string) {
    return _defineProperty_js_1.default(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant_js_1.default(string),
        'writable': true
    });
};
exports.default = baseSetToString;
});

var _setToString = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSetToString_js_1 = _baseSetToString;
var _shortOut_js_1 = _shortOut;
var setToString = _shortOut_js_1.default(_baseSetToString_js_1.default);
exports.default = setToString;
});

var _arrayEach = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break;
        }
    }
    return array;
}
exports.default = arrayEach;
});

var _baseFindIndex = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
            return index;
        }
    }
    return -1;
}
exports.default = baseFindIndex;
});

var _baseIsNaN = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseIsNaN(value) {
    return value !== value;
}
exports.default = baseIsNaN;
});

var _strictIndexOf = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
        if (array[index] === value) {
            return index;
        }
    }
    return -1;
}
exports.default = strictIndexOf;
});

var _baseIndexOf = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFindIndex_js_1 = _baseFindIndex;
var _baseIsNaN_js_1 = _baseIsNaN;
var _strictIndexOf_js_1 = _strictIndexOf;
function baseIndexOf(array, value, fromIndex) {
    return value === value
        ? _strictIndexOf_js_1.default(array, value, fromIndex)
        : _baseFindIndex_js_1.default(array, _baseIsNaN_js_1.default, fromIndex);
}
exports.default = baseIndexOf;
});

var _arrayIncludes = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIndexOf_js_1 = _baseIndexOf;
function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && _baseIndexOf_js_1.default(array, value, 0) > -1;
}
exports.default = arrayIncludes;
});

var _updateWrapDetails = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEach_js_1 = _arrayEach;
var _arrayIncludes_js_1 = _arrayIncludes;
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
];
function updateWrapDetails(details, bitmask) {
    _arrayEach_js_1.default(wrapFlags, function (pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !_arrayIncludes_js_1.default(details, value)) {
            details.push(value);
        }
    });
    return details.sort();
}
exports.default = updateWrapDetails;
});

var _setWrapToString = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getWrapDetails_js_1 = _getWrapDetails;
var _insertWrapDetails_js_1 = _insertWrapDetails;
var _setToString_js_1 = _setToString;
var _updateWrapDetails_js_1 = _updateWrapDetails;
function setWrapToString(wrapper, reference, bitmask) {
    var source = (reference + '');
    return _setToString_js_1.default(wrapper, _insertWrapDetails_js_1.default(source, _updateWrapDetails_js_1.default(_getWrapDetails_js_1.default(source), bitmask)));
}
exports.default = setWrapToString;
});

var _createRecurry = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isLaziable_js_1 = _isLaziable;
var _setData_js_1 = _setData;
var _setWrapToString_js_1 = _setWrapToString;
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64;
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
    var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
    bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
    bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
    if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
    }
    var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
    ];
    var result = wrapFunc.apply(undefined, newData);
    if (_isLaziable_js_1.default(func)) {
        _setData_js_1.default(result, newData);
    }
    result.placeholder = placeholder;
    return _setWrapToString_js_1.default(result, func, bitmask);
}
exports.default = createRecurry;
});

var _getHolder = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHolder(func) {
    var object = func;
    return object.placeholder;
}
exports.default = getHolder;
});

var _isIndex = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
}
exports.default = isIndex;
});

var _reorder = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyArray_js_1 = _copyArray;
var _isIndex_js_1 = _isIndex;
var nativeMin = Math.min;
function reorder(array, indexes) {
    var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = _copyArray_js_1.default(array);
    while (length--) {
        var index = indexes[length];
        array[length] = _isIndex_js_1.default(index, arrLength) ? oldArray[index] : undefined;
    }
    return array;
}
exports.default = reorder;
});

var _replaceHolders = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PLACEHOLDER = '__lodash_placeholder__';
function replaceHolders(array, placeholder) {
    var index = -1, length = array.length, resIndex = 0, result = [];
    while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
        }
    }
    return result;
}
exports.default = replaceHolders;
});

var _createHybrid = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _composeArgs_js_1 = _composeArgs;
var _composeArgsRight_js_1 = _composeArgsRight;
var _countHolders_js_1 = _countHolders;
var _createCtor_js_1 = _createCtor;
var _createRecurry_js_1 = _createRecurry;
var _getHolder_js_1 = _getHolder;
var _reorder_js_1 = _reorder;
var _replaceHolders_js_1 = _replaceHolders;
var _root_js_1 = _root;
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_ARY_FLAG = 128, WRAP_FLIP_FLAG = 512;
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : _createCtor_js_1.default(func);
    function wrapper() {
        var length = arguments.length, args = Array(length), index = length;
        while (index--) {
            args[index] = arguments[index];
        }
        if (isCurried) {
            var placeholder = _getHolder_js_1.default(wrapper), holdersCount = _countHolders_js_1.default(args, placeholder);
        }
        if (partials) {
            args = _composeArgs_js_1.default(args, partials, holders, isCurried);
        }
        if (partialsRight) {
            args = _composeArgsRight_js_1.default(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
            var newHolders = _replaceHolders_js_1.default(args, placeholder);
            return _createRecurry_js_1.default(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
        }
        var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
        length = args.length;
        if (argPos) {
            args = _reorder_js_1.default(args, argPos);
        }
        else if (isFlip && length > 1) {
            args.reverse();
        }
        if (isAry && ary < length) {
            args.length = ary;
        }
        if (this && this !== _root_js_1.default && this instanceof wrapper) {
            fn = Ctor || _createCtor_js_1.default(fn);
        }
        return fn.apply(thisBinding, args);
    }
    return wrapper;
}
exports.default = createHybrid;
});

var _createCurry = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _createCtor_js_1 = _createCtor;
var _createHybrid_js_1 = _createHybrid;
var _createRecurry_js_1 = _createRecurry;
var _getHolder_js_1 = _getHolder;
var _replaceHolders_js_1 = _replaceHolders;
var _root_js_1 = _root;
function createCurry(func, bitmask, arity) {
    var Ctor = _createCtor_js_1.default(func);
    function wrapper() {
        var length = arguments.length, args = Array(length), index = length, placeholder = _getHolder_js_1.default(wrapper);
        while (index--) {
            args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
            ? []
            : _replaceHolders_js_1.default(args, placeholder);
        length -= holders.length;
        if (length < arity) {
            return _createRecurry_js_1.default(func, bitmask, _createHybrid_js_1.default, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== _root_js_1.default && this instanceof wrapper) ? Ctor : func;
        return _apply_js_1.default(fn, this, args);
    }
    return wrapper;
}
exports.default = createCurry;
});

var _createPartial = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _createCtor_js_1 = _createCtor;
var _root_js_1 = _root;
var WRAP_BIND_FLAG = 1;
function createPartial(func, bitmask, thisArg, partials) {
    var isBind = bitmask & WRAP_BIND_FLAG, Ctor = _createCtor_js_1.default(func);
    function wrapper() {
        var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = (this && this !== _root_js_1.default && this instanceof wrapper) ? Ctor : func;
        while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
        }
        return _apply_js_1.default(fn, isBind ? thisArg : this, args);
    }
    return wrapper;
}
exports.default = createPartial;
});

var _mergeData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _composeArgs_js_1 = _composeArgs;
var _composeArgsRight_js_1 = _composeArgsRight;
var _replaceHolders_js_1 = _replaceHolders;
var PLACEHOLDER = '__lodash_placeholder__';
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256;
var nativeMin = Math.min;
function mergeData(data, source) {
    var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
    var isCombo = ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));
    if (!(isCommon || isCombo)) {
        return data;
    }
    if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
    }
    var value = source[3];
    if (value) {
        var partials = data[3];
        data[3] = partials ? _composeArgs_js_1.default(partials, value, source[4]) : value;
        data[4] = partials ? _replaceHolders_js_1.default(data[3], PLACEHOLDER) : source[4];
    }
    value = source[5];
    if (value) {
        partials = data[5];
        data[5] = partials ? _composeArgsRight_js_1.default(partials, value, source[6]) : value;
        data[6] = partials ? _replaceHolders_js_1.default(data[5], PLACEHOLDER) : source[6];
    }
    value = source[7];
    if (value) {
        data[7] = value;
    }
    if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
    }
    if (data[9] == null) {
        data[9] = source[9];
    }
    data[0] = source[0];
    data[1] = newBitmask;
    return data;
}
exports.default = mergeData;
});

var _createWrap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSetData_js_1 = _baseSetData;
var _createBind_js_1 = _createBind;
var _createCurry_js_1 = _createCurry;
var _createHybrid_js_1 = _createHybrid;
var _createPartial_js_1 = _createPartial;
var _getData_js_1 = _getData;
var _mergeData_js_1 = _mergeData;
var _setData_js_1 = _setData;
var _setWrapToString_js_1 = _setWrapToString;
var toInteger_js_1 = toInteger_1;
var FUNC_ERROR_TEXT = 'Expected a function';
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64;
var nativeMax = Math.max;
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
    if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var length = partials ? partials.length : 0;
    if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
    }
    ary = ary === undefined ? ary : nativeMax(toInteger_js_1.default(ary), 0);
    arity = arity === undefined ? arity : toInteger_js_1.default(arity);
    length -= holders ? holders.length : 0;
    if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials, holdersRight = holders;
        partials = holders = undefined;
    }
    var data = isBindKey ? undefined : _getData_js_1.default(func);
    var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
    ];
    if (data) {
        _mergeData_js_1.default(newData, data);
    }
    func = newData[0];
    bitmask = newData[1];
    thisArg = newData[2];
    partials = newData[3];
    holders = newData[4];
    arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);
    if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
    }
    if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = _createBind_js_1.default(func, bitmask, thisArg);
    }
    else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = _createCurry_js_1.default(func, bitmask, arity);
    }
    else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = _createPartial_js_1.default(func, bitmask, thisArg, partials);
    }
    else {
        result = _createHybrid_js_1.default.apply(undefined, newData);
    }
    var setter = data ? _baseSetData_js_1.default : _setData_js_1.default;
    return _setWrapToString_js_1.default(setter(result, newData), func, bitmask);
}
exports.default = createWrap;
});

var ary_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createWrap_js_1 = _createWrap;
var WRAP_ARY_FLAG = 128;
function ary(func, n, guard) {
    n = guard ? undefined : n;
    n = (func && n == null) ? func.length : n;
    return _createWrap_js_1.default(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}
exports.default = ary;
});

var _baseAssignValue = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _defineProperty_js_1 = _defineProperty;
function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty_js_1.default) {
        _defineProperty_js_1.default(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        });
    }
    else {
        object[key] = value;
    }
}
exports.default = baseAssignValue;
});

var eq_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function eq(value, other) {
    return value === other || (value !== value && other !== other);
}
exports.default = eq;
});

var _assignValue = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var eq_js_1 = eq_1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq_js_1.default(objValue, value)) ||
        (value === undefined && !(key in object))) {
        _baseAssignValue_js_1.default(object, key, value);
    }
}
exports.default = assignValue;
});

var _copyObject = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assignValue_js_1 = _assignValue;
var _baseAssignValue_js_1 = _baseAssignValue;
function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
        var key = props[index];
        var newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined;
        if (newValue === undefined) {
            newValue = source[key];
        }
        if (isNew) {
            _baseAssignValue_js_1.default(object, key, newValue);
        }
        else {
            _assignValue_js_1.default(object, key, newValue);
        }
    }
    return object;
}
exports.default = copyObject;
});

var _overRest = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var nativeMax = Math.max;
function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function () {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
            array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
            otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return _apply_js_1.default(func, this, otherArgs);
    };
}
exports.default = overRest;
});

var _baseRest = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_js_1 = identity_1;
var _overRest_js_1 = _overRest;
var _setToString_js_1 = _setToString;
function baseRest(func, start) {
    return _setToString_js_1.default(_overRest_js_1.default(func, start, identity_js_1.default), func + '');
}
exports.default = baseRest;
});

var isLength_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
    return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
exports.default = isLength;
});

var isArrayLike_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_js_1 = isFunction_1;
var isLength_js_1 = isLength_1;
function isArrayLike(value) {
    return value != null && isLength_js_1.default(value.length) && !isFunction_js_1.default(value);
}
exports.default = isArrayLike;
});

var _isIterateeCall = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eq_js_1 = eq_1;
var isArrayLike_js_1 = isArrayLike_1;
var _isIndex_js_1 = _isIndex;
var isObject_js_1 = isObject_1;
function isIterateeCall(value, index, object) {
    if (!isObject_js_1.default(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number'
        ? (isArrayLike_js_1.default(object) && _isIndex_js_1.default(index, object.length))
        : (type == 'string' && index in object)) {
        return eq_js_1.default(object[index], value);
    }
    return false;
}
exports.default = isIterateeCall;
});

var _createAssigner = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var _isIterateeCall_js_1 = _isIterateeCall;
function createAssigner(assigner) {
    return _baseRest_js_1.default(function (object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
        customizer = (assigner.length > 3 && typeof customizer == 'function')
            ? (length--, customizer)
            : undefined;
        if (guard && _isIterateeCall_js_1.default(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
        }
        object = Object(object);
        while (++index < length) {
            var source = sources[index];
            if (source) {
                assigner(object, source, index, customizer);
            }
        }
        return object;
    });
}
exports.default = createAssigner;
});

var _isPrototype = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectProto = Object.prototype;
function isPrototype(value) {
    var Ctor = value && value.constructor, proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
    return value === proto;
}
exports.default = isPrototype;
});

var _baseTimes = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
        result[index] = iteratee(index);
    }
    return result;
}
exports.default = baseTimes;
});

var _baseIsArguments = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var argsTag = '[object Arguments]';
function baseIsArguments(value) {
    return isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == argsTag;
}
exports.default = baseIsArguments;
});

var isArguments_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsArguments_js_1 = _baseIsArguments;
var isObjectLike_js_1 = isObjectLike_1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var isArguments = _baseIsArguments_js_1.default(function () { return arguments; }()) ? _baseIsArguments_js_1.default : function (value) {
    return isObjectLike_js_1.default(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
};
exports.default = isArguments;
});

var stubFalse_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stubFalse() {
    return false;
}
exports.default = stubFalse;
});

var isBuffer_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var stubFalse_js_1 = stubFalse_1;
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? _root_js_1.default.Buffer : undefined;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
var isBuffer = nativeIsBuffer || stubFalse_js_1.default;
exports.default = isBuffer;
});

var _baseIsTypedArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isLength_js_1 = isLength_1;
var isObjectLike_js_1 = isObjectLike_1;
var argsTag = '[object Arguments]', arrayTag = '[object Array]', boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', funcTag = '[object Function]', mapTag = '[object Map]', numberTag = '[object Number]', objectTag = '[object Object]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
        typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
            typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
                typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
        typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
            typedArrayTags[errorTag] = typedArrayTags[funcTag] =
                typedArrayTags[mapTag] = typedArrayTags[numberTag] =
                    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
                        typedArrayTags[setTag] = typedArrayTags[stringTag] =
                            typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
    return isObjectLike_js_1.default(value) &&
        isLength_js_1.default(value.length) && !!typedArrayTags[_baseGetTag_js_1.default(value)];
}
exports.default = baseIsTypedArray;
});

var _baseUnary = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseUnary(func) {
    return function (value) {
        return func(value);
    };
}
exports.default = baseUnary;
});

var _nodeUtil = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _freeGlobal_js_1 = _freeGlobal;
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && _freeGlobal_js_1.default.process;
var nodeUtil = (function () {
    try {
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
    }
    catch (e) { }
}());
exports.default = nodeUtil;
});

var isTypedArray_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsTypedArray_js_1 = _baseIsTypedArray;
var _baseUnary_js_1 = _baseUnary;
var _nodeUtil_js_1 = _nodeUtil;
var nodeIsTypedArray = _nodeUtil_js_1.default && _nodeUtil_js_1.default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? _baseUnary_js_1.default(nodeIsTypedArray) : _baseIsTypedArray_js_1.default;
exports.default = isTypedArray;
});

var _arrayLikeKeys = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseTimes_js_1 = _baseTimes;
var isArguments_js_1 = isArguments_1;
var isArray_js_1 = isArray_1;
var isBuffer_js_1 = isBuffer_1;
var _isIndex_js_1 = _isIndex;
var isTypedArray_js_1 = isTypedArray_1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
    var isArr = isArray_js_1.default(value), isArg = !isArr && isArguments_js_1.default(value), isBuff = !isArr && !isArg && isBuffer_js_1.default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_js_1.default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? _baseTimes_js_1.default(value.length, String) : [], length = result.length;
    for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (key == 'length' ||
                (isBuff && (key == 'offset' || key == 'parent')) ||
                (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
                _isIndex_js_1.default(key, length)))) {
            result.push(key);
        }
    }
    return result;
}
exports.default = arrayLikeKeys;
});

var _overArg = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function overArg(func, transform) {
    return function (arg) {
        return func(transform(arg));
    };
}
exports.default = overArg;
});

var _nativeKeys = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _overArg_js_1 = _overArg;
var nativeKeys = _overArg_js_1.default(Object.keys, Object);
exports.default = nativeKeys;
});

var _baseKeys = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isPrototype_js_1 = _isPrototype;
var _nativeKeys_js_1 = _nativeKeys;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeys(object) {
    if (!_isPrototype_js_1.default(object)) {
        return _nativeKeys_js_1.default(object);
    }
    var result = [];
    for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
        }
    }
    return result;
}
exports.default = baseKeys;
});

var keys_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayLikeKeys_js_1 = _arrayLikeKeys;
var _baseKeys_js_1 = _baseKeys;
var isArrayLike_js_1 = isArrayLike_1;
function keys(object) {
    return isArrayLike_js_1.default(object) ? _arrayLikeKeys_js_1.default(object) : _baseKeys_js_1.default(object);
}
exports.default = keys;
});

var assign_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assignValue_js_1 = _assignValue;
var _copyObject_js_1 = _copyObject;
var _createAssigner_js_1 = _createAssigner;
var isArrayLike_js_1 = isArrayLike_1;
var _isPrototype_js_1 = _isPrototype;
var keys_js_1 = keys_1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var assign = _createAssigner_js_1.default(function (object, source) {
    if (_isPrototype_js_1.default(source) || isArrayLike_js_1.default(source)) {
        _copyObject_js_1.default(source, keys_js_1.default(source), object);
        return;
    }
    for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
            _assignValue_js_1.default(object, key, source[key]);
        }
    }
});
exports.default = assign;
});

var _nativeKeysIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
        for (var key in Object(object)) {
            result.push(key);
        }
    }
    return result;
}
exports.default = nativeKeysIn;
});

var _baseKeysIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_js_1 = isObject_1;
var _isPrototype_js_1 = _isPrototype;
var _nativeKeysIn_js_1 = _nativeKeysIn;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeysIn(object) {
    if (!isObject_js_1.default(object)) {
        return _nativeKeysIn_js_1.default(object);
    }
    var isProto = _isPrototype_js_1.default(object), result = [];
    for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
        }
    }
    return result;
}
exports.default = baseKeysIn;
});

var keysIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayLikeKeys_js_1 = _arrayLikeKeys;
var _baseKeysIn_js_1 = _baseKeysIn;
var isArrayLike_js_1 = isArrayLike_1;
function keysIn(object) {
    return isArrayLike_js_1.default(object) ? _arrayLikeKeys_js_1.default(object, true) : _baseKeysIn_js_1.default(object);
}
exports.default = keysIn;
});

var assignIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var _createAssigner_js_1 = _createAssigner;
var keysIn_js_1 = keysIn_1;
var assignIn = _createAssigner_js_1.default(function (object, source) {
    _copyObject_js_1.default(source, keysIn_js_1.default(source), object);
});
exports.default = assignIn;
});

var assignInWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var _createAssigner_js_1 = _createAssigner;
var keysIn_js_1 = keysIn_1;
var assignInWith = _createAssigner_js_1.default(function (object, source, srcIndex, customizer) {
    _copyObject_js_1.default(source, keysIn_js_1.default(source), object, customizer);
});
exports.default = assignInWith;
});

var assignWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var _createAssigner_js_1 = _createAssigner;
var keys_js_1 = keys_1;
var assignWith = _createAssigner_js_1.default(function (object, source, srcIndex, customizer) {
    _copyObject_js_1.default(source, keys_js_1.default(source), object, customizer);
});
exports.default = assignWith;
});

var _isKey = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_js_1 = isArray_1;
var isSymbol_js_1 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
    if (isArray_js_1.default(value)) {
        return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol_js_1.default(value)) {
        return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
}
exports.default = isKey;
});

var _nativeCreate = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var nativeCreate = _getNative_js_1.default(Object, 'create');
exports.default = nativeCreate;
});

var _hashClear = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _nativeCreate_js_1 = _nativeCreate;
function hashClear() {
    this.__data__ = _nativeCreate_js_1.default ? _nativeCreate_js_1.default(null) : {};
    this.size = 0;
}
exports.default = hashClear;
});

var _hashDelete = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
}
exports.default = hashDelete;
});

var _hashGet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _nativeCreate_js_1 = _nativeCreate;
var HASH_UNDEFINED = '__lodash_hash_undefined__';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate_js_1.default) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
exports.default = hashGet;
});

var _hashHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _nativeCreate_js_1 = _nativeCreate;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate_js_1.default ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}
exports.default = hashHas;
});

var _hashSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _nativeCreate_js_1 = _nativeCreate;
var HASH_UNDEFINED = '__lodash_hash_undefined__';
function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate_js_1.default && value === undefined) ? HASH_UNDEFINED : value;
    return this;
}
exports.default = hashSet;
});

var _Hash = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _hashClear_js_1 = _hashClear;
var _hashDelete_js_1 = _hashDelete;
var _hashGet_js_1 = _hashGet;
var _hashHas_js_1 = _hashHas;
var _hashSet_js_1 = _hashSet;
function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
Hash.prototype.clear = _hashClear_js_1.default;
Hash.prototype['delete'] = _hashDelete_js_1.default;
Hash.prototype.get = _hashGet_js_1.default;
Hash.prototype.has = _hashHas_js_1.default;
Hash.prototype.set = _hashSet_js_1.default;
exports.default = Hash;
});

var _listCacheClear = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
}
exports.default = listCacheClear;
});

var _assocIndexOf = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eq_js_1 = eq_1;
function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
        if (eq_js_1.default(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}
exports.default = assocIndexOf;
});

var _listCacheDelete = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assocIndexOf_js_1 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
    var data = this.__data__, index = _assocIndexOf_js_1.default(data, key);
    if (index < 0) {
        return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
        data.pop();
    }
    else {
        splice.call(data, index, 1);
    }
    --this.size;
    return true;
}
exports.default = listCacheDelete;
});

var _listCacheGet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assocIndexOf_js_1 = _assocIndexOf;
function listCacheGet(key) {
    var data = this.__data__, index = _assocIndexOf_js_1.default(data, key);
    return index < 0 ? undefined : data[index][1];
}
exports.default = listCacheGet;
});

var _listCacheHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assocIndexOf_js_1 = _assocIndexOf;
function listCacheHas(key) {
    return _assocIndexOf_js_1.default(this.__data__, key) > -1;
}
exports.default = listCacheHas;
});

var _listCacheSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assocIndexOf_js_1 = _assocIndexOf;
function listCacheSet(key, value) {
    var data = this.__data__, index = _assocIndexOf_js_1.default(data, key);
    if (index < 0) {
        ++this.size;
        data.push([key, value]);
    }
    else {
        data[index][1] = value;
    }
    return this;
}
exports.default = listCacheSet;
});

var _ListCache = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _listCacheClear_js_1 = _listCacheClear;
var _listCacheDelete_js_1 = _listCacheDelete;
var _listCacheGet_js_1 = _listCacheGet;
var _listCacheHas_js_1 = _listCacheHas;
var _listCacheSet_js_1 = _listCacheSet;
function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
ListCache.prototype.clear = _listCacheClear_js_1.default;
ListCache.prototype['delete'] = _listCacheDelete_js_1.default;
ListCache.prototype.get = _listCacheGet_js_1.default;
ListCache.prototype.has = _listCacheHas_js_1.default;
ListCache.prototype.set = _listCacheSet_js_1.default;
exports.default = ListCache;
});

var _Map = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var _root_js_1 = _root;
var Map = _getNative_js_1.default(_root_js_1.default, 'Map');
exports.default = Map;
});

var _mapCacheClear = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Hash_js_1 = _Hash;
var _ListCache_js_1 = _ListCache;
var _Map_js_1 = _Map;
function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
        'hash': new _Hash_js_1.default,
        'map': new (_Map_js_1.default || _ListCache_js_1.default),
        'string': new _Hash_js_1.default
    };
}
exports.default = mapCacheClear;
});

var _isKeyable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
}
exports.default = isKeyable;
});

var _getMapData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isKeyable_js_1 = _isKeyable;
function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable_js_1.default(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
}
exports.default = getMapData;
});

var _mapCacheDelete = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getMapData_js_1 = _getMapData;
function mapCacheDelete(key) {
    var result = _getMapData_js_1.default(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
}
exports.default = mapCacheDelete;
});

var _mapCacheGet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getMapData_js_1 = _getMapData;
function mapCacheGet(key) {
    return _getMapData_js_1.default(this, key).get(key);
}
exports.default = mapCacheGet;
});

var _mapCacheHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getMapData_js_1 = _getMapData;
function mapCacheHas(key) {
    return _getMapData_js_1.default(this, key).has(key);
}
exports.default = mapCacheHas;
});

var _mapCacheSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getMapData_js_1 = _getMapData;
function mapCacheSet(key, value) {
    var data = _getMapData_js_1.default(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
}
exports.default = mapCacheSet;
});

var _MapCache = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _mapCacheClear_js_1 = _mapCacheClear;
var _mapCacheDelete_js_1 = _mapCacheDelete;
var _mapCacheGet_js_1 = _mapCacheGet;
var _mapCacheHas_js_1 = _mapCacheHas;
var _mapCacheSet_js_1 = _mapCacheSet;
function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
MapCache.prototype.clear = _mapCacheClear_js_1.default;
MapCache.prototype['delete'] = _mapCacheDelete_js_1.default;
MapCache.prototype.get = _mapCacheGet_js_1.default;
MapCache.prototype.has = _mapCacheHas_js_1.default;
MapCache.prototype.set = _mapCacheSet_js_1.default;
exports.default = MapCache;
});

var memoize_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _MapCache_js_1 = _MapCache;
var FUNC_ERROR_TEXT = 'Expected a function';
function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
            return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache_js_1.default);
    return memoized;
}
memoize.Cache = _MapCache_js_1.default;
exports.default = memoize;
});

var _memoizeCapped = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memoize_js_1 = memoize_1;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
    var result = memoize_js_1.default(func, function (key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
        }
        return key;
    });
    var cache = result.cache;
    return result;
}
exports.default = memoizeCapped;
});

var _stringToPath = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _memoizeCapped_js_1 = _memoizeCapped;
var reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = _memoizeCapped_js_1.default(function (string) {
    var result = [];
    if (reLeadingDot.test(string)) {
        result.push('');
    }
    string.replace(rePropName, function (match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
});
exports.default = stringToPath;
});

var toString_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToString_js_1 = _baseToString;
function toString(value) {
    return value == null ? '' : _baseToString_js_1.default(value);
}
exports.default = toString;
});

var _castPath = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_js_1 = isArray_1;
var _isKey_js_1 = _isKey;
var _stringToPath_js_1 = _stringToPath;
var toString_js_1 = toString_1;
function castPath(value, object) {
    if (isArray_js_1.default(value)) {
        return value;
    }
    return _isKey_js_1.default(value, object) ? [value] : _stringToPath_js_1.default(toString_js_1.default(value));
}
exports.default = castPath;
});

var _toKey = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSymbol_js_1 = isSymbol_1;
var INFINITY = 1 / 0;
function toKey(value) {
    if (typeof value == 'string' || isSymbol_js_1.default(value)) {
        return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}
exports.default = toKey;
});

var _baseGet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _castPath_js_1 = _castPath;
var _toKey_js_1 = _toKey;
function baseGet(object, path) {
    path = _castPath_js_1.default(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
        object = object[_toKey_js_1.default(path[index++])];
    }
    return (index && index == length) ? object : undefined;
}
exports.default = baseGet;
});

var get_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGet_js_1 = _baseGet;
function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet_js_1.default(object, path);
    return result === undefined ? defaultValue : result;
}
exports.default = get;
});

var _baseAt = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_js_1 = get_1;
function baseAt(object, paths) {
    var index = -1, length = paths.length, result = Array(length), skip = object == null;
    while (++index < length) {
        result[index] = skip ? undefined : get_js_1.default(object, paths[index]);
    }
    return result;
}
exports.default = baseAt;
});

var _arrayPush = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
}
exports.default = arrayPush;
});

var _isFlattenable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var isArguments_js_1 = isArguments_1;
var isArray_js_1 = isArray_1;
var spreadableSymbol = _Symbol_js_1.default ? _Symbol_js_1.default.isConcatSpreadable : undefined;
function isFlattenable(value) {
    return isArray_js_1.default(value) || isArguments_js_1.default(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
}
exports.default = isFlattenable;
});

var _baseFlatten = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayPush_js_1 = _arrayPush;
var _isFlattenable_js_1 = _isFlattenable;
function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = _isFlattenable_js_1.default);
    result || (result = []);
    while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
            if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result);
            }
            else {
                _arrayPush_js_1.default(result, value);
            }
        }
        else if (!isStrict) {
            result[result.length] = value;
        }
    }
    return result;
}
exports.default = baseFlatten;
});

var flatten_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseFlatten_js_1.default(array, 1) : [];
}
exports.default = flatten;
});

var _flatRest = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten_js_1 = flatten_1;
var _overRest_js_1 = _overRest;
var _setToString_js_1 = _setToString;
function flatRest(func) {
    return _setToString_js_1.default(_overRest_js_1.default(func, undefined, flatten_js_1.default), func + '');
}
exports.default = flatRest;
});

var at_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAt_js_1 = _baseAt;
var _flatRest_js_1 = _flatRest;
var at = _flatRest_js_1.default(_baseAt_js_1.default);
exports.default = at;
});

var _getPrototype = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _overArg_js_1 = _overArg;
var getPrototype = _overArg_js_1.default(Object.getPrototypeOf, Object);
exports.default = getPrototype;
});

var isPlainObject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var _getPrototype_js_1 = _getPrototype;
var isObjectLike_js_1 = isObjectLike_1;
var objectTag = '[object Object]';
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
    if (!isObjectLike_js_1.default(value) || _baseGetTag_js_1.default(value) != objectTag) {
        return false;
    }
    var proto = _getPrototype_js_1.default(value);
    if (proto === null) {
        return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
}
exports.default = isPlainObject;
});

var isError_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var isPlainObject_js_1 = isPlainObject_1;
var domExcTag = '[object DOMException]', errorTag = '[object Error]';
function isError(value) {
    if (!isObjectLike_js_1.default(value)) {
        return false;
    }
    var tag = _baseGetTag_js_1.default(value);
    return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject_js_1.default(value));
}
exports.default = isError;
});

var attempt_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _baseRest_js_1 = _baseRest;
var isError_js_1 = isError_1;
var attempt = _baseRest_js_1.default(function (func, args) {
    try {
        return _apply_js_1.default(func, undefined, args);
    }
    catch (e) {
        return isError_js_1.default(e) ? e : new Error(e);
    }
});
exports.default = attempt;
});

var before_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toInteger_js_1 = toInteger_1;
var FUNC_ERROR_TEXT = 'Expected a function';
function before(n, func) {
    var result;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    n = toInteger_js_1.default(n);
    return function () {
        if (--n > 0) {
            result = func.apply(this, arguments);
        }
        if (n <= 1) {
            func = undefined;
        }
        return result;
    };
}
exports.default = before;
});

var bind_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var _createWrap_js_1 = _createWrap;
var _getHolder_js_1 = _getHolder;
var _replaceHolders_js_1 = _replaceHolders;
var WRAP_BIND_FLAG = 1, WRAP_PARTIAL_FLAG = 32;
var bind = _baseRest_js_1.default(function (func, thisArg, partials) {
    var bitmask = WRAP_BIND_FLAG;
    if (partials.length) {
        var holders = _replaceHolders_js_1.default(partials, _getHolder_js_1.default(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
    }
    return _createWrap_js_1.default(func, bitmask, thisArg, partials, holders);
});
bind.placeholder = {};
exports.default = bind;
});

var bindAll_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEach_js_1 = _arrayEach;
var _baseAssignValue_js_1 = _baseAssignValue;
var bind_js_1 = bind_1;
var _flatRest_js_1 = _flatRest;
var _toKey_js_1 = _toKey;
var bindAll = _flatRest_js_1.default(function (object, methodNames) {
    _arrayEach_js_1.default(methodNames, function (key) {
        key = _toKey_js_1.default(key);
        _baseAssignValue_js_1.default(object, key, bind_js_1.default(object[key], object));
    });
    return object;
});
exports.default = bindAll;
});

var bindKey_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var _createWrap_js_1 = _createWrap;
var _getHolder_js_1 = _getHolder;
var _replaceHolders_js_1 = _replaceHolders;
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_PARTIAL_FLAG = 32;
var bindKey = _baseRest_js_1.default(function (object, key, partials) {
    var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
    if (partials.length) {
        var holders = _replaceHolders_js_1.default(partials, _getHolder_js_1.default(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
    }
    return _createWrap_js_1.default(key, bitmask, object, partials, holders);
});
bindKey.placeholder = {};
exports.default = bindKey;
});

var _baseSlice = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;
    var result = Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}
exports.default = baseSlice;
});

var _castSlice = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return (!start && end >= length) ? array : _baseSlice_js_1.default(array, start, end);
}
exports.default = castSlice;
});

var _hasUnicode = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rsAstralRange = '\\ud800-\\udfff', rsComboMarksRange = '\\u0300-\\u036f', reComboHalfMarksRange = '\\ufe20-\\ufe2f', rsComboSymbolsRange = '\\u20d0-\\u20ff', rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = '\\ufe0e\\ufe0f';
var rsZWJ = '\\u200d';
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
function hasUnicode(string) {
    return reHasUnicode.test(string);
}
exports.default = hasUnicode;
});

var _asciiToArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asciiToArray(string) {
    return string.split('');
}
exports.default = asciiToArray;
});

var _unicodeToArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rsAstralRange = '\\ud800-\\udfff', rsComboMarksRange = '\\u0300-\\u036f', reComboHalfMarksRange = '\\ufe20-\\ufe2f', rsComboSymbolsRange = '\\u20d0-\\u20ff', rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = '\\ufe0e\\ufe0f';
var rsAstral = '[' + rsAstralRange + ']', rsCombo = '[' + rsComboRange + ']', rsFitz = '\\ud83c[\\udffb-\\udfff]', rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')', rsNonAstral = '[^' + rsAstralRange + ']', rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}', rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]', rsZWJ = '\\u200d';
var reOptMod = rsModifier + '?', rsOptVar = '[' + rsVarRange + ']?', rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*', rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}
exports.default = unicodeToArray;
});

var _stringToArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _asciiToArray_js_1 = _asciiToArray;
var _hasUnicode_js_1 = _hasUnicode;
var _unicodeToArray_js_1 = _unicodeToArray;
function stringToArray(string) {
    return _hasUnicode_js_1.default(string)
        ? _unicodeToArray_js_1.default(string)
        : _asciiToArray_js_1.default(string);
}
exports.default = stringToArray;
});

var _createCaseFirst = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _castSlice_js_1 = _castSlice;
var _hasUnicode_js_1 = _hasUnicode;
var _stringToArray_js_1 = _stringToArray;
var toString_js_1 = toString_1;
function createCaseFirst(methodName) {
    return function (string) {
        string = toString_js_1.default(string);
        var strSymbols = _hasUnicode_js_1.default(string)
            ? _stringToArray_js_1.default(string)
            : undefined;
        var chr = strSymbols
            ? strSymbols[0]
            : string.charAt(0);
        var trailing = strSymbols
            ? _castSlice_js_1.default(strSymbols, 1).join('')
            : string.slice(1);
        return chr[methodName]() + trailing;
    };
}
exports.default = createCaseFirst;
});

var upperFirst_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCaseFirst_js_1 = _createCaseFirst;
var upperFirst = _createCaseFirst_js_1.default('toUpperCase');
exports.default = upperFirst;
});

var capitalize_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
var upperFirst_js_1 = upperFirst_1;
function capitalize(string) {
    return upperFirst_js_1.default(toString_js_1.default(string).toLowerCase());
}
exports.default = capitalize;
});

var _arrayReduce = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
        accumulator = array[++index];
    }
    while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
}
exports.default = arrayReduce;
});

var _basePropertyOf = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function basePropertyOf(object) {
    return function (key) {
        return object == null ? undefined : object[key];
    };
}
exports.default = basePropertyOf;
});

var _deburrLetter = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePropertyOf_js_1 = _basePropertyOf;
var deburredLetters = {
    '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C', '\xe7': 'c',
    '\xd0': 'D', '\xf0': 'd',
    '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N', '\xf1': 'n',
    '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    '\u0100': 'A', '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a', '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C', '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c', '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D', '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E', '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e', '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G', '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g', '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H', '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I', '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i', '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J', '\u0135': 'j',
    '\u0136': 'K', '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L', '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l', '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N', '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n', '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O', '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o', '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R', '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r', '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S', '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's', '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T', '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't', '\u0165': 't', '\u0167': 't',
    '\u0168': 'U', '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u', '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W', '\u0175': 'w',
    '\u0176': 'Y', '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z', '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z', '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
};
var deburrLetter = _basePropertyOf_js_1.default(deburredLetters);
exports.default = deburrLetter;
});

var deburr_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _deburrLetter_js_1 = _deburrLetter;
var toString_js_1 = toString_1;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange = '\\u0300-\\u036f', reComboHalfMarksRange = '\\ufe20-\\ufe2f', rsComboSymbolsRange = '\\u20d0-\\u20ff', rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsCombo = '[' + rsComboRange + ']';
var reComboMark = RegExp(rsCombo, 'g');
function deburr(string) {
    string = toString_js_1.default(string);
    return string && string.replace(reLatin, _deburrLetter_js_1.default).replace(reComboMark, '');
}
exports.default = deburr;
});

var _asciiWords = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
    return string.match(reAsciiWord) || [];
}
exports.default = asciiWords;
});

var _hasUnicodeWord = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
}
exports.default = hasUnicodeWord;
});

var _unicodeWords = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rsAstralRange = '\\ud800-\\udfff', rsComboMarksRange = '\\u0300-\\u036f', reComboHalfMarksRange = '\\ufe20-\\ufe2f', rsComboSymbolsRange = '\\u20d0-\\u20ff', rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = '\\u2700-\\u27bf', rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff', rsMathOpRange = '\\xac\\xb1\\xd7\\xf7', rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf', rsPunctuationRange = '\\u2000-\\u206f', rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000', rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde', rsVarRange = '\\ufe0e\\ufe0f', rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['\u2019]", rsBreak = '[' + rsBreakRange + ']', rsCombo = '[' + rsComboRange + ']', rsDigits = '\\d+', rsDingbat = '[' + rsDingbatRange + ']', rsLower = '[' + rsLowerRange + ']', rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']', rsFitz = '\\ud83c[\\udffb-\\udfff]', rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')', rsNonAstral = '[^' + rsAstralRange + ']', rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}', rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]', rsUpper = '[' + rsUpperRange + ']', rsZWJ = '\\u200d';
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')', rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')', rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?', rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?', reOptMod = rsModifier + '?', rsOptVar = '[' + rsVarRange + ']?', rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*', rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)', rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)', rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
].join('|'), 'g');
function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
}
exports.default = unicodeWords;
});

var words_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _asciiWords_js_1 = _asciiWords;
var _hasUnicodeWord_js_1 = _hasUnicodeWord;
var toString_js_1 = toString_1;
var _unicodeWords_js_1 = _unicodeWords;
function words(string, pattern, guard) {
    string = toString_js_1.default(string);
    pattern = guard ? undefined : pattern;
    if (pattern === undefined) {
        return _hasUnicodeWord_js_1.default(string) ? _unicodeWords_js_1.default(string) : _asciiWords_js_1.default(string);
    }
    return string.match(pattern) || [];
}
exports.default = words;
});

var _createCompounder = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayReduce_js_1 = _arrayReduce;
var deburr_js_1 = deburr_1;
var words_js_1 = words_1;
var rsApos = "['\u2019]";
var reApos = RegExp(rsApos, 'g');
function createCompounder(callback) {
    return function (string) {
        return _arrayReduce_js_1.default(words_js_1.default(deburr_js_1.default(string).replace(reApos, '')), callback, '');
    };
}
exports.default = createCompounder;
});

var camelCase_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var capitalize_js_1 = capitalize_1;
var _createCompounder_js_1 = _createCompounder;
var camelCase = _createCompounder_js_1.default(function (result, word, index) {
    word = word.toLowerCase();
    return result + (index ? capitalize_js_1.default(word) : word);
});
exports.default = camelCase;
});

var castArray_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_js_1 = isArray_1;
function castArray() {
    if (!arguments.length) {
        return [];
    }
    var value = arguments[0];
    return isArray_js_1.default(value) ? value : [value];
}
exports.default = castArray;
});

var _createRound = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toInteger_js_1 = toInteger_1;
var toNumber_js_1 = toNumber_1;
var toString_js_1 = toString_1;
var nativeMin = Math.min;
function createRound(methodName) {
    var func = Math[methodName];
    return function (number, precision) {
        number = toNumber_js_1.default(number);
        precision = precision == null ? 0 : nativeMin(toInteger_js_1.default(precision), 292);
        if (precision) {
            var pair = (toString_js_1.default(number) + 'e').split('e'), value = func(pair[0] + 'e' + (+pair[1] + precision));
            pair = (toString_js_1.default(value) + 'e').split('e');
            return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
    };
}
exports.default = createRound;
});

var ceil_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRound_js_1 = _createRound;
var ceil = _createRound_js_1.default('ceil');
exports.default = ceil;
});

var chain_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperLodash_js_1 = wrapperLodash;
function chain(value) {
    var result = wrapperLodash_js_1.default(value);
    result.__chain__ = true;
    return result;
}
exports.default = chain;
});

var chunk_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
var _isIterateeCall_js_1 = _isIterateeCall;
var toInteger_js_1 = toInteger_1;
var nativeCeil = Math.ceil, nativeMax = Math.max;
function chunk(array, size, guard) {
    if ((guard ? _isIterateeCall_js_1.default(array, size, guard) : size === undefined)) {
        size = 1;
    }
    else {
        size = nativeMax(toInteger_js_1.default(size), 0);
    }
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    var index = 0, resIndex = 0, result = Array(nativeCeil(length / size));
    while (index < length) {
        result[resIndex++] = _baseSlice_js_1.default(array, index, (index += size));
    }
    return result;
}
exports.default = chunk;
});

var _baseClamp = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseClamp(number, lower, upper) {
    if (number === number) {
        if (upper !== undefined) {
            number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
            number = number >= lower ? number : lower;
        }
    }
    return number;
}
exports.default = baseClamp;
});

var clamp_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var toNumber_js_1 = toNumber_1;
function clamp(number, lower, upper) {
    if (upper === undefined) {
        upper = lower;
        lower = undefined;
    }
    if (upper !== undefined) {
        upper = toNumber_js_1.default(upper);
        upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
        lower = toNumber_js_1.default(lower);
        lower = lower === lower ? lower : 0;
    }
    return _baseClamp_js_1.default(toNumber_js_1.default(number), lower, upper);
}
exports.default = clamp;
});

var _stackClear = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ListCache_js_1 = _ListCache;
function stackClear() {
    this.__data__ = new _ListCache_js_1.default;
    this.size = 0;
}
exports.default = stackClear;
});

var _stackDelete = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stackDelete(key) {
    var data = this.__data__, result = data['delete'](key);
    this.size = data.size;
    return result;
}
exports.default = stackDelete;
});

var _stackGet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stackGet(key) {
    return this.__data__.get(key);
}
exports.default = stackGet;
});

var _stackHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stackHas(key) {
    return this.__data__.has(key);
}
exports.default = stackHas;
});

var _stackSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ListCache_js_1 = _ListCache;
var _Map_js_1 = _Map;
var _MapCache_js_1 = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache_js_1.default) {
        var pairs = data.__data__;
        if (!_Map_js_1.default || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
        }
        data = this.__data__ = new _MapCache_js_1.default(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
}
exports.default = stackSet;
});

var _Stack = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ListCache_js_1 = _ListCache;
var _stackClear_js_1 = _stackClear;
var _stackDelete_js_1 = _stackDelete;
var _stackGet_js_1 = _stackGet;
var _stackHas_js_1 = _stackHas;
var _stackSet_js_1 = _stackSet;
function Stack(entries) {
    var data = this.__data__ = new _ListCache_js_1.default(entries);
    this.size = data.size;
}
Stack.prototype.clear = _stackClear_js_1.default;
Stack.prototype['delete'] = _stackDelete_js_1.default;
Stack.prototype.get = _stackGet_js_1.default;
Stack.prototype.has = _stackHas_js_1.default;
Stack.prototype.set = _stackSet_js_1.default;
exports.default = Stack;
});

var _baseAssign = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var keys_js_1 = keys_1;
function baseAssign(object, source) {
    return object && _copyObject_js_1.default(source, keys_js_1.default(source), object);
}
exports.default = baseAssign;
});

var _baseAssignIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var keysIn_js_1 = keysIn_1;
function baseAssignIn(object, source) {
    return object && _copyObject_js_1.default(source, keysIn_js_1.default(source), object);
}
exports.default = baseAssignIn;
});

var _cloneBuffer = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? _root_js_1.default.Buffer : undefined, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
        return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
}
exports.default = cloneBuffer;
});

var _arrayFilter = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }
    return result;
}
exports.default = arrayFilter;
});

var stubArray_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stubArray() {
    return [];
}
exports.default = stubArray;
});

var _getSymbols = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var stubArray_js_1 = stubArray_1;
var objectProto = Object.prototype;
var propertyIsEnumerable = objectProto.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_js_1.default : function (object) {
    if (object == null) {
        return [];
    }
    object = Object(object);
    return _arrayFilter_js_1.default(nativeGetSymbols(object), function (symbol) {
        return propertyIsEnumerable.call(object, symbol);
    });
};
exports.default = getSymbols;
});

var _copySymbols = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var _getSymbols_js_1 = _getSymbols;
function copySymbols(source, object) {
    return _copyObject_js_1.default(source, _getSymbols_js_1.default(source), object);
}
exports.default = copySymbols;
});

var _getSymbolsIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayPush_js_1 = _arrayPush;
var _getPrototype_js_1 = _getPrototype;
var _getSymbols_js_1 = _getSymbols;
var stubArray_js_1 = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray_js_1.default : function (object) {
    var result = [];
    while (object) {
        _arrayPush_js_1.default(result, _getSymbols_js_1.default(object));
        object = _getPrototype_js_1.default(object);
    }
    return result;
};
exports.default = getSymbolsIn;
});

var _copySymbolsIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var _getSymbolsIn_js_1 = _getSymbolsIn;
function copySymbolsIn(source, object) {
    return _copyObject_js_1.default(source, _getSymbolsIn_js_1.default(source), object);
}
exports.default = copySymbolsIn;
});

var _baseGetAllKeys = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayPush_js_1 = _arrayPush;
var isArray_js_1 = isArray_1;
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_js_1.default(object) ? result : _arrayPush_js_1.default(result, symbolsFunc(object));
}
exports.default = baseGetAllKeys;
});

var _getAllKeys = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetAllKeys_js_1 = _baseGetAllKeys;
var _getSymbols_js_1 = _getSymbols;
var keys_js_1 = keys_1;
function getAllKeys(object) {
    return _baseGetAllKeys_js_1.default(object, keys_js_1.default, _getSymbols_js_1.default);
}
exports.default = getAllKeys;
});

var _getAllKeysIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetAllKeys_js_1 = _baseGetAllKeys;
var _getSymbolsIn_js_1 = _getSymbolsIn;
var keysIn_js_1 = keysIn_1;
function getAllKeysIn(object) {
    return _baseGetAllKeys_js_1.default(object, keysIn_js_1.default, _getSymbolsIn_js_1.default);
}
exports.default = getAllKeysIn;
});

var _DataView = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var _root_js_1 = _root;
var DataView = _getNative_js_1.default(_root_js_1.default, 'DataView');
exports.default = DataView;
});

var _Promise = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var _root_js_1 = _root;
var Promise = _getNative_js_1.default(_root_js_1.default, 'Promise');
exports.default = Promise;
});

var _Set = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getNative_js_1 = _getNative;
var _root_js_1 = _root;
var Set = _getNative_js_1.default(_root_js_1.default, 'Set');
exports.default = Set;
});

var _getTag = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _DataView_js_1 = _DataView;
var _Map_js_1 = _Map;
var _Promise_js_1 = _Promise;
var _Set_js_1 = _Set;
var _WeakMap_js_1 = _WeakMap;
var _baseGetTag_js_1 = _baseGetTag;
var _toSource_js_1 = _toSource;
var mapTag = '[object Map]', objectTag = '[object Object]', promiseTag = '[object Promise]', setTag = '[object Set]', weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
var dataViewCtorString = _toSource_js_1.default(_DataView_js_1.default), mapCtorString = _toSource_js_1.default(_Map_js_1.default), promiseCtorString = _toSource_js_1.default(_Promise_js_1.default), setCtorString = _toSource_js_1.default(_Set_js_1.default), weakMapCtorString = _toSource_js_1.default(_WeakMap_js_1.default);
var getTag = _baseGetTag_js_1.default;
if ((_DataView_js_1.default && getTag(new _DataView_js_1.default(new ArrayBuffer(1))) != dataViewTag) ||
    (_Map_js_1.default && getTag(new _Map_js_1.default) != mapTag) ||
    (_Promise_js_1.default && getTag(_Promise_js_1.default.resolve()) != promiseTag) ||
    (_Set_js_1.default && getTag(new _Set_js_1.default) != setTag) ||
    (_WeakMap_js_1.default && getTag(new _WeakMap_js_1.default) != weakMapTag)) {
    getTag = function (value) {
        var result = _baseGetTag_js_1.default(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? _toSource_js_1.default(Ctor) : '';
        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString: return dataViewTag;
                case mapCtorString: return mapTag;
                case promiseCtorString: return promiseTag;
                case setCtorString: return setTag;
                case weakMapCtorString: return weakMapTag;
            }
        }
        return result;
    };
}
exports.default = getTag;
});

var _initCloneArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
    var length = array.length, result = array.constructor(length);
    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
    }
    return result;
}
exports.default = initCloneArray;
});

var _Uint8Array = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var Uint8Array = _root_js_1.default.Uint8Array;
exports.default = Uint8Array;
});

var _cloneArrayBuffer = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Uint8Array_js_1 = _Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array_js_1.default(result).set(new _Uint8Array_js_1.default(arrayBuffer));
    return result;
}
exports.default = cloneArrayBuffer;
});

var _cloneDataView = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _cloneArrayBuffer_js_1 = _cloneArrayBuffer;
function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer_js_1.default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
exports.default = cloneDataView;
});

var _addMapEntry = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
}
exports.default = addMapEntry;
});

var _mapToArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function (value, key) {
        result[++index] = [key, value];
    });
    return result;
}
exports.default = mapToArray;
});

var _cloneMap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _addMapEntry_js_1 = _addMapEntry;
var _arrayReduce_js_1 = _arrayReduce;
var _mapToArray_js_1 = _mapToArray;
var CLONE_DEEP_FLAG = 1;
function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(_mapToArray_js_1.default(map), CLONE_DEEP_FLAG) : _mapToArray_js_1.default(map);
    return _arrayReduce_js_1.default(array, _addMapEntry_js_1.default, new map.constructor);
}
exports.default = cloneMap;
});

var _cloneRegExp = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
}
exports.default = cloneRegExp;
});

var _addSetEntry = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addSetEntry(set, value) {
    set.add(value);
    return set;
}
exports.default = addSetEntry;
});

var _setToArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function (value) {
        result[++index] = value;
    });
    return result;
}
exports.default = setToArray;
});

var _cloneSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _addSetEntry_js_1 = _addSetEntry;
var _arrayReduce_js_1 = _arrayReduce;
var _setToArray_js_1 = _setToArray;
var CLONE_DEEP_FLAG = 1;
function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(_setToArray_js_1.default(set), CLONE_DEEP_FLAG) : _setToArray_js_1.default(set);
    return _arrayReduce_js_1.default(array, _addSetEntry_js_1.default, new set.constructor);
}
exports.default = cloneSet;
});

var _cloneSymbol = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var symbolProto = _Symbol_js_1.default ? _Symbol_js_1.default.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
exports.default = cloneSymbol;
});

var _cloneTypedArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _cloneArrayBuffer_js_1 = _cloneArrayBuffer;
function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer_js_1.default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
exports.default = cloneTypedArray;
});

var _initCloneByTag = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _cloneArrayBuffer_js_1 = _cloneArrayBuffer;
var _cloneDataView_js_1 = _cloneDataView;
var _cloneMap_js_1 = _cloneMap;
var _cloneRegExp_js_1 = _cloneRegExp;
var _cloneSet_js_1 = _cloneSet;
var _cloneSymbol_js_1 = _cloneSymbol;
var _cloneTypedArray_js_1 = _cloneTypedArray;
var boolTag = '[object Boolean]', dateTag = '[object Date]', mapTag = '[object Map]', numberTag = '[object Number]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
        case arrayBufferTag:
            return _cloneArrayBuffer_js_1.default(object);
        case boolTag:
        case dateTag:
            return new Ctor(+object);
        case dataViewTag:
            return _cloneDataView_js_1.default(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
            return _cloneTypedArray_js_1.default(object, isDeep);
        case mapTag:
            return _cloneMap_js_1.default(object, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
            return new Ctor(object);
        case regexpTag:
            return _cloneRegExp_js_1.default(object);
        case setTag:
            return _cloneSet_js_1.default(object, isDeep, cloneFunc);
        case symbolTag:
            return _cloneSymbol_js_1.default(object);
    }
}
exports.default = initCloneByTag;
});

var _initCloneObject = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseCreate_js_1 = _baseCreate;
var _getPrototype_js_1 = _getPrototype;
var _isPrototype_js_1 = _isPrototype;
function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype_js_1.default(object))
        ? _baseCreate_js_1.default(_getPrototype_js_1.default(object))
        : {};
}
exports.default = initCloneObject;
});

var _baseClone = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Stack_js_1 = _Stack;
var _arrayEach_js_1 = _arrayEach;
var _assignValue_js_1 = _assignValue;
var _baseAssign_js_1 = _baseAssign;
var _baseAssignIn_js_1 = _baseAssignIn;
var _cloneBuffer_js_1 = _cloneBuffer;
var _copyArray_js_1 = _copyArray;
var _copySymbols_js_1 = _copySymbols;
var _copySymbolsIn_js_1 = _copySymbolsIn;
var _getAllKeys_js_1 = _getAllKeys;
var _getAllKeysIn_js_1 = _getAllKeysIn;
var _getTag_js_1 = _getTag;
var _initCloneArray_js_1 = _initCloneArray;
var _initCloneByTag_js_1 = _initCloneByTag;
var _initCloneObject_js_1 = _initCloneObject;
var isArray_js_1 = isArray_1;
var isBuffer_js_1 = isBuffer_1;
var isObject_js_1 = isObject_1;
var keys_js_1 = keys_1;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
var argsTag = '[object Arguments]', arrayTag = '[object Array]', boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', mapTag = '[object Map]', numberTag = '[object Number]', objectTag = '[object Object]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', symbolTag = '[object Symbol]', weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
        cloneableTags[boolTag] = cloneableTags[dateTag] =
            cloneableTags[float32Tag] = cloneableTags[float64Tag] =
                cloneableTags[int8Tag] = cloneableTags[int16Tag] =
                    cloneableTags[int32Tag] = cloneableTags[mapTag] =
                        cloneableTags[numberTag] = cloneableTags[objectTag] =
                            cloneableTags[regexpTag] = cloneableTags[setTag] =
                                cloneableTags[stringTag] = cloneableTags[symbolTag] =
                                    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
                                        cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
        return result;
    }
    if (!isObject_js_1.default(value)) {
        return value;
    }
    var isArr = isArray_js_1.default(value);
    if (isArr) {
        result = _initCloneArray_js_1.default(value);
        if (!isDeep) {
            return _copyArray_js_1.default(value, result);
        }
    }
    else {
        var tag = _getTag_js_1.default(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer_js_1.default(value)) {
            return _cloneBuffer_js_1.default(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : _initCloneObject_js_1.default(value);
            if (!isDeep) {
                return isFlat
                    ? _copySymbolsIn_js_1.default(value, _baseAssignIn_js_1.default(result, value))
                    : _copySymbols_js_1.default(value, _baseAssign_js_1.default(result, value));
            }
        }
        else {
            if (!cloneableTags[tag]) {
                return object ? value : {};
            }
            result = _initCloneByTag_js_1.default(value, tag, baseClone, isDeep);
        }
    }
    stack || (stack = new _Stack_js_1.default);
    var stacked = stack.get(value);
    if (stacked) {
        return stacked;
    }
    stack.set(value, result);
    var keysFunc = isFull
        ? (isFlat ? _getAllKeysIn_js_1.default : _getAllKeys_js_1.default)
        : (isFlat ? keysIn : keys_js_1.default);
    var props = isArr ? undefined : keysFunc(value);
    _arrayEach_js_1.default(props || value, function (subValue, key) {
        if (props) {
            key = subValue;
            subValue = value[key];
        }
        _assignValue_js_1.default(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
}
exports.default = baseClone;
});

var clone_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var CLONE_SYMBOLS_FLAG = 4;
function clone(value) {
    return _baseClone_js_1.default(value, CLONE_SYMBOLS_FLAG);
}
exports.default = clone;
});

var cloneDeep_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
    return _baseClone_js_1.default(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
exports.default = cloneDeep;
});

var cloneDeepWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeepWith(value, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return _baseClone_js_1.default(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
}
exports.default = cloneDeepWith;
});

var cloneWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var CLONE_SYMBOLS_FLAG = 4;
function cloneWith(value, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return _baseClone_js_1.default(value, CLONE_SYMBOLS_FLAG, customizer);
}
exports.default = cloneWith;
});

var commit = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LodashWrapper_js_1 = _LodashWrapper;
function wrapperCommit() {
    return new _LodashWrapper_js_1.default(this.value(), this.__chain__);
}
exports.default = wrapperCommit;
});

var compact_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compact(array) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
        var value = array[index];
        if (value) {
            result[resIndex++] = value;
        }
    }
    return result;
}
exports.default = compact;
});

var concat_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayPush_js_1 = _arrayPush;
var _baseFlatten_js_1 = _baseFlatten;
var _copyArray_js_1 = _copyArray;
var isArray_js_1 = isArray_1;
function concat() {
    var length = arguments.length;
    if (!length) {
        return [];
    }
    var args = Array(length - 1), array = arguments[0], index = length;
    while (index--) {
        args[index - 1] = arguments[index];
    }
    return _arrayPush_js_1.default(isArray_js_1.default(array) ? _copyArray_js_1.default(array) : [array], _baseFlatten_js_1.default(args, 1));
}
exports.default = concat;
});

var _setCacheAdd = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HASH_UNDEFINED = '__lodash_hash_undefined__';
function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
}
exports.default = setCacheAdd;
});

var _setCacheHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setCacheHas(value) {
    return this.__data__.has(value);
}
exports.default = setCacheHas;
});

var _SetCache = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _MapCache_js_1 = _MapCache;
var _setCacheAdd_js_1 = _setCacheAdd;
var _setCacheHas_js_1 = _setCacheHas;
function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new _MapCache_js_1.default;
    while (++index < length) {
        this.add(values[index]);
    }
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd_js_1.default;
SetCache.prototype.has = _setCacheHas_js_1.default;
exports.default = SetCache;
});

var _arraySome = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return true;
        }
    }
    return false;
}
exports.default = arraySome;
});

var _cacheHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cacheHas(cache, key) {
    return cache.has(key);
}
exports.default = cacheHas;
});

var _equalArrays = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _SetCache_js_1 = _SetCache;
var _arraySome_js_1 = _arraySome;
var _cacheHas_js_1 = _cacheHas;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
    }
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var index = -1, result = true, seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache_js_1.default : undefined;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
            var compared = isPartial
                ? customizer(othValue, arrValue, index, other, array, stack)
                : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
            if (compared) {
                continue;
            }
            result = false;
            break;
        }
        if (seen) {
            if (!_arraySome_js_1.default(other, function (othValue, othIndex) {
                if (!_cacheHas_js_1.default(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                }
            })) {
                result = false;
                break;
            }
        }
        else if (!(arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
        }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
}
exports.default = equalArrays;
});

var _equalByTag = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var _Uint8Array_js_1 = _Uint8Array;
var eq_js_1 = eq_1;
var _equalArrays_js_1 = _equalArrays;
var _mapToArray_js_1 = _mapToArray;
var _setToArray_js_1 = _setToArray;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', mapTag = '[object Map]', numberTag = '[object Number]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]';
var symbolProto = _Symbol_js_1.default ? _Symbol_js_1.default.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
        case dataViewTag:
            if ((object.byteLength != other.byteLength) ||
                (object.byteOffset != other.byteOffset)) {
                return false;
            }
            object = object.buffer;
            other = other.buffer;
        case arrayBufferTag:
            if ((object.byteLength != other.byteLength) ||
                !equalFunc(new _Uint8Array_js_1.default(object), new _Uint8Array_js_1.default(other))) {
                return false;
            }
            return true;
        case boolTag:
        case dateTag:
        case numberTag:
            return eq_js_1.default(+object, +other);
        case errorTag:
            return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
            return object == (other + '');
        case mapTag:
            var convert = _mapToArray_js_1.default;
        case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = _setToArray_js_1.default);
            if (object.size != other.size && !isPartial) {
                return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
                return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result = _equalArrays_js_1.default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;
        case symbolTag:
            if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
    }
    return false;
}
exports.default = equalByTag;
});

var _equalObjects = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getAllKeys_js_1 = _getAllKeys;
var COMPARE_PARTIAL_FLAG = 1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = _getAllKeys_js_1.default(object), objLength = objProps.length, othProps = _getAllKeys_js_1.default(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
        return false;
    }
    var index = objLength;
    while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
        }
    }
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
        return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
            var compared = isPartial
                ? customizer(othValue, objValue, key, other, object, stack)
                : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
                typeof othCtor == 'function' && othCtor instanceof othCtor)) {
            result = false;
        }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
}
exports.default = equalObjects;
});

var _baseIsEqualDeep = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Stack_js_1 = _Stack;
var _equalArrays_js_1 = _equalArrays;
var _equalByTag_js_1 = _equalByTag;
var _equalObjects_js_1 = _equalObjects;
var _getTag_js_1 = _getTag;
var isArray_js_1 = isArray_1;
var isBuffer_js_1 = isBuffer_1;
var isTypedArray_js_1 = isTypedArray_1;
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = '[object Arguments]', arrayTag = '[object Array]', objectTag = '[object Object]';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_js_1.default(object), othIsArr = isArray_js_1.default(other), objTag = objIsArr ? arrayTag : _getTag_js_1.default(object), othTag = othIsArr ? arrayTag : _getTag_js_1.default(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer_js_1.default(object)) {
        if (!isBuffer_js_1.default(other)) {
            return false;
        }
        objIsArr = true;
        objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
        stack || (stack = new _Stack_js_1.default);
        return (objIsArr || isTypedArray_js_1.default(object))
            ? _equalArrays_js_1.default(object, other, bitmask, customizer, equalFunc, stack)
            : _equalByTag_js_1.default(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'), othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new _Stack_js_1.default);
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
    }
    if (!isSameTag) {
        return false;
    }
    stack || (stack = new _Stack_js_1.default);
    return _equalObjects_js_1.default(object, other, bitmask, customizer, equalFunc, stack);
}
exports.default = baseIsEqualDeep;
});

var _baseIsEqual = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsEqualDeep_js_1 = _baseIsEqualDeep;
var isObjectLike_js_1 = isObjectLike_1;
function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
        return true;
    }
    if (value == null || other == null || (!isObjectLike_js_1.default(value) && !isObjectLike_js_1.default(other))) {
        return value !== value && other !== other;
    }
    return _baseIsEqualDeep_js_1.default(value, other, bitmask, customizer, baseIsEqual, stack);
}
exports.default = baseIsEqual;
});

var _baseIsMatch = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Stack_js_1 = _Stack;
var _baseIsEqual_js_1 = _baseIsEqual;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
        return !length;
    }
    object = Object(object);
    while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)) {
            return false;
        }
    }
    while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) {
                return false;
            }
        }
        else {
            var stack = new _Stack_js_1.default;
            if (customizer) {
                var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === undefined
                ? _baseIsEqual_js_1.default(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result)) {
                return false;
            }
        }
    }
    return true;
}
exports.default = baseIsMatch;
});

var _isStrictComparable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_js_1 = isObject_1;
function isStrictComparable(value) {
    return value === value && !isObject_js_1.default(value);
}
exports.default = isStrictComparable;
});

var _getMatchData = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isStrictComparable_js_1 = _isStrictComparable;
var keys_js_1 = keys_1;
function getMatchData(object) {
    var result = keys_js_1.default(object), length = result.length;
    while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, _isStrictComparable_js_1.default(value)];
    }
    return result;
}
exports.default = getMatchData;
});

var _matchesStrictComparable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchesStrictComparable(key, srcValue) {
    return function (object) {
        if (object == null) {
            return false;
        }
        return object[key] === srcValue &&
            (srcValue !== undefined || (key in Object(object)));
    };
}
exports.default = matchesStrictComparable;
});

var _baseMatches = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsMatch_js_1 = _baseIsMatch;
var _getMatchData_js_1 = _getMatchData;
var _matchesStrictComparable_js_1 = _matchesStrictComparable;
function baseMatches(source) {
    var matchData = _getMatchData_js_1.default(source);
    if (matchData.length == 1 && matchData[0][2]) {
        return _matchesStrictComparable_js_1.default(matchData[0][0], matchData[0][1]);
    }
    return function (object) {
        return object === source || _baseIsMatch_js_1.default(object, source, matchData);
    };
}
exports.default = baseMatches;
});

var _baseHasIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseHasIn(object, key) {
    return object != null && key in Object(object);
}
exports.default = baseHasIn;
});

var _hasPath = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _castPath_js_1 = _castPath;
var isArguments_js_1 = isArguments_1;
var isArray_js_1 = isArray_1;
var _isIndex_js_1 = _isIndex;
var isLength_js_1 = isLength_1;
var _toKey_js_1 = _toKey;
function hasPath(object, path, hasFunc) {
    path = _castPath_js_1.default(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
        var key = _toKey_js_1.default(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
            break;
        }
        object = object[key];
    }
    if (result || ++index != length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_js_1.default(length) && _isIndex_js_1.default(key, length) &&
        (isArray_js_1.default(object) || isArguments_js_1.default(object));
}
exports.default = hasPath;
});

var hasIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseHasIn_js_1 = _baseHasIn;
var _hasPath_js_1 = _hasPath;
function hasIn(object, path) {
    return object != null && _hasPath_js_1.default(object, path, _baseHasIn_js_1.default);
}
exports.default = hasIn;
});

var _baseMatchesProperty = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsEqual_js_1 = _baseIsEqual;
var get_js_1 = get_1;
var hasIn_js_1 = hasIn_1;
var _isKey_js_1 = _isKey;
var _isStrictComparable_js_1 = _isStrictComparable;
var _matchesStrictComparable_js_1 = _matchesStrictComparable;
var _toKey_js_1 = _toKey;
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
    if (_isKey_js_1.default(path) && _isStrictComparable_js_1.default(srcValue)) {
        return _matchesStrictComparable_js_1.default(_toKey_js_1.default(path), srcValue);
    }
    return function (object) {
        var objValue = get_js_1.default(object, path);
        return (objValue === undefined && objValue === srcValue)
            ? hasIn_js_1.default(object, path)
            : _baseIsEqual_js_1.default(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
}
exports.default = baseMatchesProperty;
});

var _baseProperty = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseProperty(key) {
    return function (object) {
        return object == null ? undefined : object[key];
    };
}
exports.default = baseProperty;
});

var _basePropertyDeep = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGet_js_1 = _baseGet;
function basePropertyDeep(path) {
    return function (object) {
        return _baseGet_js_1.default(object, path);
    };
}
exports.default = basePropertyDeep;
});

var property_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseProperty_js_1 = _baseProperty;
var _basePropertyDeep_js_1 = _basePropertyDeep;
var _isKey_js_1 = _isKey;
var _toKey_js_1 = _toKey;
function property(path) {
    return _isKey_js_1.default(path) ? _baseProperty_js_1.default(_toKey_js_1.default(path)) : _basePropertyDeep_js_1.default(path);
}
exports.default = property;
});

var _baseIteratee = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseMatches_js_1 = _baseMatches;
var _baseMatchesProperty_js_1 = _baseMatchesProperty;
var identity_js_1 = identity_1;
var isArray_js_1 = isArray_1;
var property_js_1 = property_1;
function baseIteratee(value) {
    if (typeof value == 'function') {
        return value;
    }
    if (value == null) {
        return identity_js_1.default;
    }
    if (typeof value == 'object') {
        return isArray_js_1.default(value)
            ? _baseMatchesProperty_js_1.default(value[0], value[1])
            : _baseMatches_js_1.default(value);
    }
    return property_js_1.default(value);
}
exports.default = baseIteratee;
});

var cond_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _arrayMap_js_1 = _arrayMap;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var FUNC_ERROR_TEXT = 'Expected a function';
function cond(pairs) {
    var length = pairs == null ? 0 : pairs.length, toIteratee = _baseIteratee_js_1.default;
    pairs = !length ? [] : _arrayMap_js_1.default(pairs, function (pair) {
        if (typeof pair[1] != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
    });
    return _baseRest_js_1.default(function (args) {
        var index = -1;
        while (++index < length) {
            var pair = pairs[index];
            if (_apply_js_1.default(pair[0], this, args)) {
                return _apply_js_1.default(pair[1], this, args);
            }
        }
    });
}
exports.default = cond;
});

var _baseConformsTo = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseConformsTo(object, source, props) {
    var length = props.length;
    if (object == null) {
        return !length;
    }
    object = Object(object);
    while (length--) {
        var key = props[length], predicate = source[key], value = object[key];
        if ((value === undefined && !(key in object)) || !predicate(value)) {
            return false;
        }
    }
    return true;
}
exports.default = baseConformsTo;
});

var _baseConforms = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseConformsTo_js_1 = _baseConformsTo;
var keys_js_1 = keys_1;
function baseConforms(source) {
    var props = keys_js_1.default(source);
    return function (object) {
        return _baseConformsTo_js_1.default(object, source, props);
    };
}
exports.default = baseConforms;
});

var conforms_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var _baseConforms_js_1 = _baseConforms;
var CLONE_DEEP_FLAG = 1;
function conforms(source) {
    return _baseConforms_js_1.default(_baseClone_js_1.default(source, CLONE_DEEP_FLAG));
}
exports.default = conforms;
});

var conformsTo_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseConformsTo_js_1 = _baseConformsTo;
var keys_js_1 = keys_1;
function conformsTo(object, source) {
    return source == null || _baseConformsTo_js_1.default(object, source, keys_js_1.default(source));
}
exports.default = conformsTo;
});

var _arrayAggregator = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
}
exports.default = arrayAggregator;
});

var _createBaseFor = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
                break;
            }
        }
        return object;
    };
}
exports.default = createBaseFor;
});

var _baseFor = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createBaseFor_js_1 = _createBaseFor;
var baseFor = _createBaseFor_js_1.default();
exports.default = baseFor;
});

var _baseForOwn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFor_js_1 = _baseFor;
var keys_js_1 = keys_1;
function baseForOwn(object, iteratee) {
    return object && _baseFor_js_1.default(object, iteratee, keys_js_1.default);
}
exports.default = baseForOwn;
});

var _createBaseEach = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArrayLike_js_1 = isArrayLike_1;
function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
        if (collection == null) {
            return collection;
        }
        if (!isArrayLike_js_1.default(collection)) {
            return eachFunc(collection, iteratee);
        }
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while ((fromRight ? index-- : ++index < length)) {
            if (iteratee(iterable[index], index, iterable) === false) {
                break;
            }
        }
        return collection;
    };
}
exports.default = createBaseEach;
});

var _baseEach = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForOwn_js_1 = _baseForOwn;
var _createBaseEach_js_1 = _createBaseEach;
var baseEach = _createBaseEach_js_1.default(_baseForOwn_js_1.default);
exports.default = baseEach;
});

var _baseAggregator = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseEach_js_1 = _baseEach;
function baseAggregator(collection, setter, iteratee, accumulator) {
    _baseEach_js_1.default(collection, function (value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
    });
    return accumulator;
}
exports.default = baseAggregator;
});

var _createAggregator = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayAggregator_js_1 = _arrayAggregator;
var _baseAggregator_js_1 = _baseAggregator;
var _baseIteratee_js_1 = _baseIteratee;
var isArray_js_1 = isArray_1;
function createAggregator(setter, initializer) {
    return function (collection, iteratee) {
        var func = isArray_js_1.default(collection) ? _arrayAggregator_js_1.default : _baseAggregator_js_1.default, accumulator = initializer ? initializer() : {};
        return func(collection, setter, _baseIteratee_js_1.default(iteratee, 2), accumulator);
    };
}
exports.default = createAggregator;
});

var countBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var _createAggregator_js_1 = _createAggregator;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var countBy = _createAggregator_js_1.default(function (result, value, key) {
    if (hasOwnProperty.call(result, key)) {
        ++result[key];
    }
    else {
        _baseAssignValue_js_1.default(result, key, 1);
    }
});
exports.default = countBy;
});

var create_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssign_js_1 = _baseAssign;
var _baseCreate_js_1 = _baseCreate;
function create(prototype, properties) {
    var result = _baseCreate_js_1.default(prototype);
    return properties == null ? result : _baseAssign_js_1.default(result, properties);
}
exports.default = create;
});

var curry_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createWrap_js_1 = _createWrap;
var WRAP_CURRY_FLAG = 8;
function curry(func, arity, guard) {
    arity = guard ? undefined : arity;
    var result = _createWrap_js_1.default(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
    result.placeholder = curry.placeholder;
    return result;
}
curry.placeholder = {};
exports.default = curry;
});

var curryRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createWrap_js_1 = _createWrap;
var WRAP_CURRY_RIGHT_FLAG = 16;
function curryRight(func, arity, guard) {
    arity = guard ? undefined : arity;
    var result = _createWrap_js_1.default(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
    result.placeholder = curryRight.placeholder;
    return result;
}
curryRight.placeholder = {};
exports.default = curryRight;
});

var now_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var now = function () {
    return _root_js_1.default.Date.now();
};
exports.default = now;
});

var debounce_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObject_js_1 = isObject_1;
var now_js_1 = now_1;
var toNumber_js_1 = toNumber_1;
var FUNC_ERROR_TEXT = 'Expected a function';
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_js_1.default(wait) || 0;
    if (isObject_js_1.default(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber_js_1.default(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
            (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }
    function timerExpired() {
        var time = now_js_1.default();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(now_js_1.default());
    }
    function debounced() {
        var time = now_js_1.default(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
exports.default = debounce;
});

var defaultTo_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defaultTo(value, defaultValue) {
    return (value == null || value !== value) ? defaultValue : value;
}
exports.default = defaultTo;
});

var _customDefaultsAssignIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eq_js_1 = eq_1;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function customDefaultsAssignIn(objValue, srcValue, key, object) {
    if (objValue === undefined ||
        (eq_js_1.default(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
    }
    return objValue;
}
exports.default = customDefaultsAssignIn;
});

var defaults_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var assignInWith_js_1 = assignInWith_1;
var _baseRest_js_1 = _baseRest;
var _customDefaultsAssignIn_js_1 = _customDefaultsAssignIn;
var defaults = _baseRest_js_1.default(function (args) {
    args.push(undefined, _customDefaultsAssignIn_js_1.default);
    return _apply_js_1.default(assignInWith_js_1.default, undefined, args);
});
exports.default = defaults;
});

var _assignMergeValue = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var eq_js_1 = eq_1;
function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq_js_1.default(object[key], value)) ||
        (value === undefined && !(key in object))) {
        _baseAssignValue_js_1.default(object, key, value);
    }
}
exports.default = assignMergeValue;
});

var isArrayLikeObject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArrayLike_js_1 = isArrayLike_1;
var isObjectLike_js_1 = isObjectLike_1;
function isArrayLikeObject(value) {
    return isObjectLike_js_1.default(value) && isArrayLike_js_1.default(value);
}
exports.default = isArrayLikeObject;
});

var toPlainObject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyObject_js_1 = _copyObject;
var keysIn_js_1 = keysIn_1;
function toPlainObject(value) {
    return _copyObject_js_1.default(value, keysIn_js_1.default(value));
}
exports.default = toPlainObject;
});

var _baseMergeDeep = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assignMergeValue_js_1 = _assignMergeValue;
var _cloneBuffer_js_1 = _cloneBuffer;
var _cloneTypedArray_js_1 = _cloneTypedArray;
var _copyArray_js_1 = _copyArray;
var _initCloneObject_js_1 = _initCloneObject;
var isArguments_js_1 = isArguments_1;
var isArray_js_1 = isArray_1;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var isBuffer_js_1 = isBuffer_1;
var isFunction_js_1 = isFunction_1;
var isObject_js_1 = isObject_1;
var isPlainObject_js_1 = isPlainObject_1;
var isTypedArray_js_1 = isTypedArray_1;
var toPlainObject_js_1 = toPlainObject_1;
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = object[key], srcValue = source[key], stacked = stack.get(srcValue);
    if (stacked) {
        _assignMergeValue_js_1.default(object, key, stacked);
        return;
    }
    var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;
    var isCommon = newValue === undefined;
    if (isCommon) {
        var isArr = isArray_js_1.default(srcValue), isBuff = !isArr && isBuffer_js_1.default(srcValue), isTyped = !isArr && !isBuff && isTypedArray_js_1.default(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
            if (isArray_js_1.default(objValue)) {
                newValue = objValue;
            }
            else if (isArrayLikeObject_js_1.default(objValue)) {
                newValue = _copyArray_js_1.default(objValue);
            }
            else if (isBuff) {
                isCommon = false;
                newValue = _cloneBuffer_js_1.default(srcValue, true);
            }
            else if (isTyped) {
                isCommon = false;
                newValue = _cloneTypedArray_js_1.default(srcValue, true);
            }
            else {
                newValue = [];
            }
        }
        else if (isPlainObject_js_1.default(srcValue) || isArguments_js_1.default(srcValue)) {
            newValue = objValue;
            if (isArguments_js_1.default(objValue)) {
                newValue = toPlainObject_js_1.default(objValue);
            }
            else if (!isObject_js_1.default(objValue) || (srcIndex && isFunction_js_1.default(objValue))) {
                newValue = _initCloneObject_js_1.default(srcValue);
            }
        }
        else {
            isCommon = false;
        }
    }
    if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
    }
    _assignMergeValue_js_1.default(object, key, newValue);
}
exports.default = baseMergeDeep;
});

var _baseMerge = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Stack_js_1 = _Stack;
var _assignMergeValue_js_1 = _assignMergeValue;
var _baseFor_js_1 = _baseFor;
var _baseMergeDeep_js_1 = _baseMergeDeep;
var isObject_js_1 = isObject_1;
var keysIn_js_1 = keysIn_1;
function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
        return;
    }
    _baseFor_js_1.default(source, function (srcValue, key) {
        if (isObject_js_1.default(srcValue)) {
            stack || (stack = new _Stack_js_1.default);
            _baseMergeDeep_js_1.default(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
            var newValue = customizer
                ? customizer(object[key], srcValue, (key + ''), object, source, stack)
                : undefined;
            if (newValue === undefined) {
                newValue = srcValue;
            }
            _assignMergeValue_js_1.default(object, key, newValue);
        }
    }, keysIn_js_1.default);
}
exports.default = baseMerge;
});

var _customDefaultsMerge = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseMerge_js_1 = _baseMerge;
var isObject_js_1 = isObject_1;
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
    if (isObject_js_1.default(objValue) && isObject_js_1.default(srcValue)) {
        stack.set(srcValue, objValue);
        _baseMerge_js_1.default(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
    }
    return objValue;
}
exports.default = customDefaultsMerge;
});

var mergeWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseMerge_js_1 = _baseMerge;
var _createAssigner_js_1 = _createAssigner;
var mergeWith = _createAssigner_js_1.default(function (object, source, srcIndex, customizer) {
    _baseMerge_js_1.default(object, source, srcIndex, customizer);
});
exports.default = mergeWith;
});

var defaultsDeep_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _baseRest_js_1 = _baseRest;
var _customDefaultsMerge_js_1 = _customDefaultsMerge;
var mergeWith_js_1 = mergeWith_1;
var defaultsDeep = _baseRest_js_1.default(function (args) {
    args.push(undefined, _customDefaultsMerge_js_1.default);
    return _apply_js_1.default(mergeWith_js_1.default, undefined, args);
});
exports.default = defaultsDeep;
});

var _baseDelay = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FUNC_ERROR_TEXT = 'Expected a function';
function baseDelay(func, wait, args) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    return setTimeout(function () { func.apply(undefined, args); }, wait);
}
exports.default = baseDelay;
});

var defer_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDelay_js_1 = _baseDelay;
var _baseRest_js_1 = _baseRest;
var defer = _baseRest_js_1.default(function (func, args) {
    return _baseDelay_js_1.default(func, 1, args);
});
exports.default = defer;
});

var delay_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDelay_js_1 = _baseDelay;
var _baseRest_js_1 = _baseRest;
var toNumber_js_1 = toNumber_1;
var delay = _baseRest_js_1.default(function (func, wait, args) {
    return _baseDelay_js_1.default(func, toNumber_js_1.default(wait) || 0, args);
});
exports.default = delay;
});

var _arrayIncludesWith = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayIncludesWith(array, value, comparator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
        if (comparator(value, array[index])) {
            return true;
        }
    }
    return false;
}
exports.default = arrayIncludesWith;
});

var _baseDifference = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _SetCache_js_1 = _SetCache;
var _arrayIncludes_js_1 = _arrayIncludes;
var _arrayIncludesWith_js_1 = _arrayIncludesWith;
var _arrayMap_js_1 = _arrayMap;
var _baseUnary_js_1 = _baseUnary;
var _cacheHas_js_1 = _cacheHas;
var LARGE_ARRAY_SIZE = 200;
function baseDifference(array, values, iteratee, comparator) {
    var index = -1, includes = _arrayIncludes_js_1.default, isCommon = true, length = array.length, result = [], valuesLength = values.length;
    if (!length) {
        return result;
    }
    if (iteratee) {
        values = _arrayMap_js_1.default(values, _baseUnary_js_1.default(iteratee));
    }
    if (comparator) {
        includes = _arrayIncludesWith_js_1.default;
        isCommon = false;
    }
    else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = _cacheHas_js_1.default;
        isCommon = false;
        values = new _SetCache_js_1.default(values);
    }
    outer: while (++index < length) {
        var value = array[index], computed = iteratee == null ? value : iteratee(value);
        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
                if (values[valuesIndex] === computed) {
                    continue outer;
                }
            }
            result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
            result.push(value);
        }
    }
    return result;
}
exports.default = baseDifference;
});

var difference_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDifference_js_1 = _baseDifference;
var _baseFlatten_js_1 = _baseFlatten;
var _baseRest_js_1 = _baseRest;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var difference = _baseRest_js_1.default(function (array, values) {
    return isArrayLikeObject_js_1.default(array)
        ? _baseDifference_js_1.default(array, _baseFlatten_js_1.default(values, 1, isArrayLikeObject_js_1.default, true))
        : [];
});
exports.default = difference;
});

var last_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
}
exports.default = last;
});

var differenceBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDifference_js_1 = _baseDifference;
var _baseFlatten_js_1 = _baseFlatten;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var last_js_1 = last_1;
var differenceBy = _baseRest_js_1.default(function (array, values) {
    var iteratee = last_js_1.default(values);
    if (isArrayLikeObject_js_1.default(iteratee)) {
        iteratee = undefined;
    }
    return isArrayLikeObject_js_1.default(array)
        ? _baseDifference_js_1.default(array, _baseFlatten_js_1.default(values, 1, isArrayLikeObject_js_1.default, true), _baseIteratee_js_1.default(iteratee, 2))
        : [];
});
exports.default = differenceBy;
});

var differenceWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDifference_js_1 = _baseDifference;
var _baseFlatten_js_1 = _baseFlatten;
var _baseRest_js_1 = _baseRest;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var last_js_1 = last_1;
var differenceWith = _baseRest_js_1.default(function (array, values) {
    var comparator = last_js_1.default(values);
    if (isArrayLikeObject_js_1.default(comparator)) {
        comparator = undefined;
    }
    return isArrayLikeObject_js_1.default(array)
        ? _baseDifference_js_1.default(array, _baseFlatten_js_1.default(values, 1, isArrayLikeObject_js_1.default, true), undefined, comparator)
        : [];
});
exports.default = differenceWith;
});

var divide_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createMathOperation_js_1 = _createMathOperation;
var divide = _createMathOperation_js_1.default(function (dividend, divisor) {
    return dividend / divisor;
}, 1);
exports.default = divide;
});

var drop_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
var toInteger_js_1 = toInteger_1;
function drop(array, n, guard) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger_js_1.default(n);
    return _baseSlice_js_1.default(array, n < 0 ? 0 : n, length);
}
exports.default = drop;
});

var dropRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
var toInteger_js_1 = toInteger_1;
function dropRight(array, n, guard) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger_js_1.default(n);
    n = length - n;
    return _baseSlice_js_1.default(array, 0, n < 0 ? 0 : n);
}
exports.default = dropRight;
});

var _baseWhile = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
function baseWhile(array, predicate, isDrop, fromRight) {
    var length = array.length, index = fromRight ? length : -1;
    while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) { }
    return isDrop
        ? _baseSlice_js_1.default(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : _baseSlice_js_1.default(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
}
exports.default = baseWhile;
});

var dropRightWhile_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseWhile_js_1 = _baseWhile;
function dropRightWhile(array, predicate) {
    return (array && array.length)
        ? _baseWhile_js_1.default(array, _baseIteratee_js_1.default(predicate, 3), true, true)
        : [];
}
exports.default = dropRightWhile;
});

var dropWhile_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseWhile_js_1 = _baseWhile;
function dropWhile(array, predicate) {
    return (array && array.length)
        ? _baseWhile_js_1.default(array, _baseIteratee_js_1.default(predicate, 3), true)
        : [];
}
exports.default = dropWhile;
});

var _castFunction = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var identity_js_1 = identity_1;
function castFunction(value) {
    return typeof value == 'function' ? value : identity_js_1.default;
}
exports.default = castFunction;
});

var forEach_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEach_js_1 = _arrayEach;
var _baseEach_js_1 = _baseEach;
var _castFunction_js_1 = _castFunction;
var isArray_js_1 = isArray_1;
function forEach(collection, iteratee) {
    var func = isArray_js_1.default(collection) ? _arrayEach_js_1.default : _baseEach_js_1.default;
    return func(collection, _castFunction_js_1.default(iteratee));
}
exports.default = forEach;
});

var each = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forEach_js_1 = forEach_1;
exports.default = forEach_js_1.default;
});

var _arrayEachRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;
    while (length--) {
        if (iteratee(array[length], length, array) === false) {
            break;
        }
    }
    return array;
}
exports.default = arrayEachRight;
});

var _baseForRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createBaseFor_js_1 = _createBaseFor;
var baseForRight = _createBaseFor_js_1.default(true);
exports.default = baseForRight;
});

var _baseForOwnRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForRight_js_1 = _baseForRight;
var keys_js_1 = keys_1;
function baseForOwnRight(object, iteratee) {
    return object && _baseForRight_js_1.default(object, iteratee, keys_js_1.default);
}
exports.default = baseForOwnRight;
});

var _baseEachRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForOwnRight_js_1 = _baseForOwnRight;
var _createBaseEach_js_1 = _createBaseEach;
var baseEachRight = _createBaseEach_js_1.default(_baseForOwnRight_js_1.default, true);
exports.default = baseEachRight;
});

var forEachRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEachRight_js_1 = _arrayEachRight;
var _baseEachRight_js_1 = _baseEachRight;
var _castFunction_js_1 = _castFunction;
var isArray_js_1 = isArray_1;
function forEachRight(collection, iteratee) {
    var func = isArray_js_1.default(collection) ? _arrayEachRight_js_1.default : _baseEachRight_js_1.default;
    return func(collection, _castFunction_js_1.default(iteratee));
}
exports.default = forEachRight;
});

var eachRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forEachRight_js_1 = forEachRight_1;
exports.default = forEachRight_js_1.default;
});

var endsWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var _baseToString_js_1 = _baseToString;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
function endsWith(string, target, position) {
    string = toString_js_1.default(string);
    target = _baseToString_js_1.default(target);
    var length = string.length;
    position = position === undefined
        ? length
        : _baseClamp_js_1.default(toInteger_js_1.default(position), 0, length);
    var end = position;
    position -= target.length;
    return position >= 0 && string.slice(position, end) == target;
}
exports.default = endsWith;
});

var _baseToPairs = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
function baseToPairs(object, props) {
    return _arrayMap_js_1.default(props, function (key) {
        return [key, object[key]];
    });
}
exports.default = baseToPairs;
});

var _setToPairs = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setToPairs(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function (value) {
        result[++index] = [value, value];
    });
    return result;
}
exports.default = setToPairs;
});

var _createToPairs = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToPairs_js_1 = _baseToPairs;
var _getTag_js_1 = _getTag;
var _mapToArray_js_1 = _mapToArray;
var _setToPairs_js_1 = _setToPairs;
var mapTag = '[object Map]', setTag = '[object Set]';
function createToPairs(keysFunc) {
    return function (object) {
        var tag = _getTag_js_1.default(object);
        if (tag == mapTag) {
            return _mapToArray_js_1.default(object);
        }
        if (tag == setTag) {
            return _setToPairs_js_1.default(object);
        }
        return _baseToPairs_js_1.default(object, keysFunc(object));
    };
}
exports.default = createToPairs;
});

var toPairs_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createToPairs_js_1 = _createToPairs;
var keys_js_1 = keys_1;
var toPairs = _createToPairs_js_1.default(keys_js_1.default);
exports.default = toPairs;
});

var entries = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toPairs_js_1 = toPairs_1;
exports.default = toPairs_js_1.default;
});

var toPairsIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createToPairs_js_1 = _createToPairs;
var keysIn_js_1 = keysIn_1;
var toPairsIn = _createToPairs_js_1.default(keysIn_js_1.default);
exports.default = toPairsIn;
});

var entriesIn = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toPairsIn_js_1 = toPairsIn_1;
exports.default = toPairsIn_js_1.default;
});

var _escapeHtmlChar = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePropertyOf_js_1 = _basePropertyOf;
var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
var escapeHtmlChar = _basePropertyOf_js_1.default(htmlEscapes);
exports.default = escapeHtmlChar;
});

var _escape = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _escapeHtmlChar_js_1 = _escapeHtmlChar;
var toString_js_1 = toString_1;
var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(string) {
    string = toString_js_1.default(string);
    return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, _escapeHtmlChar_js_1.default)
        : string;
}
exports.default = escape;
});

var escapeRegExp_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(string) {
    string = toString_js_1.default(string);
    return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
}
exports.default = escapeRegExp;
});

var _arrayEvery = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayEvery(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
        if (!predicate(array[index], index, array)) {
            return false;
        }
    }
    return true;
}
exports.default = arrayEvery;
});

var _baseEvery = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseEach_js_1 = _baseEach;
function baseEvery(collection, predicate) {
    var result = true;
    _baseEach_js_1.default(collection, function (value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
    });
    return result;
}
exports.default = baseEvery;
});

var every_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEvery_js_1 = _arrayEvery;
var _baseEvery_js_1 = _baseEvery;
var _baseIteratee_js_1 = _baseIteratee;
var isArray_js_1 = isArray_1;
var _isIterateeCall_js_1 = _isIterateeCall;
function every(collection, predicate, guard) {
    var func = isArray_js_1.default(collection) ? _arrayEvery_js_1.default : _baseEvery_js_1.default;
    if (guard && _isIterateeCall_js_1.default(collection, predicate, guard)) {
        predicate = undefined;
    }
    return func(collection, _baseIteratee_js_1.default(predicate, 3));
}
exports.default = every;
});

var extend = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assignIn_js_1 = assignIn_1;
exports.default = assignIn_js_1.default;
});

var extendWith = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assignInWith_js_1 = assignInWith_1;
exports.default = assignInWith_js_1.default;
});

var toLength_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var toInteger_js_1 = toInteger_1;
var MAX_ARRAY_LENGTH = 4294967295;
function toLength(value) {
    return value ? _baseClamp_js_1.default(toInteger_js_1.default(value), 0, MAX_ARRAY_LENGTH) : 0;
}
exports.default = toLength;
});

var _baseFill = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toInteger_js_1 = toInteger_1;
var toLength_js_1 = toLength_1;
function baseFill(array, value, start, end) {
    var length = array.length;
    start = toInteger_js_1.default(start);
    if (start < 0) {
        start = -start > length ? 0 : (length + start);
    }
    end = (end === undefined || end > length) ? length : toInteger_js_1.default(end);
    if (end < 0) {
        end += length;
    }
    end = start > end ? 0 : toLength_js_1.default(end);
    while (start < end) {
        array[start++] = value;
    }
    return array;
}
exports.default = baseFill;
});

var fill_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFill_js_1 = _baseFill;
var _isIterateeCall_js_1 = _isIterateeCall;
function fill(array, value, start, end) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    if (start && typeof start != 'number' && _isIterateeCall_js_1.default(array, value, start)) {
        start = 0;
        end = length;
    }
    return _baseFill_js_1.default(array, value, start, end);
}
exports.default = fill;
});

var _baseFilter = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseEach_js_1 = _baseEach;
function baseFilter(collection, predicate) {
    var result = [];
    _baseEach_js_1.default(collection, function (value, index, collection) {
        if (predicate(value, index, collection)) {
            result.push(value);
        }
    });
    return result;
}
exports.default = baseFilter;
});

var filter_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var _baseFilter_js_1 = _baseFilter;
var _baseIteratee_js_1 = _baseIteratee;
var isArray_js_1 = isArray_1;
function filter(collection, predicate) {
    var func = isArray_js_1.default(collection) ? _arrayFilter_js_1.default : _baseFilter_js_1.default;
    return func(collection, _baseIteratee_js_1.default(predicate, 3));
}
exports.default = filter;
});

var _createFind = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var isArrayLike_js_1 = isArrayLike_1;
var keys_js_1 = keys_1;
function createFind(findIndexFunc) {
    return function (collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike_js_1.default(collection)) {
            var iteratee = _baseIteratee_js_1.default(predicate, 3);
            collection = keys_js_1.default(collection);
            predicate = function (key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
    };
}
exports.default = createFind;
});

var findIndex_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFindIndex_js_1 = _baseFindIndex;
var _baseIteratee_js_1 = _baseIteratee;
var toInteger_js_1 = toInteger_1;
var nativeMax = Math.max;
function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = fromIndex == null ? 0 : toInteger_js_1.default(fromIndex);
    if (index < 0) {
        index = nativeMax(length + index, 0);
    }
    return _baseFindIndex_js_1.default(array, _baseIteratee_js_1.default(predicate, 3), index);
}
exports.default = findIndex;
});

var find_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createFind_js_1 = _createFind;
var findIndex_js_1 = findIndex_1;
var find = _createFind_js_1.default(findIndex_js_1.default);
exports.default = find;
});

var _baseFindKey = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function (value, key, collection) {
        if (predicate(value, key, collection)) {
            result = key;
            return false;
        }
    });
    return result;
}
exports.default = baseFindKey;
});

var findKey_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFindKey_js_1 = _baseFindKey;
var _baseForOwn_js_1 = _baseForOwn;
var _baseIteratee_js_1 = _baseIteratee;
function findKey(object, predicate) {
    return _baseFindKey_js_1.default(object, _baseIteratee_js_1.default(predicate, 3), _baseForOwn_js_1.default);
}
exports.default = findKey;
});

var findLastIndex_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFindIndex_js_1 = _baseFindIndex;
var _baseIteratee_js_1 = _baseIteratee;
var toInteger_js_1 = toInteger_1;
var nativeMax = Math.max, nativeMin = Math.min;
function findLastIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = length - 1;
    if (fromIndex !== undefined) {
        index = toInteger_js_1.default(fromIndex);
        index = fromIndex < 0
            ? nativeMax(length + index, 0)
            : nativeMin(index, length - 1);
    }
    return _baseFindIndex_js_1.default(array, _baseIteratee_js_1.default(predicate, 3), index, true);
}
exports.default = findLastIndex;
});

var findLast_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createFind_js_1 = _createFind;
var findLastIndex_js_1 = findLastIndex_1;
var findLast = _createFind_js_1.default(findLastIndex_js_1.default);
exports.default = findLast;
});

var findLastKey_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFindKey_js_1 = _baseFindKey;
var _baseForOwnRight_js_1 = _baseForOwnRight;
var _baseIteratee_js_1 = _baseIteratee;
function findLastKey(object, predicate) {
    return _baseFindKey_js_1.default(object, _baseIteratee_js_1.default(predicate, 3), _baseForOwnRight_js_1.default);
}
exports.default = findLastKey;
});

var head_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function head(array) {
    return (array && array.length) ? array[0] : undefined;
}
exports.default = head;
});

var first = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var head_js_1 = head_1;
exports.default = head_js_1.default;
});

var _baseMap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseEach_js_1 = _baseEach;
var isArrayLike_js_1 = isArrayLike_1;
function baseMap(collection, iteratee) {
    var index = -1, result = isArrayLike_js_1.default(collection) ? Array(collection.length) : [];
    _baseEach_js_1.default(collection, function (value, key, collection) {
        result[++index] = iteratee(value, key, collection);
    });
    return result;
}
exports.default = baseMap;
});

var map_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIteratee_js_1 = _baseIteratee;
var _baseMap_js_1 = _baseMap;
var isArray_js_1 = isArray_1;
function map(collection, iteratee) {
    var func = isArray_js_1.default(collection) ? _arrayMap_js_1.default : _baseMap_js_1.default;
    return func(collection, _baseIteratee_js_1.default(iteratee, 3));
}
exports.default = map;
});

var flatMap_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var map_js_1 = map_1;
function flatMap(collection, iteratee) {
    return _baseFlatten_js_1.default(map_js_1.default(collection, iteratee), 1);
}
exports.default = flatMap;
});

var flatMapDeep_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var map_js_1 = map_1;
var INFINITY = 1 / 0;
function flatMapDeep(collection, iteratee) {
    return _baseFlatten_js_1.default(map_js_1.default(collection, iteratee), INFINITY);
}
exports.default = flatMapDeep;
});

var flatMapDepth_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var map_js_1 = map_1;
var toInteger_js_1 = toInteger_1;
function flatMapDepth(collection, iteratee, depth) {
    depth = depth === undefined ? 1 : toInteger_js_1.default(depth);
    return _baseFlatten_js_1.default(map_js_1.default(collection, iteratee), depth);
}
exports.default = flatMapDepth;
});

var flattenDeep_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var INFINITY = 1 / 0;
function flattenDeep(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseFlatten_js_1.default(array, INFINITY) : [];
}
exports.default = flattenDeep;
});

var flattenDepth_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var toInteger_js_1 = toInteger_1;
function flattenDepth(array, depth) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    depth = depth === undefined ? 1 : toInteger_js_1.default(depth);
    return _baseFlatten_js_1.default(array, depth);
}
exports.default = flattenDepth;
});

var flip_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createWrap_js_1 = _createWrap;
var WRAP_FLIP_FLAG = 512;
function flip(func) {
    return _createWrap_js_1.default(func, WRAP_FLIP_FLAG);
}
exports.default = flip;
});

var floor_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRound_js_1 = _createRound;
var floor = _createRound_js_1.default('floor');
exports.default = floor;
});

var _createFlow = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LodashWrapper_js_1 = _LodashWrapper;
var _flatRest_js_1 = _flatRest;
var _getData_js_1 = _getData;
var _getFuncName_js_1 = _getFuncName;
var isArray_js_1 = isArray_1;
var _isLaziable_js_1 = _isLaziable;
var FUNC_ERROR_TEXT = 'Expected a function';
var WRAP_CURRY_FLAG = 8, WRAP_PARTIAL_FLAG = 32, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256;
function createFlow(fromRight) {
    return _flatRest_js_1.default(function (funcs) {
        var length = funcs.length, index = length, prereq = _LodashWrapper_js_1.default.prototype.thru;
        if (fromRight) {
            funcs.reverse();
        }
        while (index--) {
            var func = funcs[index];
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && _getFuncName_js_1.default(func) == 'wrapper') {
                var wrapper = new _LodashWrapper_js_1.default([], true);
            }
        }
        index = wrapper ? index : length;
        while (++index < length) {
            func = funcs[index];
            var funcName = _getFuncName_js_1.default(func), data = funcName == 'wrapper' ? _getData_js_1.default(func) : undefined;
            if (data && _isLaziable_js_1.default(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1) {
                wrapper = wrapper[_getFuncName_js_1.default(data[0])].apply(wrapper, data[3]);
            }
            else {
                wrapper = (func.length == 1 && _isLaziable_js_1.default(func))
                    ? wrapper[funcName]()
                    : wrapper.thru(func);
            }
        }
        return function () {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray_js_1.default(value)) {
                return wrapper.plant(value).value();
            }
            var index = 0, result = length ? funcs[index].apply(this, args) : value;
            while (++index < length) {
                result = funcs[index].call(this, result);
            }
            return result;
        };
    });
}
exports.default = createFlow;
});

var flow_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createFlow_js_1 = _createFlow;
var flow = _createFlow_js_1.default();
exports.default = flow;
});

var flowRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createFlow_js_1 = _createFlow;
var flowRight = _createFlow_js_1.default(true);
exports.default = flowRight;
});

var forIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFor_js_1 = _baseFor;
var _castFunction_js_1 = _castFunction;
var keysIn_js_1 = keysIn_1;
function forIn(object, iteratee) {
    return object == null
        ? object
        : _baseFor_js_1.default(object, _castFunction_js_1.default(iteratee), keysIn_js_1.default);
}
exports.default = forIn;
});

var forInRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForRight_js_1 = _baseForRight;
var _castFunction_js_1 = _castFunction;
var keysIn_js_1 = keysIn_1;
function forInRight(object, iteratee) {
    return object == null
        ? object
        : _baseForRight_js_1.default(object, _castFunction_js_1.default(iteratee), keysIn_js_1.default);
}
exports.default = forInRight;
});

var forOwn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForOwn_js_1 = _baseForOwn;
var _castFunction_js_1 = _castFunction;
function forOwn(object, iteratee) {
    return object && _baseForOwn_js_1.default(object, _castFunction_js_1.default(iteratee));
}
exports.default = forOwn;
});

var forOwnRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForOwnRight_js_1 = _baseForOwnRight;
var _castFunction_js_1 = _castFunction;
function forOwnRight(object, iteratee) {
    return object && _baseForOwnRight_js_1.default(object, _castFunction_js_1.default(iteratee));
}
exports.default = forOwnRight;
});

var fromPairs_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromPairs(pairs) {
    var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
    while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
    }
    return result;
}
exports.default = fromPairs;
});

var _baseFunctions = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var isFunction_js_1 = isFunction_1;
function baseFunctions(object, props) {
    return _arrayFilter_js_1.default(props, function (key) {
        return isFunction_js_1.default(object[key]);
    });
}
exports.default = baseFunctions;
});

var functions_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFunctions_js_1 = _baseFunctions;
var keys_js_1 = keys_1;
function functions(object) {
    return object == null ? [] : _baseFunctions_js_1.default(object, keys_js_1.default(object));
}
exports.default = functions;
});

var functionsIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFunctions_js_1 = _baseFunctions;
var keysIn_js_1 = keysIn_1;
function functionsIn(object) {
    return object == null ? [] : _baseFunctions_js_1.default(object, keysIn_js_1.default(object));
}
exports.default = functionsIn;
});

var groupBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var _createAggregator_js_1 = _createAggregator;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var groupBy = _createAggregator_js_1.default(function (result, value, key) {
    if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
    }
    else {
        _baseAssignValue_js_1.default(result, key, [value]);
    }
});
exports.default = groupBy;
});

var _baseGt = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseGt(value, other) {
    return value > other;
}
exports.default = baseGt;
});

var _createRelationalOperation = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toNumber_js_1 = toNumber_1;
function createRelationalOperation(operator) {
    return function (value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
            value = toNumber_js_1.default(value);
            other = toNumber_js_1.default(other);
        }
        return operator(value, other);
    };
}
exports.default = createRelationalOperation;
});

var gt_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGt_js_1 = _baseGt;
var _createRelationalOperation_js_1 = _createRelationalOperation;
var gt = _createRelationalOperation_js_1.default(_baseGt_js_1.default);
exports.default = gt;
});

var gte_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRelationalOperation_js_1 = _createRelationalOperation;
var gte = _createRelationalOperation_js_1.default(function (value, other) {
    return value >= other;
});
exports.default = gte;
});

var _baseHas = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseHas(object, key) {
    return object != null && hasOwnProperty.call(object, key);
}
exports.default = baseHas;
});

var has_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseHas_js_1 = _baseHas;
var _hasPath_js_1 = _hasPath;
function has(object, path) {
    return object != null && _hasPath_js_1.default(object, path, _baseHas_js_1.default);
}
exports.default = has;
});

var _baseInRange = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeMax = Math.max, nativeMin = Math.min;
function baseInRange(number, start, end) {
    return number >= nativeMin(start, end) && number < nativeMax(start, end);
}
exports.default = baseInRange;
});

var inRange_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseInRange_js_1 = _baseInRange;
var toFinite_js_1 = toFinite_1;
var toNumber_js_1 = toNumber_1;
function inRange(number, start, end) {
    start = toFinite_js_1.default(start);
    if (end === undefined) {
        end = start;
        start = 0;
    }
    else {
        end = toFinite_js_1.default(end);
    }
    number = toNumber_js_1.default(number);
    return _baseInRange_js_1.default(number, start, end);
}
exports.default = inRange;
});

var isString_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isArray_js_1 = isArray_1;
var isObjectLike_js_1 = isObjectLike_1;
var stringTag = '[object String]';
function isString(value) {
    return typeof value == 'string' ||
        (!isArray_js_1.default(value) && isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == stringTag);
}
exports.default = isString;
});

var _baseValues = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
function baseValues(object, props) {
    return _arrayMap_js_1.default(props, function (key) {
        return object[key];
    });
}
exports.default = baseValues;
});

var values_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseValues_js_1 = _baseValues;
var keys_js_1 = keys_1;
function values(object) {
    return object == null ? [] : _baseValues_js_1.default(object, keys_js_1.default(object));
}
exports.default = values;
});

var includes_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIndexOf_js_1 = _baseIndexOf;
var isArrayLike_js_1 = isArrayLike_1;
var isString_js_1 = isString_1;
var toInteger_js_1 = toInteger_1;
var values_js_1 = values_1;
var nativeMax = Math.max;
function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike_js_1.default(collection) ? collection : values_js_1.default(collection);
    fromIndex = (fromIndex && !guard) ? toInteger_js_1.default(fromIndex) : 0;
    var length = collection.length;
    if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
    }
    return isString_js_1.default(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && _baseIndexOf_js_1.default(collection, value, fromIndex) > -1);
}
exports.default = includes;
});

var indexOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIndexOf_js_1 = _baseIndexOf;
var toInteger_js_1 = toInteger_1;
var nativeMax = Math.max;
function indexOf(array, value, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = fromIndex == null ? 0 : toInteger_js_1.default(fromIndex);
    if (index < 0) {
        index = nativeMax(length + index, 0);
    }
    return _baseIndexOf_js_1.default(array, value, index);
}
exports.default = indexOf;
});

var initial_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
function initial(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseSlice_js_1.default(array, 0, -1) : [];
}
exports.default = initial;
});

var _baseIntersection = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _SetCache_js_1 = _SetCache;
var _arrayIncludes_js_1 = _arrayIncludes;
var _arrayIncludesWith_js_1 = _arrayIncludesWith;
var _arrayMap_js_1 = _arrayMap;
var _baseUnary_js_1 = _baseUnary;
var _cacheHas_js_1 = _cacheHas;
var nativeMin = Math.min;
function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? _arrayIncludesWith_js_1.default : _arrayIncludes_js_1.default, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
    while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
            array = _arrayMap_js_1.default(array, _baseUnary_js_1.default(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
            ? new _SetCache_js_1.default(othIndex && array)
            : undefined;
    }
    array = arrays[0];
    var index = -1, seen = caches[0];
    outer: while (++index < length && result.length < maxLength) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
            ? _cacheHas_js_1.default(seen, computed)
            : includes(result, computed, comparator))) {
            othIndex = othLength;
            while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache
                    ? _cacheHas_js_1.default(cache, computed)
                    : includes(arrays[othIndex], computed, comparator))) {
                    continue outer;
                }
            }
            if (seen) {
                seen.push(computed);
            }
            result.push(value);
        }
    }
    return result;
}
exports.default = baseIntersection;
});

var _castArrayLikeObject = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
function castArrayLikeObject(value) {
    return isArrayLikeObject_js_1.default(value) ? value : [];
}
exports.default = castArrayLikeObject;
});

var intersection_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIntersection_js_1 = _baseIntersection;
var _baseRest_js_1 = _baseRest;
var _castArrayLikeObject_js_1 = _castArrayLikeObject;
var intersection = _baseRest_js_1.default(function (arrays) {
    var mapped = _arrayMap_js_1.default(arrays, _castArrayLikeObject_js_1.default);
    return (mapped.length && mapped[0] === arrays[0])
        ? _baseIntersection_js_1.default(mapped)
        : [];
});
exports.default = intersection;
});

var intersectionBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIntersection_js_1 = _baseIntersection;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var _castArrayLikeObject_js_1 = _castArrayLikeObject;
var last_js_1 = last_1;
var intersectionBy = _baseRest_js_1.default(function (arrays) {
    var iteratee = last_js_1.default(arrays), mapped = _arrayMap_js_1.default(arrays, _castArrayLikeObject_js_1.default);
    if (iteratee === last_js_1.default(mapped)) {
        iteratee = undefined;
    }
    else {
        mapped.pop();
    }
    return (mapped.length && mapped[0] === arrays[0])
        ? _baseIntersection_js_1.default(mapped, _baseIteratee_js_1.default(iteratee, 2))
        : [];
});
exports.default = intersectionBy;
});

var intersectionWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIntersection_js_1 = _baseIntersection;
var _baseRest_js_1 = _baseRest;
var _castArrayLikeObject_js_1 = _castArrayLikeObject;
var last_js_1 = last_1;
var intersectionWith = _baseRest_js_1.default(function (arrays) {
    var comparator = last_js_1.default(arrays), mapped = _arrayMap_js_1.default(arrays, _castArrayLikeObject_js_1.default);
    comparator = typeof comparator == 'function' ? comparator : undefined;
    if (comparator) {
        mapped.pop();
    }
    return (mapped.length && mapped[0] === arrays[0])
        ? _baseIntersection_js_1.default(mapped, undefined, comparator)
        : [];
});
exports.default = intersectionWith;
});

var _baseInverter = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseForOwn_js_1 = _baseForOwn;
function baseInverter(object, setter, iteratee, accumulator) {
    _baseForOwn_js_1.default(object, function (value, key, object) {
        setter(accumulator, iteratee(value), key, object);
    });
    return accumulator;
}
exports.default = baseInverter;
});

var _createInverter = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseInverter_js_1 = _baseInverter;
function createInverter(setter, toIteratee) {
    return function (object, iteratee) {
        return _baseInverter_js_1.default(object, setter, toIteratee(iteratee), {});
    };
}
exports.default = createInverter;
});

var invert_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_js_1 = constant_1;
var _createInverter_js_1 = _createInverter;
var identity_js_1 = identity_1;
var invert = _createInverter_js_1.default(function (result, value, key) {
    result[value] = key;
}, constant_js_1.default(identity_js_1.default));
exports.default = invert;
});

var invertBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _createInverter_js_1 = _createInverter;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var invertBy = _createInverter_js_1.default(function (result, value, key) {
    if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
    }
    else {
        result[value] = [key];
    }
}, _baseIteratee_js_1.default);
exports.default = invertBy;
});

var _parent = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGet_js_1 = _baseGet;
var _baseSlice_js_1 = _baseSlice;
function parent(object, path) {
    return path.length < 2 ? object : _baseGet_js_1.default(object, _baseSlice_js_1.default(path, 0, -1));
}
exports.default = parent;
});

var _baseInvoke = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _castPath_js_1 = _castPath;
var last_js_1 = last_1;
var _parent_js_1 = _parent;
var _toKey_js_1 = _toKey;
function baseInvoke(object, path, args) {
    path = _castPath_js_1.default(path, object);
    object = _parent_js_1.default(object, path);
    var func = object == null ? object : object[_toKey_js_1.default(last_js_1.default(path))];
    return func == null ? undefined : _apply_js_1.default(func, object, args);
}
exports.default = baseInvoke;
});

var invoke_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseInvoke_js_1 = _baseInvoke;
var _baseRest_js_1 = _baseRest;
var invoke = _baseRest_js_1.default(_baseInvoke_js_1.default);
exports.default = invoke;
});

var invokeMap_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _baseEach_js_1 = _baseEach;
var _baseInvoke_js_1 = _baseInvoke;
var _baseRest_js_1 = _baseRest;
var isArrayLike_js_1 = isArrayLike_1;
var invokeMap = _baseRest_js_1.default(function (collection, path, args) {
    var index = -1, isFunc = typeof path == 'function', result = isArrayLike_js_1.default(collection) ? Array(collection.length) : [];
    _baseEach_js_1.default(collection, function (value) {
        result[++index] = isFunc ? _apply_js_1.default(path, value, args) : _baseInvoke_js_1.default(value, path, args);
    });
    return result;
});
exports.default = invokeMap;
});

var _baseIsArrayBuffer = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var arrayBufferTag = '[object ArrayBuffer]';
function baseIsArrayBuffer(value) {
    return isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == arrayBufferTag;
}
exports.default = baseIsArrayBuffer;
});

var isArrayBuffer_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsArrayBuffer_js_1 = _baseIsArrayBuffer;
var _baseUnary_js_1 = _baseUnary;
var _nodeUtil_js_1 = _nodeUtil;
var nodeIsArrayBuffer = _nodeUtil_js_1.default && _nodeUtil_js_1.default.isArrayBuffer;
var isArrayBuffer = nodeIsArrayBuffer ? _baseUnary_js_1.default(nodeIsArrayBuffer) : _baseIsArrayBuffer_js_1.default;
exports.default = isArrayBuffer;
});

var isBoolean_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var boolTag = '[object Boolean]';
function isBoolean(value) {
    return value === true || value === false ||
        (isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == boolTag);
}
exports.default = isBoolean;
});

var _baseIsDate = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var dateTag = '[object Date]';
function baseIsDate(value) {
    return isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == dateTag;
}
exports.default = baseIsDate;
});

var isDate_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsDate_js_1 = _baseIsDate;
var _baseUnary_js_1 = _baseUnary;
var _nodeUtil_js_1 = _nodeUtil;
var nodeIsDate = _nodeUtil_js_1.default && _nodeUtil_js_1.default.isDate;
var isDate = nodeIsDate ? _baseUnary_js_1.default(nodeIsDate) : _baseIsDate_js_1.default;
exports.default = isDate;
});

var isElement_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isObjectLike_js_1 = isObjectLike_1;
var isPlainObject_js_1 = isPlainObject_1;
function isElement(value) {
    return isObjectLike_js_1.default(value) && value.nodeType === 1 && !isPlainObject_js_1.default(value);
}
exports.default = isElement;
});

var isEmpty_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseKeys_js_1 = _baseKeys;
var _getTag_js_1 = _getTag;
var isArguments_js_1 = isArguments_1;
var isArray_js_1 = isArray_1;
var isArrayLike_js_1 = isArrayLike_1;
var isBuffer_js_1 = isBuffer_1;
var _isPrototype_js_1 = _isPrototype;
var isTypedArray_js_1 = isTypedArray_1;
var mapTag = '[object Map]', setTag = '[object Set]';
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (isArrayLike_js_1.default(value) &&
        (isArray_js_1.default(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer_js_1.default(value) || isTypedArray_js_1.default(value) || isArguments_js_1.default(value))) {
        return !value.length;
    }
    var tag = _getTag_js_1.default(value);
    if (tag == mapTag || tag == setTag) {
        return !value.size;
    }
    if (_isPrototype_js_1.default(value)) {
        return !_baseKeys_js_1.default(value).length;
    }
    for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return true;
}
exports.default = isEmpty;
});

var isEqual_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsEqual_js_1 = _baseIsEqual;
function isEqual(value, other) {
    return _baseIsEqual_js_1.default(value, other);
}
exports.default = isEqual;
});

var isEqualWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsEqual_js_1 = _baseIsEqual;
function isEqualWith(value, other, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    var result = customizer ? customizer(value, other) : undefined;
    return result === undefined ? _baseIsEqual_js_1.default(value, other, undefined, customizer) : !!result;
}
exports.default = isEqualWith;
});

var _isFinite = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var nativeIsFinite = _root_js_1.default.isFinite;
function isFinite(value) {
    return typeof value == 'number' && nativeIsFinite(value);
}
exports.default = isFinite;
});

var isInteger_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toInteger_js_1 = toInteger_1;
function isInteger(value) {
    return typeof value == 'number' && value == toInteger_js_1.default(value);
}
exports.default = isInteger;
});

var _baseIsMap = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getTag_js_1 = _getTag;
var isObjectLike_js_1 = isObjectLike_1;
var mapTag = '[object Map]';
function baseIsMap(value) {
    return isObjectLike_js_1.default(value) && _getTag_js_1.default(value) == mapTag;
}
exports.default = baseIsMap;
});

var isMap_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsMap_js_1 = _baseIsMap;
var _baseUnary_js_1 = _baseUnary;
var _nodeUtil_js_1 = _nodeUtil;
var nodeIsMap = _nodeUtil_js_1.default && _nodeUtil_js_1.default.isMap;
var isMap = nodeIsMap ? _baseUnary_js_1.default(nodeIsMap) : _baseIsMap_js_1.default;
exports.default = isMap;
});

var isMatch_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsMatch_js_1 = _baseIsMatch;
var _getMatchData_js_1 = _getMatchData;
function isMatch(object, source) {
    return object === source || _baseIsMatch_js_1.default(object, source, _getMatchData_js_1.default(source));
}
exports.default = isMatch;
});

var isMatchWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsMatch_js_1 = _baseIsMatch;
var _getMatchData_js_1 = _getMatchData;
function isMatchWith(object, source, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return _baseIsMatch_js_1.default(object, source, _getMatchData_js_1.default(source), customizer);
}
exports.default = isMatchWith;
});

var isNumber_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var numberTag = '[object Number]';
function isNumber(value) {
    return typeof value == 'number' ||
        (isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == numberTag);
}
exports.default = isNumber;
});

var _isNaN = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumber_js_1 = isNumber_1;
function isNaN(value) {
    return isNumber_js_1.default(value) && value != +value;
}
exports.default = isNaN;
});

var _isMaskable = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _coreJsData_js_1 = _coreJsData;
var isFunction_js_1 = isFunction_1;
var stubFalse_js_1 = stubFalse_1;
var isMaskable = _coreJsData_js_1.default ? isFunction_js_1.default : stubFalse_js_1.default;
exports.default = isMaskable;
});

var isNative_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsNative_js_1 = _baseIsNative;
var _isMaskable_js_1 = _isMaskable;
var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.';
function isNative(value) {
    if (_isMaskable_js_1.default(value)) {
        throw new Error(CORE_ERROR_TEXT);
    }
    return _baseIsNative_js_1.default(value);
}
exports.default = isNative;
});

var isNil_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNil(value) {
    return value == null;
}
exports.default = isNil;
});

var isNull_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNull(value) {
    return value === null;
}
exports.default = isNull;
});

var _baseIsRegExp = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var regexpTag = '[object RegExp]';
function baseIsRegExp(value) {
    return isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == regexpTag;
}
exports.default = baseIsRegExp;
});

var isRegExp_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsRegExp_js_1 = _baseIsRegExp;
var _baseUnary_js_1 = _baseUnary;
var _nodeUtil_js_1 = _nodeUtil;
var nodeIsRegExp = _nodeUtil_js_1.default && _nodeUtil_js_1.default.isRegExp;
var isRegExp = nodeIsRegExp ? _baseUnary_js_1.default(nodeIsRegExp) : _baseIsRegExp_js_1.default;
exports.default = isRegExp;
});

var isSafeInteger_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isInteger_js_1 = isInteger_1;
var MAX_SAFE_INTEGER = 9007199254740991;
function isSafeInteger(value) {
    return isInteger_js_1.default(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
}
exports.default = isSafeInteger;
});

var _baseIsSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getTag_js_1 = _getTag;
var isObjectLike_js_1 = isObjectLike_1;
var setTag = '[object Set]';
function baseIsSet(value) {
    return isObjectLike_js_1.default(value) && _getTag_js_1.default(value) == setTag;
}
exports.default = baseIsSet;
});

var isSet_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIsSet_js_1 = _baseIsSet;
var _baseUnary_js_1 = _baseUnary;
var _nodeUtil_js_1 = _nodeUtil;
var nodeIsSet = _nodeUtil_js_1.default && _nodeUtil_js_1.default.isSet;
var isSet = nodeIsSet ? _baseUnary_js_1.default(nodeIsSet) : _baseIsSet_js_1.default;
exports.default = isSet;
});

var isUndefined_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUndefined(value) {
    return value === undefined;
}
exports.default = isUndefined;
});

var isWeakMap_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _getTag_js_1 = _getTag;
var isObjectLike_js_1 = isObjectLike_1;
var weakMapTag = '[object WeakMap]';
function isWeakMap(value) {
    return isObjectLike_js_1.default(value) && _getTag_js_1.default(value) == weakMapTag;
}
exports.default = isWeakMap;
});

var isWeakSet_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGetTag_js_1 = _baseGetTag;
var isObjectLike_js_1 = isObjectLike_1;
var weakSetTag = '[object WeakSet]';
function isWeakSet(value) {
    return isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == weakSetTag;
}
exports.default = isWeakSet;
});

var iteratee_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var _baseIteratee_js_1 = _baseIteratee;
var CLONE_DEEP_FLAG = 1;
function iteratee(func) {
    return _baseIteratee_js_1.default(typeof func == 'function' ? func : _baseClone_js_1.default(func, CLONE_DEEP_FLAG));
}
exports.default = iteratee;
});

var join_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayProto = Array.prototype;
var nativeJoin = arrayProto.join;
function join(array, separator) {
    return array == null ? '' : nativeJoin.call(array, separator);
}
exports.default = join;
});

var kebabCase_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCompounder_js_1 = _createCompounder;
var kebabCase = _createCompounder_js_1.default(function (result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
});
exports.default = kebabCase;
});

var keyBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var _createAggregator_js_1 = _createAggregator;
var keyBy = _createAggregator_js_1.default(function (result, value, key) {
    _baseAssignValue_js_1.default(result, key, value);
});
exports.default = keyBy;
});

var _strictLastIndexOf = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
        if (array[index] === value) {
            return index;
        }
    }
    return index;
}
exports.default = strictLastIndexOf;
});

var lastIndexOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFindIndex_js_1 = _baseFindIndex;
var _baseIsNaN_js_1 = _baseIsNaN;
var _strictLastIndexOf_js_1 = _strictLastIndexOf;
var toInteger_js_1 = toInteger_1;
var nativeMax = Math.max, nativeMin = Math.min;
function lastIndexOf(array, value, fromIndex) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = length;
    if (fromIndex !== undefined) {
        index = toInteger_js_1.default(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
    }
    return value === value
        ? _strictLastIndexOf_js_1.default(array, value, index)
        : _baseFindIndex_js_1.default(array, _baseIsNaN_js_1.default, index, true);
}
exports.default = lastIndexOf;
});

var lowerCase_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCompounder_js_1 = _createCompounder;
var lowerCase = _createCompounder_js_1.default(function (result, word, index) {
    return result + (index ? ' ' : '') + word.toLowerCase();
});
exports.default = lowerCase;
});

var lowerFirst_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCaseFirst_js_1 = _createCaseFirst;
var lowerFirst = _createCaseFirst_js_1.default('toLowerCase');
exports.default = lowerFirst;
});

var _baseLt = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseLt(value, other) {
    return value < other;
}
exports.default = baseLt;
});

var lt_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseLt_js_1 = _baseLt;
var _createRelationalOperation_js_1 = _createRelationalOperation;
var lt = _createRelationalOperation_js_1.default(_baseLt_js_1.default);
exports.default = lt;
});

var lte_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRelationalOperation_js_1 = _createRelationalOperation;
var lte = _createRelationalOperation_js_1.default(function (value, other) {
    return value <= other;
});
exports.default = lte;
});

var mapKeys_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var _baseForOwn_js_1 = _baseForOwn;
var _baseIteratee_js_1 = _baseIteratee;
function mapKeys(object, iteratee) {
    var result = {};
    iteratee = _baseIteratee_js_1.default(iteratee, 3);
    _baseForOwn_js_1.default(object, function (value, key, object) {
        _baseAssignValue_js_1.default(result, iteratee(value, key, object), value);
    });
    return result;
}
exports.default = mapKeys;
});

var mapValues_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseAssignValue_js_1 = _baseAssignValue;
var _baseForOwn_js_1 = _baseForOwn;
var _baseIteratee_js_1 = _baseIteratee;
function mapValues(object, iteratee) {
    var result = {};
    iteratee = _baseIteratee_js_1.default(iteratee, 3);
    _baseForOwn_js_1.default(object, function (value, key, object) {
        _baseAssignValue_js_1.default(result, key, iteratee(value, key, object));
    });
    return result;
}
exports.default = mapValues;
});

var matches_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var _baseMatches_js_1 = _baseMatches;
var CLONE_DEEP_FLAG = 1;
function matches(source) {
    return _baseMatches_js_1.default(_baseClone_js_1.default(source, CLONE_DEEP_FLAG));
}
exports.default = matches;
});

var matchesProperty_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClone_js_1 = _baseClone;
var _baseMatchesProperty_js_1 = _baseMatchesProperty;
var CLONE_DEEP_FLAG = 1;
function matchesProperty(path, srcValue) {
    return _baseMatchesProperty_js_1.default(path, _baseClone_js_1.default(srcValue, CLONE_DEEP_FLAG));
}
exports.default = matchesProperty;
});

var _baseExtremum = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSymbol_js_1 = isSymbol_1;
function baseExtremum(array, iteratee, comparator) {
    var index = -1, length = array.length;
    while (++index < length) {
        var value = array[index], current = iteratee(value);
        if (current != null && (computed === undefined
            ? (current === current && !isSymbol_js_1.default(current))
            : comparator(current, computed))) {
            var computed = current, result = value;
        }
    }
    return result;
}
exports.default = baseExtremum;
});

var max_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseExtremum_js_1 = _baseExtremum;
var _baseGt_js_1 = _baseGt;
var identity_js_1 = identity_1;
function max(array) {
    return (array && array.length)
        ? _baseExtremum_js_1.default(array, identity_js_1.default, _baseGt_js_1.default)
        : undefined;
}
exports.default = max;
});

var maxBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseExtremum_js_1 = _baseExtremum;
var _baseGt_js_1 = _baseGt;
var _baseIteratee_js_1 = _baseIteratee;
function maxBy(array, iteratee) {
    return (array && array.length)
        ? _baseExtremum_js_1.default(array, _baseIteratee_js_1.default(iteratee, 2), _baseGt_js_1.default)
        : undefined;
}
exports.default = maxBy;
});

var _baseSum = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseSum(array, iteratee) {
    var result, index = -1, length = array.length;
    while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined) {
            result = result === undefined ? current : (result + current);
        }
    }
    return result;
}
exports.default = baseSum;
});

var _baseMean = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSum_js_1 = _baseSum;
var NAN = 0 / 0;
function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (_baseSum_js_1.default(array, iteratee) / length) : NAN;
}
exports.default = baseMean;
});

var mean_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseMean_js_1 = _baseMean;
var identity_js_1 = identity_1;
function mean(array) {
    return _baseMean_js_1.default(array, identity_js_1.default);
}
exports.default = mean;
});

var meanBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseMean_js_1 = _baseMean;
function meanBy(array, iteratee) {
    return _baseMean_js_1.default(array, _baseIteratee_js_1.default(iteratee, 2));
}
exports.default = meanBy;
});

var merge_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseMerge_js_1 = _baseMerge;
var _createAssigner_js_1 = _createAssigner;
var merge = _createAssigner_js_1.default(function (object, source, srcIndex) {
    _baseMerge_js_1.default(object, source, srcIndex);
});
exports.default = merge;
});

var method_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseInvoke_js_1 = _baseInvoke;
var _baseRest_js_1 = _baseRest;
var method = _baseRest_js_1.default(function (path, args) {
    return function (object) {
        return _baseInvoke_js_1.default(object, path, args);
    };
});
exports.default = method;
});

var methodOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseInvoke_js_1 = _baseInvoke;
var _baseRest_js_1 = _baseRest;
var methodOf = _baseRest_js_1.default(function (object, args) {
    return function (path) {
        return _baseInvoke_js_1.default(object, path, args);
    };
});
exports.default = methodOf;
});

var min_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseExtremum_js_1 = _baseExtremum;
var _baseLt_js_1 = _baseLt;
var identity_js_1 = identity_1;
function min(array) {
    return (array && array.length)
        ? _baseExtremum_js_1.default(array, identity_js_1.default, _baseLt_js_1.default)
        : undefined;
}
exports.default = min;
});

var minBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseExtremum_js_1 = _baseExtremum;
var _baseIteratee_js_1 = _baseIteratee;
var _baseLt_js_1 = _baseLt;
function minBy(array, iteratee) {
    return (array && array.length)
        ? _baseExtremum_js_1.default(array, _baseIteratee_js_1.default(iteratee, 2), _baseLt_js_1.default)
        : undefined;
}
exports.default = minBy;
});

var mixin_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEach_js_1 = _arrayEach;
var _arrayPush_js_1 = _arrayPush;
var _baseFunctions_js_1 = _baseFunctions;
var _copyArray_js_1 = _copyArray;
var isFunction_js_1 = isFunction_1;
var isObject_js_1 = isObject_1;
var keys_js_1 = keys_1;
function mixin(object, source, options) {
    var props = keys_js_1.default(source), methodNames = _baseFunctions_js_1.default(source, props);
    var chain = !(isObject_js_1.default(options) && 'chain' in options) || !!options.chain, isFunc = isFunction_js_1.default(object);
    _arrayEach_js_1.default(methodNames, function (methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
            object.prototype[methodName] = function () {
                var chainAll = this.__chain__;
                if (chain || chainAll) {
                    var result = object(this.__wrapped__), actions = result.__actions__ = _copyArray_js_1.default(this.__actions__);
                    actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                    result.__chain__ = chainAll;
                    return result;
                }
                return func.apply(object, _arrayPush_js_1.default([this.value()], arguments));
            };
        }
    });
    return object;
}
exports.default = mixin;
});

var multiply_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createMathOperation_js_1 = _createMathOperation;
var multiply = _createMathOperation_js_1.default(function (multiplier, multiplicand) {
    return multiplier * multiplicand;
}, 1);
exports.default = multiply;
});

var negate_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FUNC_ERROR_TEXT = 'Expected a function';
function negate(predicate) {
    if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    return function () {
        var args = arguments;
        switch (args.length) {
            case 0: return !predicate.call(this);
            case 1: return !predicate.call(this, args[0]);
            case 2: return !predicate.call(this, args[0], args[1]);
            case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
    };
}
exports.default = negate;
});

var _iteratorToArray = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function iteratorToArray(iterator) {
    var data, result = [];
    while (!(data = iterator.next()).done) {
        result.push(data.value);
    }
    return result;
}
exports.default = iteratorToArray;
});

var toArray_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Symbol_js_1 = _Symbol;
var _copyArray_js_1 = _copyArray;
var _getTag_js_1 = _getTag;
var isArrayLike_js_1 = isArrayLike_1;
var isString_js_1 = isString_1;
var _iteratorToArray_js_1 = _iteratorToArray;
var _mapToArray_js_1 = _mapToArray;
var _setToArray_js_1 = _setToArray;
var _stringToArray_js_1 = _stringToArray;
var values_js_1 = values_1;
var mapTag = '[object Map]', setTag = '[object Set]';
var symIterator = _Symbol_js_1.default ? _Symbol_js_1.default.iterator : undefined;
function toArray(value) {
    if (!value) {
        return [];
    }
    if (isArrayLike_js_1.default(value)) {
        return isString_js_1.default(value) ? _stringToArray_js_1.default(value) : _copyArray_js_1.default(value);
    }
    if (symIterator && value[symIterator]) {
        return _iteratorToArray_js_1.default(value[symIterator]());
    }
    var tag = _getTag_js_1.default(value), func = tag == mapTag ? _mapToArray_js_1.default : (tag == setTag ? _setToArray_js_1.default : values_js_1.default);
    return func(value);
}
exports.default = toArray;
});

var next = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toArray_js_1 = toArray_1;
function wrapperNext() {
    if (this.__values__ === undefined) {
        this.__values__ = toArray_js_1.default(this.value());
    }
    var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
    return { 'done': done, 'value': value };
}
exports.default = wrapperNext;
});

var _baseNth = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _isIndex_js_1 = _isIndex;
function baseNth(array, n) {
    var length = array.length;
    if (!length) {
        return;
    }
    n += n < 0 ? length : 0;
    return _isIndex_js_1.default(n, length) ? array[n] : undefined;
}
exports.default = baseNth;
});

var nth_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseNth_js_1 = _baseNth;
var toInteger_js_1 = toInteger_1;
function nth(array, n) {
    return (array && array.length) ? _baseNth_js_1.default(array, toInteger_js_1.default(n)) : undefined;
}
exports.default = nth;
});

var nthArg_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseNth_js_1 = _baseNth;
var _baseRest_js_1 = _baseRest;
var toInteger_js_1 = toInteger_1;
function nthArg(n) {
    n = toInteger_js_1.default(n);
    return _baseRest_js_1.default(function (args) {
        return _baseNth_js_1.default(args, n);
    });
}
exports.default = nthArg;
});

var _baseUnset = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _castPath_js_1 = _castPath;
var last_js_1 = last_1;
var _parent_js_1 = _parent;
var _toKey_js_1 = _toKey;
function baseUnset(object, path) {
    path = _castPath_js_1.default(path, object);
    object = _parent_js_1.default(object, path);
    return object == null || delete object[_toKey_js_1.default(last_js_1.default(path))];
}
exports.default = baseUnset;
});

var _customOmitClone = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject_js_1 = isPlainObject_1;
function customOmitClone(value) {
    return isPlainObject_js_1.default(value) ? undefined : value;
}
exports.default = customOmitClone;
});

var omit_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseClone_js_1 = _baseClone;
var _baseUnset_js_1 = _baseUnset;
var _castPath_js_1 = _castPath;
var _copyObject_js_1 = _copyObject;
var _customOmitClone_js_1 = _customOmitClone;
var _flatRest_js_1 = _flatRest;
var _getAllKeysIn_js_1 = _getAllKeysIn;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
var omit = _flatRest_js_1.default(function (object, paths) {
    var result = {};
    if (object == null) {
        return result;
    }
    var isDeep = false;
    paths = _arrayMap_js_1.default(paths, function (path) {
        path = _castPath_js_1.default(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
    });
    _copyObject_js_1.default(object, _getAllKeysIn_js_1.default(object), result);
    if (isDeep) {
        result = _baseClone_js_1.default(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, _customOmitClone_js_1.default);
    }
    var length = paths.length;
    while (length--) {
        _baseUnset_js_1.default(result, paths[length]);
    }
    return result;
});
exports.default = omit;
});

var _baseSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assignValue_js_1 = _assignValue;
var _castPath_js_1 = _castPath;
var _isIndex_js_1 = _isIndex;
var isObject_js_1 = isObject_1;
var _toKey_js_1 = _toKey;
function baseSet(object, path, value, customizer) {
    if (!isObject_js_1.default(object)) {
        return object;
    }
    path = _castPath_js_1.default(path, object);
    var index = -1, length = path.length, lastIndex = length - 1, nested = object;
    while (nested != null && ++index < length) {
        var key = _toKey_js_1.default(path[index]), newValue = value;
        if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined;
            if (newValue === undefined) {
                newValue = isObject_js_1.default(objValue)
                    ? objValue
                    : (_isIndex_js_1.default(path[index + 1]) ? [] : {});
            }
        }
        _assignValue_js_1.default(nested, key, newValue);
        nested = nested[key];
    }
    return object;
}
exports.default = baseSet;
});

var _basePickBy = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGet_js_1 = _baseGet;
var _baseSet_js_1 = _baseSet;
var _castPath_js_1 = _castPath;
function basePickBy(object, paths, predicate) {
    var index = -1, length = paths.length, result = {};
    while (++index < length) {
        var path = paths[index], value = _baseGet_js_1.default(object, path);
        if (predicate(value, path)) {
            _baseSet_js_1.default(result, _castPath_js_1.default(path, object), value);
        }
    }
    return result;
}
exports.default = basePickBy;
});

var pickBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIteratee_js_1 = _baseIteratee;
var _basePickBy_js_1 = _basePickBy;
var _getAllKeysIn_js_1 = _getAllKeysIn;
function pickBy(object, predicate) {
    if (object == null) {
        return {};
    }
    var props = _arrayMap_js_1.default(_getAllKeysIn_js_1.default(object), function (prop) {
        return [prop];
    });
    predicate = _baseIteratee_js_1.default(predicate);
    return _basePickBy_js_1.default(object, props, function (value, path) {
        return predicate(value, path[0]);
    });
}
exports.default = pickBy;
});

var omitBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var negate_js_1 = negate_1;
var pickBy_js_1 = pickBy_1;
function omitBy(object, predicate) {
    return pickBy_js_1.default(object, negate_js_1.default(_baseIteratee_js_1.default(predicate)));
}
exports.default = omitBy;
});

var once_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var before_js_1 = before_1;
function once(func) {
    return before_js_1.default(2, func);
}
exports.default = once;
});

var _baseSortBy = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseSortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);
    while (length--) {
        array[length] = array[length].value;
    }
    return array;
}
exports.default = baseSortBy;
});

var _compareAscending = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSymbol_js_1 = isSymbol_1;
function compareAscending(value, other) {
    if (value !== other) {
        var valIsDefined = value !== undefined, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol_js_1.default(value);
        var othIsDefined = other !== undefined, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol_js_1.default(other);
        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
            return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
            return -1;
        }
    }
    return 0;
}
exports.default = compareAscending;
});

var _compareMultiple = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _compareAscending_js_1 = _compareAscending;
function compareMultiple(object, other, orders) {
    var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
    while (++index < length) {
        var result = _compareAscending_js_1.default(objCriteria[index], othCriteria[index]);
        if (result) {
            if (index >= ordersLength) {
                return result;
            }
            var order = orders[index];
            return result * (order == 'desc' ? -1 : 1);
        }
    }
    return object.index - other.index;
}
exports.default = compareMultiple;
});

var _baseOrderBy = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIteratee_js_1 = _baseIteratee;
var _baseMap_js_1 = _baseMap;
var _baseSortBy_js_1 = _baseSortBy;
var _baseUnary_js_1 = _baseUnary;
var _compareMultiple_js_1 = _compareMultiple;
var identity_js_1 = identity_1;
function baseOrderBy(collection, iteratees, orders) {
    var index = -1;
    iteratees = _arrayMap_js_1.default(iteratees.length ? iteratees : [identity_js_1.default], _baseUnary_js_1.default(_baseIteratee_js_1.default));
    var result = _baseMap_js_1.default(collection, function (value, key, collection) {
        var criteria = _arrayMap_js_1.default(iteratees, function (iteratee) {
            return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
    });
    return _baseSortBy_js_1.default(result, function (object, other) {
        return _compareMultiple_js_1.default(object, other, orders);
    });
}
exports.default = baseOrderBy;
});

var orderBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseOrderBy_js_1 = _baseOrderBy;
var isArray_js_1 = isArray_1;
function orderBy(collection, iteratees, orders, guard) {
    if (collection == null) {
        return [];
    }
    if (!isArray_js_1.default(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
    }
    orders = guard ? undefined : orders;
    if (!isArray_js_1.default(orders)) {
        orders = orders == null ? [] : [orders];
    }
    return _baseOrderBy_js_1.default(collection, iteratees, orders);
}
exports.default = orderBy;
});

var _createOver = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _arrayMap_js_1 = _arrayMap;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var _baseUnary_js_1 = _baseUnary;
var _flatRest_js_1 = _flatRest;
function createOver(arrayFunc) {
    return _flatRest_js_1.default(function (iteratees) {
        iteratees = _arrayMap_js_1.default(iteratees, _baseUnary_js_1.default(_baseIteratee_js_1.default));
        return _baseRest_js_1.default(function (args) {
            var thisArg = this;
            return arrayFunc(iteratees, function (iteratee) {
                return _apply_js_1.default(iteratee, thisArg, args);
            });
        });
    });
}
exports.default = createOver;
});

var over_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _createOver_js_1 = _createOver;
var over = _createOver_js_1.default(_arrayMap_js_1.default);
exports.default = over;
});

var _castRest = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var castRest = _baseRest_js_1.default;
exports.default = castRest;
});

var overArgs_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _arrayMap_js_1 = _arrayMap;
var _baseFlatten_js_1 = _baseFlatten;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var _baseUnary_js_1 = _baseUnary;
var _castRest_js_1 = _castRest;
var isArray_js_1 = isArray_1;
var nativeMin = Math.min;
var overArgs = _castRest_js_1.default(function (func, transforms) {
    transforms = (transforms.length == 1 && isArray_js_1.default(transforms[0]))
        ? _arrayMap_js_1.default(transforms[0], _baseUnary_js_1.default(_baseIteratee_js_1.default))
        : _arrayMap_js_1.default(_baseFlatten_js_1.default(transforms, 1), _baseUnary_js_1.default(_baseIteratee_js_1.default));
    var funcsLength = transforms.length;
    return _baseRest_js_1.default(function (args) {
        var index = -1, length = nativeMin(args.length, funcsLength);
        while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
        }
        return _apply_js_1.default(func, this, args);
    });
});
exports.default = overArgs;
});

var overEvery_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEvery_js_1 = _arrayEvery;
var _createOver_js_1 = _createOver;
var overEvery = _createOver_js_1.default(_arrayEvery_js_1.default);
exports.default = overEvery;
});

var overSome_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arraySome_js_1 = _arraySome;
var _createOver_js_1 = _createOver;
var overSome = _createOver_js_1.default(_arraySome_js_1.default);
exports.default = overSome;
});

var _baseRepeat = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_SAFE_INTEGER = 9007199254740991;
var nativeFloor = Math.floor;
function baseRepeat(string, n) {
    var result = '';
    if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
    }
    do {
        if (n % 2) {
            result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
            string += string;
        }
    } while (n);
    return result;
}
exports.default = baseRepeat;
});

var _asciiSize = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseProperty_js_1 = _baseProperty;
var asciiSize = _baseProperty_js_1.default('length');
exports.default = asciiSize;
});

var _unicodeSize = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rsAstralRange = '\\ud800-\\udfff', rsComboMarksRange = '\\u0300-\\u036f', reComboHalfMarksRange = '\\ufe20-\\ufe2f', rsComboSymbolsRange = '\\u20d0-\\u20ff', rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = '\\ufe0e\\ufe0f';
var rsAstral = '[' + rsAstralRange + ']', rsCombo = '[' + rsComboRange + ']', rsFitz = '\\ud83c[\\udffb-\\udfff]', rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')', rsNonAstral = '[^' + rsAstralRange + ']', rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}', rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]', rsZWJ = '\\u200d';
var reOptMod = rsModifier + '?', rsOptVar = '[' + rsVarRange + ']?', rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*', rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
        ++result;
    }
    return result;
}
exports.default = unicodeSize;
});

var _stringSize = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _asciiSize_js_1 = _asciiSize;
var _hasUnicode_js_1 = _hasUnicode;
var _unicodeSize_js_1 = _unicodeSize;
function stringSize(string) {
    return _hasUnicode_js_1.default(string)
        ? _unicodeSize_js_1.default(string)
        : _asciiSize_js_1.default(string);
}
exports.default = stringSize;
});

var _createPadding = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRepeat_js_1 = _baseRepeat;
var _baseToString_js_1 = _baseToString;
var _castSlice_js_1 = _castSlice;
var _hasUnicode_js_1 = _hasUnicode;
var _stringSize_js_1 = _stringSize;
var _stringToArray_js_1 = _stringToArray;
var nativeCeil = Math.ceil;
function createPadding(length, chars) {
    chars = chars === undefined ? ' ' : _baseToString_js_1.default(chars);
    var charsLength = chars.length;
    if (charsLength < 2) {
        return charsLength ? _baseRepeat_js_1.default(chars, length) : chars;
    }
    var result = _baseRepeat_js_1.default(chars, nativeCeil(length / _stringSize_js_1.default(chars)));
    return _hasUnicode_js_1.default(chars)
        ? _castSlice_js_1.default(_stringToArray_js_1.default(result), 0, length).join('')
        : result.slice(0, length);
}
exports.default = createPadding;
});

var pad_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createPadding_js_1 = _createPadding;
var _stringSize_js_1 = _stringSize;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
var nativeCeil = Math.ceil, nativeFloor = Math.floor;
function pad(string, length, chars) {
    string = toString_js_1.default(string);
    length = toInteger_js_1.default(length);
    var strLength = length ? _stringSize_js_1.default(string) : 0;
    if (!length || strLength >= length) {
        return string;
    }
    var mid = (length - strLength) / 2;
    return (_createPadding_js_1.default(nativeFloor(mid), chars) +
        string +
        _createPadding_js_1.default(nativeCeil(mid), chars));
}
exports.default = pad;
});

var padEnd_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createPadding_js_1 = _createPadding;
var _stringSize_js_1 = _stringSize;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
function padEnd(string, length, chars) {
    string = toString_js_1.default(string);
    length = toInteger_js_1.default(length);
    var strLength = length ? _stringSize_js_1.default(string) : 0;
    return (length && strLength < length)
        ? (string + _createPadding_js_1.default(length - strLength, chars))
        : string;
}
exports.default = padEnd;
});

var padStart_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createPadding_js_1 = _createPadding;
var _stringSize_js_1 = _stringSize;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
function padStart(string, length, chars) {
    string = toString_js_1.default(string);
    length = toInteger_js_1.default(length);
    var strLength = length ? _stringSize_js_1.default(string) : 0;
    return (length && strLength < length)
        ? (_createPadding_js_1.default(length - strLength, chars) + string)
        : string;
}
exports.default = padStart;
});

var _parseInt = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _root_js_1 = _root;
var toString_js_1 = toString_1;
var reTrimStart = /^\s+/;
var nativeParseInt = _root_js_1.default.parseInt;
function parseInt(string, radix, guard) {
    if (guard || radix == null) {
        radix = 0;
    }
    else if (radix) {
        radix = +radix;
    }
    return nativeParseInt(toString_js_1.default(string).replace(reTrimStart, ''), radix || 0);
}
exports.default = parseInt;
});

var partial_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var _createWrap_js_1 = _createWrap;
var _getHolder_js_1 = _getHolder;
var _replaceHolders_js_1 = _replaceHolders;
var WRAP_PARTIAL_FLAG = 32;
var partial = _baseRest_js_1.default(function (func, partials) {
    var holders = _replaceHolders_js_1.default(partials, _getHolder_js_1.default(partial));
    return _createWrap_js_1.default(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
});
partial.placeholder = {};
exports.default = partial;
});

var partialRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var _createWrap_js_1 = _createWrap;
var _getHolder_js_1 = _getHolder;
var _replaceHolders_js_1 = _replaceHolders;
var WRAP_PARTIAL_RIGHT_FLAG = 64;
var partialRight = _baseRest_js_1.default(function (func, partials) {
    var holders = _replaceHolders_js_1.default(partials, _getHolder_js_1.default(partialRight));
    return _createWrap_js_1.default(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
});
partialRight.placeholder = {};
exports.default = partialRight;
});

var partition_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createAggregator_js_1 = _createAggregator;
var partition = _createAggregator_js_1.default(function (result, value, key) {
    result[key ? 0 : 1].push(value);
}, function () { return [[], []]; });
exports.default = partition;
});

var _basePick = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePickBy_js_1 = _basePickBy;
var hasIn_js_1 = hasIn_1;
function basePick(object, paths) {
    return _basePickBy_js_1.default(object, paths, function (value, path) {
        return hasIn_js_1.default(object, path);
    });
}
exports.default = basePick;
});

var pick_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePick_js_1 = _basePick;
var _flatRest_js_1 = _flatRest;
var pick = _flatRest_js_1.default(function (object, paths) {
    return object == null ? {} : _basePick_js_1.default(object, paths);
});
exports.default = pick;
});

var plant = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseLodash_js_1 = _baseLodash;
var _wrapperClone_js_1 = _wrapperClone;
function wrapperPlant(value) {
    var result, parent = this;
    while (parent instanceof _baseLodash_js_1.default) {
        var clone = _wrapperClone_js_1.default(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
            previous.__wrapped__ = clone;
        }
        else {
            result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
    }
    previous.__wrapped__ = value;
    return result;
}
exports.default = wrapperPlant;
});

var propertyOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGet_js_1 = _baseGet;
function propertyOf(object) {
    return function (path) {
        return object == null ? undefined : _baseGet_js_1.default(object, path);
    };
}
exports.default = propertyOf;
});

var _baseIndexOfWith = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
        if (comparator(array[index], value)) {
            return index;
        }
    }
    return -1;
}
exports.default = baseIndexOfWith;
});

var _basePullAll = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseIndexOf_js_1 = _baseIndexOf;
var _baseIndexOfWith_js_1 = _baseIndexOfWith;
var _baseUnary_js_1 = _baseUnary;
var _copyArray_js_1 = _copyArray;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function basePullAll(array, values, iteratee, comparator) {
    var indexOf = comparator ? _baseIndexOfWith_js_1.default : _baseIndexOf_js_1.default, index = -1, length = values.length, seen = array;
    if (array === values) {
        values = _copyArray_js_1.default(values);
    }
    if (iteratee) {
        seen = _arrayMap_js_1.default(array, _baseUnary_js_1.default(iteratee));
    }
    while (++index < length) {
        var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
                splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
        }
    }
    return array;
}
exports.default = basePullAll;
});

var pullAll_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePullAll_js_1 = _basePullAll;
function pullAll(array, values) {
    return (array && array.length && values && values.length)
        ? _basePullAll_js_1.default(array, values)
        : array;
}
exports.default = pullAll;
});

var pull_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var pullAll_js_1 = pullAll_1;
var pull = _baseRest_js_1.default(pullAll_js_1.default);
exports.default = pull;
});

var pullAllBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _basePullAll_js_1 = _basePullAll;
function pullAllBy(array, values, iteratee) {
    return (array && array.length && values && values.length)
        ? _basePullAll_js_1.default(array, values, _baseIteratee_js_1.default(iteratee, 2))
        : array;
}
exports.default = pullAllBy;
});

var pullAllWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePullAll_js_1 = _basePullAll;
function pullAllWith(array, values, comparator) {
    return (array && array.length && values && values.length)
        ? _basePullAll_js_1.default(array, values, undefined, comparator)
        : array;
}
exports.default = pullAllWith;
});

var _basePullAt = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseUnset_js_1 = _baseUnset;
var _isIndex_js_1 = _isIndex;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0, lastIndex = length - 1;
    while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
            var previous = index;
            if (_isIndex_js_1.default(index)) {
                splice.call(array, index, 1);
            }
            else {
                _baseUnset_js_1.default(array, index);
            }
        }
    }
    return array;
}
exports.default = basePullAt;
});

var pullAt_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _baseAt_js_1 = _baseAt;
var _basePullAt_js_1 = _basePullAt;
var _compareAscending_js_1 = _compareAscending;
var _flatRest_js_1 = _flatRest;
var _isIndex_js_1 = _isIndex;
var pullAt = _flatRest_js_1.default(function (array, indexes) {
    var length = array == null ? 0 : array.length, result = _baseAt_js_1.default(array, indexes);
    _basePullAt_js_1.default(array, _arrayMap_js_1.default(indexes, function (index) {
        return _isIndex_js_1.default(index, length) ? +index : index;
    }).sort(_compareAscending_js_1.default));
    return result;
});
exports.default = pullAt;
});

var _baseRandom = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeFloor = Math.floor, nativeRandom = Math.random;
function baseRandom(lower, upper) {
    return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}
exports.default = baseRandom;
});

var random_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRandom_js_1 = _baseRandom;
var _isIterateeCall_js_1 = _isIterateeCall;
var toFinite_js_1 = toFinite_1;
var freeParseFloat = parseFloat;
var nativeMin = Math.min, nativeRandom = Math.random;
function random(lower, upper, floating) {
    if (floating && typeof floating != 'boolean' && _isIterateeCall_js_1.default(lower, upper, floating)) {
        upper = floating = undefined;
    }
    if (floating === undefined) {
        if (typeof upper == 'boolean') {
            floating = upper;
            upper = undefined;
        }
        else if (typeof lower == 'boolean') {
            floating = lower;
            lower = undefined;
        }
    }
    if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
    }
    else {
        lower = toFinite_js_1.default(lower);
        if (upper === undefined) {
            upper = lower;
            lower = 0;
        }
        else {
            upper = toFinite_js_1.default(upper);
        }
    }
    if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
    }
    if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
    }
    return _baseRandom_js_1.default(lower, upper);
}
exports.default = random;
});

var _baseRange = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeCeil = Math.ceil, nativeMax = Math.max;
function baseRange(start, end, step, fromRight) {
    var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
    while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
    }
    return result;
}
exports.default = baseRange;
});

var _createRange = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRange_js_1 = _baseRange;
var _isIterateeCall_js_1 = _isIterateeCall;
var toFinite_js_1 = toFinite_1;
function createRange(fromRight) {
    return function (start, end, step) {
        if (step && typeof step != 'number' && _isIterateeCall_js_1.default(start, end, step)) {
            end = step = undefined;
        }
        start = toFinite_js_1.default(start);
        if (end === undefined) {
            end = start;
            start = 0;
        }
        else {
            end = toFinite_js_1.default(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite_js_1.default(step);
        return _baseRange_js_1.default(start, end, step, fromRight);
    };
}
exports.default = createRange;
});

var range_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRange_js_1 = _createRange;
var range = _createRange_js_1.default();
exports.default = range;
});

var rangeRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRange_js_1 = _createRange;
var rangeRight = _createRange_js_1.default(true);
exports.default = rangeRight;
});

var rearg_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createWrap_js_1 = _createWrap;
var _flatRest_js_1 = _flatRest;
var WRAP_REARG_FLAG = 256;
var rearg = _flatRest_js_1.default(function (func, indexes) {
    return _createWrap_js_1.default(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
});
exports.default = rearg;
});

var _baseReduce = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function (value, index, collection) {
        accumulator = initAccum
            ? (initAccum = false, value)
            : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
}
exports.default = baseReduce;
});

var reduce_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayReduce_js_1 = _arrayReduce;
var _baseEach_js_1 = _baseEach;
var _baseIteratee_js_1 = _baseIteratee;
var _baseReduce_js_1 = _baseReduce;
var isArray_js_1 = isArray_1;
function reduce(collection, iteratee, accumulator) {
    var func = isArray_js_1.default(collection) ? _arrayReduce_js_1.default : _baseReduce_js_1.default, initAccum = arguments.length < 3;
    return func(collection, _baseIteratee_js_1.default(iteratee, 4), accumulator, initAccum, _baseEach_js_1.default);
}
exports.default = reduce;
});

var _arrayReduceRight = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
        accumulator = array[--length];
    }
    while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
}
exports.default = arrayReduceRight;
});

var reduceRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayReduceRight_js_1 = _arrayReduceRight;
var _baseEachRight_js_1 = _baseEachRight;
var _baseIteratee_js_1 = _baseIteratee;
var _baseReduce_js_1 = _baseReduce;
var isArray_js_1 = isArray_1;
function reduceRight(collection, iteratee, accumulator) {
    var func = isArray_js_1.default(collection) ? _arrayReduceRight_js_1.default : _baseReduce_js_1.default, initAccum = arguments.length < 3;
    return func(collection, _baseIteratee_js_1.default(iteratee, 4), accumulator, initAccum, _baseEachRight_js_1.default);
}
exports.default = reduceRight;
});

var reject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var _baseFilter_js_1 = _baseFilter;
var _baseIteratee_js_1 = _baseIteratee;
var isArray_js_1 = isArray_1;
var negate_js_1 = negate_1;
function reject(collection, predicate) {
    var func = isArray_js_1.default(collection) ? _arrayFilter_js_1.default : _baseFilter_js_1.default;
    return func(collection, negate_js_1.default(_baseIteratee_js_1.default(predicate, 3)));
}
exports.default = reject;
});

var remove_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _basePullAt_js_1 = _basePullAt;
function remove(array, predicate) {
    var result = [];
    if (!(array && array.length)) {
        return result;
    }
    var index = -1, indexes = [], length = array.length;
    predicate = _baseIteratee_js_1.default(predicate, 3);
    while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
        }
    }
    _basePullAt_js_1.default(array, indexes);
    return result;
}
exports.default = remove;
});

var repeat_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRepeat_js_1 = _baseRepeat;
var _isIterateeCall_js_1 = _isIterateeCall;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
function repeat(string, n, guard) {
    if ((guard ? _isIterateeCall_js_1.default(string, n, guard) : n === undefined)) {
        n = 1;
    }
    else {
        n = toInteger_js_1.default(n);
    }
    return _baseRepeat_js_1.default(toString_js_1.default(string), n);
}
exports.default = repeat;
});

var replace_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
function replace() {
    var args = arguments, string = toString_js_1.default(args[0]);
    return args.length < 3 ? string : string.replace(args[1], args[2]);
}
exports.default = replace;
});

var rest_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var toInteger_js_1 = toInteger_1;
var FUNC_ERROR_TEXT = 'Expected a function';
function rest(func, start) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = start === undefined ? start : toInteger_js_1.default(start);
    return _baseRest_js_1.default(func, start);
}
exports.default = rest;
});

var result_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _castPath_js_1 = _castPath;
var isFunction_js_1 = isFunction_1;
var _toKey_js_1 = _toKey;
function result(object, path, defaultValue) {
    path = _castPath_js_1.default(path, object);
    var index = -1, length = path.length;
    if (!length) {
        length = 1;
        object = undefined;
    }
    while (++index < length) {
        var value = object == null ? undefined : object[_toKey_js_1.default(path[index])];
        if (value === undefined) {
            index = length;
            value = defaultValue;
        }
        object = isFunction_js_1.default(value) ? value.call(object) : value;
    }
    return object;
}
exports.default = result;
});

var reverse_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayProto = Array.prototype;
var nativeReverse = arrayProto.reverse;
function reverse(array) {
    return array == null ? array : nativeReverse.call(array);
}
exports.default = reverse;
});

var round_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createRound_js_1 = _createRound;
var round = _createRound_js_1.default('round');
exports.default = round;
});

var _arraySample = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRandom_js_1 = _baseRandom;
function arraySample(array) {
    var length = array.length;
    return length ? array[_baseRandom_js_1.default(0, length - 1)] : undefined;
}
exports.default = arraySample;
});

var _baseSample = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arraySample_js_1 = _arraySample;
var values_js_1 = values_1;
function baseSample(collection) {
    return _arraySample_js_1.default(values_js_1.default(collection));
}
exports.default = baseSample;
});

var sample_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arraySample_js_1 = _arraySample;
var _baseSample_js_1 = _baseSample;
var isArray_js_1 = isArray_1;
function sample(collection) {
    var func = isArray_js_1.default(collection) ? _arraySample_js_1.default : _baseSample_js_1.default;
    return func(collection);
}
exports.default = sample;
});

var _shuffleSelf = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRandom_js_1 = _baseRandom;
function shuffleSelf(array, size) {
    var index = -1, length = array.length, lastIndex = length - 1;
    size = size === undefined ? length : size;
    while (++index < size) {
        var rand = _baseRandom_js_1.default(index, lastIndex), value = array[rand];
        array[rand] = array[index];
        array[index] = value;
    }
    array.length = size;
    return array;
}
exports.default = shuffleSelf;
});

var _arraySampleSize = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var _copyArray_js_1 = _copyArray;
var _shuffleSelf_js_1 = _shuffleSelf;
function arraySampleSize(array, n) {
    return _shuffleSelf_js_1.default(_copyArray_js_1.default(array), _baseClamp_js_1.default(n, 0, array.length));
}
exports.default = arraySampleSize;
});

var _baseSampleSize = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var _shuffleSelf_js_1 = _shuffleSelf;
var values_js_1 = values_1;
function baseSampleSize(collection, n) {
    var array = values_js_1.default(collection);
    return _shuffleSelf_js_1.default(array, _baseClamp_js_1.default(n, 0, array.length));
}
exports.default = baseSampleSize;
});

var sampleSize_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arraySampleSize_js_1 = _arraySampleSize;
var _baseSampleSize_js_1 = _baseSampleSize;
var isArray_js_1 = isArray_1;
var _isIterateeCall_js_1 = _isIterateeCall;
var toInteger_js_1 = toInteger_1;
function sampleSize(collection, n, guard) {
    if ((guard ? _isIterateeCall_js_1.default(collection, n, guard) : n === undefined)) {
        n = 1;
    }
    else {
        n = toInteger_js_1.default(n);
    }
    var func = isArray_js_1.default(collection) ? _arraySampleSize_js_1.default : _baseSampleSize_js_1.default;
    return func(collection, n);
}
exports.default = sampleSize;
});

var set_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSet_js_1 = _baseSet;
function set(object, path, value) {
    return object == null ? object : _baseSet_js_1.default(object, path, value);
}
exports.default = set;
});

var setWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSet_js_1 = _baseSet;
function setWith(object, path, value, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return object == null ? object : _baseSet_js_1.default(object, path, value, customizer);
}
exports.default = setWith;
});

var _arrayShuffle = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _copyArray_js_1 = _copyArray;
var _shuffleSelf_js_1 = _shuffleSelf;
function arrayShuffle(array) {
    return _shuffleSelf_js_1.default(_copyArray_js_1.default(array));
}
exports.default = arrayShuffle;
});

var _baseShuffle = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _shuffleSelf_js_1 = _shuffleSelf;
var values_js_1 = values_1;
function baseShuffle(collection) {
    return _shuffleSelf_js_1.default(values_js_1.default(collection));
}
exports.default = baseShuffle;
});

var shuffle_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayShuffle_js_1 = _arrayShuffle;
var _baseShuffle_js_1 = _baseShuffle;
var isArray_js_1 = isArray_1;
function shuffle(collection) {
    var func = isArray_js_1.default(collection) ? _arrayShuffle_js_1.default : _baseShuffle_js_1.default;
    return func(collection);
}
exports.default = shuffle;
});

var size_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseKeys_js_1 = _baseKeys;
var _getTag_js_1 = _getTag;
var isArrayLike_js_1 = isArrayLike_1;
var isString_js_1 = isString_1;
var _stringSize_js_1 = _stringSize;
var mapTag = '[object Map]', setTag = '[object Set]';
function size(collection) {
    if (collection == null) {
        return 0;
    }
    if (isArrayLike_js_1.default(collection)) {
        return isString_js_1.default(collection) ? _stringSize_js_1.default(collection) : collection.length;
    }
    var tag = _getTag_js_1.default(collection);
    if (tag == mapTag || tag == setTag) {
        return collection.size;
    }
    return _baseKeys_js_1.default(collection).length;
}
exports.default = size;
});

var slice_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
var _isIterateeCall_js_1 = _isIterateeCall;
var toInteger_js_1 = toInteger_1;
function slice(array, start, end) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    if (end && typeof end != 'number' && _isIterateeCall_js_1.default(array, start, end)) {
        start = 0;
        end = length;
    }
    else {
        start = start == null ? 0 : toInteger_js_1.default(start);
        end = end === undefined ? length : toInteger_js_1.default(end);
    }
    return _baseSlice_js_1.default(array, start, end);
}
exports.default = slice;
});

var snakeCase_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCompounder_js_1 = _createCompounder;
var snakeCase = _createCompounder_js_1.default(function (result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
});
exports.default = snakeCase;
});

var _baseSome = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseEach_js_1 = _baseEach;
function baseSome(collection, predicate) {
    var result;
    _baseEach_js_1.default(collection, function (value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
    });
    return !!result;
}
exports.default = baseSome;
});

var some_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arraySome_js_1 = _arraySome;
var _baseIteratee_js_1 = _baseIteratee;
var _baseSome_js_1 = _baseSome;
var isArray_js_1 = isArray_1;
var _isIterateeCall_js_1 = _isIterateeCall;
function some(collection, predicate, guard) {
    var func = isArray_js_1.default(collection) ? _arraySome_js_1.default : _baseSome_js_1.default;
    if (guard && _isIterateeCall_js_1.default(collection, predicate, guard)) {
        predicate = undefined;
    }
    return func(collection, _baseIteratee_js_1.default(predicate, 3));
}
exports.default = some;
});

var sortBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var _baseOrderBy_js_1 = _baseOrderBy;
var _baseRest_js_1 = _baseRest;
var _isIterateeCall_js_1 = _isIterateeCall;
var sortBy = _baseRest_js_1.default(function (collection, iteratees) {
    if (collection == null) {
        return [];
    }
    var length = iteratees.length;
    if (length > 1 && _isIterateeCall_js_1.default(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
    }
    else if (length > 2 && _isIterateeCall_js_1.default(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
    }
    return _baseOrderBy_js_1.default(collection, _baseFlatten_js_1.default(iteratees, 1), []);
});
exports.default = sortBy;
});

var _baseSortedIndexBy = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSymbol_js_1 = isSymbol_1;
var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;
var nativeFloor = Math.floor, nativeMin = Math.min;
function baseSortedIndexBy(array, value, iteratee, retHighest) {
    value = iteratee(value);
    var low = 0, high = array == null ? 0 : array.length, valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol_js_1.default(value), valIsUndefined = value === undefined;
    while (low < high) {
        var mid = nativeFloor((low + high) / 2), computed = iteratee(array[mid]), othIsDefined = computed !== undefined, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol_js_1.default(computed);
        if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
        }
        else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
        }
        else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        }
        else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        }
        else if (othIsNull || othIsSymbol) {
            setLow = false;
        }
        else {
            setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return nativeMin(high, MAX_ARRAY_INDEX);
}
exports.default = baseSortedIndexBy;
});

var _baseSortedIndex = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSortedIndexBy_js_1 = _baseSortedIndexBy;
var identity_js_1 = identity_1;
var isSymbol_js_1 = isSymbol_1;
var MAX_ARRAY_LENGTH = 4294967295, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
function baseSortedIndex(array, value, retHighest) {
    var low = 0, high = array == null ? low : array.length;
    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
            var mid = (low + high) >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol_js_1.default(computed) &&
                (retHighest ? (computed <= value) : (computed < value))) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return high;
    }
    return _baseSortedIndexBy_js_1.default(array, value, identity_js_1.default, retHighest);
}
exports.default = baseSortedIndex;
});

var sortedIndex_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSortedIndex_js_1 = _baseSortedIndex;
function sortedIndex(array, value) {
    return _baseSortedIndex_js_1.default(array, value);
}
exports.default = sortedIndex;
});

var sortedIndexBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseSortedIndexBy_js_1 = _baseSortedIndexBy;
function sortedIndexBy(array, value, iteratee) {
    return _baseSortedIndexBy_js_1.default(array, value, _baseIteratee_js_1.default(iteratee, 2));
}
exports.default = sortedIndexBy;
});

var sortedIndexOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSortedIndex_js_1 = _baseSortedIndex;
var eq_js_1 = eq_1;
function sortedIndexOf(array, value) {
    var length = array == null ? 0 : array.length;
    if (length) {
        var index = _baseSortedIndex_js_1.default(array, value);
        if (index < length && eq_js_1.default(array[index], value)) {
            return index;
        }
    }
    return -1;
}
exports.default = sortedIndexOf;
});

var sortedLastIndex_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSortedIndex_js_1 = _baseSortedIndex;
function sortedLastIndex(array, value) {
    return _baseSortedIndex_js_1.default(array, value, true);
}
exports.default = sortedLastIndex;
});

var sortedLastIndexBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseSortedIndexBy_js_1 = _baseSortedIndexBy;
function sortedLastIndexBy(array, value, iteratee) {
    return _baseSortedIndexBy_js_1.default(array, value, _baseIteratee_js_1.default(iteratee, 2), true);
}
exports.default = sortedLastIndexBy;
});

var sortedLastIndexOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSortedIndex_js_1 = _baseSortedIndex;
var eq_js_1 = eq_1;
function sortedLastIndexOf(array, value) {
    var length = array == null ? 0 : array.length;
    if (length) {
        var index = _baseSortedIndex_js_1.default(array, value, true) - 1;
        if (eq_js_1.default(array[index], value)) {
            return index;
        }
    }
    return -1;
}
exports.default = sortedLastIndexOf;
});

var _baseSortedUniq = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eq_js_1 = eq_1;
function baseSortedUniq(array, iteratee) {
    var index = -1, length = array.length, resIndex = 0, result = [];
    while (++index < length) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        if (!index || !eq_js_1.default(computed, seen)) {
            var seen = computed;
            result[resIndex++] = value === 0 ? 0 : value;
        }
    }
    return result;
}
exports.default = baseSortedUniq;
});

var sortedUniq_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSortedUniq_js_1 = _baseSortedUniq;
function sortedUniq(array) {
    return (array && array.length)
        ? _baseSortedUniq_js_1.default(array)
        : [];
}
exports.default = sortedUniq;
});

var sortedUniqBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseSortedUniq_js_1 = _baseSortedUniq;
function sortedUniqBy(array, iteratee) {
    return (array && array.length)
        ? _baseSortedUniq_js_1.default(array, _baseIteratee_js_1.default(iteratee, 2))
        : [];
}
exports.default = sortedUniqBy;
});

var split_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToString_js_1 = _baseToString;
var _castSlice_js_1 = _castSlice;
var _hasUnicode_js_1 = _hasUnicode;
var _isIterateeCall_js_1 = _isIterateeCall;
var isRegExp_js_1 = isRegExp_1;
var _stringToArray_js_1 = _stringToArray;
var toString_js_1 = toString_1;
var MAX_ARRAY_LENGTH = 4294967295;
function split(string, separator, limit) {
    if (limit && typeof limit != 'number' && _isIterateeCall_js_1.default(string, separator, limit)) {
        separator = limit = undefined;
    }
    limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
    if (!limit) {
        return [];
    }
    string = toString_js_1.default(string);
    if (string && (typeof separator == 'string' ||
        (separator != null && !isRegExp_js_1.default(separator)))) {
        separator = _baseToString_js_1.default(separator);
        if (!separator && _hasUnicode_js_1.default(string)) {
            return _castSlice_js_1.default(_stringToArray_js_1.default(string), 0, limit);
        }
    }
    return string.split(separator, limit);
}
exports.default = split;
});

var spread_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _arrayPush_js_1 = _arrayPush;
var _baseRest_js_1 = _baseRest;
var _castSlice_js_1 = _castSlice;
var toInteger_js_1 = toInteger_1;
var FUNC_ERROR_TEXT = 'Expected a function';
var nativeMax = Math.max;
function spread(func, start) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = start == null ? 0 : nativeMax(toInteger_js_1.default(start), 0);
    return _baseRest_js_1.default(function (args) {
        var array = args[start], otherArgs = _castSlice_js_1.default(args, 0, start);
        if (array) {
            _arrayPush_js_1.default(otherArgs, array);
        }
        return _apply_js_1.default(func, this, otherArgs);
    });
}
exports.default = spread;
});

var startCase_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCompounder_js_1 = _createCompounder;
var upperFirst_js_1 = upperFirst_1;
var startCase = _createCompounder_js_1.default(function (result, word, index) {
    return result + (index ? ' ' : '') + upperFirst_js_1.default(word);
});
exports.default = startCase;
});

var startsWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var _baseToString_js_1 = _baseToString;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
function startsWith(string, target, position) {
    string = toString_js_1.default(string);
    position = position == null
        ? 0
        : _baseClamp_js_1.default(toInteger_js_1.default(position), 0, string.length);
    target = _baseToString_js_1.default(target);
    return string.slice(position, position + target.length) == target;
}
exports.default = startsWith;
});

var stubObject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stubObject() {
    return {};
}
exports.default = stubObject;
});

var stubString_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stubString() {
    return '';
}
exports.default = stubString;
});

var stubTrue_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stubTrue() {
    return true;
}
exports.default = stubTrue;
});

var subtract_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createMathOperation_js_1 = _createMathOperation;
var subtract = _createMathOperation_js_1.default(function (minuend, subtrahend) {
    return minuend - subtrahend;
}, 0);
exports.default = subtract;
});

var sum_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSum_js_1 = _baseSum;
var identity_js_1 = identity_1;
function sum(array) {
    return (array && array.length)
        ? _baseSum_js_1.default(array, identity_js_1.default)
        : 0;
}
exports.default = sum;
});

var sumBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseSum_js_1 = _baseSum;
function sumBy(array, iteratee) {
    return (array && array.length)
        ? _baseSum_js_1.default(array, _baseIteratee_js_1.default(iteratee, 2))
        : 0;
}
exports.default = sumBy;
});

var tail_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
function tail(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseSlice_js_1.default(array, 1, length) : [];
}
exports.default = tail;
});

var take_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
var toInteger_js_1 = toInteger_1;
function take(array, n, guard) {
    if (!(array && array.length)) {
        return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger_js_1.default(n);
    return _baseSlice_js_1.default(array, 0, n < 0 ? 0 : n);
}
exports.default = take;
});

var takeRight_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSlice_js_1 = _baseSlice;
var toInteger_js_1 = toInteger_1;
function takeRight(array, n, guard) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger_js_1.default(n);
    n = length - n;
    return _baseSlice_js_1.default(array, n < 0 ? 0 : n, length);
}
exports.default = takeRight;
});

var takeRightWhile_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseWhile_js_1 = _baseWhile;
function takeRightWhile(array, predicate) {
    return (array && array.length)
        ? _baseWhile_js_1.default(array, _baseIteratee_js_1.default(predicate, 3), false, true)
        : [];
}
exports.default = takeRightWhile;
});

var takeWhile_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseWhile_js_1 = _baseWhile;
function takeWhile(array, predicate) {
    return (array && array.length)
        ? _baseWhile_js_1.default(array, _baseIteratee_js_1.default(predicate, 3))
        : [];
}
exports.default = takeWhile;
});

var tap_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tap(value, interceptor) {
    interceptor(value);
    return value;
}
exports.default = tap;
});

var _escapeStringChar = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};
function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
}
exports.default = escapeStringChar;
});

var _reInterpolate = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reInterpolate = /<%=([\s\S]+?)%>/g;
exports.default = reInterpolate;
});

var _reEscape = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reEscape = /<%-([\s\S]+?)%>/g;
exports.default = reEscape;
});

var _reEvaluate = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reEvaluate = /<%([\s\S]+?)%>/g;
exports.default = reEvaluate;
});

var templateSettings_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var escape_js_1 = _escape;
var _reEscape_js_1 = _reEscape;
var _reEvaluate_js_1 = _reEvaluate;
var _reInterpolate_js_1 = _reInterpolate;
var templateSettings = {
    'escape': _reEscape_js_1.default,
    'evaluate': _reEvaluate_js_1.default,
    'interpolate': _reInterpolate_js_1.default,
    'variable': '',
    'imports': {
        '_': { 'escape': escape_js_1.default }
    }
};
exports.default = templateSettings;
});

var template_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assignInWith_js_1 = assignInWith_1;
var attempt_js_1 = attempt_1;
var _baseValues_js_1 = _baseValues;
var _customDefaultsAssignIn_js_1 = _customDefaultsAssignIn;
var _escapeStringChar_js_1 = _escapeStringChar;
var isError_js_1 = isError_1;
var _isIterateeCall_js_1 = _isIterateeCall;
var keys_js_1 = keys_1;
var _reInterpolate_js_1 = _reInterpolate;
var templateSettings_js_1 = templateSettings_1;
var toString_js_1 = toString_1;
var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reNoMatch = /($^)/;
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
function template(string, options, guard) {
    var settings = templateSettings_js_1.default.imports._.templateSettings || templateSettings_js_1.default;
    if (guard && _isIterateeCall_js_1.default(string, options, guard)) {
        options = undefined;
    }
    string = toString_js_1.default(string);
    options = assignInWith_js_1.default({}, options, settings, _customDefaultsAssignIn_js_1.default);
    var imports = assignInWith_js_1.default({}, options.imports, settings.imports, _customDefaultsAssignIn_js_1.default), importsKeys = keys_js_1.default(imports), importsValues = _baseValues_js_1.default(imports, importsKeys);
    var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
    var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === _reInterpolate_js_1.default ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$', 'g');
    var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';
    string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);
        source += string.slice(index, offset).replace(reUnescapedString, _escapeStringChar_js_1.default);
        if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;
        return match;
    });
    source += "';\n";
    var variable = options.variable;
    if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
    }
    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');
    source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
            ? ''
            : 'obj || (obj = {});\n') +
        "var __t, __p = ''" +
        (isEscaping
            ? ', __e = _.escape'
            : '') +
        (isEvaluating
            ? ', __j = Array.prototype.join;\n' +
                "function print() { __p += __j.call(arguments, '') }\n"
            : ';\n') +
        source +
        'return __p\n}';
    var result = attempt_js_1.default(function () {
        return Function(importsKeys, sourceURL + 'return ' + source)
            .apply(undefined, importsValues);
    });
    result.source = source;
    if (isError_js_1.default(result)) {
        throw result;
    }
    return result;
}
exports.default = template;
});

var throttle_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounce_js_1 = debounce_1;
var isObject_js_1 = isObject_1;
var FUNC_ERROR_TEXT = 'Expected a function';
function throttle(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject_js_1.default(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce_js_1.default(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
    });
}
exports.default = throttle;
});

var thru_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function thru(value, interceptor) {
    return interceptor(value);
}
exports.default = thru;
});

var times_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseTimes_js_1 = _baseTimes;
var _castFunction_js_1 = _castFunction;
var toInteger_js_1 = toInteger_1;
var MAX_SAFE_INTEGER = 9007199254740991;
var MAX_ARRAY_LENGTH = 4294967295;
var nativeMin = Math.min;
function times(n, iteratee) {
    n = toInteger_js_1.default(n);
    if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
    }
    var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
    iteratee = _castFunction_js_1.default(iteratee);
    n -= MAX_ARRAY_LENGTH;
    var result = _baseTimes_js_1.default(length, iteratee);
    while (++index < n) {
        iteratee(index);
    }
    return result;
}
exports.default = times;
});

var toIterator = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapperToIterator() {
    return this;
}
exports.default = wrapperToIterator;
});

var _baseWrapperValue = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _arrayPush_js_1 = _arrayPush;
var _arrayReduce_js_1 = _arrayReduce;
function baseWrapperValue(value, actions) {
    var result = value;
    if (result instanceof _LazyWrapper_js_1.default) {
        result = result.value();
    }
    return _arrayReduce_js_1.default(actions, function (result, action) {
        return action.func.apply(action.thisArg, _arrayPush_js_1.default([result], action.args));
    }, result);
}
exports.default = baseWrapperValue;
});

var wrapperValue_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseWrapperValue_js_1 = _baseWrapperValue;
function wrapperValue() {
    return _baseWrapperValue_js_1.default(this.__wrapped__, this.__actions__);
}
exports.default = wrapperValue;
});

var toJSON = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperValue_js_1 = wrapperValue_1;
exports.default = wrapperValue_js_1.default;
});

var toLower_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
function toLower(value) {
    return toString_js_1.default(value).toLowerCase();
}
exports.default = toLower;
});

var toPath_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayMap_js_1 = _arrayMap;
var _copyArray_js_1 = _copyArray;
var isArray_js_1 = isArray_1;
var isSymbol_js_1 = isSymbol_1;
var _stringToPath_js_1 = _stringToPath;
var _toKey_js_1 = _toKey;
var toString_js_1 = toString_1;
function toPath(value) {
    if (isArray_js_1.default(value)) {
        return _arrayMap_js_1.default(value, _toKey_js_1.default);
    }
    return isSymbol_js_1.default(value) ? [value] : _copyArray_js_1.default(_stringToPath_js_1.default(toString_js_1.default(value)));
}
exports.default = toPath;
});

var toSafeInteger_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseClamp_js_1 = _baseClamp;
var toInteger_js_1 = toInteger_1;
var MAX_SAFE_INTEGER = 9007199254740991;
function toSafeInteger(value) {
    return value
        ? _baseClamp_js_1.default(toInteger_js_1.default(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
}
exports.default = toSafeInteger;
});

var toUpper_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
function toUpper(value) {
    return toString_js_1.default(value).toUpperCase();
}
exports.default = toUpper;
});

var transform_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayEach_js_1 = _arrayEach;
var _baseCreate_js_1 = _baseCreate;
var _baseForOwn_js_1 = _baseForOwn;
var _baseIteratee_js_1 = _baseIteratee;
var _getPrototype_js_1 = _getPrototype;
var isArray_js_1 = isArray_1;
var isBuffer_js_1 = isBuffer_1;
var isFunction_js_1 = isFunction_1;
var isObject_js_1 = isObject_1;
var isTypedArray_js_1 = isTypedArray_1;
function transform(object, iteratee, accumulator) {
    var isArr = isArray_js_1.default(object), isArrLike = isArr || isBuffer_js_1.default(object) || isTypedArray_js_1.default(object);
    iteratee = _baseIteratee_js_1.default(iteratee, 4);
    if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
            accumulator = isArr ? new Ctor : [];
        }
        else if (isObject_js_1.default(object)) {
            accumulator = isFunction_js_1.default(Ctor) ? _baseCreate_js_1.default(_getPrototype_js_1.default(object)) : {};
        }
        else {
            accumulator = {};
        }
    }
    (isArrLike ? _arrayEach_js_1.default : _baseForOwn_js_1.default)(object, function (value, index, object) {
        return iteratee(accumulator, value, index, object);
    });
    return accumulator;
}
exports.default = transform;
});

var _charsEndIndex = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIndexOf_js_1 = _baseIndexOf;
function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;
    while (index-- && _baseIndexOf_js_1.default(chrSymbols, strSymbols[index], 0) > -1) { }
    return index;
}
exports.default = charsEndIndex;
});

var _charsStartIndex = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIndexOf_js_1 = _baseIndexOf;
function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1, length = strSymbols.length;
    while (++index < length && _baseIndexOf_js_1.default(chrSymbols, strSymbols[index], 0) > -1) { }
    return index;
}
exports.default = charsStartIndex;
});

var trim_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToString_js_1 = _baseToString;
var _castSlice_js_1 = _castSlice;
var _charsEndIndex_js_1 = _charsEndIndex;
var _charsStartIndex_js_1 = _charsStartIndex;
var _stringToArray_js_1 = _stringToArray;
var toString_js_1 = toString_1;
var reTrim = /^\s+|\s+$/g;
function trim(string, chars, guard) {
    string = toString_js_1.default(string);
    if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
    }
    if (!string || !(chars = _baseToString_js_1.default(chars))) {
        return string;
    }
    var strSymbols = _stringToArray_js_1.default(string), chrSymbols = _stringToArray_js_1.default(chars), start = _charsStartIndex_js_1.default(strSymbols, chrSymbols), end = _charsEndIndex_js_1.default(strSymbols, chrSymbols) + 1;
    return _castSlice_js_1.default(strSymbols, start, end).join('');
}
exports.default = trim;
});

var trimEnd_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToString_js_1 = _baseToString;
var _castSlice_js_1 = _castSlice;
var _charsEndIndex_js_1 = _charsEndIndex;
var _stringToArray_js_1 = _stringToArray;
var toString_js_1 = toString_1;
var reTrimEnd = /\s+$/;
function trimEnd(string, chars, guard) {
    string = toString_js_1.default(string);
    if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
    }
    if (!string || !(chars = _baseToString_js_1.default(chars))) {
        return string;
    }
    var strSymbols = _stringToArray_js_1.default(string), end = _charsEndIndex_js_1.default(strSymbols, _stringToArray_js_1.default(chars)) + 1;
    return _castSlice_js_1.default(strSymbols, 0, end).join('');
}
exports.default = trimEnd;
});

var trimStart_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToString_js_1 = _baseToString;
var _castSlice_js_1 = _castSlice;
var _charsStartIndex_js_1 = _charsStartIndex;
var _stringToArray_js_1 = _stringToArray;
var toString_js_1 = toString_1;
var reTrimStart = /^\s+/;
function trimStart(string, chars, guard) {
    string = toString_js_1.default(string);
    if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
    }
    if (!string || !(chars = _baseToString_js_1.default(chars))) {
        return string;
    }
    var strSymbols = _stringToArray_js_1.default(string), start = _charsStartIndex_js_1.default(strSymbols, _stringToArray_js_1.default(chars));
    return _castSlice_js_1.default(strSymbols, start).join('');
}
exports.default = trimStart;
});

var truncate_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseToString_js_1 = _baseToString;
var _castSlice_js_1 = _castSlice;
var _hasUnicode_js_1 = _hasUnicode;
var isObject_js_1 = isObject_1;
var isRegExp_js_1 = isRegExp_1;
var _stringSize_js_1 = _stringSize;
var _stringToArray_js_1 = _stringToArray;
var toInteger_js_1 = toInteger_1;
var toString_js_1 = toString_1;
var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = '...';
var reFlags = /\w*$/;
function truncate(string, options) {
    var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
    if (isObject_js_1.default(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger_js_1.default(options.length) : length;
        omission = 'omission' in options ? _baseToString_js_1.default(options.omission) : omission;
    }
    string = toString_js_1.default(string);
    var strLength = string.length;
    if (_hasUnicode_js_1.default(string)) {
        var strSymbols = _stringToArray_js_1.default(string);
        strLength = strSymbols.length;
    }
    if (length >= strLength) {
        return string;
    }
    var end = length - _stringSize_js_1.default(omission);
    if (end < 1) {
        return omission;
    }
    var result = strSymbols
        ? _castSlice_js_1.default(strSymbols, 0, end).join('')
        : string.slice(0, end);
    if (separator === undefined) {
        return result + omission;
    }
    if (strSymbols) {
        end += (result.length - end);
    }
    if (isRegExp_js_1.default(separator)) {
        if (string.slice(end).search(separator)) {
            var match, substring = result;
            if (!separator.global) {
                separator = RegExp(separator.source, toString_js_1.default(reFlags.exec(separator)) + 'g');
            }
            separator.lastIndex = 0;
            while ((match = separator.exec(substring))) {
                var newEnd = match.index;
            }
            result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
    }
    else if (string.indexOf(_baseToString_js_1.default(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
            result = result.slice(0, index);
        }
    }
    return result + omission;
}
exports.default = truncate;
});

var unary_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ary_js_1 = ary_1;
function unary(func) {
    return ary_js_1.default(func, 1);
}
exports.default = unary;
});

var _unescapeHtmlChar = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _basePropertyOf_js_1 = _basePropertyOf;
var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
};
var unescapeHtmlChar = _basePropertyOf_js_1.default(htmlUnescapes);
exports.default = unescapeHtmlChar;
});

var _unescape = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
var _unescapeHtmlChar_js_1 = _unescapeHtmlChar;
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape(string) {
    string = toString_js_1.default(string);
    return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, _unescapeHtmlChar_js_1.default)
        : string;
}
exports.default = unescape;
});

var _createSet = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Set_js_1 = _Set;
var noop_js_1 = noop_1;
var _setToArray_js_1 = _setToArray;
var INFINITY = 1 / 0;
var createSet = !(_Set_js_1.default && (1 / _setToArray_js_1.default(new _Set_js_1.default([, -0]))[1]) == INFINITY) ? noop_js_1.default : function (values) {
    return new _Set_js_1.default(values);
};
exports.default = createSet;
});

var _baseUniq = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _SetCache_js_1 = _SetCache;
var _arrayIncludes_js_1 = _arrayIncludes;
var _arrayIncludesWith_js_1 = _arrayIncludesWith;
var _cacheHas_js_1 = _cacheHas;
var _createSet_js_1 = _createSet;
var _setToArray_js_1 = _setToArray;
var LARGE_ARRAY_SIZE = 200;
function baseUniq(array, iteratee, comparator) {
    var index = -1, includes = _arrayIncludes_js_1.default, length = array.length, isCommon = true, result = [], seen = result;
    if (comparator) {
        isCommon = false;
        includes = _arrayIncludesWith_js_1.default;
    }
    else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : _createSet_js_1.default(array);
        if (set) {
            return _setToArray_js_1.default(set);
        }
        isCommon = false;
        includes = _cacheHas_js_1.default;
        seen = new _SetCache_js_1.default;
    }
    else {
        seen = iteratee ? [] : result;
    }
    outer: while (++index < length) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                    continue outer;
                }
            }
            if (iteratee) {
                seen.push(computed);
            }
            result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
                seen.push(computed);
            }
            result.push(value);
        }
    }
    return result;
}
exports.default = baseUniq;
});

var union_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var _baseRest_js_1 = _baseRest;
var _baseUniq_js_1 = _baseUniq;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var union = _baseRest_js_1.default(function (arrays) {
    return _baseUniq_js_1.default(_baseFlatten_js_1.default(arrays, 1, isArrayLikeObject_js_1.default, true));
});
exports.default = union;
});

var unionBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var _baseUniq_js_1 = _baseUniq;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var last_js_1 = last_1;
var unionBy = _baseRest_js_1.default(function (arrays) {
    var iteratee = last_js_1.default(arrays);
    if (isArrayLikeObject_js_1.default(iteratee)) {
        iteratee = undefined;
    }
    return _baseUniq_js_1.default(_baseFlatten_js_1.default(arrays, 1, isArrayLikeObject_js_1.default, true), _baseIteratee_js_1.default(iteratee, 2));
});
exports.default = unionBy;
});

var unionWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseFlatten_js_1 = _baseFlatten;
var _baseRest_js_1 = _baseRest;
var _baseUniq_js_1 = _baseUniq;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var last_js_1 = last_1;
var unionWith = _baseRest_js_1.default(function (arrays) {
    var comparator = last_js_1.default(arrays);
    comparator = typeof comparator == 'function' ? comparator : undefined;
    return _baseUniq_js_1.default(_baseFlatten_js_1.default(arrays, 1, isArrayLikeObject_js_1.default, true), undefined, comparator);
});
exports.default = unionWith;
});

var uniq_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseUniq_js_1 = _baseUniq;
function uniq(array) {
    return (array && array.length) ? _baseUniq_js_1.default(array) : [];
}
exports.default = uniq;
});

var uniqBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseIteratee_js_1 = _baseIteratee;
var _baseUniq_js_1 = _baseUniq;
function uniqBy(array, iteratee) {
    return (array && array.length) ? _baseUniq_js_1.default(array, _baseIteratee_js_1.default(iteratee, 2)) : [];
}
exports.default = uniqBy;
});

var uniqWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseUniq_js_1 = _baseUniq;
function uniqWith(array, comparator) {
    comparator = typeof comparator == 'function' ? comparator : undefined;
    return (array && array.length) ? _baseUniq_js_1.default(array, undefined, comparator) : [];
}
exports.default = uniqWith;
});

var uniqueId_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString_js_1 = toString_1;
var idCounter = 0;
function uniqueId(prefix) {
    var id = ++idCounter;
    return toString_js_1.default(prefix) + id;
}
exports.default = uniqueId;
});

var unset_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseUnset_js_1 = _baseUnset;
function unset(object, path) {
    return object == null ? true : _baseUnset_js_1.default(object, path);
}
exports.default = unset;
});

var unzip_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var _arrayMap_js_1 = _arrayMap;
var _baseProperty_js_1 = _baseProperty;
var _baseTimes_js_1 = _baseTimes;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var nativeMax = Math.max;
function unzip(array) {
    if (!(array && array.length)) {
        return [];
    }
    var length = 0;
    array = _arrayFilter_js_1.default(array, function (group) {
        if (isArrayLikeObject_js_1.default(group)) {
            length = nativeMax(group.length, length);
            return true;
        }
    });
    return _baseTimes_js_1.default(length, function (index) {
        return _arrayMap_js_1.default(array, _baseProperty_js_1.default(index));
    });
}
exports.default = unzip;
});

var unzipWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _apply_js_1 = _apply;
var _arrayMap_js_1 = _arrayMap;
var unzip_js_1 = unzip_1;
function unzipWith(array, iteratee) {
    if (!(array && array.length)) {
        return [];
    }
    var result = unzip_js_1.default(array);
    if (iteratee == null) {
        return result;
    }
    return _arrayMap_js_1.default(result, function (group) {
        return _apply_js_1.default(iteratee, undefined, group);
    });
}
exports.default = unzipWith;
});

var _baseUpdate = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseGet_js_1 = _baseGet;
var _baseSet_js_1 = _baseSet;
function baseUpdate(object, path, updater, customizer) {
    return _baseSet_js_1.default(object, path, updater(_baseGet_js_1.default(object, path)), customizer);
}
exports.default = baseUpdate;
});

var update_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseUpdate_js_1 = _baseUpdate;
var _castFunction_js_1 = _castFunction;
function update(object, path, updater) {
    return object == null ? object : _baseUpdate_js_1.default(object, path, _castFunction_js_1.default(updater));
}
exports.default = update;
});

var updateWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseUpdate_js_1 = _baseUpdate;
var _castFunction_js_1 = _castFunction;
function updateWith(object, path, updater, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined;
    return object == null ? object : _baseUpdate_js_1.default(object, path, _castFunction_js_1.default(updater), customizer);
}
exports.default = updateWith;
});

var upperCase_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _createCompounder_js_1 = _createCompounder;
var upperCase = _createCompounder_js_1.default(function (result, word, index) {
    return result + (index ? ' ' : '') + word.toUpperCase();
});
exports.default = upperCase;
});

var value = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperValue_js_1 = wrapperValue_1;
exports.default = wrapperValue_js_1.default;
});

var valueOf_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperValue_js_1 = wrapperValue_1;
exports.default = wrapperValue_js_1.default;
});

var valuesIn_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseValues_js_1 = _baseValues;
var keysIn_js_1 = keysIn_1;
function valuesIn(object) {
    return object == null ? [] : _baseValues_js_1.default(object, keysIn_js_1.default(object));
}
exports.default = valuesIn;
});

var without_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDifference_js_1 = _baseDifference;
var _baseRest_js_1 = _baseRest;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var without = _baseRest_js_1.default(function (array, values) {
    return isArrayLikeObject_js_1.default(array)
        ? _baseDifference_js_1.default(array, values)
        : [];
});
exports.default = without;
});

var wrap_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _castFunction_js_1 = _castFunction;
var partial_js_1 = partial_1;
function wrap(value, wrapper) {
    return partial_js_1.default(_castFunction_js_1.default(wrapper), value);
}
exports.default = wrap;
});

var wrapperAt_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _LodashWrapper_js_1 = _LodashWrapper;
var _baseAt_js_1 = _baseAt;
var _flatRest_js_1 = _flatRest;
var _isIndex_js_1 = _isIndex;
var thru_js_1 = thru_1;
var wrapperAt = _flatRest_js_1.default(function (paths) {
    var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function (object) { return _baseAt_js_1.default(object, paths); };
    if (length > 1 || this.__actions__.length ||
        !(value instanceof _LazyWrapper_js_1.default) || !_isIndex_js_1.default(start)) {
        return this.thru(interceptor);
    }
    value = value.slice(start, +start + (length ? 1 : 0));
    value.__actions__.push({
        'func': thru_js_1.default,
        'args': [interceptor],
        'thisArg': undefined
    });
    return new _LodashWrapper_js_1.default(value, this.__chain__).thru(function (array) {
        if (length && !array.length) {
            array.push(undefined);
        }
        return array;
    });
});
exports.default = wrapperAt;
});

var wrapperChain_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_js_1 = chain_1;
function wrapperChain() {
    return chain_js_1.default(this);
}
exports.default = wrapperChain;
});

var wrapperReverse_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _LodashWrapper_js_1 = _LodashWrapper;
var reverse_js_1 = reverse_1;
var thru_js_1 = thru_1;
function wrapperReverse() {
    var value = this.__wrapped__;
    if (value instanceof _LazyWrapper_js_1.default) {
        var wrapped = value;
        if (this.__actions__.length) {
            wrapped = new _LazyWrapper_js_1.default(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
            'func': thru_js_1.default,
            'args': [reverse_js_1.default],
            'thisArg': undefined
        });
        return new _LodashWrapper_js_1.default(wrapped, this.__chain__);
    }
    return this.thru(reverse_js_1.default);
}
exports.default = wrapperReverse;
});

var _baseXor = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseDifference_js_1 = _baseDifference;
var _baseFlatten_js_1 = _baseFlatten;
var _baseUniq_js_1 = _baseUniq;
function baseXor(arrays, iteratee, comparator) {
    var length = arrays.length;
    if (length < 2) {
        return length ? _baseUniq_js_1.default(arrays[0]) : [];
    }
    var index = -1, result = Array(length);
    while (++index < length) {
        var array = arrays[index], othIndex = -1;
        while (++othIndex < length) {
            if (othIndex != index) {
                result[index] = _baseDifference_js_1.default(result[index] || array, arrays[othIndex], iteratee, comparator);
            }
        }
    }
    return _baseUniq_js_1.default(_baseFlatten_js_1.default(result, 1), iteratee, comparator);
}
exports.default = baseXor;
});

var xor_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var _baseRest_js_1 = _baseRest;
var _baseXor_js_1 = _baseXor;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var xor = _baseRest_js_1.default(function (arrays) {
    return _baseXor_js_1.default(_arrayFilter_js_1.default(arrays, isArrayLikeObject_js_1.default));
});
exports.default = xor;
});

var xorBy_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var _baseXor_js_1 = _baseXor;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var last_js_1 = last_1;
var xorBy = _baseRest_js_1.default(function (arrays) {
    var iteratee = last_js_1.default(arrays);
    if (isArrayLikeObject_js_1.default(iteratee)) {
        iteratee = undefined;
    }
    return _baseXor_js_1.default(_arrayFilter_js_1.default(arrays, isArrayLikeObject_js_1.default), _baseIteratee_js_1.default(iteratee, 2));
});
exports.default = xorBy;
});

var xorWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _arrayFilter_js_1 = _arrayFilter;
var _baseRest_js_1 = _baseRest;
var _baseXor_js_1 = _baseXor;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var last_js_1 = last_1;
var xorWith = _baseRest_js_1.default(function (arrays) {
    var comparator = last_js_1.default(arrays);
    comparator = typeof comparator == 'function' ? comparator : undefined;
    return _baseXor_js_1.default(_arrayFilter_js_1.default(arrays, isArrayLikeObject_js_1.default), undefined, comparator);
});
exports.default = xorWith;
});

var zip_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var unzip_js_1 = unzip_1;
var zip = _baseRest_js_1.default(unzip_js_1.default);
exports.default = zip;
});

var _baseZipObject = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function baseZipObject(props, values, assignFunc) {
    var index = -1, length = props.length, valsLength = values.length, result = {};
    while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
    }
    return result;
}
exports.default = baseZipObject;
});

var zipObject_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _assignValue_js_1 = _assignValue;
var _baseZipObject_js_1 = _baseZipObject;
function zipObject(props, values) {
    return _baseZipObject_js_1.default(props || [], values || [], _assignValue_js_1.default);
}
exports.default = zipObject;
});

var zipObjectDeep_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseSet_js_1 = _baseSet;
var _baseZipObject_js_1 = _baseZipObject;
function zipObjectDeep(props, values) {
    return _baseZipObject_js_1.default(props || [], values || [], _baseSet_js_1.default);
}
exports.default = zipObjectDeep;
});

var zipWith_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseRest_js_1 = _baseRest;
var unzipWith_js_1 = unzipWith_1;
var zipWith = _baseRest_js_1.default(function (arrays) {
    var length = arrays.length, iteratee = length > 1 ? arrays[length - 1] : undefined;
    iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
    return unzipWith_js_1.default(arrays, iteratee);
});
exports.default = zipWith;
});

var array_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_js_1 = chunk_1;
var compact_js_1 = compact_1;
var concat_js_1 = concat_1;
var difference_js_1 = difference_1;
var differenceBy_js_1 = differenceBy_1;
var differenceWith_js_1 = differenceWith_1;
var drop_js_1 = drop_1;
var dropRight_js_1 = dropRight_1;
var dropRightWhile_js_1 = dropRightWhile_1;
var dropWhile_js_1 = dropWhile_1;
var fill_js_1 = fill_1;
var findIndex_js_1 = findIndex_1;
var findLastIndex_js_1 = findLastIndex_1;
var first_js_1 = first;
var flatten_js_1 = flatten_1;
var flattenDeep_js_1 = flattenDeep_1;
var flattenDepth_js_1 = flattenDepth_1;
var fromPairs_js_1 = fromPairs_1;
var head_js_1 = head_1;
var indexOf_js_1 = indexOf_1;
var initial_js_1 = initial_1;
var intersection_js_1 = intersection_1;
var intersectionBy_js_1 = intersectionBy_1;
var intersectionWith_js_1 = intersectionWith_1;
var join_js_1 = join_1;
var last_js_1 = last_1;
var lastIndexOf_js_1 = lastIndexOf_1;
var nth_js_1 = nth_1;
var pull_js_1 = pull_1;
var pullAll_js_1 = pullAll_1;
var pullAllBy_js_1 = pullAllBy_1;
var pullAllWith_js_1 = pullAllWith_1;
var pullAt_js_1 = pullAt_1;
var remove_js_1 = remove_1;
var reverse_js_1 = reverse_1;
var slice_js_1 = slice_1;
var sortedIndex_js_1 = sortedIndex_1;
var sortedIndexBy_js_1 = sortedIndexBy_1;
var sortedIndexOf_js_1 = sortedIndexOf_1;
var sortedLastIndex_js_1 = sortedLastIndex_1;
var sortedLastIndexBy_js_1 = sortedLastIndexBy_1;
var sortedLastIndexOf_js_1 = sortedLastIndexOf_1;
var sortedUniq_js_1 = sortedUniq_1;
var sortedUniqBy_js_1 = sortedUniqBy_1;
var tail_js_1 = tail_1;
var take_js_1 = take_1;
var takeRight_js_1 = takeRight_1;
var takeRightWhile_js_1 = takeRightWhile_1;
var takeWhile_js_1 = takeWhile_1;
var union_js_1 = union_1;
var unionBy_js_1 = unionBy_1;
var unionWith_js_1 = unionWith_1;
var uniq_js_1 = uniq_1;
var uniqBy_js_1 = uniqBy_1;
var uniqWith_js_1 = uniqWith_1;
var unzip_js_1 = unzip_1;
var unzipWith_js_1 = unzipWith_1;
var without_js_1 = without_1;
var xor_js_1 = xor_1;
var xorBy_js_1 = xorBy_1;
var xorWith_js_1 = xorWith_1;
var zip_js_1 = zip_1;
var zipObject_js_1 = zipObject_1;
var zipObjectDeep_js_1 = zipObjectDeep_1;
var zipWith_js_1 = zipWith_1;
exports.default = {
    chunk: chunk_js_1.default, compact: compact_js_1.default, concat: concat_js_1.default, difference: difference_js_1.default, differenceBy: differenceBy_js_1.default,
    differenceWith: differenceWith_js_1.default, drop: drop_js_1.default, dropRight: dropRight_js_1.default, dropRightWhile: dropRightWhile_js_1.default, dropWhile: dropWhile_js_1.default,
    fill: fill_js_1.default, findIndex: findIndex_js_1.default, findLastIndex: findLastIndex_js_1.default, first: first_js_1.default, flatten: flatten_js_1.default,
    flattenDeep: flattenDeep_js_1.default, flattenDepth: flattenDepth_js_1.default, fromPairs: fromPairs_js_1.default, head: head_js_1.default, indexOf: indexOf_js_1.default,
    initial: initial_js_1.default, intersection: intersection_js_1.default, intersectionBy: intersectionBy_js_1.default, intersectionWith: intersectionWith_js_1.default, join: join_js_1.default,
    last: last_js_1.default, lastIndexOf: lastIndexOf_js_1.default, nth: nth_js_1.default, pull: pull_js_1.default, pullAll: pullAll_js_1.default,
    pullAllBy: pullAllBy_js_1.default, pullAllWith: pullAllWith_js_1.default, pullAt: pullAt_js_1.default, remove: remove_js_1.default, reverse: reverse_js_1.default,
    slice: slice_js_1.default, sortedIndex: sortedIndex_js_1.default, sortedIndexBy: sortedIndexBy_js_1.default, sortedIndexOf: sortedIndexOf_js_1.default, sortedLastIndex: sortedLastIndex_js_1.default,
    sortedLastIndexBy: sortedLastIndexBy_js_1.default, sortedLastIndexOf: sortedLastIndexOf_js_1.default, sortedUniq: sortedUniq_js_1.default, sortedUniqBy: sortedUniqBy_js_1.default, tail: tail_js_1.default,
    take: take_js_1.default, takeRight: takeRight_js_1.default, takeRightWhile: takeRightWhile_js_1.default, takeWhile: takeWhile_js_1.default, union: union_js_1.default,
    unionBy: unionBy_js_1.default, unionWith: unionWith_js_1.default, uniq: uniq_js_1.default, uniqBy: uniqBy_js_1.default, uniqWith: uniqWith_js_1.default,
    unzip: unzip_js_1.default, unzipWith: unzipWith_js_1.default, without: without_js_1.default, xor: xor_js_1.default, xorBy: xorBy_js_1.default,
    xorWith: xorWith_js_1.default, zip: zip_js_1.default, zipObject: zipObject_js_1.default, zipObjectDeep: zipObjectDeep_js_1.default, zipWith: zipWith_js_1.default
};
});

var array = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_js_1 = chunk_1;
exports.chunk = chunk_js_1.default;
var compact_js_1 = compact_1;
exports.compact = compact_js_1.default;
var concat_js_1 = concat_1;
exports.concat = concat_js_1.default;
var difference_js_1 = difference_1;
exports.difference = difference_js_1.default;
var differenceBy_js_1 = differenceBy_1;
exports.differenceBy = differenceBy_js_1.default;
var differenceWith_js_1 = differenceWith_1;
exports.differenceWith = differenceWith_js_1.default;
var drop_js_1 = drop_1;
exports.drop = drop_js_1.default;
var dropRight_js_1 = dropRight_1;
exports.dropRight = dropRight_js_1.default;
var dropRightWhile_js_1 = dropRightWhile_1;
exports.dropRightWhile = dropRightWhile_js_1.default;
var dropWhile_js_1 = dropWhile_1;
exports.dropWhile = dropWhile_js_1.default;
var fill_js_1 = fill_1;
exports.fill = fill_js_1.default;
var findIndex_js_1 = findIndex_1;
exports.findIndex = findIndex_js_1.default;
var findLastIndex_js_1 = findLastIndex_1;
exports.findLastIndex = findLastIndex_js_1.default;
var first_js_1 = first;
exports.first = first_js_1.default;
var flatten_js_1 = flatten_1;
exports.flatten = flatten_js_1.default;
var flattenDeep_js_1 = flattenDeep_1;
exports.flattenDeep = flattenDeep_js_1.default;
var flattenDepth_js_1 = flattenDepth_1;
exports.flattenDepth = flattenDepth_js_1.default;
var fromPairs_js_1 = fromPairs_1;
exports.fromPairs = fromPairs_js_1.default;
var head_js_1 = head_1;
exports.head = head_js_1.default;
var indexOf_js_1 = indexOf_1;
exports.indexOf = indexOf_js_1.default;
var initial_js_1 = initial_1;
exports.initial = initial_js_1.default;
var intersection_js_1 = intersection_1;
exports.intersection = intersection_js_1.default;
var intersectionBy_js_1 = intersectionBy_1;
exports.intersectionBy = intersectionBy_js_1.default;
var intersectionWith_js_1 = intersectionWith_1;
exports.intersectionWith = intersectionWith_js_1.default;
var join_js_1 = join_1;
exports.join = join_js_1.default;
var last_js_1 = last_1;
exports.last = last_js_1.default;
var lastIndexOf_js_1 = lastIndexOf_1;
exports.lastIndexOf = lastIndexOf_js_1.default;
var nth_js_1 = nth_1;
exports.nth = nth_js_1.default;
var pull_js_1 = pull_1;
exports.pull = pull_js_1.default;
var pullAll_js_1 = pullAll_1;
exports.pullAll = pullAll_js_1.default;
var pullAllBy_js_1 = pullAllBy_1;
exports.pullAllBy = pullAllBy_js_1.default;
var pullAllWith_js_1 = pullAllWith_1;
exports.pullAllWith = pullAllWith_js_1.default;
var pullAt_js_1 = pullAt_1;
exports.pullAt = pullAt_js_1.default;
var remove_js_1 = remove_1;
exports.remove = remove_js_1.default;
var reverse_js_1 = reverse_1;
exports.reverse = reverse_js_1.default;
var slice_js_1 = slice_1;
exports.slice = slice_js_1.default;
var sortedIndex_js_1 = sortedIndex_1;
exports.sortedIndex = sortedIndex_js_1.default;
var sortedIndexBy_js_1 = sortedIndexBy_1;
exports.sortedIndexBy = sortedIndexBy_js_1.default;
var sortedIndexOf_js_1 = sortedIndexOf_1;
exports.sortedIndexOf = sortedIndexOf_js_1.default;
var sortedLastIndex_js_1 = sortedLastIndex_1;
exports.sortedLastIndex = sortedLastIndex_js_1.default;
var sortedLastIndexBy_js_1 = sortedLastIndexBy_1;
exports.sortedLastIndexBy = sortedLastIndexBy_js_1.default;
var sortedLastIndexOf_js_1 = sortedLastIndexOf_1;
exports.sortedLastIndexOf = sortedLastIndexOf_js_1.default;
var sortedUniq_js_1 = sortedUniq_1;
exports.sortedUniq = sortedUniq_js_1.default;
var sortedUniqBy_js_1 = sortedUniqBy_1;
exports.sortedUniqBy = sortedUniqBy_js_1.default;
var tail_js_1 = tail_1;
exports.tail = tail_js_1.default;
var take_js_1 = take_1;
exports.take = take_js_1.default;
var takeRight_js_1 = takeRight_1;
exports.takeRight = takeRight_js_1.default;
var takeRightWhile_js_1 = takeRightWhile_1;
exports.takeRightWhile = takeRightWhile_js_1.default;
var takeWhile_js_1 = takeWhile_1;
exports.takeWhile = takeWhile_js_1.default;
var union_js_1 = union_1;
exports.union = union_js_1.default;
var unionBy_js_1 = unionBy_1;
exports.unionBy = unionBy_js_1.default;
var unionWith_js_1 = unionWith_1;
exports.unionWith = unionWith_js_1.default;
var uniq_js_1 = uniq_1;
exports.uniq = uniq_js_1.default;
var uniqBy_js_1 = uniqBy_1;
exports.uniqBy = uniqBy_js_1.default;
var uniqWith_js_1 = uniqWith_1;
exports.uniqWith = uniqWith_js_1.default;
var unzip_js_1 = unzip_1;
exports.unzip = unzip_js_1.default;
var unzipWith_js_1 = unzipWith_1;
exports.unzipWith = unzipWith_js_1.default;
var without_js_1 = without_1;
exports.without = without_js_1.default;
var xor_js_1 = xor_1;
exports.xor = xor_js_1.default;
var xorBy_js_1 = xorBy_1;
exports.xorBy = xorBy_js_1.default;
var xorWith_js_1 = xorWith_1;
exports.xorWith = xorWith_js_1.default;
var zip_js_1 = zip_1;
exports.zip = zip_js_1.default;
var zipObject_js_1 = zipObject_1;
exports.zipObject = zipObject_js_1.default;
var zipObjectDeep_js_1 = zipObjectDeep_1;
exports.zipObjectDeep = zipObjectDeep_js_1.default;
var zipWith_js_1 = zipWith_1;
exports.zipWith = zipWith_js_1.default;
var array_default_js_1 = array_default;
exports.default = array_default_js_1.default;
});

var collection_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var countBy_js_1 = countBy_1;
var each_js_1 = each;
var eachRight_js_1 = eachRight;
var every_js_1 = every_1;
var filter_js_1 = filter_1;
var find_js_1 = find_1;
var findLast_js_1 = findLast_1;
var flatMap_js_1 = flatMap_1;
var flatMapDeep_js_1 = flatMapDeep_1;
var flatMapDepth_js_1 = flatMapDepth_1;
var forEach_js_1 = forEach_1;
var forEachRight_js_1 = forEachRight_1;
var groupBy_js_1 = groupBy_1;
var includes_js_1 = includes_1;
var invokeMap_js_1 = invokeMap_1;
var keyBy_js_1 = keyBy_1;
var map_js_1 = map_1;
var orderBy_js_1 = orderBy_1;
var partition_js_1 = partition_1;
var reduce_js_1 = reduce_1;
var reduceRight_js_1 = reduceRight_1;
var reject_js_1 = reject_1;
var sample_js_1 = sample_1;
var sampleSize_js_1 = sampleSize_1;
var shuffle_js_1 = shuffle_1;
var size_js_1 = size_1;
var some_js_1 = some_1;
var sortBy_js_1 = sortBy_1;
exports.default = {
    countBy: countBy_js_1.default, each: each_js_1.default, eachRight: eachRight_js_1.default, every: every_js_1.default, filter: filter_js_1.default,
    find: find_js_1.default, findLast: findLast_js_1.default, flatMap: flatMap_js_1.default, flatMapDeep: flatMapDeep_js_1.default, flatMapDepth: flatMapDepth_js_1.default,
    forEach: forEach_js_1.default, forEachRight: forEachRight_js_1.default, groupBy: groupBy_js_1.default, includes: includes_js_1.default, invokeMap: invokeMap_js_1.default,
    keyBy: keyBy_js_1.default, map: map_js_1.default, orderBy: orderBy_js_1.default, partition: partition_js_1.default, reduce: reduce_js_1.default,
    reduceRight: reduceRight_js_1.default, reject: reject_js_1.default, sample: sample_js_1.default, sampleSize: sampleSize_js_1.default, shuffle: shuffle_js_1.default,
    size: size_js_1.default, some: some_js_1.default, sortBy: sortBy_js_1.default
};
});

var collection = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var countBy_js_1 = countBy_1;
exports.countBy = countBy_js_1.default;
var each_js_1 = each;
exports.each = each_js_1.default;
var eachRight_js_1 = eachRight;
exports.eachRight = eachRight_js_1.default;
var every_js_1 = every_1;
exports.every = every_js_1.default;
var filter_js_1 = filter_1;
exports.filter = filter_js_1.default;
var find_js_1 = find_1;
exports.find = find_js_1.default;
var findLast_js_1 = findLast_1;
exports.findLast = findLast_js_1.default;
var flatMap_js_1 = flatMap_1;
exports.flatMap = flatMap_js_1.default;
var flatMapDeep_js_1 = flatMapDeep_1;
exports.flatMapDeep = flatMapDeep_js_1.default;
var flatMapDepth_js_1 = flatMapDepth_1;
exports.flatMapDepth = flatMapDepth_js_1.default;
var forEach_js_1 = forEach_1;
exports.forEach = forEach_js_1.default;
var forEachRight_js_1 = forEachRight_1;
exports.forEachRight = forEachRight_js_1.default;
var groupBy_js_1 = groupBy_1;
exports.groupBy = groupBy_js_1.default;
var includes_js_1 = includes_1;
exports.includes = includes_js_1.default;
var invokeMap_js_1 = invokeMap_1;
exports.invokeMap = invokeMap_js_1.default;
var keyBy_js_1 = keyBy_1;
exports.keyBy = keyBy_js_1.default;
var map_js_1 = map_1;
exports.map = map_js_1.default;
var orderBy_js_1 = orderBy_1;
exports.orderBy = orderBy_js_1.default;
var partition_js_1 = partition_1;
exports.partition = partition_js_1.default;
var reduce_js_1 = reduce_1;
exports.reduce = reduce_js_1.default;
var reduceRight_js_1 = reduceRight_1;
exports.reduceRight = reduceRight_js_1.default;
var reject_js_1 = reject_1;
exports.reject = reject_js_1.default;
var sample_js_1 = sample_1;
exports.sample = sample_js_1.default;
var sampleSize_js_1 = sampleSize_1;
exports.sampleSize = sampleSize_js_1.default;
var shuffle_js_1 = shuffle_1;
exports.shuffle = shuffle_js_1.default;
var size_js_1 = size_1;
exports.size = size_js_1.default;
var some_js_1 = some_1;
exports.some = some_js_1.default;
var sortBy_js_1 = sortBy_1;
exports.sortBy = sortBy_js_1.default;
var collection_default_js_1 = collection_default;
exports.default = collection_default_js_1.default;
});

var date_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var now_js_1 = now_1;
exports.default = {
    now: now_js_1.default
};
});

var date = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var now_js_1 = now_1;
exports.now = now_js_1.default;
var date_default_js_1 = date_default;
exports.default = date_default_js_1.default;
});

var function_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var after_js_1 = after_1;
var ary_js_1 = ary_1;
var before_js_1 = before_1;
var bind_js_1 = bind_1;
var bindKey_js_1 = bindKey_1;
var curry_js_1 = curry_1;
var curryRight_js_1 = curryRight_1;
var debounce_js_1 = debounce_1;
var defer_js_1 = defer_1;
var delay_js_1 = delay_1;
var flip_js_1 = flip_1;
var memoize_js_1 = memoize_1;
var negate_js_1 = negate_1;
var once_js_1 = once_1;
var overArgs_js_1 = overArgs_1;
var partial_js_1 = partial_1;
var partialRight_js_1 = partialRight_1;
var rearg_js_1 = rearg_1;
var rest_js_1 = rest_1;
var spread_js_1 = spread_1;
var throttle_js_1 = throttle_1;
var unary_js_1 = unary_1;
var wrap_js_1 = wrap_1;
exports.default = {
    after: after_js_1.default, ary: ary_js_1.default, before: before_js_1.default, bind: bind_js_1.default, bindKey: bindKey_js_1.default,
    curry: curry_js_1.default, curryRight: curryRight_js_1.default, debounce: debounce_js_1.default, defer: defer_js_1.default, delay: delay_js_1.default,
    flip: flip_js_1.default, memoize: memoize_js_1.default, negate: negate_js_1.default, once: once_js_1.default, overArgs: overArgs_js_1.default,
    partial: partial_js_1.default, partialRight: partialRight_js_1.default, rearg: rearg_js_1.default, rest: rest_js_1.default, spread: spread_js_1.default,
    throttle: throttle_js_1.default, unary: unary_js_1.default, wrap: wrap_js_1.default
};
});

var _function = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var after_js_1 = after_1;
exports.after = after_js_1.default;
var ary_js_1 = ary_1;
exports.ary = ary_js_1.default;
var before_js_1 = before_1;
exports.before = before_js_1.default;
var bind_js_1 = bind_1;
exports.bind = bind_js_1.default;
var bindKey_js_1 = bindKey_1;
exports.bindKey = bindKey_js_1.default;
var curry_js_1 = curry_1;
exports.curry = curry_js_1.default;
var curryRight_js_1 = curryRight_1;
exports.curryRight = curryRight_js_1.default;
var debounce_js_1 = debounce_1;
exports.debounce = debounce_js_1.default;
var defer_js_1 = defer_1;
exports.defer = defer_js_1.default;
var delay_js_1 = delay_1;
exports.delay = delay_js_1.default;
var flip_js_1 = flip_1;
exports.flip = flip_js_1.default;
var memoize_js_1 = memoize_1;
exports.memoize = memoize_js_1.default;
var negate_js_1 = negate_1;
exports.negate = negate_js_1.default;
var once_js_1 = once_1;
exports.once = once_js_1.default;
var overArgs_js_1 = overArgs_1;
exports.overArgs = overArgs_js_1.default;
var partial_js_1 = partial_1;
exports.partial = partial_js_1.default;
var partialRight_js_1 = partialRight_1;
exports.partialRight = partialRight_js_1.default;
var rearg_js_1 = rearg_1;
exports.rearg = rearg_js_1.default;
var rest_js_1 = rest_1;
exports.rest = rest_js_1.default;
var spread_js_1 = spread_1;
exports.spread = spread_js_1.default;
var throttle_js_1 = throttle_1;
exports.throttle = throttle_js_1.default;
var unary_js_1 = unary_1;
exports.unary = unary_js_1.default;
var wrap_js_1 = wrap_1;
exports.wrap = wrap_js_1.default;
var function_default_js_1 = function_default;
exports.default = function_default_js_1.default;
});

var lang_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var castArray_js_1 = castArray_1;
var clone_js_1 = clone_1;
var cloneDeep_js_1 = cloneDeep_1;
var cloneDeepWith_js_1 = cloneDeepWith_1;
var cloneWith_js_1 = cloneWith_1;
var conformsTo_js_1 = conformsTo_1;
var eq_js_1 = eq_1;
var gt_js_1 = gt_1;
var gte_js_1 = gte_1;
var isArguments_js_1 = isArguments_1;
var isArray_js_1 = isArray_1;
var isArrayBuffer_js_1 = isArrayBuffer_1;
var isArrayLike_js_1 = isArrayLike_1;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
var isBoolean_js_1 = isBoolean_1;
var isBuffer_js_1 = isBuffer_1;
var isDate_js_1 = isDate_1;
var isElement_js_1 = isElement_1;
var isEmpty_js_1 = isEmpty_1;
var isEqual_js_1 = isEqual_1;
var isEqualWith_js_1 = isEqualWith_1;
var isError_js_1 = isError_1;
var isFinite_js_1 = _isFinite;
var isFunction_js_1 = isFunction_1;
var isInteger_js_1 = isInteger_1;
var isLength_js_1 = isLength_1;
var isMap_js_1 = isMap_1;
var isMatch_js_1 = isMatch_1;
var isMatchWith_js_1 = isMatchWith_1;
var isNaN_js_1 = _isNaN;
var isNative_js_1 = isNative_1;
var isNil_js_1 = isNil_1;
var isNull_js_1 = isNull_1;
var isNumber_js_1 = isNumber_1;
var isObject_js_1 = isObject_1;
var isObjectLike_js_1 = isObjectLike_1;
var isPlainObject_js_1 = isPlainObject_1;
var isRegExp_js_1 = isRegExp_1;
var isSafeInteger_js_1 = isSafeInteger_1;
var isSet_js_1 = isSet_1;
var isString_js_1 = isString_1;
var isSymbol_js_1 = isSymbol_1;
var isTypedArray_js_1 = isTypedArray_1;
var isUndefined_js_1 = isUndefined_1;
var isWeakMap_js_1 = isWeakMap_1;
var isWeakSet_js_1 = isWeakSet_1;
var lt_js_1 = lt_1;
var lte_js_1 = lte_1;
var toArray_js_1 = toArray_1;
var toFinite_js_1 = toFinite_1;
var toInteger_js_1 = toInteger_1;
var toLength_js_1 = toLength_1;
var toNumber_js_1 = toNumber_1;
var toPlainObject_js_1 = toPlainObject_1;
var toSafeInteger_js_1 = toSafeInteger_1;
var toString_js_1 = toString_1;
exports.default = {
    castArray: castArray_js_1.default, clone: clone_js_1.default, cloneDeep: cloneDeep_js_1.default, cloneDeepWith: cloneDeepWith_js_1.default, cloneWith: cloneWith_js_1.default,
    conformsTo: conformsTo_js_1.default, eq: eq_js_1.default, gt: gt_js_1.default, gte: gte_js_1.default, isArguments: isArguments_js_1.default,
    isArray: isArray_js_1.default, isArrayBuffer: isArrayBuffer_js_1.default, isArrayLike: isArrayLike_js_1.default, isArrayLikeObject: isArrayLikeObject_js_1.default, isBoolean: isBoolean_js_1.default,
    isBuffer: isBuffer_js_1.default, isDate: isDate_js_1.default, isElement: isElement_js_1.default, isEmpty: isEmpty_js_1.default, isEqual: isEqual_js_1.default,
    isEqualWith: isEqualWith_js_1.default, isError: isError_js_1.default, isFinite: isFinite_js_1.default, isFunction: isFunction_js_1.default, isInteger: isInteger_js_1.default,
    isLength: isLength_js_1.default, isMap: isMap_js_1.default, isMatch: isMatch_js_1.default, isMatchWith: isMatchWith_js_1.default, isNaN: isNaN_js_1.default,
    isNative: isNative_js_1.default, isNil: isNil_js_1.default, isNull: isNull_js_1.default, isNumber: isNumber_js_1.default, isObject: isObject_js_1.default,
    isObjectLike: isObjectLike_js_1.default, isPlainObject: isPlainObject_js_1.default, isRegExp: isRegExp_js_1.default, isSafeInteger: isSafeInteger_js_1.default, isSet: isSet_js_1.default,
    isString: isString_js_1.default, isSymbol: isSymbol_js_1.default, isTypedArray: isTypedArray_js_1.default, isUndefined: isUndefined_js_1.default, isWeakMap: isWeakMap_js_1.default,
    isWeakSet: isWeakSet_js_1.default, lt: lt_js_1.default, lte: lte_js_1.default, toArray: toArray_js_1.default, toFinite: toFinite_js_1.default,
    toInteger: toInteger_js_1.default, toLength: toLength_js_1.default, toNumber: toNumber_js_1.default, toPlainObject: toPlainObject_js_1.default, toSafeInteger: toSafeInteger_js_1.default,
    toString: toString_js_1.default
};
});

var lang = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var castArray_js_1 = castArray_1;
exports.castArray = castArray_js_1.default;
var clone_js_1 = clone_1;
exports.clone = clone_js_1.default;
var cloneDeep_js_1 = cloneDeep_1;
exports.cloneDeep = cloneDeep_js_1.default;
var cloneDeepWith_js_1 = cloneDeepWith_1;
exports.cloneDeepWith = cloneDeepWith_js_1.default;
var cloneWith_js_1 = cloneWith_1;
exports.cloneWith = cloneWith_js_1.default;
var conformsTo_js_1 = conformsTo_1;
exports.conformsTo = conformsTo_js_1.default;
var eq_js_1 = eq_1;
exports.eq = eq_js_1.default;
var gt_js_1 = gt_1;
exports.gt = gt_js_1.default;
var gte_js_1 = gte_1;
exports.gte = gte_js_1.default;
var isArguments_js_1 = isArguments_1;
exports.isArguments = isArguments_js_1.default;
var isArray_js_1 = isArray_1;
exports.isArray = isArray_js_1.default;
var isArrayBuffer_js_1 = isArrayBuffer_1;
exports.isArrayBuffer = isArrayBuffer_js_1.default;
var isArrayLike_js_1 = isArrayLike_1;
exports.isArrayLike = isArrayLike_js_1.default;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
exports.isArrayLikeObject = isArrayLikeObject_js_1.default;
var isBoolean_js_1 = isBoolean_1;
exports.isBoolean = isBoolean_js_1.default;
var isBuffer_js_1 = isBuffer_1;
exports.isBuffer = isBuffer_js_1.default;
var isDate_js_1 = isDate_1;
exports.isDate = isDate_js_1.default;
var isElement_js_1 = isElement_1;
exports.isElement = isElement_js_1.default;
var isEmpty_js_1 = isEmpty_1;
exports.isEmpty = isEmpty_js_1.default;
var isEqual_js_1 = isEqual_1;
exports.isEqual = isEqual_js_1.default;
var isEqualWith_js_1 = isEqualWith_1;
exports.isEqualWith = isEqualWith_js_1.default;
var isError_js_1 = isError_1;
exports.isError = isError_js_1.default;
var isFinite_js_1 = _isFinite;
exports.isFinite = isFinite_js_1.default;
var isFunction_js_1 = isFunction_1;
exports.isFunction = isFunction_js_1.default;
var isInteger_js_1 = isInteger_1;
exports.isInteger = isInteger_js_1.default;
var isLength_js_1 = isLength_1;
exports.isLength = isLength_js_1.default;
var isMap_js_1 = isMap_1;
exports.isMap = isMap_js_1.default;
var isMatch_js_1 = isMatch_1;
exports.isMatch = isMatch_js_1.default;
var isMatchWith_js_1 = isMatchWith_1;
exports.isMatchWith = isMatchWith_js_1.default;
var isNaN_js_1 = _isNaN;
exports.isNaN = isNaN_js_1.default;
var isNative_js_1 = isNative_1;
exports.isNative = isNative_js_1.default;
var isNil_js_1 = isNil_1;
exports.isNil = isNil_js_1.default;
var isNull_js_1 = isNull_1;
exports.isNull = isNull_js_1.default;
var isNumber_js_1 = isNumber_1;
exports.isNumber = isNumber_js_1.default;
var isObject_js_1 = isObject_1;
exports.isObject = isObject_js_1.default;
var isObjectLike_js_1 = isObjectLike_1;
exports.isObjectLike = isObjectLike_js_1.default;
var isPlainObject_js_1 = isPlainObject_1;
exports.isPlainObject = isPlainObject_js_1.default;
var isRegExp_js_1 = isRegExp_1;
exports.isRegExp = isRegExp_js_1.default;
var isSafeInteger_js_1 = isSafeInteger_1;
exports.isSafeInteger = isSafeInteger_js_1.default;
var isSet_js_1 = isSet_1;
exports.isSet = isSet_js_1.default;
var isString_js_1 = isString_1;
exports.isString = isString_js_1.default;
var isSymbol_js_1 = isSymbol_1;
exports.isSymbol = isSymbol_js_1.default;
var isTypedArray_js_1 = isTypedArray_1;
exports.isTypedArray = isTypedArray_js_1.default;
var isUndefined_js_1 = isUndefined_1;
exports.isUndefined = isUndefined_js_1.default;
var isWeakMap_js_1 = isWeakMap_1;
exports.isWeakMap = isWeakMap_js_1.default;
var isWeakSet_js_1 = isWeakSet_1;
exports.isWeakSet = isWeakSet_js_1.default;
var lt_js_1 = lt_1;
exports.lt = lt_js_1.default;
var lte_js_1 = lte_1;
exports.lte = lte_js_1.default;
var toArray_js_1 = toArray_1;
exports.toArray = toArray_js_1.default;
var toFinite_js_1 = toFinite_1;
exports.toFinite = toFinite_js_1.default;
var toInteger_js_1 = toInteger_1;
exports.toInteger = toInteger_js_1.default;
var toLength_js_1 = toLength_1;
exports.toLength = toLength_js_1.default;
var toNumber_js_1 = toNumber_1;
exports.toNumber = toNumber_js_1.default;
var toPlainObject_js_1 = toPlainObject_1;
exports.toPlainObject = toPlainObject_js_1.default;
var toSafeInteger_js_1 = toSafeInteger_1;
exports.toSafeInteger = toSafeInteger_js_1.default;
var toString_js_1 = toString_1;
exports.toString = toString_js_1.default;
var lang_default_js_1 = lang_default;
exports.default = lang_default_js_1.default;
});

var math_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_js_1 = add_1;
var ceil_js_1 = ceil_1;
var divide_js_1 = divide_1;
var floor_js_1 = floor_1;
var max_js_1 = max_1;
var maxBy_js_1 = maxBy_1;
var mean_js_1 = mean_1;
var meanBy_js_1 = meanBy_1;
var min_js_1 = min_1;
var minBy_js_1 = minBy_1;
var multiply_js_1 = multiply_1;
var round_js_1 = round_1;
var subtract_js_1 = subtract_1;
var sum_js_1 = sum_1;
var sumBy_js_1 = sumBy_1;
exports.default = {
    add: add_js_1.default, ceil: ceil_js_1.default, divide: divide_js_1.default, floor: floor_js_1.default, max: max_js_1.default,
    maxBy: maxBy_js_1.default, mean: mean_js_1.default, meanBy: meanBy_js_1.default, min: min_js_1.default, minBy: minBy_js_1.default,
    multiply: multiply_js_1.default, round: round_js_1.default, subtract: subtract_js_1.default, sum: sum_js_1.default, sumBy: sumBy_js_1.default
};
});

var math = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_js_1 = add_1;
exports.add = add_js_1.default;
var ceil_js_1 = ceil_1;
exports.ceil = ceil_js_1.default;
var divide_js_1 = divide_1;
exports.divide = divide_js_1.default;
var floor_js_1 = floor_1;
exports.floor = floor_js_1.default;
var max_js_1 = max_1;
exports.max = max_js_1.default;
var maxBy_js_1 = maxBy_1;
exports.maxBy = maxBy_js_1.default;
var mean_js_1 = mean_1;
exports.mean = mean_js_1.default;
var meanBy_js_1 = meanBy_1;
exports.meanBy = meanBy_js_1.default;
var min_js_1 = min_1;
exports.min = min_js_1.default;
var minBy_js_1 = minBy_1;
exports.minBy = minBy_js_1.default;
var multiply_js_1 = multiply_1;
exports.multiply = multiply_js_1.default;
var round_js_1 = round_1;
exports.round = round_js_1.default;
var subtract_js_1 = subtract_1;
exports.subtract = subtract_js_1.default;
var sum_js_1 = sum_1;
exports.sum = sum_js_1.default;
var sumBy_js_1 = sumBy_1;
exports.sumBy = sumBy_js_1.default;
var math_default_js_1 = math_default;
exports.default = math_default_js_1.default;
});

var number_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clamp_js_1 = clamp_1;
var inRange_js_1 = inRange_1;
var random_js_1 = random_1;
exports.default = {
    clamp: clamp_js_1.default, inRange: inRange_js_1.default, random: random_js_1.default
};
});

var number = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clamp_js_1 = clamp_1;
exports.clamp = clamp_js_1.default;
var inRange_js_1 = inRange_1;
exports.inRange = inRange_js_1.default;
var random_js_1 = random_1;
exports.random = random_js_1.default;
var number_default_js_1 = number_default;
exports.default = number_default_js_1.default;
});

var object_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assign_js_1 = assign_1;
var assignIn_js_1 = assignIn_1;
var assignInWith_js_1 = assignInWith_1;
var assignWith_js_1 = assignWith_1;
var at_js_1 = at_1;
var create_js_1 = create_1;
var defaults_js_1 = defaults_1;
var defaultsDeep_js_1 = defaultsDeep_1;
var entries_js_1 = entries;
var entriesIn_js_1 = entriesIn;
var extend_js_1 = extend;
var extendWith_js_1 = extendWith;
var findKey_js_1 = findKey_1;
var findLastKey_js_1 = findLastKey_1;
var forIn_js_1 = forIn_1;
var forInRight_js_1 = forInRight_1;
var forOwn_js_1 = forOwn_1;
var forOwnRight_js_1 = forOwnRight_1;
var functions_js_1 = functions_1;
var functionsIn_js_1 = functionsIn_1;
var get_js_1 = get_1;
var has_js_1 = has_1;
var hasIn_js_1 = hasIn_1;
var invert_js_1 = invert_1;
var invertBy_js_1 = invertBy_1;
var invoke_js_1 = invoke_1;
var keys_js_1 = keys_1;
var keysIn_js_1 = keysIn_1;
var mapKeys_js_1 = mapKeys_1;
var mapValues_js_1 = mapValues_1;
var merge_js_1 = merge_1;
var mergeWith_js_1 = mergeWith_1;
var omit_js_1 = omit_1;
var omitBy_js_1 = omitBy_1;
var pick_js_1 = pick_1;
var pickBy_js_1 = pickBy_1;
var result_js_1 = result_1;
var set_js_1 = set_1;
var setWith_js_1 = setWith_1;
var toPairs_js_1 = toPairs_1;
var toPairsIn_js_1 = toPairsIn_1;
var transform_js_1 = transform_1;
var unset_js_1 = unset_1;
var update_js_1 = update_1;
var updateWith_js_1 = updateWith_1;
var values_js_1 = values_1;
var valuesIn_js_1 = valuesIn_1;
exports.default = {
    assign: assign_js_1.default, assignIn: assignIn_js_1.default, assignInWith: assignInWith_js_1.default, assignWith: assignWith_js_1.default, at: at_js_1.default,
    create: create_js_1.default, defaults: defaults_js_1.default, defaultsDeep: defaultsDeep_js_1.default, entries: entries_js_1.default, entriesIn: entriesIn_js_1.default,
    extend: extend_js_1.default, extendWith: extendWith_js_1.default, findKey: findKey_js_1.default, findLastKey: findLastKey_js_1.default, forIn: forIn_js_1.default,
    forInRight: forInRight_js_1.default, forOwn: forOwn_js_1.default, forOwnRight: forOwnRight_js_1.default, functions: functions_js_1.default, functionsIn: functionsIn_js_1.default,
    get: get_js_1.default, has: has_js_1.default, hasIn: hasIn_js_1.default, invert: invert_js_1.default, invertBy: invertBy_js_1.default,
    invoke: invoke_js_1.default, keys: keys_js_1.default, keysIn: keysIn_js_1.default, mapKeys: mapKeys_js_1.default, mapValues: mapValues_js_1.default,
    merge: merge_js_1.default, mergeWith: mergeWith_js_1.default, omit: omit_js_1.default, omitBy: omitBy_js_1.default, pick: pick_js_1.default,
    pickBy: pickBy_js_1.default, result: result_js_1.default, set: set_js_1.default, setWith: setWith_js_1.default, toPairs: toPairs_js_1.default,
    toPairsIn: toPairsIn_js_1.default, transform: transform_js_1.default, unset: unset_js_1.default, update: update_js_1.default, updateWith: updateWith_js_1.default,
    values: values_js_1.default, valuesIn: valuesIn_js_1.default
};
});

var object = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assign_js_1 = assign_1;
exports.assign = assign_js_1.default;
var assignIn_js_1 = assignIn_1;
exports.assignIn = assignIn_js_1.default;
var assignInWith_js_1 = assignInWith_1;
exports.assignInWith = assignInWith_js_1.default;
var assignWith_js_1 = assignWith_1;
exports.assignWith = assignWith_js_1.default;
var at_js_1 = at_1;
exports.at = at_js_1.default;
var create_js_1 = create_1;
exports.create = create_js_1.default;
var defaults_js_1 = defaults_1;
exports.defaults = defaults_js_1.default;
var defaultsDeep_js_1 = defaultsDeep_1;
exports.defaultsDeep = defaultsDeep_js_1.default;
var entries_js_1 = entries;
exports.entries = entries_js_1.default;
var entriesIn_js_1 = entriesIn;
exports.entriesIn = entriesIn_js_1.default;
var extend_js_1 = extend;
exports.extend = extend_js_1.default;
var extendWith_js_1 = extendWith;
exports.extendWith = extendWith_js_1.default;
var findKey_js_1 = findKey_1;
exports.findKey = findKey_js_1.default;
var findLastKey_js_1 = findLastKey_1;
exports.findLastKey = findLastKey_js_1.default;
var forIn_js_1 = forIn_1;
exports.forIn = forIn_js_1.default;
var forInRight_js_1 = forInRight_1;
exports.forInRight = forInRight_js_1.default;
var forOwn_js_1 = forOwn_1;
exports.forOwn = forOwn_js_1.default;
var forOwnRight_js_1 = forOwnRight_1;
exports.forOwnRight = forOwnRight_js_1.default;
var functions_js_1 = functions_1;
exports.functions = functions_js_1.default;
var functionsIn_js_1 = functionsIn_1;
exports.functionsIn = functionsIn_js_1.default;
var get_js_1 = get_1;
exports.get = get_js_1.default;
var has_js_1 = has_1;
exports.has = has_js_1.default;
var hasIn_js_1 = hasIn_1;
exports.hasIn = hasIn_js_1.default;
var invert_js_1 = invert_1;
exports.invert = invert_js_1.default;
var invertBy_js_1 = invertBy_1;
exports.invertBy = invertBy_js_1.default;
var invoke_js_1 = invoke_1;
exports.invoke = invoke_js_1.default;
var keys_js_1 = keys_1;
exports.keys = keys_js_1.default;
var keysIn_js_1 = keysIn_1;
exports.keysIn = keysIn_js_1.default;
var mapKeys_js_1 = mapKeys_1;
exports.mapKeys = mapKeys_js_1.default;
var mapValues_js_1 = mapValues_1;
exports.mapValues = mapValues_js_1.default;
var merge_js_1 = merge_1;
exports.merge = merge_js_1.default;
var mergeWith_js_1 = mergeWith_1;
exports.mergeWith = mergeWith_js_1.default;
var omit_js_1 = omit_1;
exports.omit = omit_js_1.default;
var omitBy_js_1 = omitBy_1;
exports.omitBy = omitBy_js_1.default;
var pick_js_1 = pick_1;
exports.pick = pick_js_1.default;
var pickBy_js_1 = pickBy_1;
exports.pickBy = pickBy_js_1.default;
var result_js_1 = result_1;
exports.result = result_js_1.default;
var set_js_1 = set_1;
exports.set = set_js_1.default;
var setWith_js_1 = setWith_1;
exports.setWith = setWith_js_1.default;
var toPairs_js_1 = toPairs_1;
exports.toPairs = toPairs_js_1.default;
var toPairsIn_js_1 = toPairsIn_1;
exports.toPairsIn = toPairsIn_js_1.default;
var transform_js_1 = transform_1;
exports.transform = transform_js_1.default;
var unset_js_1 = unset_1;
exports.unset = unset_js_1.default;
var update_js_1 = update_1;
exports.update = update_js_1.default;
var updateWith_js_1 = updateWith_1;
exports.updateWith = updateWith_js_1.default;
var values_js_1 = values_1;
exports.values = values_js_1.default;
var valuesIn_js_1 = valuesIn_1;
exports.valuesIn = valuesIn_js_1.default;
var object_default_js_1 = object_default;
exports.default = object_default_js_1.default;
});

var seq_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperAt_js_1 = wrapperAt_1;
var chain_js_1 = chain_1;
var commit_js_1 = commit;
var wrapperLodash_js_1 = wrapperLodash;
var next_js_1 = next;
var plant_js_1 = plant;
var wrapperReverse_js_1 = wrapperReverse_1;
var tap_js_1 = tap_1;
var thru_js_1 = thru_1;
var toIterator_js_1 = toIterator;
var toJSON_js_1 = toJSON;
var wrapperValue_js_1 = wrapperValue_1;
var valueOf_js_1 = valueOf_1;
var wrapperChain_js_1 = wrapperChain_1;
exports.default = {
    at: wrapperAt_js_1.default, chain: chain_js_1.default, commit: commit_js_1.default, lodash: wrapperLodash_js_1.default, next: next_js_1.default,
    plant: plant_js_1.default, reverse: wrapperReverse_js_1.default, tap: tap_js_1.default, thru: thru_js_1.default, toIterator: toIterator_js_1.default,
    toJSON: toJSON_js_1.default, value: wrapperValue_js_1.default, valueOf: valueOf_js_1.default, wrapperChain: wrapperChain_js_1.default
};
});

var seq = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapperAt_js_1 = wrapperAt_1;
exports.at = wrapperAt_js_1.default;
var chain_js_1 = chain_1;
exports.chain = chain_js_1.default;
var commit_js_1 = commit;
exports.commit = commit_js_1.default;
var wrapperLodash_js_1 = wrapperLodash;
exports.lodash = wrapperLodash_js_1.default;
var next_js_1 = next;
exports.next = next_js_1.default;
var plant_js_1 = plant;
exports.plant = plant_js_1.default;
var wrapperReverse_js_1 = wrapperReverse_1;
exports.reverse = wrapperReverse_js_1.default;
var tap_js_1 = tap_1;
exports.tap = tap_js_1.default;
var thru_js_1 = thru_1;
exports.thru = thru_js_1.default;
var toIterator_js_1 = toIterator;
exports.toIterator = toIterator_js_1.default;
var toJSON_js_1 = toJSON;
exports.toJSON = toJSON_js_1.default;
var wrapperValue_js_1 = wrapperValue_1;
exports.value = wrapperValue_js_1.default;
var valueOf_js_1 = valueOf_1;
exports.valueOf = valueOf_js_1.default;
var wrapperChain_js_1 = wrapperChain_1;
exports.wrapperChain = wrapperChain_js_1.default;
var seq_default_js_1 = seq_default;
exports.default = seq_default_js_1.default;
});

var string_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase_js_1 = camelCase_1;
var capitalize_js_1 = capitalize_1;
var deburr_js_1 = deburr_1;
var endsWith_js_1 = endsWith_1;
var escape_js_1 = _escape;
var escapeRegExp_js_1 = escapeRegExp_1;
var kebabCase_js_1 = kebabCase_1;
var lowerCase_js_1 = lowerCase_1;
var lowerFirst_js_1 = lowerFirst_1;
var pad_js_1 = pad_1;
var padEnd_js_1 = padEnd_1;
var padStart_js_1 = padStart_1;
var parseInt_js_1 = _parseInt;
var repeat_js_1 = repeat_1;
var replace_js_1 = replace_1;
var snakeCase_js_1 = snakeCase_1;
var split_js_1 = split_1;
var startCase_js_1 = startCase_1;
var startsWith_js_1 = startsWith_1;
var template_js_1 = template_1;
var templateSettings_js_1 = templateSettings_1;
var toLower_js_1 = toLower_1;
var toUpper_js_1 = toUpper_1;
var trim_js_1 = trim_1;
var trimEnd_js_1 = trimEnd_1;
var trimStart_js_1 = trimStart_1;
var truncate_js_1 = truncate_1;
var unescape_js_1 = _unescape;
var upperCase_js_1 = upperCase_1;
var upperFirst_js_1 = upperFirst_1;
var words_js_1 = words_1;
exports.default = {
    camelCase: camelCase_js_1.default, capitalize: capitalize_js_1.default, deburr: deburr_js_1.default, endsWith: endsWith_js_1.default, escape: escape_js_1.default,
    escapeRegExp: escapeRegExp_js_1.default, kebabCase: kebabCase_js_1.default, lowerCase: lowerCase_js_1.default, lowerFirst: lowerFirst_js_1.default, pad: pad_js_1.default,
    padEnd: padEnd_js_1.default, padStart: padStart_js_1.default, parseInt: parseInt_js_1.default, repeat: repeat_js_1.default, replace: replace_js_1.default,
    snakeCase: snakeCase_js_1.default, split: split_js_1.default, startCase: startCase_js_1.default, startsWith: startsWith_js_1.default, template: template_js_1.default,
    templateSettings: templateSettings_js_1.default, toLower: toLower_js_1.default, toUpper: toUpper_js_1.default, trim: trim_js_1.default, trimEnd: trimEnd_js_1.default,
    trimStart: trimStart_js_1.default, truncate: truncate_js_1.default, unescape: unescape_js_1.default, upperCase: upperCase_js_1.default, upperFirst: upperFirst_js_1.default,
    words: words_js_1.default
};
});

var string = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelCase_js_1 = camelCase_1;
exports.camelCase = camelCase_js_1.default;
var capitalize_js_1 = capitalize_1;
exports.capitalize = capitalize_js_1.default;
var deburr_js_1 = deburr_1;
exports.deburr = deburr_js_1.default;
var endsWith_js_1 = endsWith_1;
exports.endsWith = endsWith_js_1.default;
var escape_js_1 = _escape;
exports.escape = escape_js_1.default;
var escapeRegExp_js_1 = escapeRegExp_1;
exports.escapeRegExp = escapeRegExp_js_1.default;
var kebabCase_js_1 = kebabCase_1;
exports.kebabCase = kebabCase_js_1.default;
var lowerCase_js_1 = lowerCase_1;
exports.lowerCase = lowerCase_js_1.default;
var lowerFirst_js_1 = lowerFirst_1;
exports.lowerFirst = lowerFirst_js_1.default;
var pad_js_1 = pad_1;
exports.pad = pad_js_1.default;
var padEnd_js_1 = padEnd_1;
exports.padEnd = padEnd_js_1.default;
var padStart_js_1 = padStart_1;
exports.padStart = padStart_js_1.default;
var parseInt_js_1 = _parseInt;
exports.parseInt = parseInt_js_1.default;
var repeat_js_1 = repeat_1;
exports.repeat = repeat_js_1.default;
var replace_js_1 = replace_1;
exports.replace = replace_js_1.default;
var snakeCase_js_1 = snakeCase_1;
exports.snakeCase = snakeCase_js_1.default;
var split_js_1 = split_1;
exports.split = split_js_1.default;
var startCase_js_1 = startCase_1;
exports.startCase = startCase_js_1.default;
var startsWith_js_1 = startsWith_1;
exports.startsWith = startsWith_js_1.default;
var template_js_1 = template_1;
exports.template = template_js_1.default;
var templateSettings_js_1 = templateSettings_1;
exports.templateSettings = templateSettings_js_1.default;
var toLower_js_1 = toLower_1;
exports.toLower = toLower_js_1.default;
var toUpper_js_1 = toUpper_1;
exports.toUpper = toUpper_js_1.default;
var trim_js_1 = trim_1;
exports.trim = trim_js_1.default;
var trimEnd_js_1 = trimEnd_1;
exports.trimEnd = trimEnd_js_1.default;
var trimStart_js_1 = trimStart_1;
exports.trimStart = trimStart_js_1.default;
var truncate_js_1 = truncate_1;
exports.truncate = truncate_js_1.default;
var unescape_js_1 = _unescape;
exports.unescape = unescape_js_1.default;
var upperCase_js_1 = upperCase_1;
exports.upperCase = upperCase_js_1.default;
var upperFirst_js_1 = upperFirst_1;
exports.upperFirst = upperFirst_js_1.default;
var words_js_1 = words_1;
exports.words = words_js_1.default;
var string_default_js_1 = string_default;
exports.default = string_default_js_1.default;
});

var util_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attempt_js_1 = attempt_1;
var bindAll_js_1 = bindAll_1;
var cond_js_1 = cond_1;
var conforms_js_1 = conforms_1;
var constant_js_1 = constant_1;
var defaultTo_js_1 = defaultTo_1;
var flow_js_1 = flow_1;
var flowRight_js_1 = flowRight_1;
var identity_js_1 = identity_1;
var iteratee_js_1 = iteratee_1;
var matches_js_1 = matches_1;
var matchesProperty_js_1 = matchesProperty_1;
var method_js_1 = method_1;
var methodOf_js_1 = methodOf_1;
var mixin_js_1 = mixin_1;
var noop_js_1 = noop_1;
var nthArg_js_1 = nthArg_1;
var over_js_1 = over_1;
var overEvery_js_1 = overEvery_1;
var overSome_js_1 = overSome_1;
var property_js_1 = property_1;
var propertyOf_js_1 = propertyOf_1;
var range_js_1 = range_1;
var rangeRight_js_1 = rangeRight_1;
var stubArray_js_1 = stubArray_1;
var stubFalse_js_1 = stubFalse_1;
var stubObject_js_1 = stubObject_1;
var stubString_js_1 = stubString_1;
var stubTrue_js_1 = stubTrue_1;
var times_js_1 = times_1;
var toPath_js_1 = toPath_1;
var uniqueId_js_1 = uniqueId_1;
exports.default = {
    attempt: attempt_js_1.default, bindAll: bindAll_js_1.default, cond: cond_js_1.default, conforms: conforms_js_1.default, constant: constant_js_1.default,
    defaultTo: defaultTo_js_1.default, flow: flow_js_1.default, flowRight: flowRight_js_1.default, identity: identity_js_1.default, iteratee: iteratee_js_1.default,
    matches: matches_js_1.default, matchesProperty: matchesProperty_js_1.default, method: method_js_1.default, methodOf: methodOf_js_1.default, mixin: mixin_js_1.default,
    noop: noop_js_1.default, nthArg: nthArg_js_1.default, over: over_js_1.default, overEvery: overEvery_js_1.default, overSome: overSome_js_1.default,
    property: property_js_1.default, propertyOf: propertyOf_js_1.default, range: range_js_1.default, rangeRight: rangeRight_js_1.default, stubArray: stubArray_js_1.default,
    stubFalse: stubFalse_js_1.default, stubObject: stubObject_js_1.default, stubString: stubString_js_1.default, stubTrue: stubTrue_js_1.default, times: times_js_1.default,
    toPath: toPath_js_1.default, uniqueId: uniqueId_js_1.default
};
});

var util = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attempt_js_1 = attempt_1;
exports.attempt = attempt_js_1.default;
var bindAll_js_1 = bindAll_1;
exports.bindAll = bindAll_js_1.default;
var cond_js_1 = cond_1;
exports.cond = cond_js_1.default;
var conforms_js_1 = conforms_1;
exports.conforms = conforms_js_1.default;
var constant_js_1 = constant_1;
exports.constant = constant_js_1.default;
var defaultTo_js_1 = defaultTo_1;
exports.defaultTo = defaultTo_js_1.default;
var flow_js_1 = flow_1;
exports.flow = flow_js_1.default;
var flowRight_js_1 = flowRight_1;
exports.flowRight = flowRight_js_1.default;
var identity_js_1 = identity_1;
exports.identity = identity_js_1.default;
var iteratee_js_1 = iteratee_1;
exports.iteratee = iteratee_js_1.default;
var matches_js_1 = matches_1;
exports.matches = matches_js_1.default;
var matchesProperty_js_1 = matchesProperty_1;
exports.matchesProperty = matchesProperty_js_1.default;
var method_js_1 = method_1;
exports.method = method_js_1.default;
var methodOf_js_1 = methodOf_1;
exports.methodOf = methodOf_js_1.default;
var mixin_js_1 = mixin_1;
exports.mixin = mixin_js_1.default;
var noop_js_1 = noop_1;
exports.noop = noop_js_1.default;
var nthArg_js_1 = nthArg_1;
exports.nthArg = nthArg_js_1.default;
var over_js_1 = over_1;
exports.over = over_js_1.default;
var overEvery_js_1 = overEvery_1;
exports.overEvery = overEvery_js_1.default;
var overSome_js_1 = overSome_1;
exports.overSome = overSome_js_1.default;
var property_js_1 = property_1;
exports.property = property_js_1.default;
var propertyOf_js_1 = propertyOf_1;
exports.propertyOf = propertyOf_js_1.default;
var range_js_1 = range_1;
exports.range = range_js_1.default;
var rangeRight_js_1 = rangeRight_1;
exports.rangeRight = rangeRight_js_1.default;
var stubArray_js_1 = stubArray_1;
exports.stubArray = stubArray_js_1.default;
var stubFalse_js_1 = stubFalse_1;
exports.stubFalse = stubFalse_js_1.default;
var stubObject_js_1 = stubObject_1;
exports.stubObject = stubObject_js_1.default;
var stubString_js_1 = stubString_1;
exports.stubString = stubString_js_1.default;
var stubTrue_js_1 = stubTrue_1;
exports.stubTrue = stubTrue_js_1.default;
var times_js_1 = times_1;
exports.times = times_js_1.default;
var toPath_js_1 = toPath_1;
exports.toPath = toPath_js_1.default;
var uniqueId_js_1 = uniqueId_1;
exports.uniqueId = uniqueId_js_1.default;
var util_default_js_1 = util_default;
exports.default = util_default_js_1.default;
});

var _lazyClone = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
var _copyArray_js_1 = _copyArray;
function lazyClone() {
    var result = new _LazyWrapper_js_1.default(this.__wrapped__);
    result.__actions__ = _copyArray_js_1.default(this.__actions__);
    result.__dir__ = this.__dir__;
    result.__filtered__ = this.__filtered__;
    result.__iteratees__ = _copyArray_js_1.default(this.__iteratees__);
    result.__takeCount__ = this.__takeCount__;
    result.__views__ = _copyArray_js_1.default(this.__views__);
    return result;
}
exports.default = lazyClone;
});

var _lazyReverse = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _LazyWrapper_js_1 = _LazyWrapper;
function lazyReverse() {
    if (this.__filtered__) {
        var result = new _LazyWrapper_js_1.default(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
    }
    else {
        result = this.clone();
        result.__dir__ *= -1;
    }
    return result;
}
exports.default = lazyReverse;
});

var _getView = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeMax = Math.max, nativeMin = Math.min;
function getView(start, end, transforms) {
    var index = -1, length = transforms.length;
    while (++index < length) {
        var data = transforms[index], size = data.size;
        switch (data.type) {
            case 'drop':
                start += size;
                break;
            case 'dropRight':
                end -= size;
                break;
            case 'take':
                end = nativeMin(end, start + size);
                break;
            case 'takeRight':
                start = nativeMax(start, end - size);
                break;
        }
    }
    return { 'start': start, 'end': end };
}
exports.default = getView;
});

var _lazyValue = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _baseWrapperValue_js_1 = _baseWrapperValue;
var _getView_js_1 = _getView;
var isArray_js_1 = isArray_1;
var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2;
var nativeMin = Math.min;
function lazyValue() {
    var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray_js_1.default(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = _getView_js_1.default(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : (start - 1), iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
    if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return _baseWrapperValue_js_1.default(array, this.__actions__);
    }
    var result = [];
    outer: while (length-- && resIndex < takeCount) {
        index += dir;
        var iterIndex = -1, value = array[index];
        while (++iterIndex < iterLength) {
            var data = iteratees[iterIndex], iteratee = data.iteratee, type = data.type, computed = iteratee(value);
            if (type == LAZY_MAP_FLAG) {
                value = computed;
            }
            else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                }
                else {
                    break outer;
                }
            }
        }
        result[resIndex++] = value;
    }
    return result;
}
exports.default = lazyValue;
});

var lodash_default = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_js_1 = array;
var collection_js_1 = collection;
var date_js_1 = date;
var function_js_1 = _function;
var lang_js_1 = lang;
var math_js_1 = math;
var number_js_1 = number;
var object_js_1 = object;
var seq_js_1 = seq;
var string_js_1 = string;
var util_js_1 = util;
var _LazyWrapper_js_1 = _LazyWrapper;
var _LodashWrapper_js_1 = _LodashWrapper;
var _Symbol_js_1 = _Symbol;
var _arrayEach_js_1 = _arrayEach;
var _arrayPush_js_1 = _arrayPush;
var _baseForOwn_js_1 = _baseForOwn;
var _baseFunctions_js_1 = _baseFunctions;
var _baseInvoke_js_1 = _baseInvoke;
var _baseIteratee_js_1 = _baseIteratee;
var _baseRest_js_1 = _baseRest;
var _createHybrid_js_1 = _createHybrid;
var identity_js_1 = identity_1;
var isArray_js_1 = isArray_1;
var isObject_js_1 = isObject_1;
var keys_js_1 = keys_1;
var last_js_1 = last_1;
var _lazyClone_js_1 = _lazyClone;
var _lazyReverse_js_1 = _lazyReverse;
var _lazyValue_js_1 = _lazyValue;
var mixin_js_1 = mixin_1;
var negate_js_1 = negate_1;
var _realNames_js_1 = _realNames;
var thru_js_1 = thru_1;
var toInteger_js_1 = toInteger_1;
var wrapperLodash_js_1 = wrapperLodash;
var VERSION = '4.17.4';
var WRAP_BIND_KEY_FLAG = 2;
var LAZY_FILTER_FLAG = 1, LAZY_WHILE_FLAG = 3;
var MAX_ARRAY_LENGTH = 4294967295;
var arrayProto = Array.prototype, objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var symIterator = _Symbol_js_1.default ? _Symbol_js_1.default.iterator : undefined;
var nativeMax = Math.max, nativeMin = Math.min;
var mixin = (function (func) {
    return function (object$$1, source, options) {
        if (options == null) {
            var isObj = isObject_js_1.default(source), props = isObj && keys_js_1.default(source), methodNames = props && props.length && _baseFunctions_js_1.default(source, props);
            if (!(methodNames ? methodNames.length : isObj)) {
                options = source;
                source = object$$1;
                object$$1 = this;
            }
        }
        return func(object$$1, source, options);
    };
}(mixin_js_1.default));
wrapperLodash_js_1.default.after = function_js_1.default.after;
wrapperLodash_js_1.default.ary = function_js_1.default.ary;
wrapperLodash_js_1.default.assign = object_js_1.default.assign;
wrapperLodash_js_1.default.assignIn = object_js_1.default.assignIn;
wrapperLodash_js_1.default.assignInWith = object_js_1.default.assignInWith;
wrapperLodash_js_1.default.assignWith = object_js_1.default.assignWith;
wrapperLodash_js_1.default.at = object_js_1.default.at;
wrapperLodash_js_1.default.before = function_js_1.default.before;
wrapperLodash_js_1.default.bind = function_js_1.default.bind;
wrapperLodash_js_1.default.bindAll = util_js_1.default.bindAll;
wrapperLodash_js_1.default.bindKey = function_js_1.default.bindKey;
wrapperLodash_js_1.default.castArray = lang_js_1.default.castArray;
wrapperLodash_js_1.default.chain = seq_js_1.default.chain;
wrapperLodash_js_1.default.chunk = array_js_1.default.chunk;
wrapperLodash_js_1.default.compact = array_js_1.default.compact;
wrapperLodash_js_1.default.concat = array_js_1.default.concat;
wrapperLodash_js_1.default.cond = util_js_1.default.cond;
wrapperLodash_js_1.default.conforms = util_js_1.default.conforms;
wrapperLodash_js_1.default.constant = util_js_1.default.constant;
wrapperLodash_js_1.default.countBy = collection_js_1.default.countBy;
wrapperLodash_js_1.default.create = object_js_1.default.create;
wrapperLodash_js_1.default.curry = function_js_1.default.curry;
wrapperLodash_js_1.default.curryRight = function_js_1.default.curryRight;
wrapperLodash_js_1.default.debounce = function_js_1.default.debounce;
wrapperLodash_js_1.default.defaults = object_js_1.default.defaults;
wrapperLodash_js_1.default.defaultsDeep = object_js_1.default.defaultsDeep;
wrapperLodash_js_1.default.defer = function_js_1.default.defer;
wrapperLodash_js_1.default.delay = function_js_1.default.delay;
wrapperLodash_js_1.default.difference = array_js_1.default.difference;
wrapperLodash_js_1.default.differenceBy = array_js_1.default.differenceBy;
wrapperLodash_js_1.default.differenceWith = array_js_1.default.differenceWith;
wrapperLodash_js_1.default.drop = array_js_1.default.drop;
wrapperLodash_js_1.default.dropRight = array_js_1.default.dropRight;
wrapperLodash_js_1.default.dropRightWhile = array_js_1.default.dropRightWhile;
wrapperLodash_js_1.default.dropWhile = array_js_1.default.dropWhile;
wrapperLodash_js_1.default.fill = array_js_1.default.fill;
wrapperLodash_js_1.default.filter = collection_js_1.default.filter;
wrapperLodash_js_1.default.flatMap = collection_js_1.default.flatMap;
wrapperLodash_js_1.default.flatMapDeep = collection_js_1.default.flatMapDeep;
wrapperLodash_js_1.default.flatMapDepth = collection_js_1.default.flatMapDepth;
wrapperLodash_js_1.default.flatten = array_js_1.default.flatten;
wrapperLodash_js_1.default.flattenDeep = array_js_1.default.flattenDeep;
wrapperLodash_js_1.default.flattenDepth = array_js_1.default.flattenDepth;
wrapperLodash_js_1.default.flip = function_js_1.default.flip;
wrapperLodash_js_1.default.flow = util_js_1.default.flow;
wrapperLodash_js_1.default.flowRight = util_js_1.default.flowRight;
wrapperLodash_js_1.default.fromPairs = array_js_1.default.fromPairs;
wrapperLodash_js_1.default.functions = object_js_1.default.functions;
wrapperLodash_js_1.default.functionsIn = object_js_1.default.functionsIn;
wrapperLodash_js_1.default.groupBy = collection_js_1.default.groupBy;
wrapperLodash_js_1.default.initial = array_js_1.default.initial;
wrapperLodash_js_1.default.intersection = array_js_1.default.intersection;
wrapperLodash_js_1.default.intersectionBy = array_js_1.default.intersectionBy;
wrapperLodash_js_1.default.intersectionWith = array_js_1.default.intersectionWith;
wrapperLodash_js_1.default.invert = object_js_1.default.invert;
wrapperLodash_js_1.default.invertBy = object_js_1.default.invertBy;
wrapperLodash_js_1.default.invokeMap = collection_js_1.default.invokeMap;
wrapperLodash_js_1.default.iteratee = util_js_1.default.iteratee;
wrapperLodash_js_1.default.keyBy = collection_js_1.default.keyBy;
wrapperLodash_js_1.default.keys = keys_js_1.default;
wrapperLodash_js_1.default.keysIn = object_js_1.default.keysIn;
wrapperLodash_js_1.default.map = collection_js_1.default.map;
wrapperLodash_js_1.default.mapKeys = object_js_1.default.mapKeys;
wrapperLodash_js_1.default.mapValues = object_js_1.default.mapValues;
wrapperLodash_js_1.default.matches = util_js_1.default.matches;
wrapperLodash_js_1.default.matchesProperty = util_js_1.default.matchesProperty;
wrapperLodash_js_1.default.memoize = function_js_1.default.memoize;
wrapperLodash_js_1.default.merge = object_js_1.default.merge;
wrapperLodash_js_1.default.mergeWith = object_js_1.default.mergeWith;
wrapperLodash_js_1.default.method = util_js_1.default.method;
wrapperLodash_js_1.default.methodOf = util_js_1.default.methodOf;
wrapperLodash_js_1.default.mixin = mixin;
wrapperLodash_js_1.default.negate = negate_js_1.default;
wrapperLodash_js_1.default.nthArg = util_js_1.default.nthArg;
wrapperLodash_js_1.default.omit = object_js_1.default.omit;
wrapperLodash_js_1.default.omitBy = object_js_1.default.omitBy;
wrapperLodash_js_1.default.once = function_js_1.default.once;
wrapperLodash_js_1.default.orderBy = collection_js_1.default.orderBy;
wrapperLodash_js_1.default.over = util_js_1.default.over;
wrapperLodash_js_1.default.overArgs = function_js_1.default.overArgs;
wrapperLodash_js_1.default.overEvery = util_js_1.default.overEvery;
wrapperLodash_js_1.default.overSome = util_js_1.default.overSome;
wrapperLodash_js_1.default.partial = function_js_1.default.partial;
wrapperLodash_js_1.default.partialRight = function_js_1.default.partialRight;
wrapperLodash_js_1.default.partition = collection_js_1.default.partition;
wrapperLodash_js_1.default.pick = object_js_1.default.pick;
wrapperLodash_js_1.default.pickBy = object_js_1.default.pickBy;
wrapperLodash_js_1.default.property = util_js_1.default.property;
wrapperLodash_js_1.default.propertyOf = util_js_1.default.propertyOf;
wrapperLodash_js_1.default.pull = array_js_1.default.pull;
wrapperLodash_js_1.default.pullAll = array_js_1.default.pullAll;
wrapperLodash_js_1.default.pullAllBy = array_js_1.default.pullAllBy;
wrapperLodash_js_1.default.pullAllWith = array_js_1.default.pullAllWith;
wrapperLodash_js_1.default.pullAt = array_js_1.default.pullAt;
wrapperLodash_js_1.default.range = util_js_1.default.range;
wrapperLodash_js_1.default.rangeRight = util_js_1.default.rangeRight;
wrapperLodash_js_1.default.rearg = function_js_1.default.rearg;
wrapperLodash_js_1.default.reject = collection_js_1.default.reject;
wrapperLodash_js_1.default.remove = array_js_1.default.remove;
wrapperLodash_js_1.default.rest = function_js_1.default.rest;
wrapperLodash_js_1.default.reverse = array_js_1.default.reverse;
wrapperLodash_js_1.default.sampleSize = collection_js_1.default.sampleSize;
wrapperLodash_js_1.default.set = object_js_1.default.set;
wrapperLodash_js_1.default.setWith = object_js_1.default.setWith;
wrapperLodash_js_1.default.shuffle = collection_js_1.default.shuffle;
wrapperLodash_js_1.default.slice = array_js_1.default.slice;
wrapperLodash_js_1.default.sortBy = collection_js_1.default.sortBy;
wrapperLodash_js_1.default.sortedUniq = array_js_1.default.sortedUniq;
wrapperLodash_js_1.default.sortedUniqBy = array_js_1.default.sortedUniqBy;
wrapperLodash_js_1.default.split = string_js_1.default.split;
wrapperLodash_js_1.default.spread = function_js_1.default.spread;
wrapperLodash_js_1.default.tail = array_js_1.default.tail;
wrapperLodash_js_1.default.take = array_js_1.default.take;
wrapperLodash_js_1.default.takeRight = array_js_1.default.takeRight;
wrapperLodash_js_1.default.takeRightWhile = array_js_1.default.takeRightWhile;
wrapperLodash_js_1.default.takeWhile = array_js_1.default.takeWhile;
wrapperLodash_js_1.default.tap = seq_js_1.default.tap;
wrapperLodash_js_1.default.throttle = function_js_1.default.throttle;
wrapperLodash_js_1.default.thru = thru_js_1.default;
wrapperLodash_js_1.default.toArray = lang_js_1.default.toArray;
wrapperLodash_js_1.default.toPairs = object_js_1.default.toPairs;
wrapperLodash_js_1.default.toPairsIn = object_js_1.default.toPairsIn;
wrapperLodash_js_1.default.toPath = util_js_1.default.toPath;
wrapperLodash_js_1.default.toPlainObject = lang_js_1.default.toPlainObject;
wrapperLodash_js_1.default.transform = object_js_1.default.transform;
wrapperLodash_js_1.default.unary = function_js_1.default.unary;
wrapperLodash_js_1.default.union = array_js_1.default.union;
wrapperLodash_js_1.default.unionBy = array_js_1.default.unionBy;
wrapperLodash_js_1.default.unionWith = array_js_1.default.unionWith;
wrapperLodash_js_1.default.uniq = array_js_1.default.uniq;
wrapperLodash_js_1.default.uniqBy = array_js_1.default.uniqBy;
wrapperLodash_js_1.default.uniqWith = array_js_1.default.uniqWith;
wrapperLodash_js_1.default.unset = object_js_1.default.unset;
wrapperLodash_js_1.default.unzip = array_js_1.default.unzip;
wrapperLodash_js_1.default.unzipWith = array_js_1.default.unzipWith;
wrapperLodash_js_1.default.update = object_js_1.default.update;
wrapperLodash_js_1.default.updateWith = object_js_1.default.updateWith;
wrapperLodash_js_1.default.values = object_js_1.default.values;
wrapperLodash_js_1.default.valuesIn = object_js_1.default.valuesIn;
wrapperLodash_js_1.default.without = array_js_1.default.without;
wrapperLodash_js_1.default.words = string_js_1.default.words;
wrapperLodash_js_1.default.wrap = function_js_1.default.wrap;
wrapperLodash_js_1.default.xor = array_js_1.default.xor;
wrapperLodash_js_1.default.xorBy = array_js_1.default.xorBy;
wrapperLodash_js_1.default.xorWith = array_js_1.default.xorWith;
wrapperLodash_js_1.default.zip = array_js_1.default.zip;
wrapperLodash_js_1.default.zipObject = array_js_1.default.zipObject;
wrapperLodash_js_1.default.zipObjectDeep = array_js_1.default.zipObjectDeep;
wrapperLodash_js_1.default.zipWith = array_js_1.default.zipWith;
wrapperLodash_js_1.default.entries = object_js_1.default.toPairs;
wrapperLodash_js_1.default.entriesIn = object_js_1.default.toPairsIn;
wrapperLodash_js_1.default.extend = object_js_1.default.assignIn;
wrapperLodash_js_1.default.extendWith = object_js_1.default.assignInWith;
mixin(wrapperLodash_js_1.default, wrapperLodash_js_1.default);
wrapperLodash_js_1.default.add = math_js_1.default.add;
wrapperLodash_js_1.default.attempt = util_js_1.default.attempt;
wrapperLodash_js_1.default.camelCase = string_js_1.default.camelCase;
wrapperLodash_js_1.default.capitalize = string_js_1.default.capitalize;
wrapperLodash_js_1.default.ceil = math_js_1.default.ceil;
wrapperLodash_js_1.default.clamp = number_js_1.default.clamp;
wrapperLodash_js_1.default.clone = lang_js_1.default.clone;
wrapperLodash_js_1.default.cloneDeep = lang_js_1.default.cloneDeep;
wrapperLodash_js_1.default.cloneDeepWith = lang_js_1.default.cloneDeepWith;
wrapperLodash_js_1.default.cloneWith = lang_js_1.default.cloneWith;
wrapperLodash_js_1.default.conformsTo = lang_js_1.default.conformsTo;
wrapperLodash_js_1.default.deburr = string_js_1.default.deburr;
wrapperLodash_js_1.default.defaultTo = util_js_1.default.defaultTo;
wrapperLodash_js_1.default.divide = math_js_1.default.divide;
wrapperLodash_js_1.default.endsWith = string_js_1.default.endsWith;
wrapperLodash_js_1.default.eq = lang_js_1.default.eq;
wrapperLodash_js_1.default.escape = string_js_1.default.escape;
wrapperLodash_js_1.default.escapeRegExp = string_js_1.default.escapeRegExp;
wrapperLodash_js_1.default.every = collection_js_1.default.every;
wrapperLodash_js_1.default.find = collection_js_1.default.find;
wrapperLodash_js_1.default.findIndex = array_js_1.default.findIndex;
wrapperLodash_js_1.default.findKey = object_js_1.default.findKey;
wrapperLodash_js_1.default.findLast = collection_js_1.default.findLast;
wrapperLodash_js_1.default.findLastIndex = array_js_1.default.findLastIndex;
wrapperLodash_js_1.default.findLastKey = object_js_1.default.findLastKey;
wrapperLodash_js_1.default.floor = math_js_1.default.floor;
wrapperLodash_js_1.default.forEach = collection_js_1.default.forEach;
wrapperLodash_js_1.default.forEachRight = collection_js_1.default.forEachRight;
wrapperLodash_js_1.default.forIn = object_js_1.default.forIn;
wrapperLodash_js_1.default.forInRight = object_js_1.default.forInRight;
wrapperLodash_js_1.default.forOwn = object_js_1.default.forOwn;
wrapperLodash_js_1.default.forOwnRight = object_js_1.default.forOwnRight;
wrapperLodash_js_1.default.get = object_js_1.default.get;
wrapperLodash_js_1.default.gt = lang_js_1.default.gt;
wrapperLodash_js_1.default.gte = lang_js_1.default.gte;
wrapperLodash_js_1.default.has = object_js_1.default.has;
wrapperLodash_js_1.default.hasIn = object_js_1.default.hasIn;
wrapperLodash_js_1.default.head = array_js_1.default.head;
wrapperLodash_js_1.default.identity = identity_js_1.default;
wrapperLodash_js_1.default.includes = collection_js_1.default.includes;
wrapperLodash_js_1.default.indexOf = array_js_1.default.indexOf;
wrapperLodash_js_1.default.inRange = number_js_1.default.inRange;
wrapperLodash_js_1.default.invoke = object_js_1.default.invoke;
wrapperLodash_js_1.default.isArguments = lang_js_1.default.isArguments;
wrapperLodash_js_1.default.isArray = isArray_js_1.default;
wrapperLodash_js_1.default.isArrayBuffer = lang_js_1.default.isArrayBuffer;
wrapperLodash_js_1.default.isArrayLike = lang_js_1.default.isArrayLike;
wrapperLodash_js_1.default.isArrayLikeObject = lang_js_1.default.isArrayLikeObject;
wrapperLodash_js_1.default.isBoolean = lang_js_1.default.isBoolean;
wrapperLodash_js_1.default.isBuffer = lang_js_1.default.isBuffer;
wrapperLodash_js_1.default.isDate = lang_js_1.default.isDate;
wrapperLodash_js_1.default.isElement = lang_js_1.default.isElement;
wrapperLodash_js_1.default.isEmpty = lang_js_1.default.isEmpty;
wrapperLodash_js_1.default.isEqual = lang_js_1.default.isEqual;
wrapperLodash_js_1.default.isEqualWith = lang_js_1.default.isEqualWith;
wrapperLodash_js_1.default.isError = lang_js_1.default.isError;
wrapperLodash_js_1.default.isFinite = lang_js_1.default.isFinite;
wrapperLodash_js_1.default.isFunction = lang_js_1.default.isFunction;
wrapperLodash_js_1.default.isInteger = lang_js_1.default.isInteger;
wrapperLodash_js_1.default.isLength = lang_js_1.default.isLength;
wrapperLodash_js_1.default.isMap = lang_js_1.default.isMap;
wrapperLodash_js_1.default.isMatch = lang_js_1.default.isMatch;
wrapperLodash_js_1.default.isMatchWith = lang_js_1.default.isMatchWith;
wrapperLodash_js_1.default.isNaN = lang_js_1.default.isNaN;
wrapperLodash_js_1.default.isNative = lang_js_1.default.isNative;
wrapperLodash_js_1.default.isNil = lang_js_1.default.isNil;
wrapperLodash_js_1.default.isNull = lang_js_1.default.isNull;
wrapperLodash_js_1.default.isNumber = lang_js_1.default.isNumber;
wrapperLodash_js_1.default.isObject = isObject_js_1.default;
wrapperLodash_js_1.default.isObjectLike = lang_js_1.default.isObjectLike;
wrapperLodash_js_1.default.isPlainObject = lang_js_1.default.isPlainObject;
wrapperLodash_js_1.default.isRegExp = lang_js_1.default.isRegExp;
wrapperLodash_js_1.default.isSafeInteger = lang_js_1.default.isSafeInteger;
wrapperLodash_js_1.default.isSet = lang_js_1.default.isSet;
wrapperLodash_js_1.default.isString = lang_js_1.default.isString;
wrapperLodash_js_1.default.isSymbol = lang_js_1.default.isSymbol;
wrapperLodash_js_1.default.isTypedArray = lang_js_1.default.isTypedArray;
wrapperLodash_js_1.default.isUndefined = lang_js_1.default.isUndefined;
wrapperLodash_js_1.default.isWeakMap = lang_js_1.default.isWeakMap;
wrapperLodash_js_1.default.isWeakSet = lang_js_1.default.isWeakSet;
wrapperLodash_js_1.default.join = array_js_1.default.join;
wrapperLodash_js_1.default.kebabCase = string_js_1.default.kebabCase;
wrapperLodash_js_1.default.last = last_js_1.default;
wrapperLodash_js_1.default.lastIndexOf = array_js_1.default.lastIndexOf;
wrapperLodash_js_1.default.lowerCase = string_js_1.default.lowerCase;
wrapperLodash_js_1.default.lowerFirst = string_js_1.default.lowerFirst;
wrapperLodash_js_1.default.lt = lang_js_1.default.lt;
wrapperLodash_js_1.default.lte = lang_js_1.default.lte;
wrapperLodash_js_1.default.max = math_js_1.default.max;
wrapperLodash_js_1.default.maxBy = math_js_1.default.maxBy;
wrapperLodash_js_1.default.mean = math_js_1.default.mean;
wrapperLodash_js_1.default.meanBy = math_js_1.default.meanBy;
wrapperLodash_js_1.default.min = math_js_1.default.min;
wrapperLodash_js_1.default.minBy = math_js_1.default.minBy;
wrapperLodash_js_1.default.stubArray = util_js_1.default.stubArray;
wrapperLodash_js_1.default.stubFalse = util_js_1.default.stubFalse;
wrapperLodash_js_1.default.stubObject = util_js_1.default.stubObject;
wrapperLodash_js_1.default.stubString = util_js_1.default.stubString;
wrapperLodash_js_1.default.stubTrue = util_js_1.default.stubTrue;
wrapperLodash_js_1.default.multiply = math_js_1.default.multiply;
wrapperLodash_js_1.default.nth = array_js_1.default.nth;
wrapperLodash_js_1.default.noop = util_js_1.default.noop;
wrapperLodash_js_1.default.now = date_js_1.default.now;
wrapperLodash_js_1.default.pad = string_js_1.default.pad;
wrapperLodash_js_1.default.padEnd = string_js_1.default.padEnd;
wrapperLodash_js_1.default.padStart = string_js_1.default.padStart;
wrapperLodash_js_1.default.parseInt = string_js_1.default.parseInt;
wrapperLodash_js_1.default.random = number_js_1.default.random;
wrapperLodash_js_1.default.reduce = collection_js_1.default.reduce;
wrapperLodash_js_1.default.reduceRight = collection_js_1.default.reduceRight;
wrapperLodash_js_1.default.repeat = string_js_1.default.repeat;
wrapperLodash_js_1.default.replace = string_js_1.default.replace;
wrapperLodash_js_1.default.result = object_js_1.default.result;
wrapperLodash_js_1.default.round = math_js_1.default.round;
wrapperLodash_js_1.default.sample = collection_js_1.default.sample;
wrapperLodash_js_1.default.size = collection_js_1.default.size;
wrapperLodash_js_1.default.snakeCase = string_js_1.default.snakeCase;
wrapperLodash_js_1.default.some = collection_js_1.default.some;
wrapperLodash_js_1.default.sortedIndex = array_js_1.default.sortedIndex;
wrapperLodash_js_1.default.sortedIndexBy = array_js_1.default.sortedIndexBy;
wrapperLodash_js_1.default.sortedIndexOf = array_js_1.default.sortedIndexOf;
wrapperLodash_js_1.default.sortedLastIndex = array_js_1.default.sortedLastIndex;
wrapperLodash_js_1.default.sortedLastIndexBy = array_js_1.default.sortedLastIndexBy;
wrapperLodash_js_1.default.sortedLastIndexOf = array_js_1.default.sortedLastIndexOf;
wrapperLodash_js_1.default.startCase = string_js_1.default.startCase;
wrapperLodash_js_1.default.startsWith = string_js_1.default.startsWith;
wrapperLodash_js_1.default.subtract = math_js_1.default.subtract;
wrapperLodash_js_1.default.sum = math_js_1.default.sum;
wrapperLodash_js_1.default.sumBy = math_js_1.default.sumBy;
wrapperLodash_js_1.default.template = string_js_1.default.template;
wrapperLodash_js_1.default.times = util_js_1.default.times;
wrapperLodash_js_1.default.toFinite = lang_js_1.default.toFinite;
wrapperLodash_js_1.default.toInteger = toInteger_js_1.default;
wrapperLodash_js_1.default.toLength = lang_js_1.default.toLength;
wrapperLodash_js_1.default.toLower = string_js_1.default.toLower;
wrapperLodash_js_1.default.toNumber = lang_js_1.default.toNumber;
wrapperLodash_js_1.default.toSafeInteger = lang_js_1.default.toSafeInteger;
wrapperLodash_js_1.default.toString = lang_js_1.default.toString;
wrapperLodash_js_1.default.toUpper = string_js_1.default.toUpper;
wrapperLodash_js_1.default.trim = string_js_1.default.trim;
wrapperLodash_js_1.default.trimEnd = string_js_1.default.trimEnd;
wrapperLodash_js_1.default.trimStart = string_js_1.default.trimStart;
wrapperLodash_js_1.default.truncate = string_js_1.default.truncate;
wrapperLodash_js_1.default.unescape = string_js_1.default.unescape;
wrapperLodash_js_1.default.uniqueId = util_js_1.default.uniqueId;
wrapperLodash_js_1.default.upperCase = string_js_1.default.upperCase;
wrapperLodash_js_1.default.upperFirst = string_js_1.default.upperFirst;
wrapperLodash_js_1.default.each = collection_js_1.default.forEach;
wrapperLodash_js_1.default.eachRight = collection_js_1.default.forEachRight;
wrapperLodash_js_1.default.first = array_js_1.default.head;
mixin(wrapperLodash_js_1.default, (function () {
    var source = {};
    _baseForOwn_js_1.default(wrapperLodash_js_1.default, function (func, methodName) {
        if (!hasOwnProperty.call(wrapperLodash_js_1.default.prototype, methodName)) {
            source[methodName] = func;
        }
    });
    return source;
}()), { 'chain': false });
wrapperLodash_js_1.default.VERSION = VERSION;
(wrapperLodash_js_1.default.templateSettings = string_js_1.default.templateSettings).imports._ = wrapperLodash_js_1.default;
_arrayEach_js_1.default(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (methodName) {
    wrapperLodash_js_1.default[methodName].placeholder = wrapperLodash_js_1.default;
});
_arrayEach_js_1.default(['drop', 'take'], function (methodName, index) {
    _LazyWrapper_js_1.default.prototype[methodName] = function (n) {
        n = n === undefined ? 1 : nativeMax(toInteger_js_1.default(n), 0);
        var result = (this.__filtered__ && !index)
            ? new _LazyWrapper_js_1.default(this)
            : this.clone();
        if (result.__filtered__) {
            result.__takeCount__ = nativeMin(n, result.__takeCount__);
        }
        else {
            result.__views__.push({
                'size': nativeMin(n, MAX_ARRAY_LENGTH),
                'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
            });
        }
        return result;
    };
    _LazyWrapper_js_1.default.prototype[methodName + 'Right'] = function (n) {
        return this.reverse()[methodName](n).reverse();
    };
});
_arrayEach_js_1.default(['filter', 'map', 'takeWhile'], function (methodName, index) {
    var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
    _LazyWrapper_js_1.default.prototype[methodName] = function (iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
            'iteratee': _baseIteratee_js_1.default(iteratee, 3),
            'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
    };
});
_arrayEach_js_1.default(['head', 'last'], function (methodName, index) {
    var takeName = 'take' + (index ? 'Right' : '');
    _LazyWrapper_js_1.default.prototype[methodName] = function () {
        return this[takeName](1).value()[0];
    };
});
_arrayEach_js_1.default(['initial', 'tail'], function (methodName, index) {
    var dropName = 'drop' + (index ? '' : 'Right');
    _LazyWrapper_js_1.default.prototype[methodName] = function () {
        return this.__filtered__ ? new _LazyWrapper_js_1.default(this) : this[dropName](1);
    };
});
_LazyWrapper_js_1.default.prototype.compact = function () {
    return this.filter(identity_js_1.default);
};
_LazyWrapper_js_1.default.prototype.find = function (predicate) {
    return this.filter(predicate).head();
};
_LazyWrapper_js_1.default.prototype.findLast = function (predicate) {
    return this.reverse().find(predicate);
};
_LazyWrapper_js_1.default.prototype.invokeMap = _baseRest_js_1.default(function (path, args) {
    if (typeof path == 'function') {
        return new _LazyWrapper_js_1.default(this);
    }
    return this.map(function (value) {
        return _baseInvoke_js_1.default(value, path, args);
    });
});
_LazyWrapper_js_1.default.prototype.reject = function (predicate) {
    return this.filter(negate_js_1.default(_baseIteratee_js_1.default(predicate)));
};
_LazyWrapper_js_1.default.prototype.slice = function (start, end) {
    start = toInteger_js_1.default(start);
    var result = this;
    if (result.__filtered__ && (start > 0 || end < 0)) {
        return new _LazyWrapper_js_1.default(result);
    }
    if (start < 0) {
        result = result.takeRight(-start);
    }
    else if (start) {
        result = result.drop(start);
    }
    if (end !== undefined) {
        end = toInteger_js_1.default(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
    }
    return result;
};
_LazyWrapper_js_1.default.prototype.takeRightWhile = function (predicate) {
    return this.reverse().takeWhile(predicate).reverse();
};
_LazyWrapper_js_1.default.prototype.toArray = function () {
    return this.take(MAX_ARRAY_LENGTH);
};
_baseForOwn_js_1.default(_LazyWrapper_js_1.default.prototype, function (func, methodName) {
    var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = wrapperLodash_js_1.default[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
    if (!lodashFunc) {
        return;
    }
    wrapperLodash_js_1.default.prototype[methodName] = function () {
        var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof _LazyWrapper_js_1.default, iteratee = args[0], useLazy = isLazy || isArray_js_1.default(value);
        var interceptor = function (value) {
            var result = lodashFunc.apply(wrapperLodash_js_1.default, _arrayPush_js_1.default([value], args));
            return (isTaker && chainAll) ? result[0] : result;
        };
        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
            isLazy = useLazy = false;
        }
        var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
        if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new _LazyWrapper_js_1.default(this);
            var result = func.apply(value, args);
            result.__actions__.push({ 'func': thru_js_1.default, 'args': [interceptor], 'thisArg': undefined });
            return new _LodashWrapper_js_1.default(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
    };
});
_arrayEach_js_1.default(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (methodName) {
    var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru', retUnwrapped = /^(?:pop|shift)$/.test(methodName);
    wrapperLodash_js_1.default.prototype[methodName] = function () {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray_js_1.default(value) ? value : [], args);
        }
        return this[chainName](function (value) {
            return func.apply(isArray_js_1.default(value) ? value : [], args);
        });
    };
});
_baseForOwn_js_1.default(_LazyWrapper_js_1.default.prototype, function (func, methodName) {
    var lodashFunc = wrapperLodash_js_1.default[methodName];
    if (lodashFunc) {
        var key = (lodashFunc.name + ''), names = _realNames_js_1.default[key] || (_realNames_js_1.default[key] = []);
        names.push({ 'name': methodName, 'func': lodashFunc });
    }
});
_realNames_js_1.default[_createHybrid_js_1.default(undefined, WRAP_BIND_KEY_FLAG).name] = [{
        'name': 'wrapper',
        'func': undefined
    }];
_LazyWrapper_js_1.default.prototype.clone = _lazyClone_js_1.default;
_LazyWrapper_js_1.default.prototype.reverse = _lazyReverse_js_1.default;
_LazyWrapper_js_1.default.prototype.value = _lazyValue_js_1.default;
wrapperLodash_js_1.default.prototype.at = seq_js_1.default.at;
wrapperLodash_js_1.default.prototype.chain = seq_js_1.default.wrapperChain;
wrapperLodash_js_1.default.prototype.commit = seq_js_1.default.commit;
wrapperLodash_js_1.default.prototype.next = seq_js_1.default.next;
wrapperLodash_js_1.default.prototype.plant = seq_js_1.default.plant;
wrapperLodash_js_1.default.prototype.reverse = seq_js_1.default.reverse;
wrapperLodash_js_1.default.prototype.toJSON = wrapperLodash_js_1.default.prototype.valueOf = wrapperLodash_js_1.default.prototype.value = seq_js_1.default.value;
wrapperLodash_js_1.default.prototype.first = wrapperLodash_js_1.default.prototype.head;
if (symIterator) {
    wrapperLodash_js_1.default.prototype[symIterator] = seq_js_1.default.toIterator;
}
exports.default = wrapperLodash_js_1.default;
});

var lodash = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_js_1 = add_1;
exports.add = add_js_1.default;
var after_js_1 = after_1;
exports.after = after_js_1.default;
var ary_js_1 = ary_1;
exports.ary = ary_js_1.default;
var assign_js_1 = assign_1;
exports.assign = assign_js_1.default;
var assignIn_js_1 = assignIn_1;
exports.assignIn = assignIn_js_1.default;
var assignInWith_js_1 = assignInWith_1;
exports.assignInWith = assignInWith_js_1.default;
var assignWith_js_1 = assignWith_1;
exports.assignWith = assignWith_js_1.default;
var at_js_1 = at_1;
exports.at = at_js_1.default;
var attempt_js_1 = attempt_1;
exports.attempt = attempt_js_1.default;
var before_js_1 = before_1;
exports.before = before_js_1.default;
var bind_js_1 = bind_1;
exports.bind = bind_js_1.default;
var bindAll_js_1 = bindAll_1;
exports.bindAll = bindAll_js_1.default;
var bindKey_js_1 = bindKey_1;
exports.bindKey = bindKey_js_1.default;
var camelCase_js_1 = camelCase_1;
exports.camelCase = camelCase_js_1.default;
var capitalize_js_1 = capitalize_1;
exports.capitalize = capitalize_js_1.default;
var castArray_js_1 = castArray_1;
exports.castArray = castArray_js_1.default;
var ceil_js_1 = ceil_1;
exports.ceil = ceil_js_1.default;
var chain_js_1 = chain_1;
exports.chain = chain_js_1.default;
var chunk_js_1 = chunk_1;
exports.chunk = chunk_js_1.default;
var clamp_js_1 = clamp_1;
exports.clamp = clamp_js_1.default;
var clone_js_1 = clone_1;
exports.clone = clone_js_1.default;
var cloneDeep_js_1 = cloneDeep_1;
exports.cloneDeep = cloneDeep_js_1.default;
var cloneDeepWith_js_1 = cloneDeepWith_1;
exports.cloneDeepWith = cloneDeepWith_js_1.default;
var cloneWith_js_1 = cloneWith_1;
exports.cloneWith = cloneWith_js_1.default;
var commit_js_1 = commit;
exports.commit = commit_js_1.default;
var compact_js_1 = compact_1;
exports.compact = compact_js_1.default;
var concat_js_1 = concat_1;
exports.concat = concat_js_1.default;
var cond_js_1 = cond_1;
exports.cond = cond_js_1.default;
var conforms_js_1 = conforms_1;
exports.conforms = conforms_js_1.default;
var conformsTo_js_1 = conformsTo_1;
exports.conformsTo = conformsTo_js_1.default;
var constant_js_1 = constant_1;
exports.constant = constant_js_1.default;
var countBy_js_1 = countBy_1;
exports.countBy = countBy_js_1.default;
var create_js_1 = create_1;
exports.create = create_js_1.default;
var curry_js_1 = curry_1;
exports.curry = curry_js_1.default;
var curryRight_js_1 = curryRight_1;
exports.curryRight = curryRight_js_1.default;
var debounce_js_1 = debounce_1;
exports.debounce = debounce_js_1.default;
var deburr_js_1 = deburr_1;
exports.deburr = deburr_js_1.default;
var defaultTo_js_1 = defaultTo_1;
exports.defaultTo = defaultTo_js_1.default;
var defaults_js_1 = defaults_1;
exports.defaults = defaults_js_1.default;
var defaultsDeep_js_1 = defaultsDeep_1;
exports.defaultsDeep = defaultsDeep_js_1.default;
var defer_js_1 = defer_1;
exports.defer = defer_js_1.default;
var delay_js_1 = delay_1;
exports.delay = delay_js_1.default;
var difference_js_1 = difference_1;
exports.difference = difference_js_1.default;
var differenceBy_js_1 = differenceBy_1;
exports.differenceBy = differenceBy_js_1.default;
var differenceWith_js_1 = differenceWith_1;
exports.differenceWith = differenceWith_js_1.default;
var divide_js_1 = divide_1;
exports.divide = divide_js_1.default;
var drop_js_1 = drop_1;
exports.drop = drop_js_1.default;
var dropRight_js_1 = dropRight_1;
exports.dropRight = dropRight_js_1.default;
var dropRightWhile_js_1 = dropRightWhile_1;
exports.dropRightWhile = dropRightWhile_js_1.default;
var dropWhile_js_1 = dropWhile_1;
exports.dropWhile = dropWhile_js_1.default;
var each_js_1 = each;
exports.each = each_js_1.default;
var eachRight_js_1 = eachRight;
exports.eachRight = eachRight_js_1.default;
var endsWith_js_1 = endsWith_1;
exports.endsWith = endsWith_js_1.default;
var entries_js_1 = entries;
exports.entries = entries_js_1.default;
var entriesIn_js_1 = entriesIn;
exports.entriesIn = entriesIn_js_1.default;
var eq_js_1 = eq_1;
exports.eq = eq_js_1.default;
var escape_js_1 = _escape;
exports.escape = escape_js_1.default;
var escapeRegExp_js_1 = escapeRegExp_1;
exports.escapeRegExp = escapeRegExp_js_1.default;
var every_js_1 = every_1;
exports.every = every_js_1.default;
var extend_js_1 = extend;
exports.extend = extend_js_1.default;
var extendWith_js_1 = extendWith;
exports.extendWith = extendWith_js_1.default;
var fill_js_1 = fill_1;
exports.fill = fill_js_1.default;
var filter_js_1 = filter_1;
exports.filter = filter_js_1.default;
var find_js_1 = find_1;
exports.find = find_js_1.default;
var findIndex_js_1 = findIndex_1;
exports.findIndex = findIndex_js_1.default;
var findKey_js_1 = findKey_1;
exports.findKey = findKey_js_1.default;
var findLast_js_1 = findLast_1;
exports.findLast = findLast_js_1.default;
var findLastIndex_js_1 = findLastIndex_1;
exports.findLastIndex = findLastIndex_js_1.default;
var findLastKey_js_1 = findLastKey_1;
exports.findLastKey = findLastKey_js_1.default;
var first_js_1 = first;
exports.first = first_js_1.default;
var flatMap_js_1 = flatMap_1;
exports.flatMap = flatMap_js_1.default;
var flatMapDeep_js_1 = flatMapDeep_1;
exports.flatMapDeep = flatMapDeep_js_1.default;
var flatMapDepth_js_1 = flatMapDepth_1;
exports.flatMapDepth = flatMapDepth_js_1.default;
var flatten_js_1 = flatten_1;
exports.flatten = flatten_js_1.default;
var flattenDeep_js_1 = flattenDeep_1;
exports.flattenDeep = flattenDeep_js_1.default;
var flattenDepth_js_1 = flattenDepth_1;
exports.flattenDepth = flattenDepth_js_1.default;
var flip_js_1 = flip_1;
exports.flip = flip_js_1.default;
var floor_js_1 = floor_1;
exports.floor = floor_js_1.default;
var flow_js_1 = flow_1;
exports.flow = flow_js_1.default;
var flowRight_js_1 = flowRight_1;
exports.flowRight = flowRight_js_1.default;
var forEach_js_1 = forEach_1;
exports.forEach = forEach_js_1.default;
var forEachRight_js_1 = forEachRight_1;
exports.forEachRight = forEachRight_js_1.default;
var forIn_js_1 = forIn_1;
exports.forIn = forIn_js_1.default;
var forInRight_js_1 = forInRight_1;
exports.forInRight = forInRight_js_1.default;
var forOwn_js_1 = forOwn_1;
exports.forOwn = forOwn_js_1.default;
var forOwnRight_js_1 = forOwnRight_1;
exports.forOwnRight = forOwnRight_js_1.default;
var fromPairs_js_1 = fromPairs_1;
exports.fromPairs = fromPairs_js_1.default;
var functions_js_1 = functions_1;
exports.functions = functions_js_1.default;
var functionsIn_js_1 = functionsIn_1;
exports.functionsIn = functionsIn_js_1.default;
var get_js_1 = get_1;
exports.get = get_js_1.default;
var groupBy_js_1 = groupBy_1;
exports.groupBy = groupBy_js_1.default;
var gt_js_1 = gt_1;
exports.gt = gt_js_1.default;
var gte_js_1 = gte_1;
exports.gte = gte_js_1.default;
var has_js_1 = has_1;
exports.has = has_js_1.default;
var hasIn_js_1 = hasIn_1;
exports.hasIn = hasIn_js_1.default;
var head_js_1 = head_1;
exports.head = head_js_1.default;
var identity_js_1 = identity_1;
exports.identity = identity_js_1.default;
var inRange_js_1 = inRange_1;
exports.inRange = inRange_js_1.default;
var includes_js_1 = includes_1;
exports.includes = includes_js_1.default;
var indexOf_js_1 = indexOf_1;
exports.indexOf = indexOf_js_1.default;
var initial_js_1 = initial_1;
exports.initial = initial_js_1.default;
var intersection_js_1 = intersection_1;
exports.intersection = intersection_js_1.default;
var intersectionBy_js_1 = intersectionBy_1;
exports.intersectionBy = intersectionBy_js_1.default;
var intersectionWith_js_1 = intersectionWith_1;
exports.intersectionWith = intersectionWith_js_1.default;
var invert_js_1 = invert_1;
exports.invert = invert_js_1.default;
var invertBy_js_1 = invertBy_1;
exports.invertBy = invertBy_js_1.default;
var invoke_js_1 = invoke_1;
exports.invoke = invoke_js_1.default;
var invokeMap_js_1 = invokeMap_1;
exports.invokeMap = invokeMap_js_1.default;
var isArguments_js_1 = isArguments_1;
exports.isArguments = isArguments_js_1.default;
var isArray_js_1 = isArray_1;
exports.isArray = isArray_js_1.default;
var isArrayBuffer_js_1 = isArrayBuffer_1;
exports.isArrayBuffer = isArrayBuffer_js_1.default;
var isArrayLike_js_1 = isArrayLike_1;
exports.isArrayLike = isArrayLike_js_1.default;
var isArrayLikeObject_js_1 = isArrayLikeObject_1;
exports.isArrayLikeObject = isArrayLikeObject_js_1.default;
var isBoolean_js_1 = isBoolean_1;
exports.isBoolean = isBoolean_js_1.default;
var isBuffer_js_1 = isBuffer_1;
exports.isBuffer = isBuffer_js_1.default;
var isDate_js_1 = isDate_1;
exports.isDate = isDate_js_1.default;
var isElement_js_1 = isElement_1;
exports.isElement = isElement_js_1.default;
var isEmpty_js_1 = isEmpty_1;
exports.isEmpty = isEmpty_js_1.default;
var isEqual_js_1 = isEqual_1;
exports.isEqual = isEqual_js_1.default;
var isEqualWith_js_1 = isEqualWith_1;
exports.isEqualWith = isEqualWith_js_1.default;
var isError_js_1 = isError_1;
exports.isError = isError_js_1.default;
var isFinite_js_1 = _isFinite;
exports.isFinite = isFinite_js_1.default;
var isFunction_js_1 = isFunction_1;
exports.isFunction = isFunction_js_1.default;
var isInteger_js_1 = isInteger_1;
exports.isInteger = isInteger_js_1.default;
var isLength_js_1 = isLength_1;
exports.isLength = isLength_js_1.default;
var isMap_js_1 = isMap_1;
exports.isMap = isMap_js_1.default;
var isMatch_js_1 = isMatch_1;
exports.isMatch = isMatch_js_1.default;
var isMatchWith_js_1 = isMatchWith_1;
exports.isMatchWith = isMatchWith_js_1.default;
var isNaN_js_1 = _isNaN;
exports.isNaN = isNaN_js_1.default;
var isNative_js_1 = isNative_1;
exports.isNative = isNative_js_1.default;
var isNil_js_1 = isNil_1;
exports.isNil = isNil_js_1.default;
var isNull_js_1 = isNull_1;
exports.isNull = isNull_js_1.default;
var isNumber_js_1 = isNumber_1;
exports.isNumber = isNumber_js_1.default;
var isObject_js_1 = isObject_1;
exports.isObject = isObject_js_1.default;
var isObjectLike_js_1 = isObjectLike_1;
exports.isObjectLike = isObjectLike_js_1.default;
var isPlainObject_js_1 = isPlainObject_1;
exports.isPlainObject = isPlainObject_js_1.default;
var isRegExp_js_1 = isRegExp_1;
exports.isRegExp = isRegExp_js_1.default;
var isSafeInteger_js_1 = isSafeInteger_1;
exports.isSafeInteger = isSafeInteger_js_1.default;
var isSet_js_1 = isSet_1;
exports.isSet = isSet_js_1.default;
var isString_js_1 = isString_1;
exports.isString = isString_js_1.default;
var isSymbol_js_1 = isSymbol_1;
exports.isSymbol = isSymbol_js_1.default;
var isTypedArray_js_1 = isTypedArray_1;
exports.isTypedArray = isTypedArray_js_1.default;
var isUndefined_js_1 = isUndefined_1;
exports.isUndefined = isUndefined_js_1.default;
var isWeakMap_js_1 = isWeakMap_1;
exports.isWeakMap = isWeakMap_js_1.default;
var isWeakSet_js_1 = isWeakSet_1;
exports.isWeakSet = isWeakSet_js_1.default;
var iteratee_js_1 = iteratee_1;
exports.iteratee = iteratee_js_1.default;
var join_js_1 = join_1;
exports.join = join_js_1.default;
var kebabCase_js_1 = kebabCase_1;
exports.kebabCase = kebabCase_js_1.default;
var keyBy_js_1 = keyBy_1;
exports.keyBy = keyBy_js_1.default;
var keys_js_1 = keys_1;
exports.keys = keys_js_1.default;
var keysIn_js_1 = keysIn_1;
exports.keysIn = keysIn_js_1.default;
var last_js_1 = last_1;
exports.last = last_js_1.default;
var lastIndexOf_js_1 = lastIndexOf_1;
exports.lastIndexOf = lastIndexOf_js_1.default;
var wrapperLodash_js_1 = wrapperLodash;
exports.lodash = wrapperLodash_js_1.default;
var lowerCase_js_1 = lowerCase_1;
exports.lowerCase = lowerCase_js_1.default;
var lowerFirst_js_1 = lowerFirst_1;
exports.lowerFirst = lowerFirst_js_1.default;
var lt_js_1 = lt_1;
exports.lt = lt_js_1.default;
var lte_js_1 = lte_1;
exports.lte = lte_js_1.default;
var map_js_1 = map_1;
exports.map = map_js_1.default;
var mapKeys_js_1 = mapKeys_1;
exports.mapKeys = mapKeys_js_1.default;
var mapValues_js_1 = mapValues_1;
exports.mapValues = mapValues_js_1.default;
var matches_js_1 = matches_1;
exports.matches = matches_js_1.default;
var matchesProperty_js_1 = matchesProperty_1;
exports.matchesProperty = matchesProperty_js_1.default;
var max_js_1 = max_1;
exports.max = max_js_1.default;
var maxBy_js_1 = maxBy_1;
exports.maxBy = maxBy_js_1.default;
var mean_js_1 = mean_1;
exports.mean = mean_js_1.default;
var meanBy_js_1 = meanBy_1;
exports.meanBy = meanBy_js_1.default;
var memoize_js_1 = memoize_1;
exports.memoize = memoize_js_1.default;
var merge_js_1 = merge_1;
exports.merge = merge_js_1.default;
var mergeWith_js_1 = mergeWith_1;
exports.mergeWith = mergeWith_js_1.default;
var method_js_1 = method_1;
exports.method = method_js_1.default;
var methodOf_js_1 = methodOf_1;
exports.methodOf = methodOf_js_1.default;
var min_js_1 = min_1;
exports.min = min_js_1.default;
var minBy_js_1 = minBy_1;
exports.minBy = minBy_js_1.default;
var mixin_js_1 = mixin_1;
exports.mixin = mixin_js_1.default;
var multiply_js_1 = multiply_1;
exports.multiply = multiply_js_1.default;
var negate_js_1 = negate_1;
exports.negate = negate_js_1.default;
var next_js_1 = next;
exports.next = next_js_1.default;
var noop_js_1 = noop_1;
exports.noop = noop_js_1.default;
var now_js_1 = now_1;
exports.now = now_js_1.default;
var nth_js_1 = nth_1;
exports.nth = nth_js_1.default;
var nthArg_js_1 = nthArg_1;
exports.nthArg = nthArg_js_1.default;
var omit_js_1 = omit_1;
exports.omit = omit_js_1.default;
var omitBy_js_1 = omitBy_1;
exports.omitBy = omitBy_js_1.default;
var once_js_1 = once_1;
exports.once = once_js_1.default;
var orderBy_js_1 = orderBy_1;
exports.orderBy = orderBy_js_1.default;
var over_js_1 = over_1;
exports.over = over_js_1.default;
var overArgs_js_1 = overArgs_1;
exports.overArgs = overArgs_js_1.default;
var overEvery_js_1 = overEvery_1;
exports.overEvery = overEvery_js_1.default;
var overSome_js_1 = overSome_1;
exports.overSome = overSome_js_1.default;
var pad_js_1 = pad_1;
exports.pad = pad_js_1.default;
var padEnd_js_1 = padEnd_1;
exports.padEnd = padEnd_js_1.default;
var padStart_js_1 = padStart_1;
exports.padStart = padStart_js_1.default;
var parseInt_js_1 = _parseInt;
exports.parseInt = parseInt_js_1.default;
var partial_js_1 = partial_1;
exports.partial = partial_js_1.default;
var partialRight_js_1 = partialRight_1;
exports.partialRight = partialRight_js_1.default;
var partition_js_1 = partition_1;
exports.partition = partition_js_1.default;
var pick_js_1 = pick_1;
exports.pick = pick_js_1.default;
var pickBy_js_1 = pickBy_1;
exports.pickBy = pickBy_js_1.default;
var plant_js_1 = plant;
exports.plant = plant_js_1.default;
var property_js_1 = property_1;
exports.property = property_js_1.default;
var propertyOf_js_1 = propertyOf_1;
exports.propertyOf = propertyOf_js_1.default;
var pull_js_1 = pull_1;
exports.pull = pull_js_1.default;
var pullAll_js_1 = pullAll_1;
exports.pullAll = pullAll_js_1.default;
var pullAllBy_js_1 = pullAllBy_1;
exports.pullAllBy = pullAllBy_js_1.default;
var pullAllWith_js_1 = pullAllWith_1;
exports.pullAllWith = pullAllWith_js_1.default;
var pullAt_js_1 = pullAt_1;
exports.pullAt = pullAt_js_1.default;
var random_js_1 = random_1;
exports.random = random_js_1.default;
var range_js_1 = range_1;
exports.range = range_js_1.default;
var rangeRight_js_1 = rangeRight_1;
exports.rangeRight = rangeRight_js_1.default;
var rearg_js_1 = rearg_1;
exports.rearg = rearg_js_1.default;
var reduce_js_1 = reduce_1;
exports.reduce = reduce_js_1.default;
var reduceRight_js_1 = reduceRight_1;
exports.reduceRight = reduceRight_js_1.default;
var reject_js_1 = reject_1;
exports.reject = reject_js_1.default;
var remove_js_1 = remove_1;
exports.remove = remove_js_1.default;
var repeat_js_1 = repeat_1;
exports.repeat = repeat_js_1.default;
var replace_js_1 = replace_1;
exports.replace = replace_js_1.default;
var rest_js_1 = rest_1;
exports.rest = rest_js_1.default;
var result_js_1 = result_1;
exports.result = result_js_1.default;
var reverse_js_1 = reverse_1;
exports.reverse = reverse_js_1.default;
var round_js_1 = round_1;
exports.round = round_js_1.default;
var sample_js_1 = sample_1;
exports.sample = sample_js_1.default;
var sampleSize_js_1 = sampleSize_1;
exports.sampleSize = sampleSize_js_1.default;
var set_js_1 = set_1;
exports.set = set_js_1.default;
var setWith_js_1 = setWith_1;
exports.setWith = setWith_js_1.default;
var shuffle_js_1 = shuffle_1;
exports.shuffle = shuffle_js_1.default;
var size_js_1 = size_1;
exports.size = size_js_1.default;
var slice_js_1 = slice_1;
exports.slice = slice_js_1.default;
var snakeCase_js_1 = snakeCase_1;
exports.snakeCase = snakeCase_js_1.default;
var some_js_1 = some_1;
exports.some = some_js_1.default;
var sortBy_js_1 = sortBy_1;
exports.sortBy = sortBy_js_1.default;
var sortedIndex_js_1 = sortedIndex_1;
exports.sortedIndex = sortedIndex_js_1.default;
var sortedIndexBy_js_1 = sortedIndexBy_1;
exports.sortedIndexBy = sortedIndexBy_js_1.default;
var sortedIndexOf_js_1 = sortedIndexOf_1;
exports.sortedIndexOf = sortedIndexOf_js_1.default;
var sortedLastIndex_js_1 = sortedLastIndex_1;
exports.sortedLastIndex = sortedLastIndex_js_1.default;
var sortedLastIndexBy_js_1 = sortedLastIndexBy_1;
exports.sortedLastIndexBy = sortedLastIndexBy_js_1.default;
var sortedLastIndexOf_js_1 = sortedLastIndexOf_1;
exports.sortedLastIndexOf = sortedLastIndexOf_js_1.default;
var sortedUniq_js_1 = sortedUniq_1;
exports.sortedUniq = sortedUniq_js_1.default;
var sortedUniqBy_js_1 = sortedUniqBy_1;
exports.sortedUniqBy = sortedUniqBy_js_1.default;
var split_js_1 = split_1;
exports.split = split_js_1.default;
var spread_js_1 = spread_1;
exports.spread = spread_js_1.default;
var startCase_js_1 = startCase_1;
exports.startCase = startCase_js_1.default;
var startsWith_js_1 = startsWith_1;
exports.startsWith = startsWith_js_1.default;
var stubArray_js_1 = stubArray_1;
exports.stubArray = stubArray_js_1.default;
var stubFalse_js_1 = stubFalse_1;
exports.stubFalse = stubFalse_js_1.default;
var stubObject_js_1 = stubObject_1;
exports.stubObject = stubObject_js_1.default;
var stubString_js_1 = stubString_1;
exports.stubString = stubString_js_1.default;
var stubTrue_js_1 = stubTrue_1;
exports.stubTrue = stubTrue_js_1.default;
var subtract_js_1 = subtract_1;
exports.subtract = subtract_js_1.default;
var sum_js_1 = sum_1;
exports.sum = sum_js_1.default;
var sumBy_js_1 = sumBy_1;
exports.sumBy = sumBy_js_1.default;
var tail_js_1 = tail_1;
exports.tail = tail_js_1.default;
var take_js_1 = take_1;
exports.take = take_js_1.default;
var takeRight_js_1 = takeRight_1;
exports.takeRight = takeRight_js_1.default;
var takeRightWhile_js_1 = takeRightWhile_1;
exports.takeRightWhile = takeRightWhile_js_1.default;
var takeWhile_js_1 = takeWhile_1;
exports.takeWhile = takeWhile_js_1.default;
var tap_js_1 = tap_1;
exports.tap = tap_js_1.default;
var template_js_1 = template_1;
exports.template = template_js_1.default;
var templateSettings_js_1 = templateSettings_1;
exports.templateSettings = templateSettings_js_1.default;
var throttle_js_1 = throttle_1;
exports.throttle = throttle_js_1.default;
var thru_js_1 = thru_1;
exports.thru = thru_js_1.default;
var times_js_1 = times_1;
exports.times = times_js_1.default;
var toArray_js_1 = toArray_1;
exports.toArray = toArray_js_1.default;
var toFinite_js_1 = toFinite_1;
exports.toFinite = toFinite_js_1.default;
var toInteger_js_1 = toInteger_1;
exports.toInteger = toInteger_js_1.default;
var toIterator_js_1 = toIterator;
exports.toIterator = toIterator_js_1.default;
var toJSON_js_1 = toJSON;
exports.toJSON = toJSON_js_1.default;
var toLength_js_1 = toLength_1;
exports.toLength = toLength_js_1.default;
var toLower_js_1 = toLower_1;
exports.toLower = toLower_js_1.default;
var toNumber_js_1 = toNumber_1;
exports.toNumber = toNumber_js_1.default;
var toPairs_js_1 = toPairs_1;
exports.toPairs = toPairs_js_1.default;
var toPairsIn_js_1 = toPairsIn_1;
exports.toPairsIn = toPairsIn_js_1.default;
var toPath_js_1 = toPath_1;
exports.toPath = toPath_js_1.default;
var toPlainObject_js_1 = toPlainObject_1;
exports.toPlainObject = toPlainObject_js_1.default;
var toSafeInteger_js_1 = toSafeInteger_1;
exports.toSafeInteger = toSafeInteger_js_1.default;
var toString_js_1 = toString_1;
exports.toString = toString_js_1.default;
var toUpper_js_1 = toUpper_1;
exports.toUpper = toUpper_js_1.default;
var transform_js_1 = transform_1;
exports.transform = transform_js_1.default;
var trim_js_1 = trim_1;
exports.trim = trim_js_1.default;
var trimEnd_js_1 = trimEnd_1;
exports.trimEnd = trimEnd_js_1.default;
var trimStart_js_1 = trimStart_1;
exports.trimStart = trimStart_js_1.default;
var truncate_js_1 = truncate_1;
exports.truncate = truncate_js_1.default;
var unary_js_1 = unary_1;
exports.unary = unary_js_1.default;
var unescape_js_1 = _unescape;
exports.unescape = unescape_js_1.default;
var union_js_1 = union_1;
exports.union = union_js_1.default;
var unionBy_js_1 = unionBy_1;
exports.unionBy = unionBy_js_1.default;
var unionWith_js_1 = unionWith_1;
exports.unionWith = unionWith_js_1.default;
var uniq_js_1 = uniq_1;
exports.uniq = uniq_js_1.default;
var uniqBy_js_1 = uniqBy_1;
exports.uniqBy = uniqBy_js_1.default;
var uniqWith_js_1 = uniqWith_1;
exports.uniqWith = uniqWith_js_1.default;
var uniqueId_js_1 = uniqueId_1;
exports.uniqueId = uniqueId_js_1.default;
var unset_js_1 = unset_1;
exports.unset = unset_js_1.default;
var unzip_js_1 = unzip_1;
exports.unzip = unzip_js_1.default;
var unzipWith_js_1 = unzipWith_1;
exports.unzipWith = unzipWith_js_1.default;
var update_js_1 = update_1;
exports.update = update_js_1.default;
var updateWith_js_1 = updateWith_1;
exports.updateWith = updateWith_js_1.default;
var upperCase_js_1 = upperCase_1;
exports.upperCase = upperCase_js_1.default;
var upperFirst_js_1 = upperFirst_1;
exports.upperFirst = upperFirst_js_1.default;
var value_js_1 = value;
exports.value = value_js_1.default;
var valueOf_js_1 = valueOf_1;
exports.valueOf = valueOf_js_1.default;
var values_js_1 = values_1;
exports.values = values_js_1.default;
var valuesIn_js_1 = valuesIn_1;
exports.valuesIn = valuesIn_js_1.default;
var without_js_1 = without_1;
exports.without = without_js_1.default;
var words_js_1 = words_1;
exports.words = words_js_1.default;
var wrap_js_1 = wrap_1;
exports.wrap = wrap_js_1.default;
var wrapperAt_js_1 = wrapperAt_1;
exports.wrapperAt = wrapperAt_js_1.default;
var wrapperChain_js_1 = wrapperChain_1;
exports.wrapperChain = wrapperChain_js_1.default;
var commit_js_2 = commit;
exports.wrapperCommit = commit_js_2.default;
var wrapperLodash_js_2 = wrapperLodash;
exports.wrapperLodash = wrapperLodash_js_2.default;
var next_js_2 = next;
exports.wrapperNext = next_js_2.default;
var plant_js_2 = plant;
exports.wrapperPlant = plant_js_2.default;
var wrapperReverse_js_1 = wrapperReverse_1;
exports.wrapperReverse = wrapperReverse_js_1.default;
var toIterator_js_2 = toIterator;
exports.wrapperToIterator = toIterator_js_2.default;
var wrapperValue_js_1 = wrapperValue_1;
exports.wrapperValue = wrapperValue_js_1.default;
var xor_js_1 = xor_1;
exports.xor = xor_js_1.default;
var xorBy_js_1 = xorBy_1;
exports.xorBy = xorBy_js_1.default;
var xorWith_js_1 = xorWith_1;
exports.xorWith = xorWith_js_1.default;
var zip_js_1 = zip_1;
exports.zip = zip_js_1.default;
var zipObject_js_1 = zipObject_1;
exports.zipObject = zipObject_js_1.default;
var zipObjectDeep_js_1 = zipObjectDeep_1;
exports.zipObjectDeep = zipObjectDeep_js_1.default;
var zipWith_js_1 = zipWith_1;
exports.zipWith = zipWith_js_1.default;
var lodash_default_js_1 = lodash_default;
exports.default = lodash_default_js_1.default;
});

var lodash_80 = lodash.flowRight;

var compose = lodash_80;

var immutable = createCommonjsModule(function (module, exports) {
/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

(function (global, factory) {
  module.exports = factory();
}(commonjsGlobal, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    };
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    };
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    };
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));
});

var immutable_1 = immutable.Map;

var init$2 = function (state) {
    var resultState = mainBussInit(state);
    return resultState;
};
var main = function () {
    compose(loop, init$2)(immutable_1());
};
var setTranslate = function (x, y, z) {
    var state = MainViewData.state;
    changeTranslate(state, x, y, z);
};
var setRotate = function (angle) {
    var state = MainViewData.state;
    changeRotate(state, angle);
};
var loop = function (state) {
    var resultState = null;
    var _loop = function () {
        var resultState = MainViewData.state;
        resultState = render$1(resultState);
        _setState(MainViewData, resultState);
        return window.requestAnimationFrame(_loop);
    };
    resultState = state.setIn(["MainView", "loopID"], _loop());
    _setState(MainViewData, resultState);
};
var _setState = function (MainViewData$$1, state) {
    MainViewData$$1.state = state;
};

var setReactComponentName = function (reactComponent, componentName) {
    reactComponent.name_for_component = componentName;
};
var getReactComponentName = function (reactComponent) {
    return reactComponent.prototype.constructor.name_for_component;
};

exports.createCamera = createCamera;
exports.directorRender = directorRender;
exports.directorInit = directorInit;
exports.directorSetClearColor = directorSetClearColor;
exports.objectTranslate = objectTranslate;
exports.objectRotate = objectRotate;
exports.mainInit = mainInit;
exports.createTriangle = createTriangle$$1;
exports.createBox = createBox$$1;
exports.addSceneChildren = addSceneChildren;
exports.mainBussInit = mainBussInit;
exports.changeTranslate = changeTranslate;
exports.changeRotate = changeRotate;
exports.render = render$1;
exports.getCurrentTriangle = getCurrentTriangle;
exports.MainViewData = MainViewData;
exports.init = init$2;
exports.main = main;
exports.setTranslate = setTranslate;
exports.setRotate = setRotate;
exports.compose = compose;
exports.setReactComponentName = setReactComponentName;
exports.getReactComponentName = getReactComponentName;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=test.js.map
