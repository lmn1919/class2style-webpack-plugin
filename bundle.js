
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');
// const shelljs = require('shelljs');
class ClassToStyleWebpackPlugin {
  constructor(options) {
    // import 的路径前缀
    this.prefix = options.prefix || '../';
    if (this.prefix.lastIndexOf('/') === -1) {
      this.prefix += '/';
    }
    // 扫描目录
    this.directory = options.directory || `src/views`;
    // 路由文件存放路径
    this.routeFilePath = options.routeFilePath || `src/router/children.js`;
    // 生成的文件中是否使用双引号规范，默认使用
    this.doubleQoute = options.doubleQoute === undefined ? true : !!options.doubleQoute;
    this.qoute = this.doubleQoute ? '"' : "'";

  }
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('ClassToStyleWebpackPlugin', () => {
      // const allData = this.parseRouteData();
      // console.log(allData)
      // this.writeRouteFile(allData);
      // console.log('路由文件生成成功');
      // if (process.env.NODE_ENV === 'development') {
        const watcher = chokidar.watch(path.resolve(this.directory), {
          ignored: /(^|[\/\\])\../,
          persistent: true
        });

        watcher.on('change', () => {
          this.parseRouteData();
          // this.writeRouteFile(allData);
          console.log('路由文件生成成功777');
        });
      // }
    });
  }

  parseRouteData() {
    const files = glob.sync(path.join('.', this.directory) + '/**/*.html');
    const routeData = [];
    const importData = new Set;

    files.forEach(filePath => {
      let content = fs.readFileSync(path.resolve(filePath), 'utf8');
      content = content.substring(content.indexOf('<script>'), content.lastIndexOf('export default'));
      console.log(content);
      content.split('');
      // const parseRoute = require('./utils/parse-route');
      // console.log(contentArr)
      // const parseData = parseRoute(contentArr);
      // const subFilePath = getSubDirectory(filePath);

      // let componentName = '';
      // parseData.forEach(item => {
      //   if (componentName === '') {
      //     componentName = item.path.replace(/[\/:?*\\\-'"]/g, '');
      //   }
      //   importData.add(`import ${componentName} from ${this.qoute}${this.prefix}${subFilePath}${this.qoute};`.replace(/\\/g, '/'))
      //   item.component = componentName;
      //   routeData.push({
      //     ...item
      //   });
      // })
    });
    return {
      routeData,
      importData
    }
  }

}
module.exports = ClassToStyleWebpackPlugin;
