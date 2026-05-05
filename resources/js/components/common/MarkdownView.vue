<template>
    <div class="md font-sans text-base leading-loose text-gray-800" v-html="rendered" />
</template>

<script>
import {marked} from 'marked';

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
        @apply mt-6 mb-2.5 font-serif font-bold text-primary-800;
    }
}
</style>
