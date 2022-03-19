(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReactDnDTouchBackend"] = factory();
	else
		root["ReactDnDTouchBackend"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/invariant/browser.js":
/*!*************************************************************************************!*\
  !*** /Users/christrevino/Workspace/oss/react-dnd/node_modules/invariant/browser.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar invariant = function(condition, format, a, b, c, d, e, f) {\n  if (true) {\n    if (format === undefined) {\n      throw new Error('invariant requires an error message argument');\n    }\n  }\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error(\n        'Minified exception occurred; use the non-minified dev environment ' +\n        'for the full error message and additional helpful warnings.'\n      );\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(\n        format.replace(/%s/g, function() { return args[argIndex++]; })\n      );\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n};\n\nmodule.exports = invariant;\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend//Users/christrevino/Workspace/oss/react-dnd/node_modules/invariant/browser.js?");

/***/ }),

/***/ "./lib/OptionsReader.js":
/*!******************************!*\
  !*** ./lib/OptionsReader.js ***!
  \******************************/
/*! exports provided: OptionsReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OptionsReader\", function() { return OptionsReader; });\nclass OptionsReader {\n    constructor(incoming, context) {\n        this.enableTouchEvents = true;\n        this.enableMouseEvents = false;\n        this.enableKeyboardEvents = false;\n        this.ignoreContextMenu = false;\n        this.enableHoverOutsideTarget = false;\n        this.touchSlop = 0;\n        this.scrollAngleRanges = undefined;\n        this.context = context;\n        this.delayTouchStart = incoming.delayTouchStart || incoming.delay || 0;\n        this.delayMouseStart = incoming.delayMouseStart || incoming.delay || 0;\n        Object.keys(incoming).forEach(key => {\n            if (incoming[key] != null) {\n                ;\n                this[key] = incoming[key];\n            }\n        });\n    }\n    get window() {\n        if (this.context && this.context.window) {\n            return this.context.window;\n        }\n        else if (typeof window !== 'undefined') {\n            return window;\n        }\n        return undefined;\n    }\n    get document() {\n        if (this.window) {\n            return this.window.document;\n        }\n        return undefined;\n    }\n}\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/OptionsReader.js?");

/***/ }),

