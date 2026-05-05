import {useCaseStore} from 'stores/case/case';

export const prepareCatalog = async () => {
    const caseStore = useCaseStore();
    await caseStore.requestGetCaseList();
};
