DocRender v0.0.2
=========

基于yuidoc的一款文档渲染工具，结合[docrunner](http://github.com/)可以实现自动化文档工具。

如果你不需要docrunner，你也可以引用  
**docrender/release/docrender-1.0.js**<br>
来引入docrender，自由选择渲染方式

注释的语法和yuidoc保持完全一致，你只需要在代码中按照yuidoc的规范编写注释就可以自动生成文档。

##DEMO##

这里有个demo页面，是使用docrender渲染出来的

[http://115.29.195.88:86/docs/index.html](http://115.29.195.88:86/docs/index.html)

## API Reference ##



## 注释语法 ##

因为本项目基于yuidoc，所以注释的语法完全是基于yuidoc的语法的，关于yuidoc的基础语法，参考：
[http://yui.github.io/yuidoc/syntax/index.html](http://yui.github.io/yuidoc/syntax/index.html "yuidoc语法参考")

本文档只对一些扩展的字段进行解释说明

### 工程的基本属性 ###
----

注释写在任意文件顶部，使用@project字段即可把这段注释定义为项目基本属性

**页面截图**：

![](http://i.imgur.com/VsHEJwc.png)

**注释示例**：

	/**
	 * 简单的线性动画库，在UI上提供基础的DOM动画能力
	 * @project
	 * @name Animate
	 * @subtitle v1.1
	 * @download http://115.29.195.88:86/animate-1.1.js
	 * @support ie,chrome,firefox
	 * @important important things
	 * @demo
	 * 这里是demo
	 * @howto
	 * 这里是howtouse模块
	 * @author alandlguo
	 * 2013/06/06
	 */

包括如下字段
	
- **name**	主标题

![](http://i.imgur.com/D6yMiFh.png)

- **subtitle**	副标题

![](http://i.imgur.com/bHWWPr2.png)

- **download**	下载链接

![](http://i.imgur.com/GI1zQhe.png)

- **uncompressdownload** 完成版下载链接

![](http://i.imgur.com/2ISRXDF.png)

- **support**	兼容性列表

		@support ie,chrome,firefox

![](http://i.imgur.com/jtpZ4im.png)


- **important**	重要部分

![](http://i.imgur.com/AIEU8qz.png)	

- **demo**	演示示例


**页面截图**：

![](http://i.imgur.com/pTLx3dD.png)

**注释示例**：

		* <div id="aniElem"></div>
		* <style>
		* #aniElem{
		*  background:#f00;
		*  width:100px;
		*  height:100px;
		*  position:absolute;
		* }
		* </style>
		* <script type="application/javascript">
		* var ani = new Animate()
		* .setElement(document.getElementById("aniElem"))
		* .keyframe([{point:0,
		*  left:0,
		*  top:0
		* },{point:500,
		*  left:'100px',
		*  top:'100px'
		*  }]).start();
		* </script>


- **howto**

**页面截图**：

![](http://i.imgur.com/o0WFzQQ.png)

**注释示例**：

		/** @howto
		 * animate使用非常简单，你只需要添加关键帧，然后start就好了
		 *
		 * **举个例子**
		 *
		 *      <div id="aniDiv" style="position:absolute">动画实例</div>
		 *
		 * 你有上面这样一个元素，想做一个曲线运动，那么js可以这么写
		 *
		 *      var ani = new window.Animate(document.getElementById("aniDiv"));
		 *      ani.keyframe({point:0,left:"0",top:"0"})
		 *      .keyframe({point:500,left:"100px",top:"100px"})
		 *      .keyframe({point:1000,left:"0px",top:"100px"})
		 *      .start({timing:"linear"});
		 *
		 * 用法灰常简单，大家可以尽情享用，下面是个demo


### 示例Class ###
----

无扩展字段，标准字段注释语法参见yuidoc

	/**
	* This is the description for my class.
	*
	* @class MyClass
	* @constructor
	*/

### 示例method ###
----
	/**
	* My method description.  Like other pieces of your comment blocks, 
	* this can span multiple lines.
	*
	* @method methodName
	* @param {String} foo Argument 1
	* @param {Object} config A config object
	* @param {String} config.name The name on the config object
	* @param {Function} config.callback A callback function on the config object
	* @param {Boolean} [extra=false] Do extra, optional work
	* @return {Boolean} Returns true on success
	*/
#### 扩展字段 ####

- **@support**

		@support ie:>=6,chrome:all,firefox:all

- **@changelist**

		@changelist 0.1:参数变更
- **@examplerun**

这个字段可以写出可以运行的example

**页面截图**：

![](http://i.imgur.com/7CNQsBw.png)

**注释示例**：

		@examplerun
         * <div id="aniElem"></div>
         * <style>
         * #aniElem{
         *  background:#f00;
         *  width:100px;
         *  height:100px;
         *  position:absolute;
         * }
         * </style>
         * <script type="application/javascript">
         * var ani = new Animate()
         * .setElement(document.getElementById("aniElem"))
         * .keyframe([{point:0,
         *  left:0,
         *  top:0
         * },{point:500,
         *  left:'100px',
         *  top:'100px'
         *  }]).start();
         * </script>

- **@example**

此字段为不能运行的example

		@example
         * <div id="aniElem"></div>
         * <style>
         * #aniElem{
         *  background:#f00;
         *  width:100px;
         *  height:100px;
         *  position:absolute;
         * }
         * </style>
         * <script type="application/javascript">
         * var ani = new Animate()
         * .setElement(document.getElementById("aniElem"))
         * .keyframe([{point:0,
         *  left:0,
         *  top:0
         * },{point:500,
         *  left:'100px',
         *  top:'100px'
         *  }]).start();
         * </script>


### 示例property ###
----
无扩展字段，标准字段注释语法参见yuidoc

	/**
	* My property description.  Like other pieces of your comment blocks, 
	* this can span multiple lines.
	* 
	* @property propertyName
	* @type {Object}
	* @default "foo"
	*/
