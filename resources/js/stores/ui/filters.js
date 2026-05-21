import {defineStore} from 'pinia';

// 跨元件共用的搜尋／分類篩選狀態（sidebar 與 HomeIndex 都會用）
export const useFiltersStore = defineStore('filters', {
    state: () => ({
        searchQuery: '',
        activePartKey: '',
    }),
    actions: {
        clearSearch() {
            this.searchQuery = '';
        },
    },
});
