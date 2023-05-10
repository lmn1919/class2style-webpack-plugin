const fs = require('fs');
const path = require('path');
const htmlparser2 = require('htmlparser2');
const babelParser = require('@babel/parser');
class Class2styleWebpackPlugin {
    prefix
    constructor(options) {
        this.prefix = options || 'cts';
    }
    apply(compiler) {
        compiler.hooks.watchRun.tapAsync('Class2styleWebpackPlugin', (compilation, callback) => {
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

    async creactCss(classList) {
        delete require.cache[require.resolve('/classToStyle.js')];
        const ClassToStyle = require('/classToStyle.js');
        let classToStyleClass=new ClassToStyle()
        let uniqueArr = [...new Set(classList)];
        const regex = new RegExp(`^${this.prefix}`);
        //获取
        let fileData = await this.getFileData(); //
        let filterArr = uniqueArr.filter(el => regex.test(el) && fileData.indexOf(el) < 0);
        console.log('class类', filterArr,classToStyleClass.rectangle,ClassToStyle)
        let classText = ""
        filterArr.forEach(el => {
            let classArr = el.split("__");
            let functionName = classArr[1]; //get function name
            let classArguments = classArr[2].split("_"); //get arguments
            console.log(functionName,classArguments)
            let classResult = classToStyleClass[functionName](...classArguments)
          

            let itemClassText = `
.${el}{`
            for (let key in classResult) {
                itemClassText += `
    ${key}:${classResult[key]};`
            }

            itemClassText = `${itemClassText}
}`

         classText=`${classText}${itemClassText}`
        })
        console.log('结果',classText)   
        fs.appendFile('src/index.css', classText, (error) => {

            // 创建失败
            if (error) {
                console.log(`创建失败：${error}`)
            }
            // 创建成功
            console.log(`创建成功！`)

        })
    }


    getFileData() {
        return new Promise((resolve, reject) => {
            fs.readFile('src/index.css', (err, data) => {
                // 读取失败
                if (err) reject(err)
                 // 读取成功
                resolve(data)
            })
        })
    }
}

module.exports = Class2styleWebpackPlugin;