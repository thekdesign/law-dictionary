import {createRouter, createWebHistory} from 'vue-router';
import {routes} from './routes';

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {el: to.hash, behavior: 'smooth', top: 80};
        }
        return {top: 0};
    },
});
