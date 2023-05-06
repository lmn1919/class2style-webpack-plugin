const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');
// const shelljs = require('shelljs');
class ClassToStyleWebpackPlugin {
  // directory:string;
  // routeFilePath:string;
  // prefix:string;
  directory;
  routeFilePath;
  prefix;
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
      console.log('路由文件生成成功');
      // if (process.env.NODE_ENV === 'development') {
        const watcher = chokidar.watch(path.resolve(this.directory), {
          ignored: /(^|[\/\\])\../,
          persistent: true
        });

        watcher.on('change', (res) => {
          console.log('啦啦啦',res)
          const allData = this.parseRouteData();
          // this.writeRouteFile(allData);
          console.log('路由文件生成成功777666');
        })
      // }
    })
  }

  parseRouteData() {
    const files = glob.sync(path.join('.', this.directory) + '/**/*.html');
    const routeData = [];
    const importData = new Set;

    files.forEach(filePath => {
      let content = fs.readFileSync(path.resolve(filePath), 'utf8');
      content = content.substring(content.indexOf('<script>'), content.lastIndexOf('export default'));
      console.log(content)
      const contentArr = content.split('');
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
    })
    return {
      routeData,
      importData
    }
  }

}
// module.exports = ClassToStyleWebpackPlugin



// class ClassToStyleWebpackPlugin {
//   constructor(options) {
//     this.options = options || {};
//   }

//   apply(compiler) {
//     compiler.hooks.emit.tap('ClassToStyleWebpackPlugin', (compilation) => {
//       compilation.fileDependencies.forEach((file) => {
       
//         if (/\.html$/.test(file)) {
//           console.log('文件', file)
//           // console.log(compilation.assets[file])
//           // const html = compilation.assets[file].source();
//           // const classNames = html.match(/class="([^"]*)"/)[1];
//           // console.log(`Classes in ${file}: ${classNames}`);
//         }
//       });
//     });
//   }
// }
module.exports = ClassToStyleWebpackPlugin