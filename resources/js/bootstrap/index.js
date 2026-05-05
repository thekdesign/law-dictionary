import {setActivePinia} from 'pinia';
import {prepareCatalog} from './catalog';
import {preparePageRoute} from './router';

/**
 * mount 之前要把 case 目錄載入；資料寫死在 data/cases.js 但仍走 store action，
 * 之後若要改成從 markdown 動態解析，替換 store 內部即可。
 */
export const boot = async ({pinia}) => {
    setActivePinia(pinia);

    await prepareCatalog();
    await preparePageRoute();
};
