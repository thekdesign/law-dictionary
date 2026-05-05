import Enum from 'enum';

// 六大主題
export const Part = new Enum([
    'PHYSICAL',      // 物理衝擊與身體權限
    'INTIMACY',      // 親密關係與性自主權
    'PROPERTY',      // 物權所有與職場資源
    'HUMAN_RIGHT',   // 人權保障與人格名譽
    'FINANCE',       // 金融、稅務、商業詐欺
    'SUPERNATURAL',  // 超自然、奇幻、跨次元
], {ignoreCase: false});
