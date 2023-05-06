const fs = require('fs');
const path = require('path');
const htmlparser2 = require('htmlparser2');
const babelParser = require('@babel/parser');
const classToStyleClass = require('../classToStyle');
class HtmlGetclassWebpackPlugin {
    prefix
    constructor(options) {
        this.prefix = options || 'cts';
    }
    apply(compiler) {
        compiler.hooks.watchRun.tapAsync('HtmlGetclassWebpackPlugin', (compilation, callback) => {
            const changedFiles = compilation.modifiedFiles;
            if (changedFiles) {
                changedFiles.forEach((file) => {
                    const ext = path.extname(file);

                    if (ext === '.html' || ext === '.vue') {
                        this.extractClassesFromHTML(file);
                    } else if (ext === '.jsx') {
                        this.extractClassesFromJSX(file);
                    }
                });
            }

            callback();
        });
    }

    extractClassesFromHTML(file) {
        const content = fs.readFileSync(file, 'utf-8');
        const classNames = new Set();

        const parser = new htmlparser2.Parser({
            onopentag(name, attribs) {
                if (attribs.class) {
                    attribs.class.split(' ').forEach((className) => classNames.add(className));
                }
            },
        });

        parser.write(content);
        parser.end();
      
        let classNameArr = Array.from(classNames)
        this.creactCss(classNameArr)
    }

    extractClassesFromJSX(file) {
        const content = fs.readFileSync(file, 'utf-8');
        const classNames = new Set();

        const ast = babelParser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx'],
        });

        function traverse(node) {
            if (node.type === 'JSXAttribute' && node.name.name === 'className') {
                if (node.value.type === 'StringLiteral') {
                    node.value.value.split(' ').forEach((className) => classNames.add(className));
                }
            }

            for (const key in node) {
                if (typeof node[key] === 'object' && node[key] !== null) {
                    traverse(node[key]);
                }
            }
        }

        traverse(ast);

        let classNameArr = Array.from(classNames)
        this.creactCss(classNameArr)
    }

    creactCss(classList) {
        let uniqueArr = [...new Set(classList)];
        const regex = new RegExp(`^${this.prefix}`);
        let filterArr=uniqueArr.filter(el=>regex.test(el));
        console.log( '筛选class', filterArr)

//         let classResult = classToStyleClass.width(100)
//         let classText = `.width-100{`
//         for (let key in classResult) {
//             classText += `
//     ${key}:${classResult[key]}`
//         }
//         classText = `${classText}
//  }`

//         fs.writeFile('src/index.css', classText, (error) => {

//             // 创建失败
//             if (error) {
//                 console.log(`创建失败：${error}`)
//             }

//             // 创建成功
//             console.log(`创建成功！`)

//         })
    }
}

module.exports = HtmlGetclassWebpackPlugin;