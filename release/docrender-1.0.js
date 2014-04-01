~

function(exports) {
    var tmpl = {
        apilisttemplate: '<% for(var item in data.classes){ %><li class="nav-header"><%=item%></li><%for(var j = 0, api; api = data.classitems[j]; j++){if(api["class"]==item && api.name && api.access!="private"){%><li><a href="#<%=item + "." + (api.name||"")%>"><%=item + "." + (api.name||"")%><% if(api.isnew!=null){ %><span class="label label-success">New</span><% }else if(api.ismodify!=null){ %><span class="label label-info">Modify</span><% } %></a></li><%}}}%>',
        apicontenttemplate: '<% for(var item in data.classes){var specificitems = data.classitems.filter(function(it){if(it["class"]==item && it.name && it.access!="private") return true;}); %><h3 id="api.<%=item%>"><%=item.name%></h3><h4><%=data.classes[item].description || "" %></h4><table class="table table-striped table-hover table-bordered"><thead><tr><th>method&nbsp;<span class="badge"><%=specificitems.length %></span></th><th>details</th><th style="width: 60px;">v(iOS)</th><th style="width: 90px;">v(Android)</th></tr></thead><tbody><% for(var j = 0, api; api = specificitems[j]; j++){%><tr><td id="<%=item + "." + (api.name||"")%>"><%=api.name %>&nbsp;<% if(api.isnew!=null){ %><span class="label label-success">New</span><% }else if(api.ismodify!=null){ %><span class="label label-info">Modify</span><% } %></td><td><%=api.description || "" %><br/><br/><% if(api.params){for(var k = 0, p; p = api.params[k]; k++){ %>@param<span class="param-type">{<%=encodeHTML(p.type) %>}</span><span class="param-param" title="<%=getSupportTips(p.support)%>"><%=p.name %></span><% if(p.support!=null){ %><sup class="notice"></sup><% } %><%=p.type == "Function" ? getArguList(p.props) : ""%><span class="param-desc"><%=p.description || ""%></span><br/><% if(p.props){ %><%=getParamsList(p.props) %><% } %><% }}%><% if(api["return"]){var p =api["return"];%>@return<span class="param-type">{<%=encodeHTML(p.type) %>}</span><span class="param-param" title="<%=getSupportTips(p.support)%>"><%=p.name %></span><% if(p.support!=null){ %><sup class="notice"></sup><% } %><%=p.type == "Function" ? getArguList(p.props) : ""%><span class="param-desc"><%=p.description || ""%></span><br/><% if(p.props){ %><%=getParamsList(p.props) %><% } %><% }%><% if(api.remark){ %><%=api.remark %><% } %><% if(api.note){ %><div class="alert"><b>Note</b> &nbsp;<%=api.note %></div><% } %><% if(api.important){ %><div class="alert alert-error"><b>Important</b> &nbsp;<%=api.important %></div><% } %><% if(api.example){ %><span class="label label-info">Example</span><pre class="text-info"><%=api.example%></pre><% } %><% if(api.changelist){ %><span class="label label-important">ChangeList</span><ul><% var verlist=api.changelist.match(/([^,]+?:[^,]+)/gi)||[];for(var i=0;i<verlist.length;i++){ %><li><%="v" + (/(.+):/i).exec(verlist[i])[1] + ": " + (/.+:(.+)/i).exec(verlist[i])[1]%></li><% } %></ul><% } %></td><td><% if(api.support){ %><%="v" + (/ios:([^,]+)/i).exec(api.support)[1] %><% }else{ %><span class="label label-warning">Unsupported</span><% } %></td><td><% if(api.support){ %><%="v" + (/android:([^,]+)/i).exec(api.support)[1] %><% }else{ %><span class="label label-warning">Unsupported</span><% } %></td></tr><% } %></tbody></table><% } %>',
        paramlisttemplate: '<ul><% for(var n = 0, p; p = params[n]; n++){ %><li><span class="param-type"><%=p.type ? "{" + encodeHTML(p.type) + "}" : ""%></span><span class="param-param" title="<%=getSupportTips(p.support) %>"><%=p.name || ""%></span><% if(p.support){ %><sup class="notice"></sup><% } %><span class="param-desc"><%=p.desc || "" %></span></li><% if(p.params){ %><%=getParamsList(p.params) %><% } %><% } %></ul>'
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
                this.getStartRender(wrapperObject, data).apiRender(wrapperObject, data);
            }
            return this;
        },

        /**
         * 渲染getStart
         * @method getStartRender
         * @param {HTMLElement} wrapper 容器元素
         * @param {Object} data 渲染所需的数据
         * @return {Object} docrender
         * @for docrender
         */
        getStartRender: function(wrapperObject, data) {
            if (!wrapperObject) {
                throw new Error("wrapperObject element needed");
            } else {}
            return this;
        },

        /**
         * 渲染api
         * @method apiRender
         * @param {HTMLElement} wrapper 容器元素
         * @param {Object} data 渲染所需的数据
         * @return {Object} docrender
         * @for docrender
         */
        apiRender: function(wrapperObject, data) {
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
                    for (var i = 0; i < apiListElemArray.length; i++)
                        wrapperObject.apiListWrapper.appendChild(apiListElemArray[i]);
                }
                //api content
                if (wrapperObject.apiContentWrapper) {
                    for (var i = 0; i < apiContentElemArray.length; i++)
                        wrapperObject.apiContentWrapper.appendChild(apiContentElemArray[i]);
                }
            }
            return this;
        }
    }
    exports.docrender = docrender;
}(window)