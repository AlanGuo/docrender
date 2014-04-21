~

function(exports) {
    var tmpl = {
        apilisttemplate: docs.render.apilisttemplate,
        apicontenttemplate: docs.render.apicontenttemplate,
        paramlisttemplate: docs.render.paramlisttemplate,
        changelogtemplate: docs.render.changelogtemplate
    }

    //模板方法
    var jsTemplate = function() {
        var cache = {};

        function _getTmplStr(rawStr, mixinTmpl) {
            if (mixinTmpl) {
                for (var p in mixinTmpl) {
                    var r = new RegExp('<%#' + p + '%>', 'g');
                    rawStr = rawStr.replace(r, mixinTmpl[p]);
                }
            }
            return rawStr;
        }
        return function tmpl(str, data, opt) {
            opt = opt || {};
            var key = opt.key,
                mixinTmpl = opt.mixinTmpl,
                strIsKey = opt.strIsKey != null ? opt.strIsKey : !/\W/.test(str);
            key = key || (strIsKey ? str : null);
            var fn = key ? cache[key] = cache[key] || tmpl(_getTmplStr(strIsKey ? document.getElementById(str).innerHTML : str, mixinTmpl)) :
                new Function("obj", "var _p_=[],print=function(){_p_.push.apply(_p_,arguments);};with(obj){_p_.push('" + str
                    .replace(/[\r\t\n]/g, " ")
                    .split("\\'").join("\\\\'")
                    .split("'").join("\\'")
                    .split("<%").join("\t")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("_p_.push('") + "');}return _p_.join('');");
            return data ? fn(data) : fn;
        };
    }();

    var createElementsWithTemplate = function(tmpl) {
        var elem = document.createElement("div");
        elem.innerHTML = tmpl;
        return elem.children;
    }

    var extend = function(a, b) {
        for (var p in b) {
            a[p] = b[p];
        }
        return a;
    }

    var getSupportTips = function(support) {
        var tips = 'Support from ';
        if (!support) {
            return '';
        }
        if (support.iOS) {
            tips += 'iOS: ' + support.iOS + ', ';
        }
        if (support.android) {
            tips += 'android: ' + support.android;
        }
        return tips;
    }

    var encodeHTML = function(str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    var getArguList = function(params) {
        var result = [];
        if (!params) {
            return '';
        }
        for (var i in params) {
            result.push(params[i].name);
        }
        return '(<span class="param-params">' + result.join(', ') + '</span>)';
    }

    var getParamsList = function(params) {
        return jsTemplate(tmpl.paramlisttemplate, {
            params: params,
            encodeHTML: encodeHTML,
            getSupportTips: getSupportTips,
            getParamsList: getParamsList
        });
    }

    /**
     * 文档渲染类
     * @class docrender
     */
    var docrender = {

        /**
         * 渲染，会调用getStartRender和apiRender进行渲染
         * @method render
         * @param {Object} wrapperObject 容器对象
         * @param {HTMLElement} wrapperObject.apiListWrapper API list 容器
         * @param {HTMLElement} wrapperObject.apiContentWrapper API Content 容器
         * @param {Object} data 渲染所需的数据
         * @return {Object} docrender
         * @for docrender
         */
        render: function(wrapperObject, data) {
            if (!wrapperObject) {
                throw new Error("wrapperObject element needed");
            } else {
                this.renderGetStart(wrapperObject, data).renderApi(wrapperObject, data);
            }
            return this;
        },

        /**
         * 渲染getStart
         * @method renderGetStart
         * @param {HTMLElement} wrapper 容器元素
         * @param {Object} data 渲染所需的数据
         * @return {Object} docrender
         * @for docrender
         */
        renderGetStart: function(wrapperObject, data) {
            if (!wrapperObject) {
                throw new Error("wrapperObject element needed");
            } else {}
            return this;
        },

        /**
         * 渲染api
         * @method renderApi
         * @param {HTMLElement} wrapper 容器元素
         * @param {Object} data 渲染所需的数据
         * @return {Object} docrender
         * @for docrender
         */
        renderApi: function(wrapperObject, data) {
            if (!wrapperObject) {
                throw new Error("wrapperObject element needed");
            } else {
                var apiListElemArray = createElementsWithTemplate(jsTemplate(tmpl.apilisttemplate, extend({
                    getSupportTips: getSupportTips,
                    encodeHTML: encodeHTML,
                    getArguList: getArguList
                }, data)));
                var apiContentElemArray = createElementsWithTemplate(jsTemplate(tmpl.apicontenttemplate, extend({
                    getSupportTips: getSupportTips,
                    encodeHTML: encodeHTML,
                    getArguList: getArguList,
                    getParamsList: getParamsList
                }, data)));

                //api list
                if (wrapperObject.apiListWrapper) {
                    while (apiListElemArray.length)
                        wrapperObject.apiListWrapper.appendChild(apiListElemArray[0]);
                }
                //api content
                if (wrapperObject.apiContentWrapper) {
                    while (apiContentElemArray.length)
                        wrapperObject.apiContentWrapper.appendChild(apiContentElemArray[0]);
                }
                //绑定实例运行按钮事件
                if($(".example-wrapper").find(".btn").length>0){
                    $(".example-wrapper").unbind("mouseenter").unbind("mouseleave");
                    $(".example-wrapper").bind("mouseenter", function(evt) {
                        $(this).find(".btn").css("display", "block");
                    }).bind("mouseleave", function(evt) {
                        $(this).find(".btn").css("display", "none");
                    });
                }
            }
            return this;
        },

        /**
         * 渲染api
         * @method renderChangelog
         * @param {HTMLElement} wrapper 容器元素
         * @param {Object} data 渲染所需的数据
         * @return {Object} docrender
         * @for docrender
         */
        renderChangelog: function(wrapperObject, data) {
            //跑出所有的changelist
            var vernumlist = [];
            var changelog = [];
            for (var i = 0; i < data.classitems.length; i++) {
                var api = data.classitems[i];
                if (api.changelist) {
                    var verlist = api.changelist.match(/([^,]+?:[^,]+)/gi) || [];
                    for (var j = 0; j < verlist.length; j++) {
                        var verNum = (/(.+):/i).exec(verlist[j])[1];
                        //数字
                        if (vernumlist.indexOf(verNum) == -1)
                            vernumlist.push(verNum);

                        //日志
                        changelog.push({
                            version: verNum,
                            api: api.class + "." + api.name,
                            log: (/.+:(.+)/i).exec(verlist[j])[1]
                        });
                    }
                }
            }

            if (wrapperObject.changelogWrapper) {
                var html = jsTemplate(tmpl.changelogtemplate, {
                    vernumlist: vernumlist.sort(function(a, b) {
                        if (a < b) return true;
                        else return false;
                    }),
                    changelog: changelog
                });
                wrapperObject.changelogWrapper.innerHTML = html;
            }
            return this;
        }
    }
    exports.docrender = docrender;
}(window)