/***/ "./lib/TouchBackend.js":
/*!*****************************!*\
  !*** ./lib/TouchBackend.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TouchBackend; });\n/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! invariant */ \"../../../node_modules/invariant/browser.js\");\n/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces */ \"./lib/interfaces.js\");\n/* harmony import */ var _utils_predicates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/predicates */ \"./lib/utils/predicates.js\");\n/* harmony import */ var _utils_offsets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/offsets */ \"./lib/utils/offsets.js\");\n/* harmony import */ var _utils_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/math */ \"./lib/utils/math.js\");\n/* harmony import */ var _utils_supportsPassive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/supportsPassive */ \"./lib/utils/supportsPassive.js\");\n/* harmony import */ var _OptionsReader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OptionsReader */ \"./lib/OptionsReader.js\");\n\n\n\n\n\n\n\nconst eventNames = {\n    [_interfaces__WEBPACK_IMPORTED_MODULE_1__[\"ListenerType\"].mouse]: {\n        start: 'mousedown',\n        move: 'mousemove',\n        end: 'mouseup',\n        contextmenu: 'contextmenu',\n    },\n    [_interfaces__WEBPACK_IMPORTED_MODULE_1__[\"ListenerType\"].touch]: {\n        start: 'touchstart',\n        move: 'touchmove',\n        end: 'touchend',\n    },\n    [_interfaces__WEBPACK_IMPORTED_MODULE_1__[\"ListenerType\"].keyboard]: {\n        keydown: 'keydown',\n    },\n};\nclass TouchBackend {\n    constructor(manager, context, options) {\n        this.getSourceClientOffset = (sourceId) => {\n            return Object(_utils_offsets__WEBPACK_IMPORTED_MODULE_3__[\"getNodeClientOffset\"])(this.sourceNodes[sourceId]);\n        };\n        this.handleTopMoveStartCapture = (e) => {\n            if (!Object(_utils_predicates__WEBPACK_IMPORTED_MODULE_2__[\"eventShouldStartDrag\"])(e)) {\n                return;\n            }\n            this.moveStartSourceIds = [];\n        };\n        this.handleMoveStart = (sourceId) => {\n            // Just because we received an event doesn't necessarily mean we need to collect drag sources.\n            // We only collect start collecting drag sources on touch and left mouse events.\n            if (Array.isArray(this.moveStartSourceIds)) {\n                this.moveStartSourceIds.unshift(sourceId);\n            }\n        };\n        this.handleTopMoveStart = (e) => {\n            if (!Object(_utils_predicates__WEBPACK_IMPORTED_MODULE_2__[\"eventShouldStartDrag\"])(e)) {\n                return;\n            }\n            // Don't prematurely preventDefault() here since it might:\n            // 1. Mess up scrolling\n            // 2. Mess up long tap (which brings up context menu)\n            // 3. If there's an anchor link as a child, tap won't be triggered on link\n            const clientOffset = Object(_utils_offsets__WEBPACK_IMPORTED_MODULE_3__[\"getEventClientOffset\"])(e);\n            if (clientOffset) {\n                this._mouseClientOffset = clientOffset;\n            }\n            this.waitingForDelay = false;\n        };\n        this.handleTopMoveStartDelay = (e) => {\n            if (!Object(_utils_predicates__WEBPACK_IMPORTED_MODULE_2__[\"eventShouldStartDrag\"])(e)) {\n                return;\n            }\n            const delay = e.type === eventNames.touch.start\n                ? this.options.delayTouchStart\n                : this.options.delayMouseStart;\n            this.timeout = setTimeout(this.handleTopMoveStart.bind(this, e), delay);\n            this.waitingForDelay = true;\n        };\n        this.handleTopMoveCapture = () => {\n            this.dragOverTargetIds = [];\n        };\n        this.handleMove = (_, targetId) => {\n            if (this.dragOverTargetIds) {\n                this.dragOverTargetIds.unshift(targetId);\n            }\n        };\n        this.handleTopMove = (e) => {\n            if (this.timeout) {\n                clearTimeout(this.timeout);\n            }\n            if (!this.document || this.waitingForDelay) {\n                return;\n            }\n            const { moveStartSourceIds, dragOverTargetIds } = this;\n            const enableHoverOutsideTarget = this.options.enableHoverOutsideTarget;\n            const clientOffset = Object(_utils_offsets__WEBPACK_IMPORTED_MODULE_3__[\"getEventClientOffset\"])(e);\n            if (!clientOffset) {\n                return;\n            }\n            // If the touch move started as a scroll, or is is between the scroll angles\n            if (this._isScrolling ||\n                (!this.monitor.isDragging() &&\n                    Object(_utils_math__WEBPACK_IMPORTED_MODULE_4__[\"inAngleRanges\"])(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y, this.options.scrollAngleRanges))) {\n                this._isScrolling = true;\n                return;\n            }\n            // If we're not dragging and we've moved a little, that counts as a drag start\n            if (!this.monitor.isDragging() &&\n                // eslint-disable-next-line no-prototype-builtins\n                this._mouseClientOffset.hasOwnProperty('x') &&\n                moveStartSourceIds &&\n                Object(_utils_math__WEBPACK_IMPORTED_MODULE_4__[\"distance\"])(this._mouseClientOffset.x || 0, this._mouseClientOffset.y || 0, clientOffset.x, clientOffset.y) > (this.options.touchSlop ? this.options.touchSlop : 0)) {\n                this.moveStartSourceIds = undefined;\n                this.actions.beginDrag(moveStartSourceIds, {\n                    clientOffset: this._mouseClientOffset,\n                    getSourceClientOffset: this.getSourceClientOffset,\n                    publishSource: false,\n                });\n            }\n            if (!this.monitor.isDragging()) {\n                return;\n            }\n            const sourceNode = this.sourceNodes[this.monitor.getSourceId()];\n            this.installSourceNodeRemovalObserver(sourceNode);\n            this.actions.publishDragSource();\n            e.preventDefault();\n            // Get the node elements of the hovered DropTargets\n            const dragOverTargetNodes = (dragOverTargetIds || []).map(key => this.targetNodes[key]);\n            // Get the a ordered list of nodes that are touched by\n            const elementsAtPoint = this.options.getDropTargetElementsAtPoint\n                ? this.options.getDropTargetElementsAtPoint(clientOffset.x, clientOffset.y, dragOverTargetNodes)\n                : this.document.elementsFromPoint(clientOffset.x, clientOffset.y);\n            // Extend list with parents that are not receiving elementsFromPoint events (size 0 elements and svg groups)\n            const elementsAtPointExtended = [];\n            for (const nodeId in elementsAtPoint) {\n                // eslint-disable-next-line no-prototype-builtins\n                if (!elementsAtPoint.hasOwnProperty(nodeId)) {\n                    continue;\n                }\n                let currentNode = elementsAtPoint[nodeId];\n                elementsAtPointExtended.push(currentNode);\n                while (currentNode) {\n                    currentNode = currentNode.parentElement;\n                    if (elementsAtPointExtended.indexOf(currentNode) === -1) {\n                        elementsAtPointExtended.push(currentNode);\n                    }\n                }\n            }\n            const orderedDragOverTargetIds = elementsAtPointExtended\n                // Filter off nodes that arent a hovered DropTargets nodes\n                .filter(node => dragOverTargetNodes.indexOf(node) > -1)\n                // Map back the nodes elements to targetIds\n                .map(node => {\n                for (const targetId in this.targetNodes) {\n                    if (node === this.targetNodes[targetId]) {\n                        return targetId;\n                    }\n                }\n                return undefined;\n            })\n                // Filter off possible null rows\n                .filter(node => !!node)\n                .filter((id, index, ids) => ids.indexOf(id) === index);\n            // Invoke hover for drop targets when source node is still over and pointer is outside\n            if (enableHoverOutsideTarget) {\n                for (const targetId in this.targetNodes) {\n                    if (this.targetNodes[targetId] &&\n                        this.targetNodes[targetId].contains(sourceNode) &&\n                        orderedDragOverTargetIds.indexOf(targetId) === -1) {\n                        orderedDragOverTargetIds.unshift(targetId);\n                        break;\n                    }\n                }\n            }\n            // Reverse order because dnd-core reverse it before calling the DropTarget drop methods\n            orderedDragOverTargetIds.reverse();\n            this.actions.hover(orderedDragOverTargetIds, {\n                clientOffset: clientOffset,\n            });\n        };\n        this.handleTopMoveEndCapture = (e) => {\n            this._isScrolling = false;\n            if (!Object(_utils_predicates__WEBPACK_IMPORTED_MODULE_2__[\"eventShouldEndDrag\"])(e)) {\n                return;\n            }\n            if (!this.monitor.isDragging() || this.monitor.didDrop()) {\n                this.moveStartSourceIds = undefined;\n                return;\n            }\n            e.preventDefault();\n            this._mouseClientOffset = {};\n            this.uninstallSourceNodeRemovalObserver();\n            this.actions.drop();\n            this.actions.endDrag();\n        };\n        this.handleCancelOnEscape = (e) => {\n            if (e.key === 'Escape' && this.monitor.isDragging()) {\n                this._mouseClientOffset = {};\n                this.uninstallSourceNodeRemovalObserver();\n                this.actions.endDrag();\n            }\n        };\n        this.options = new _OptionsReader__WEBPACK_IMPORTED_MODULE_6__[\"OptionsReader\"](options, context);\n        this.actions = manager.getActions();\n        this.monitor = manager.getMonitor();\n        this.sourceNodes = {};\n        this.sourcePreviewNodes = {};\n        this.sourcePreviewNodeOptions = {};\n        this.targetNodes = {};\n        this.listenerTypes = [];\n        this._mouseClientOffset = {};\n        this._isScrolling = false;\n        if (this.options.enableMouseEvents) {\n            this.listenerTypes.push(_interfaces__WEBPACK_IMPORTED_MODULE_1__[\"ListenerType\"].mouse);\n        }\n        if (this.options.enableTouchEvents) {\n            this.listenerTypes.push(_interfaces__WEBPACK_IMPORTED_MODULE_1__[\"ListenerType\"].touch);\n        }\n        if (this.options.enableKeyboardEvents) {\n            this.listenerTypes.push(_interfaces__WEBPACK_IMPORTED_MODULE_1__[\"ListenerType\"].keyboard);\n        }\n    }\n    // public for test\n    get window() {\n        return this.options.window;\n    }\n    // public for test\n    get document() {\n        if (this.window) {\n            return this.window.document;\n        }\n        return undefined;\n    }\n    setup() {\n        if (!this.window) {\n            return;\n        }\n        invariant__WEBPACK_IMPORTED_MODULE_0___default()(!TouchBackend.isSetUp, 'Cannot have two Touch backends at the same time.');\n        TouchBackend.isSetUp = true;\n        this.addEventListener(this.window, 'start', this.getTopMoveStartHandler());\n        this.addEventListener(this.window, 'start', this.handleTopMoveStartCapture, true);\n        this.addEventListener(this.window, 'move', this.handleTopMove);\n        this.addEventListener(this.window, 'move', this.handleTopMoveCapture, true);\n        this.addEventListener(this.window, 'end', this.handleTopMoveEndCapture, true);\n        if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) {\n            this.addEventListener(this.window, 'contextmenu', this\n                .handleTopMoveEndCapture);\n        }\n        if (this.options.enableKeyboardEvents) {\n            this.addEventListener(this.window, 'keydown', this.handleCancelOnEscape, true);\n        }\n    }\n    teardown() {\n        if (!this.window) {\n            return;\n        }\n        TouchBackend.isSetUp = false;\n        this._mouseClientOffset = {};\n        this.removeEventListener(this.window, 'start', this.handleTopMoveStartCapture, true);\n        this.removeEventListener(this.window, 'start', this\n            .handleTopMoveStart);\n        this.removeEventListener(this.window, 'move', this.handleTopMoveCapture, true);\n        this.removeEventListener(this.window, 'move', this.handleTopMove);\n        this.removeEventListener(this.window, 'end', this.handleTopMoveEndCapture, true);\n        if (this.options.enableMouseEvents && !this.options.ignoreContextMenu) {\n            this.removeEventListener(this.window, 'contextmenu', this\n                .handleTopMoveEndCapture);\n        }\n        if (this.options.enableKeyboardEvents) {\n            this.removeEventListener(this.window, 'keydown', this.handleCancelOnEscape, true);\n        }\n        this.uninstallSourceNodeRemovalObserver();\n    }\n    addEventListener(subject, event, handler, capture) {\n        const options = _utils_supportsPassive__WEBPACK_IMPORTED_MODULE_5__[\"default\"] ? { capture, passive: false } : capture;\n        this.listenerTypes.forEach(function (listenerType) {\n            const evt = eventNames[listenerType][event];\n            if (evt) {\n                subject.addEventListener(evt, handler, options);\n            }\n        });\n    }\n    removeEventListener(subject, event, handler, capture) {\n        const options = _utils_supportsPassive__WEBPACK_IMPORTED_MODULE_5__[\"default\"] ? { capture, passive: false } : capture;\n        this.listenerTypes.forEach(function (listenerType) {\n            const evt = eventNames[listenerType][event];\n            if (evt) {\n                subject.removeEventListener(evt, handler, options);\n            }\n        });\n    }\n    connectDragSource(sourceId, node) {\n        const handleMoveStart = this.handleMoveStart.bind(this, sourceId);\n        this.sourceNodes[sourceId] = node;\n        this.addEventListener(node, 'start', handleMoveStart);\n        return () => {\n            delete this.sourceNodes[sourceId];\n            this.removeEventListener(node, 'start', handleMoveStart);\n        };\n    }\n    connectDragPreview(sourceId, node, options) {\n        this.sourcePreviewNodeOptions[sourceId] = options;\n        this.sourcePreviewNodes[sourceId] = node;\n        return () => {\n            delete this.sourcePreviewNodes[sourceId];\n            delete this.sourcePreviewNodeOptions[sourceId];\n        };\n    }\n    connectDropTarget(targetId, node) {\n        if (!this.document) {\n            return () => null;\n        }\n        const handleMove = (e) => {\n            if (!this.document || !this.monitor.isDragging()) {\n                return;\n            }\n            let coords;\n            /**\n             * Grab the coordinates for the current mouse/touch position\n             */\n            switch (e.type) {\n                case eventNames.mouse.move:\n                    coords = {\n                        x: e.clientX,\n                        y: e.clientY,\n                    };\n                    break;\n                case eventNames.touch.move:\n                    coords = {\n                        x: e.touches[0].clientX,\n                        y: e.touches[0].clientY,\n                    };\n                    break;\n            }\n            /**\n             * Use the coordinates to grab the element the drag ended on.\n             * If the element is the same as the target node (or any of it's children) then we have hit a drop target and can handle the move.\n             */\n            const droppedOn = coords != null\n                ? this.document.elementFromPoint(coords.x, coords.y)\n                : undefined;\n            const childMatch = droppedOn && node.contains(droppedOn);\n            if (droppedOn === node || childMatch) {\n                return this.handleMove(e, targetId);\n            }\n        };\n        /**\n         * Attaching the event listener to the body so that touchmove will work while dragging over multiple target elements.\n         */\n        this.addEventListener(this.document.body, 'move', handleMove);\n        this.targetNodes[targetId] = node;\n        return () => {\n            if (this.document) {\n                delete this.targetNodes[targetId];\n                this.removeEventListener(this.document.body, 'move', handleMove);\n            }\n        };\n    }\n    getTopMoveStartHandler() {\n        if (!this.options.delayTouchStart && !this.options.delayMouseStart) {\n            return this.handleTopMoveStart;\n        }\n        return this.handleTopMoveStartDelay;\n    }\n    installSourceNodeRemovalObserver(node) {\n        this.uninstallSourceNodeRemovalObserver();\n        this.draggedSourceNode = node;\n        this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {\n            if (node && !node.parentElement) {\n                this.resurrectSourceNode();\n                this.uninstallSourceNodeRemovalObserver();\n            }\n        });\n        if (!node || !node.parentElement) {\n            return;\n        }\n        this.draggedSourceNodeRemovalObserver.observe(node.parentElement, {\n            childList: true,\n        });\n    }\n    resurrectSourceNode() {\n        if (this.document && this.draggedSourceNode) {\n            this.draggedSourceNode.style.display = 'none';\n            this.draggedSourceNode.removeAttribute('data-reactid');\n            this.document.body.appendChild(this.draggedSourceNode);\n        }\n    }\n    uninstallSourceNodeRemovalObserver() {\n        if (this.draggedSourceNodeRemovalObserver) {\n            this.draggedSourceNodeRemovalObserver.disconnect();\n        }\n        this.draggedSourceNodeRemovalObserver = undefined;\n        this.draggedSourceNode = undefined;\n    }\n}\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/TouchBackend.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TouchBackend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TouchBackend */ \"./lib/TouchBackend.js\");\n\nconst createTouchBackendFactory = (manager, context, options = {}) => new _TouchBackend__WEBPACK_IMPORTED_MODULE_0__[\"default\"](manager, context, options);\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTouchBackendFactory);\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/index.js?");

