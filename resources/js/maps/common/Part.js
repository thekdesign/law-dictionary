import {Part} from 'enums/common/Part';
import {EnumMap} from 'libs/EnumMap';

// 各部別的顯示資訊
export const partMap = new EnumMap(Part, {
    PHYSICAL: {
        label: '物理衝擊與身體權限',
        emoji: '🥊',
        accent: '#A84F25',
        blurb: '從衛生紙打人到斷指契約：身體不可侵犯的界線。',
    },
    INTIMACY: {
        label: '親密關係與性自主權',
        emoji: '💔',
        accent: '#CE6F45',
        blurb: '床上、溫泉裡、陽明山涼亭——法律不介入的劇場。',
    },
    PROPERTY: {
        label: '物權所有與職場資源',
        emoji: '📦',
        accent: '#947E48',
        blurb: '回收桶、衛生紙、葡萄籽：誰丟誰撿、誰擁有誰。',
    },
    HUMAN_RIGHT: {
        label: '人權保障與人格名譽',
        emoji: '🛡️',
        accent: '#3E5790',
        blurb: '模仿、外貌、嘔吐——憲法替每個人撐起的傘。',
    },
    FINANCE: {
        label: '金融、稅務與超自然',
        emoji: '💸',
        accent: '#A88216',
        blurb: '通靈居士、移動城堡、女鬼之子：荒謬遇上實質課稅原則。',
    },
});

export const partList = partMap.entries().map(([enumValue, value]) => ({
    key: enumValue.key,
    ...value,
}));
