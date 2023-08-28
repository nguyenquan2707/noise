1. 产物
    1. Web应用
    2. 跨平台桌面端应用(electron)

2. 技术栈：https://developer.mozilla.org/zh-CN/docs/Learn
    1. HTML
    2. CSS
    3. Javascript

3. 工具链
    1. vue.js3 前端js框架 https://cn.vuejs.org/
    2. vite 前端构建工具 https://cn.vitejs.dev/
    3. electron 跨平台桌面端js框架  https://www.electronjs.org/zh/docs/latest
    4. vuetify 谷歌Matrial Design风格的vue组件库 https://vuetifyjs.com/zh-Hans/
    5. pinia vue.js的状态管理库 https://pinia.vuejs.org/zh/
    6. vue-router vue.js的路由管理器 https://router.vuejs.org/zh/
    7. dayjs 处理日期的js工具 https://dayjs.gitee.io/zh-CN/
    8. axios http请求库 https://axios-http.com/zh/docs/intro
    9. crypto-js 用于加解密的js工具 https://cryptojs.gitbook.io/docs/
    10. scss 是css库，可以定义变量、嵌套等 https://www.jianshu.com/p/a99764ff3c41

4. 后台服务
    1. noiselogic https://github.com/qinliang101/noiselogic.git

5. 起步
    1. node: 安装node v16.18.0
    2. npm: node的依赖管理器，安装node后自带npm，不用另外安装
        1. 常见命令参考 https://juejin.cn/post/6844903775233114125
        2. 建议使用淘宝镜像，有两种方式
            1. 代理到淘宝的源：npm config set registry=https://registry.npm.taobao.org
            2. 使用cnpm：npm install -g cnpm --registry=https://registry.npm.taobao.org
    3. 安装git
        1. 参考 https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git
    4. git 克隆 noise 和 noiselogic 代码到本地 (推荐用ssh方式)
        1. 在终端执行 git clone git@github.com:qinliang101/noiselogic.git
        2. 在终端执行 git clone git@github.com:qinliang101/noise.git
    5. 运行 noise 和 noiselogic, 一样的步骤
        1. cd noise
        2. npm install 或者 cnpm install
        3. npm run dev
    6. 访问noise应用：http://localhost:4000/
        1. noiselogic 后台监听80端口
        2. noise 在本地开发时，vite（本质是个node服务）监听4000端口

6. 本地构建
    1. npm run dev 后，vite服务会监听本地代码，文件变更时会跑构建，其构建产物存放在电脑内存（所以你找不到）
    2. .vue文件会被构建成.js文件，包含了你.vue里的html代码、css代码、js代码
    3. .scss文件会被构建成.css文件

7. 基本原理：
    1. 浏览器就是一个【下载文件（html、js、css、jpg/png、mp3...）=> 按文件类型执行文件】的程序
    2. 浏览器无法识别.vue，必须要构建成.js文件
    3. 浏览器输入 http://localhost:4000/ 后
    4. 浏览器访问本地4000端口的服务（vite启动的程序），vite响应index.html给浏览器
    5. 浏览器在执行index.html时，发现在<script>或<link>有引入 *.js、 *.css、 *.jpg/png 等文件，便一一把它们下载下来
    5. 浏览器执行main.js，在把dom结构插入 index.html 的<div id="app"></div>元素里

6. 目录文件
    1. package.json 是npm的配套文件，用来管理node模块（依赖），定义项目启动时的入口文件
    2. package-lock.json 是用来查看模块的版本，模块依赖的模块等等，是npm install 后自动生成的
    3. node_modules 是依赖集合，是执行 npm install 后的产物
    4. vite.config.js 是vite的配置文件。其原理是vite启动一个node服务，专门用来协助本地开发。
    5. main.js 在index.html引入，js入口文件，从它开始执行vue构建出的js
    6. App.vue 被main.js引入，用来创建vue实例
    7. router/ 存放vue路由，vue-router
    8. store/ 存放vue状态管理，pinia
    9. style/ 存放样式文件，scss
    10. config/ 项目一些自定义的配置文件
    11. assets/ 静态文件资源，图片、视频等等
    12. utils/ 自定义的一些工具
    13. .gitignore 用来制定哪些文件/目录不要提交到git仓库，比如 node_modules 等就不需要提交，开发者自行下载即可
    14. page/ 页面文件
    15. public/ vite构建后存放.js .css等产物的目录
    16. eletron/ eletron入口文件，预加载文件
    17. dist/ vite打包Web的产物，上线时发布的目录
    18. dist-electron/ vite打包eletron的产物，上线时发布的目录