/**
 * Created by setting on 2018/6/23.
 */
module.exports = {
    title: 'mgso',
    description: 'blog',
    configureWebpack: {
        resolve: {
            alias: {
                '@public': '/docs/public'
            }
        }
    },
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'ssr', link: '/ssr/createSsr'},
            {text: '前端', link: '/front-end/zipImg'},
            {text: 'github', link: 'https://github.com/mgsod'},
        ],
        /*sidebar: [
            {
                title: '前端',
                collapsable: false,
                children: [
                    ['/front-end/zipImg', 'js压缩图片(上传)'],
                    ['/front-end/reg', '正则分组(),不捕获(?:)以及断言'],
                    ['/front-end/for', 'for in 和 for of'],
                    ['/front-end/pxtorem', '移动端自适应,px转rem'],
                ]
            },
            {
                title: 'ssr相关',
                collapsable: false,
                children: [
                    ['/ssr/createSsr', '搭建ssr'],
                    ['/ssr/ssrClient', 'ssr客户端配置'],
                    ['/ssr/serverSpeeder', '更换内核并安装锐速']
                ]
            }

        ],*/
        sidebar: {
            // 侧边栏在 /foo/ 上
            '/ssr/': [
                ['/ssr/createSsr', '搭建ssr'],
                ['/ssr/ssrClient', 'ssr客户端配置'],
                ['/ssr/serverSpeeder', '更换内核并安装锐速']
            ],
            // 侧边栏在 /bar/ 上
            '/front-end/': [
                ['/front-end/zipImg', 'js压缩图片(上传)'],
                ['/front-end/reg', '正则分组(),不捕获(?:)以及断言'],
                ['/front-end/for', 'for in 和 for of'],
                ['/front-end/pxtorem', '移动端自适应,px转rem'],
            ]
        },
        lastUpdated: 'lastUpdated'
    },
    markdown: {
        lineNumbers: true
    }
};
