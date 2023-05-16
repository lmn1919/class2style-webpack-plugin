# class2style-webpack-plugin

这是一个允许你使用类函数的方式生成css的webpack插件，支持webpack4.0，webpack5.0。只需要简单的配置，就可以将.html，.vue，.jsx，.tsx文件中的类名转化成css样式。

### 工作原理

1. 在项目启动或者文件变动时，获取文件中已固定规则创建的class
2. 将class解析出函数名、参数
3. 调用函数生成css

### 使用

##### 安装


```bash
npm install class2style-webpack-plugin
```



##### 插件配置


```javascript
//webpack.base.js
const Class2styleWebpackPlugin = require('class2style-webpack-plugin');
module.exports = {
  .....
  plugins: [
    .....
    new Class2styleWebpackPlugin({
      ruleConfigPath:'classToStyle.js',
      output:'src/index.css',
      folderPath:'src',
    })
    ....
  ],
}
```



##### 配置参数


| 参数名         | 是否必填 | 类型   | 说明                                              |
| -------------- | -------- | ------ | ------------------------------------------------- |
| prefix         | 非必填   | string | class前缀，插件只会匹配以此开头的class，默认为cts |
| ruleConfigPath | 必填     | string | 生成规则配置文件路径                              |
| output         | 必填     | string | 输出css位置文件                                   |
| folderPath     | 非必填   | string | 指定扫描的文件夹，默认src                         |

##### 生成规则配置

生成规则配置文件导出一个ClassToStyle类，在类中定义样式生成的方法

```javascript
class ClassToStyle{
   //宽度
   width(value){
      return {
        width:`${value}px`
      }
   };
   //矩形
   rectangle(width,height){
      return {
         width:`${width}px`,
         height:`${height}px`
       }
   };
   //颜色
   color(color){
      return {
         color:`${color}`,
       }
   };
  
}

module.exports =ClassToStyle;
```



##### class命名规则

插件的class命名规则示例

```html
 <div class="cts__rectangle__100_10 cts__color__red">
        <div class="cts__width__10">标题</h2>
 </div>
```

1. cts为前缀
2. rectangle、color、width为方法名，对应生成规则配置文件中的方法
3. 100_10，red，10为参数，多个参数以_分隔。
4. 前缀、方法名、参数以__分隔

