/**
 * 基于yuidoc的一款文档渲染工具，结合docrunner可以实现自动化文档工具。
 * @project
 * @name DocRender
 * @subtitle v0.0.2
 * @download http://115.29.195.88:85/release/docrender-0.0.2.js
 * @support ie,chrome,firefox
 * @howto
 * animate使用非常简单，你只需要添加关键帧，然后start就好了
 *
 * **举个例子**
 *
 *      //渲染文档
        docrender.render({
            apiListWrapper:document.getElementById("apiList"),
            apiContentWrapper:document.getElementById("apiContent")
        },data);
 *
 * @demo
 * <div id="list"></div>
 * <div id="content"></div>
 * <style>
 * #list{
 *  float:left;
 *  margin-right:20px; 
 * }
 * #content{
 *  overflow:hidden  
 * }
 * </style>
 * <script type="application/javascript">
 * var data = {
 *       "project": {
 *       },
 *       "classes": {
 *           "Animate": {
 *               "name": "Animate"
 *           }
 *       },
 *       "classitems":[{
 *           "file": "/home/alan/animate/animate-1.1.js",
 *           "line": 216,
 *           "description": "更换动画元素，动画本身不变",
 *           "itemtype": "method",
 *           "name": "setElement",
 *           "params": [{
 *               "name": "elem",
 *               "description": "",
 *               "type": "Dom"
 *            }],
 *            "return": {
 *               "description": "Animate",
 *               "type": "Object"
 *            },
 *            "support": "ie:>=6,chrome:all,firefox:all",
 *            "example": [
 *                "\nvar ani = new Animate();\nani.setElement(document.getElementById(\"aniElem\"));"
 *            ],
 *            "class": "Animate"
 *       }]
 * };
 * docrender.render({
 *     apiListWrapper:document.getElementById("list"),
 *     apiContentWrapper:document.getElementById("content")
 * },data);
 *</script>
 * @author alandlguo
 * 2013/06/06
 */
~

