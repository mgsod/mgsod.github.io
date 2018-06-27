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
            {text: 'github', link: 'https://github.com/mgsod'},
        ],
        sidebar: [
            {
                title: 'ssr相关',
                collapsable: false,
                children: [
                    ['/ssr/createSsr', '搭建ssr'],
                    ['/ssr/ssrClient', 'ssr客户端配置'],
                    ['/ssr/serverSpeeder', '更换内核并安装锐速'],
                ]
            }
        ],
        lastUpdated:'最后更新时间'
    },
};