/***/ }),

/***/ "./lib/interfaces.js":
/*!***************************!*\
  !*** ./lib/interfaces.js ***!
  \***************************/
/*! exports provided: ListenerType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ListenerType\", function() { return ListenerType; });\nvar ListenerType;\n(function (ListenerType) {\n    ListenerType[\"mouse\"] = \"mouse\";\n    ListenerType[\"touch\"] = \"touch\";\n    ListenerType[\"keyboard\"] = \"keyboard\";\n})(ListenerType || (ListenerType = {}));\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/interfaces.js?");

/***/ }),

/***/ "./lib/utils/math.js":
/*!***************************!*\
  !*** ./lib/utils/math.js ***!
  \***************************/
/*! exports provided: distance, inAngleRanges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"distance\", function() { return distance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"inAngleRanges\", function() { return inAngleRanges; });\nfunction distance(x1, y1, x2, y2) {\n    return Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));\n}\nfunction inAngleRanges(x1, y1, x2, y2, angleRanges) {\n    if (!angleRanges) {\n        return false;\n    }\n    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180;\n    for (let i = 0; i < angleRanges.length; ++i) {\n        if ((angleRanges[i].start == null || angle >= angleRanges[i].start) &&\n            (angleRanges[i].end == null || angle <= angleRanges[i].end)) {\n            return true;\n        }\n    }\n    return false;\n}\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/utils/math.js?");

/***/ }),

