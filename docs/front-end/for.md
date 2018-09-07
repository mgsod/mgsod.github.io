---
title: js中的for in for of
meta:
  - name: description
    content: js中的for in for of 以及iterator
  - name: keywords
    content: js iterator for in for of 
---
js中遍历的方法有很多,例如普通的for(;;),for in,while,forEach,some,map....等等.
本文主要介绍js中的for in循环和for of循环

## for in
for in的常见用法主要是用来遍历一个对象.例如
```js
var obj = {a:1,b:2,c:3};
for(var k in obj){
    console.log(k)
}
//a b c
```
上述代码中for in通过遍历对象的`键`来实现输出对应value.也就是说for in 其实是遍历对象`键`
我们来试试遍历数组
```js
var arr = [1,2,3];
for(var k in arr){
    console.log(k)
}
//0 1 2
```
其实这里和for(;;)循环挺像的.我们因为数组的索引在这里被看成了`键`.

我们还是可以通过这个键去获取值例如这样
```js
var arr = [1,2,3];
for(var k in arr){
    console.log(arr[k])
}
//1 2 3
```
其实熟悉for in的同学都知道.数组是不能用for in来遍历的.因为不安全.

有些时候我们可能需要给Array对象拓展一些函数或者属性,例如:
```js
Array.prototype.foo = function(){
  //给数组原型上添加一个自定义函数
};
var arr = [1,2,3];
for(var i in arr){
 console.log(i)
}
//0 1 2 foo
```
可以看到for in直接将我们拓展的函数一并给遍历出来了.看下MDN上的解释

![for1](../public/img/for/for1.png)
![for2](../public/img/for/for2.png)

从图中我们看到一个名词`可枚举属性`.那么现在就可以介绍我们的for of

在介绍for of 之前我们先来了解一下这个名词到底是什么

## 可枚举属性

其实说得直白点.可枚举也就是说可以遍历出来

> "可以出现在对象属性的遍历中" (你不知道的JavaScript)

这里呢,引出一个Object的函数`Object.defineProperty()`:

```js
var obj = {a:1,b:2};
Object.defineProperty(obj,'c',{
    enumerable:false,   
    value:3    
})
obj.c //3
obj.hasOwnProperty('c'); //true;
for(var k in obj){
    console.log(k)
}
//a b
```
上述代码我们只关心一个属性`enumerable`.如果将它赋值为false,那么这个属性将不可被枚举.也自然不可被遍历

我们改一下之前用for in遍历数组的例子

```js
Object.defineProperty(Array,'foo',{
    enumerable:false,
    value:function(){
        //给数组原型上添加一个自定义函数
    }
});
var arr = [1,2,3];
for(var i in arr){
 console.log(i)
}
//0 1 2
```
可以看到我们可以通过Object.defineProperty()将`enumerable`设置成false,新增的foo就不会被遍历出来了.

那么接下来就是es6中的for of方法了

## for of

for of遍历的只是数组内的元素，而不包括数组的原型属性`method`和`索引name`;

还是之前for in遍历数组的例子.我们改写成for of遍历

```js
Array.prototype.foo = function(){
  //给数组原型上添加一个自定义函数
};
var arr = [1,2,3];
for(var i of arr){
 console.log(i)
}
//1 2 3
```
可以看到,尽管我们给Array拓展了一个foo函数,且没有设置其`enumerable`为false.也依然可以拿到对应的值.

::: tip 提示
 `for of `是遍历元素,也就是`value`.而不是`key`
:::

那,for of 的内部实现到底是怎样的呢.这里延伸一个新知识点 `iterator`

## iterator

> for of循环首先会向被访问对象请求一个迭代器对象,然后通过调用迭代器对象的next()方法来遍历所有返回值 (你不知道的JavaScript)

上面之所以可以用for of遍历数组是因为数组有内置的`iterator`.在用for of遍历的时候回自动调用next()返回.

那么我们手动来手动遍历一下:

```js
var arr = [1,2,3];
var it = arr[Symbol.iterator]();
it.next();//{value:1,done:false}
it.next();//{value:2,done:false}
it.next();//{value:3,done:false}
it.next();//{value:undefined,done:true}
```
不难看出.我们通过调用`next()`函数获取到了相应的value.直到返回对象中`done`为`true`;

那for of可以用来遍历对象吗?

```js
var obj = {a:1,b:2,c:3};
for(var v of obj){
    console.log(v);
}
//Uncaught TypeError: obj is not iterable
```
咦,报错了.回顾一下上面那句话`for of循环首先会向被访问对象请求一个迭代器对象`,上述例子中obj并没有这个`iterable`对象.所以不可用for of遍历

那就不能用for of 遍历对象了吗?

其实不然.我们只要给对象实现一个`iterable`即可. 看下面例子:

```js
var myObject = {
        a: 1,
        b: 2,
        c: 3
    };
    Object.defineProperty(myObject, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function () {
            var o = this;
            var keys = Object.keys(o); //得到对象中所有key
            var i = 0;//迭代计数器
            return {
                next: function () {
                    return {
                        value: o[keys[i++]],
                        done: i > keys.length
                    }
                }
            }
        }
    });
    var it = myObject[Symbol.iterator]();
    it.next();//{value: 1, done: false}
    it.next();//{value: 2, done: false}
    it.next();//{value: 3, done: false}
    for (var v of myObject) {
        console.log(v)
    }
    //1 2 3
```
以上就是对`for in` `for of`的简单介绍以及延伸出的`可枚举属性`和`iterator`的介绍
