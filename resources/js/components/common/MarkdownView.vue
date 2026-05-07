<template>
    <div class="md font-sans text-base leading-loose text-gray-800" v-html="rendered" />
</template>

<script>
import {marked} from 'marked';

// 把標題文字轉成 URL 安全的 slug（保留 CJK 字、英數、底線、連字號）
const slugify = (str) => str
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^一-鿿\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// 自訂 heading renderer：給每個標題加 id 與可點擊的 # 錨點
marked.use({
    renderer: {
        heading({tokens, depth}) {
            const inner = this.parser.parseInline(tokens);
            const plain = tokens.map((t) => t.raw || t.text || '').join('');
            const id = slugify(plain) || `h${depth}-${Math.random().toString(36).slice(2, 8)}`;
            return `<h${depth} id="${id}" class="md-h">`
                + `<a href="#${id}" class="md-anchor" aria-label="連結到此段落">#</a>`
                + `${inner}</h${depth}>\n`;
        },
    },
});

marked.setOptions({
    breaks: false,
    gfm: true,
});

export default {
    name: 'MarkdownView',
    props: {
        source: {type: String, required: true},
    },
    computed: {
        rendered() {
            return marked.parse(this.source || '');
        },
    },
};
</script>

<!--
    說明：marked 產出的是純 HTML 標籤，無法在運行時加 Tailwind class。
    這裡用 @apply 把 Tailwind 工具類轉成 :deep 選擇器，等同於在 markdown 標籤上加 class。
-->
<style lang="scss" scoped>
.md {
    :deep(p) { @apply my-3.5; }

    :deep(strong) { @apply font-bold text-primary-800; }

    :deep(em) { @apply italic text-seal-700; }

    :deep(code) {
        @apply rounded bg-paper-200 px-1.5 py-0.5 text-[0.92em] text-seal-700;
    }

    :deep(blockquote) {
        @apply my-5 rounded-r-lg border-l-4 border-gold-500 bg-gold-100 px-4 py-3.5 text-[0.96rem] text-gray-800;
    }
    :deep(blockquote p) { @apply m-0; }

    :deep(ol) { @apply list-decimal pl-6 my-2 mb-4; }
    :deep(ul) { @apply list-disc pl-6 my-2 mb-4; }
    :deep(li) { @apply my-2 leading-loose; }
    :deep(li ol), :deep(li ul) { @apply my-1.5; }
    :deep(li > strong:first-child) { @apply text-primary-700; }

    :deep(table) {
        @apply w-full my-5 border-collapse text-[0.92rem] bg-white rounded-xl overflow-hidden shadow-[0_1px_6px_rgba(31,48,87,0.06)];
    }
    :deep(thead) { @apply bg-primary-700 text-paper-100; }
    :deep(th) { @apply px-3.5 py-2.5 text-left font-bold; }
    :deep(td) { @apply px-3.5 py-2.5 border-t border-paper-300; }
    :deep(tbody tr:nth-child(even)) { @apply bg-paper-100; }

    :deep(hr) { @apply my-6 border-0 border-t border-dashed border-paper-400; }

    :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
        @apply mt-6 mb-2.5 font-serif font-bold text-primary-800 scroll-mt-20;
    }

    :deep(.md-anchor) {
        @apply mr-1.5 text-gold-500 opacity-0 transition-opacity no-underline cursor-pointer;
    }

    :deep(.md-h:hover .md-anchor) {
        @apply opacity-70;
    }

    :deep(.md-anchor:hover) {
        @apply opacity-100;
    }
}
</style>
