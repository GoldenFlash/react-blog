### 项目介绍
- 采用前后端分离的开发方式
- 样式参考了一些其他博客平台
- [博客地址](http://101.132.173.11:8080/home/articleList)
- [项目地址](https://github.com/GoldenFlash/blog)
- [后台项目地址](https://github.com/GoldenFlash/server)
### 技术栈
- 前端
	- react: "^16.7.0",
	- react-router": "^4.3.1",
	- axios 
	- editor.md

- 后台
	- express
	-mongodb+mongose

- 服务器 
	- 阿里云主机
	- nginx 正向代理
	- pm2管理node进程

### 博客功能
 - 博客文章列表 文章搜索 文章增删改查 
 - 博客标签分类
 - 文章 评论 
 - 用户注册 
 - markdown 语法 
 - 响应式 （后续实现）

### 本地运行项目
- 前端

 ```
 	git clone https://github.com/GoldenFlash/blog.git

	cd blog

	yarn && yarn start


```

- 后端

下载安装mongodb数据库 修改server 连接数据库地址
git clone https://github.com/GoldenFlash/server.git
cd server

yarn && yarn start