/***/ "./lib/utils/offsets.js":
/*!******************************!*\
  !*** ./lib/utils/offsets.js ***!
  \******************************/
/*! exports provided: getNodeClientOffset, getEventClientTouchOffset, getEventClientOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNodeClientOffset\", function() { return getNodeClientOffset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getEventClientTouchOffset\", function() { return getEventClientTouchOffset; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getEventClientOffset\", function() { return getEventClientOffset; });\n/* harmony import */ var _predicates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./predicates */ \"./lib/utils/predicates.js\");\n\nconst ELEMENT_NODE = 1;\nfunction getNodeClientOffset(node) {\n    const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;\n    if (!el) {\n        return undefined;\n    }\n    const { top, left } = el.getBoundingClientRect();\n    return { x: left, y: top };\n}\nfunction getEventClientTouchOffset(e) {\n    if (e.targetTouches.length === 1) {\n        return getEventClientOffset(e.targetTouches[0]);\n    }\n}\nfunction getEventClientOffset(e) {\n    if (Object(_predicates__WEBPACK_IMPORTED_MODULE_0__[\"isTouchEvent\"])(e)) {\n        return getEventClientTouchOffset(e);\n    }\n    else {\n        return {\n            x: e.clientX,\n            y: e.clientY,\n        };\n    }\n}\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/utils/offsets.js?");

