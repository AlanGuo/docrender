var apiConfig = [{
    groupName: "testGroup",
    desc: "test group name, a sample class",
    list: [{
        "private": false,
        name: "testAPI",
        isNew: false,
        isModify: true,
        desc: "测试api",
        params: [{
            type: "string",
            name: "param1",
            desc: "description",
            support: false
        }, {
            type: "Function",
            params: [{
                type: "num",
                name: "a",
                desc: "description",
                support: true
            }, {
                type: "Function",
                name: "cb",
                desc: "description",
                support: true,
                params: [{
                    type: "string",
                    name: "b",
                    desc: "description",
                    support: false
                }]
            }],
            name: "callback",
            desc: "description",
            support: false
        }],
        remark: "",
        note: "",
        important: "草泥马",
        example: "啊啊啊啊啊啊啊",
        changeList: {
            "4.0": "啊"
        },
        support: {
            iOS: 4.1,
            android: 4.2
        }
    }]
}];