function(exports) {
    var tmpl = {
        apilisttemplate: /*<docs.render.apilisttemplate>*/'<% for(var item in data.classes){ var specificitems = data.classitems.filter(function(it){if(it["class"]==item && it.name && it.access!="private") return true;});%><li class="nav-header"><%=item%></li><%for(var j = 0, api; api = specificitems[j]; j++){%><li><a href="#<%=item + "." + (api.name||"")%>"><%=item + "." + (api.name||"")%><% if(api.isnew!=null){ %><span class="label label-success">New</span><% }else if(api.ismodify!=null){ %><span class="label label-info">Modify</span><% } %></a></li><%}}%>'/*</docs.render.apilisttemplate>*/,
        apicontenttemplate: /*<docs.render.apicontenttemplate>*/'<% var supportList=data.project.support?data.project.support.split(","):[];for(var item in data.classes){var specificitems = data.classitems.filter(function(it){if(it["class"]==item && it.name && it.access!="private") return true;}); %><h3 id="api.<%=item%>"><%=item.name%></h3><h4><%=data.classes[item].description || "" %></h4><table class="table table-striped table-hover table-bordered"><thead><tr><th>method&nbsp;<span class="badge"><%=specificitems.length %></span></th><th>details</th><%for(var k=0;k<supportList.length;k++){%><th style="">v(<%=supportList[k]%>)</th><%}%></tr></thead><tbody><% for(var j = 0, api; api = specificitems[j]; j++){%><tr><td id="<%=item + "." + (api.name||"")%>"><%=api.name %>&nbsp;<% if(api.isnew!=null){ %><span class="label label-success">New</span><% }else if(api.ismodify!=null){ %><span class="label label-info">Modify</span><% } %></td><td><%=api.description || "" %><br/><br/><% if(api.params){for(var k = 0, p; p = api.params[k]; k++){ %>@param<span class="param-type">{<%=encodeHTML(p.type) %>}</span><span class="param-param" title="<%=getSupportTips(p.support)%>"><%=p.name %></span><% if(p.support!=null){ %><sup class="notice"></sup><% } %><%=p.type == "Function" ? getArguList(p.props) : ""%><span class="param-desc"><%=p.description || ""%></span><br/><% if(p.props){ %><%=getParamsList(p.props) %><% } %><% }}%><% if(api["return"]){var p =api["return"];%>@return<span class="param-type">{<%=encodeHTML(p.type) %>}</span><span class="param-param" title="<%=getSupportTips(p.support)%>"><%=p.name %></span><% if(p.support!=null){ %><sup class="notice"></sup><% } %><%=p.type == "Function" ? getArguList(p.props) : ""%><span class="param-desc"><%=p.description || ""%></span><br/><% if(p.props){ %><%=getParamsList(p.props) %><% } %><% }%><% if(api.remark){ %><%=api.remark %><% } %><% if(api.note){ %><div class="alert"><b>Note</b> &nbsp;<%=api.note %></div><% } %><% if(api.important){ %><div class="alert alert-error"><b>Important</b> &nbsp;<%=api.important %></div><% } %><% if(api.examplerun || api.example){ %><span class="label label-info">Example</span><div class="example-wrapper"><pre class="text-info"><%=$("<div/>").text(api.examplerun || api.example).html()%></pre><%if(api.examplerun){%><a href="./run.html#<%=item%>.<%=api.name%>" target="_blank" class="btn btn-success" style="display:none;float:right;margin-top:-45px;margin-right:10px;">Run</a><%}%></div><% } %><% if(api.changelist){ %><span class="label label-important">ChangeList</span><ul><% var verlist=api.changelist.match(/([^,]+?:[^,]+)/gi)||[];for(var i=0;i<verlist.length;i++){ %><li><%="v" + (/(.+):/i).exec(verlist[i])[1] + ": " + (/.+:(.+)/i).exec(verlist[i])[1]%></li><% } %></ul><% } %></td><%for(var k=0;k<supportList.length;k++){var support = new RegExp(supportList[k]+":([^,]+)","i").exec(api.support);%><td><% if(support){ %><%="v(" + support[1]+")"%><% }else{ %><span class="label label-warning">N/A</span><% } %></td><%}%></tr><% } %></tbody></table><% } %>'/*</docs.render.apicontenttemplate>*/,
        paramlisttemplate: /*<docs.render.paramlisttemplate>*/'<ul><% for(var n = 0, p; p = params[n]; n++){ %><li><span class="param-type"><%=p.type ? "{" + encodeHTML(p.type) + "}" : ""%></span><span class="param-param" title="<%=getSupportTips(p.support) %>"><%=p.name || ""%></span><% if(p.support){ %><sup class="notice"></sup><% } %><span class="param-desc"><%=p.desc || "" %></span></li><% if(p.params){ %><%=getParamsList(p.params) %><% } %><% } %></ul>'/*</docs.render.paramlisttemplate>*/,
        changelogtemplate: /*<docs.render.changelogtemplate>*/'<h1>ChangeLog</h1><ul><%if(vernumlist.length){%><%for(var i=0;i<vernumlist.length;i++){%><li><h3>v<%=vernumlist[i]%></h3><ul><%for(var j=0;j<changelog.length;j++){if(changelog[j].version==vernumlist[i]){%><li><strong><%=changelog[j].api%>&nbsp;&nbsp;</strong><%=changelog[j].log%></li><%}}%></ul></li><%}%><%}else{%><li>暂无ChangeLog</li><%}%></ul>'/*</docs.render.changelogtemplate>*/
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
                this.renderGetStart(wrapperObject, {data:data}).renderApi(wrapperObject, {data:data});
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
         * 渲染changeLog
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
                        if (vernumlist.indexOf(verNum.trim()) == -1)
                            vernumlist.push(verNum.trim());

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