/***/ }),

/***/ "./lib/utils/predicates.js":
/*!*********************************!*\
  !*** ./lib/utils/predicates.js ***!
  \*********************************/
/*! exports provided: eventShouldStartDrag, eventShouldEndDrag, isTouchEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"eventShouldStartDrag\", function() { return eventShouldStartDrag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"eventShouldEndDrag\", function() { return eventShouldEndDrag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isTouchEvent\", function() { return isTouchEvent; });\n// Used for MouseEvent.buttons (note the s on the end).\nconst MouseButtons = {\n    Left: 1,\n    Right: 2,\n    Center: 4,\n};\n// Used for e.button (note the lack of an s on the end).\nconst MouseButton = {\n    Left: 0,\n    Center: 1,\n    Right: 2,\n};\n/**\n * Only touch events and mouse events where the left button is pressed should initiate a drag.\n * @param {MouseEvent | TouchEvent} e The event\n */\nfunction eventShouldStartDrag(e) {\n    // For touch events, button will be undefined. If e.button is defined,\n    // then it should be MouseButton.Left.\n    return e.button === undefined || e.button === MouseButton.Left;\n}\n/**\n * Only touch events and mouse events where the left mouse button is no longer held should end a drag.\n * It's possible the user mouse downs with the left mouse button, then mouse down and ups with the right mouse button.\n * We don't want releasing the right mouse button to end the drag.\n * @param {MouseEvent | TouchEvent} e The event\n */\nfunction eventShouldEndDrag(e) {\n    // Touch events will have buttons be undefined, while mouse events will have e.buttons's left button\n    // bit field unset if the left mouse button has been released\n    return e.buttons === undefined || (e.buttons & MouseButtons.Left) === 0;\n}\nfunction isTouchEvent(e) {\n    return !!e.targetTouches;\n}\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/utils/predicates.js?");

/***/ }),

/***/ "./lib/utils/supportsPassive.js":
/*!**************************************!*\
  !*** ./lib/utils/supportsPassive.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst supportsPassive = (() => {\n    // simular to jQuery's test\n    let supported = false;\n    try {\n        addEventListener('test', () => { }, Object.defineProperty({}, 'passive', {\n            get() {\n                supported = true;\n                return true;\n            },\n        }));\n    }\n    catch (e) {\n        // do nothing\n    }\n    return supported;\n})();\n/* harmony default export */ __webpack_exports__[\"default\"] = (supportsPassive);\n\n\n//# sourceURL=webpack://ReactDnDTouchBackend/./lib/utils/supportsPassive.js?");

/***/ })

/******/ });
});