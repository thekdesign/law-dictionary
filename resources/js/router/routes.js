import {createAppContentRouteList, createAppErrorRouteList} from 'formatters/app/Router';
import {PageRoute} from 'enums/navigation/PageRoute';

export const routes = [
    {
        path: '/',
        component: () => import('components/app/AppContainer.vue'),
        children: [
            {
                path: '',
                name: PageRoute.HOME_INDEX.key,
                component: () => import('components/pages/home/HomeIndex.vue'),
                meta: {title: '案件總覽'},
            },
            ...createAppContentRouteList(),
            ...createAppErrorRouteList(),
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {name: PageRoute.NOT_FOUND.key},
    },
];
