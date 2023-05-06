// import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
export default {
    input: 'class-to-style-webpack-plugin/index.ts', // 打包入口文件
    output: {
        file: 'bundle.js',  // 打包输出文件
        format: 'cjs' // es/umd 也可，相当于配置命令行打包方式中的format，需要了解 JS 模块化知识
    },

    plugins: [
        resolve(),
        // Allow json resolution
        json(),
        // Compile TypeScript files
        typescript({ sourceMap: true, inlineSources: true }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs({
            include: 'node_modules/**'
        }),
        sourceMaps(),
        serve({
            port: 8080,
            // open: true,
            // 依赖的文件夹 
            contentBase: './build'
        }),
        livereload()
    ] // 丰富的插件，自行配置
};
