# class2style-webpack-plugin
这是一个允许你使用类函数的方式生成css的webpack插件，支持webpack4.0，webpack5.0。只需要简单的配置，就可以将.html，.vue，.jsx，.tsx文件中的类名转化成css样式。

### 工作原理
1. 在项目启动或者文件变动时，获取文件中已固定规则创建的class
2. 将class解析出‘函数名’、‘参数’
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

待

##### class命名规则

待
