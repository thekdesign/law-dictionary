import Enum from 'enum';

// 五大主題：對應「法律奇想」原文的五個分部
export const Part = new Enum([
    'PHYSICAL',     // 物理衝擊與身體權限
    'INTIMACY',     // 親密關係與性自主權
    'PROPERTY',     // 物權所有與職場資源
    'HUMAN_RIGHT',  // 人權保障與人格名譽
    'FINANCE',      // 金融、稅務與超自然
], {ignoreCase: false});
