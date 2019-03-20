---
title: d3.js(v4)捆图
meta:
  - name: description
    content: d3.js(v4)捆图
  - name: keywords
    content: d3.js v4 v5 捆图 bundle
---

目前对于d3.js的捆图(bundle),网上的资料都是d3(v3)版本的.但是介于现在d3.js已经是5.x版本了,所以针对v4改版后
对捆图升级.

## 效果图

![for1](../public/img/d3-bundle/bundle.png)

## 与v3版本的不同

* `d3.layout.cluster()` => `d3.cluster()`

* `cluster.nodes()` => `cluster(d3.hierarchy(cities)).leaves()`

    其中`leaves()` 作用是返回叶节点数组，叶节点是没有孩子节点的节点。

* `d3.layout.bundle()` => `node.path(target)`


* `d3.scale.category10c()` => `d3.scaleOrdinal(d3.schemeCategory10)`

### 文档参考

* [d3js.org.cn/api](https://d3js.org.cn/api)

* [v3 与 v4](https://github.com/xswei/d3js_doc/blob/master/API_Reference/CHANGES.md)



## 代码示例:

```javascript
<html>
<head>
    <meta charset="utf-8">
    <title>捆图</title>
    <style>
        .node circle {
            stroke: black;
            stroke-width: 1px;
        }
        .node text {
            font-size: 12px;
            font-family: simsun;
        }
        .link {
            fill: none;
            stroke: black;
            stroke-opacity: .5;
            stroke-width: 2px;
        }
    </style>
</head>
<body>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script>
    var width = 500;	//SVG绘制区域的宽度
    var height = 500;	//SVG绘制区域的高度

    var svg = d3.select("body")			//选择<body>
        .append("svg")			//在<body>中添加<svg>
        .attr("width", width)	//设定<svg>的宽度属性
        .attr("height", height);//设定<svg>的高度属性

    // 城市列表
    var cities = {
        name: "",
        children: [
            {name: "北京"}, {name: "上海"}, {name: "杭州"},
            {name: "广州"}, {name: "桂林"}, {name: "昆明"},
            {name: "成都"}, {name: "西安"}, {name: "太原"}
        ]
    };

    var railway = [
        {source: "北京", target: "上海"},
        {source: "北京", target: "广州"},
        {source: "北京", target: "杭州"},
        {source: "北京", target: "西安"},
        {source: "北京", target: "成都"},
        {source: "北京", target: "太原"},
        {source: "北京", target: "桂林"},
        {source: "北京", target: "昆明"},
        {source: "北京", target: "成都"},
        {source: "上海", target: "杭州"},
        {source: "昆明", target: "成都"},
        {source: "西安", target: "太原"}
    ];



    var cluster = d3.cluster()
        .size([360, width / 2 - 100]);

    var nodes = cluster(d3.hierarchy(cities)).leaves();


    function map (nodes, links) {
        var hash = [];
        for (var i = 0; i < nodes.length; i++) {
            hash[nodes[i].data.name] = nodes[i];
        }
        var resultLinks = [];
        for (var i = 0; i < links.length; i++) {
            //d3 v4后用node.path(target)来计算两个点的距离
            //返回一个从node->parent->target的数组路径
            resultLinks.push(hash[links[i].source].path(hash[links[i].target]))
        }
        return resultLinks;
    }


    var links = map(nodes, railway);


    var gBundle = svg.append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

    //线段生成器
    var line = d3.radialLine()
        .curve(d3.curveBundle.beta(0.85))
        .radius(function (d) {
            return d.y;
        })
        .angle(function (d) {
            return d.x / 180 * Math.PI;
        });


    //添加线条
    gBundle.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", line);


    //颜色生成器
    var color = d3.scaleOrdinal(d3.schemeCategory10);


    //添加节点
    var node = gBundle.selectAll(".node")
        .data(nodes.filter(function (d) {
            return !d.children;
        }))
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"
            + "rotate(" + (90 - d.x) + ")";
        });

    //圆
    node.append("circle")
        .attr("r", 20)
        .style("fill", function (d, i) {
            return color(i);
        });

    //文本信息
    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.name;
        });

</script>

</body>
</html>

```
