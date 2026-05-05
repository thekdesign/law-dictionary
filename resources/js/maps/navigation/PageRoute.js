import {PageRoute} from 'enums/navigation/PageRoute';
import {EnumMap} from 'libs/EnumMap';

// 主要內容頁（包在 AppContainer 下）
export const pageRouteMap = new EnumMap(PageRoute, {
    CASE_DETAIL: {
        path: 'cases/:caseId',
        component: () => import('components/pages/case/CaseDetail.vue'),
        meta: {title: '案件詳情'},
    },
});

// 錯誤頁
export const errorPageRouteMap = new EnumMap(PageRoute, {
    NOT_FOUND: {
        path: '404',
        component: () => import('components/pages/error/NotFound.vue'),
        meta: {title: '404'},
    },
});
