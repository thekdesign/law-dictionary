import {createRouter, createWebHistory} from 'vue-router';
import {routes} from './routes';

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _from, savedPosition) {
        // 上一頁／下一頁：還原原本捲動位置
        if (savedPosition) {
            return savedPosition;
        }
        // 點擊錨點：平滑捲到對應段落
        if (to.hash) {
            return {el: to.hash, behavior: 'smooth', top: 80};
        }
        // 一般導航：回頂端
        return {top: 0};
    },
});
