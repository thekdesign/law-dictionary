import {defineStore} from 'pinia';
import * as caseApi from 'apis/case/case';

export const useCaseStore = defineStore('case', {
    state: () => ({
        list: [],
    }),
    getters: {
        getById: (state) => (id) => state.list.find((c) => c.id === Number(id)),
        listByPart: (state) => state.list.reduce((acc, c) => {
            (acc[c.partKey] = acc[c.partKey] || []).push(c);
            return acc;
        }, {}),
    },
    actions: {
        async requestGetCaseList() {
            this.list = await caseApi.getCaseList();
        },
    },
});
