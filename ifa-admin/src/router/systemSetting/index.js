/* 系统设置模块 */

const VersionSet = () => import('@/pages/versionSet');

export const systemSetting = [
    {
        path: '/versionset',
        name: 'versionSet',
        component: VersionSet,
        meta: {
            title: '版本设置',
            crumbs: [
                {
                    title: '系统设置',
                    url: null
                }
                ,{
                  title: '版本设置',
                  url: null
                }
            ]
        }
    }
]