var data = {
    "project": {},
    "files": {
        "animate-1.1.js": {
            "name": "animate-1.1.js",
            "modules": {},
            "classes": {
                "Animate": 1
            },
            "fors": {
                "Animate": 1
            },
            "namespaces": {}
        }
    },
    "modules": {},
    "classes": {
        "Animate": {
            "name": "Animate",
            "shortname": "Animate",
            "classitems": [],
            "plugins": [],
            "extensions": [],
            "plugin_for": [],
            "extension_for": [],
            "file": "animate-1.1.js",
            "line": 96,
            "description": "动画类",
            "iphone_version": "8.9",
            "is_constructor": 1
        }
    },
    "classitems": [{
        "file": "animate-1.1.js",
        "line": 1,
        "description": "简单的线性动画库，在UI上提供基础的DOM动画能力",
        "author": "alandlguo\n2013/06/06",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 109,
        "description": "系统关键字",
        "access": "private",
        "tagname": "",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 115,
        "description": "事件",
        "access": "private",
        "tagname": "",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 121,
        "description": "当前动画使用的方法",
        "access": "private",
        "tagname": "",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 127,
        "description": "当前帧",
        "access": "private",
        "tagname": "",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 133,
        "description": "用来控制暂停",
        "access": "private",
        "tagname": "",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 139,
        "description": "初始化",
        "access": "private",
        "tagname": "",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 175,
        "description": "更换动画元素，动画本身不变",
        "itemtype": "method",
        "name": "setElement",
        "params": [{
            "name": "elem",
            "description": "",
            "type": "Dom"
        }],
        "return": {
            "description": "Animate",
            "type": "Object"
        },
        "important": "这个方法很重要",
        "note": "注意这里",
        "remark": "remark here",
        "ismodify": "",
        "support": "ios:5,android:4.2",
        "changelist": "4.1:啊啊,4.2:4.2更新日志",
        "example": [
            "\nsetElement.set(document.body);"
        ],
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 196,
        "description": "得到动画相关属性",
        "access": "private",
        "tagname": "",
        "itemtype": "method",
        "name": "_getProperty",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 211,
        "description": "设置关键帧",
        "itemtype": "method",
        "name": "keyframe",
        "params": [{
            "name": "frames",
            "description": "关键帧",
            "type": "Object"
        }],
        "return": {
            "description": "this 返回当前Animate对象",
            "type": "Animate"
        },
        "example": [
            "\n\tobj.keyframe({point:0\n\t\tleft:0,\n\t\ttop:0,\n\t\tease:\"linear\"\n\t}).keyframe({point:10,\n\t\tleft:'-100px',\n\t\ttop:'-100px',\n\t\tease:\"linear\"\n\t});\n\tobj.keyframe([{point:0,x:0,y:0},{...}]);"
        ],
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 234,
        "description": "重置动画对象，清空关键帧",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 247,
        "description": "开始执行动画",
        "itemtype": "method",
        "name": "start",
        "params": [{
            "name": "opt",
            "description": "",
            "type": "Object",
            "props": [{
                "name": "timing",
                "description": "动画缓动策略",
                "type": "String"
            }]
        }],
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 499,
        "description": "清除动画相关信息",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 512,
        "description": "绑定事件",
        "itemtype": "method",
        "name": "on",
        "params": [{
            "name": "event",
            "description": "事件名称",
            "type": "String"
        }, {
            "name": "cb",
            "description": "事件处理方法",
            "type": "Function",
            "props": [{
                "name": "a",
                "description": "参数",
                "type": "String"
            }]
        }],
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 529,
        "description": "停止动画，下次将从第一帧开始动画",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 538,
        "description": "只支持time动画方式\n暂停动画，下次将继续动画",
        "class": "Animate"
    }, {
        "file": "animate-1.1.js",
        "line": 547,
        "description": "只支持time动画方式\n继续动画",
        "class": "Animate"
    }],
    "warnings": [{
        "message": "unknown tag: important",
        "line": " animate-1.1.js:175"
    }, {
        "message": "unknown tag: note",
        "line": " animate-1.1.js:175"
    }, {
        "message": "unknown tag: remark",
        "line": " animate-1.1.js:175"
    }, {
        "message": "unknown tag: ismodify",
        "line": " animate-1.1.js:175"
    }, {
        "message": "unknown tag: support",
        "line": " animate-1.1.js:175"
    }, {
        "message": "unknown tag: changelist",
        "line": " animate-1.1.js:175"
    }, {
        "message": "Missing item type\n简单的线性动画库，在UI上提供基础的DOM动画能力",
        "line": " animate-1.1.js:1"
    }, {
        "message": "Missing item type\n系统关键字",
        "line": " animate-1.1.js:109"
    }, {
        "message": "Missing item type\n事件",
        "line": " animate-1.1.js:115"
    }, {
        "message": "Missing item type\n当前动画使用的方法",
        "line": " animate-1.1.js:121"
    }, {
        "message": "Missing item type\n当前帧",
        "line": " animate-1.1.js:127"
    }, {
        "message": "Missing item type\n用来控制暂停",
        "line": " animate-1.1.js:133"
    }, {
        "message": "Missing item type\n初始化",
        "line": " animate-1.1.js:139"
    }, {
        "message": "Missing item type\n重置动画对象，清空关键帧",
        "line": " animate-1.1.js:234"
    }, {
        "message": "Missing item type\n清除动画相关信息",
        "line": " animate-1.1.js:499"
    }, {
        "message": "Missing item type\n停止动画，下次将从第一帧开始动画",
        "line": " animate-1.1.js:529"
    }, {
        "message": "Missing item type\n只支持time动画方式\n暂停动画，下次将继续动画",
        "line": " animate-1.1.js:538"
    }, {
        "message": "Missing item type\n只支持time动画方式\n继续动画",
        "line": " animate-1.1.js:547"
    }]
}