This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

此项目是使用 creact react appp 工具进行构建 主要使用了 react-router路由管理 sass webpack代码打包

支持markdown语法 markdown 编辑器 使用的是 editor.md
这个编辑器虽然很久老 但是 样式风格比较简洁清爽，缺点是不支持 import引入的方式 需要使用 script标签引入 或者requirejs 和seajs

后台部分采用node开发 使用了express框架 数据库使用的是mongodb mongose实现对数据库的操作

服务器是在阿里云买了一台主机 使用nginx做正向带里

后台进程使用 pm2 管理