<template>
    <div class="md" v-html="rendered" />
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

<style lang="scss" scoped>
.md {
    font-family: 'Noto Sans TC', sans-serif;
    font-size: 0.98rem;
    line-height: 1.85;
    color: theme('colors.gray.800');

    :deep(p) {
        margin: 0.95rem 0;
    }

    :deep(strong) {
        color: theme('colors.primary.800');
        font-weight: 700;
    }

    :deep(em) {
        font-style: italic;
        color: theme('colors.seal.700');
    }

    :deep(code) {
        background: theme('colors.paper.200');
        color: theme('colors.seal.700');
        padding: 0.05em 0.35em;
        border-radius: 4px;
        font-size: 0.92em;
    }

    :deep(blockquote) {
        margin: 1.2rem 0;
        padding: 0.85rem 1.1rem;
        background: theme('colors.gold.100');
        border-left: 4px solid theme('colors.gold.500');
        border-radius: 0 8px 8px 0;
        color: theme('colors.gray.800');
        font-size: 0.96rem;

        p {
            margin: 0;
        }
    }

    :deep(ol), :deep(ul) {
        padding-left: 1.4rem;
        margin: 0.6rem 0 1.1rem;
    }

    :deep(ol) {
        list-style: decimal;
    }

    :deep(ul) {
        list-style: disc;
    }

    :deep(li) {
        margin: 0.55rem 0;
        line-height: 1.8;

        ol, ul {
            margin: 0.4rem 0;
        }
    }

    :deep(li > strong:first-child) {
        color: theme('colors.primary.700');
    }

    :deep(table) {
        width: 100%;
        margin: 1.2rem 0;
        border-collapse: collapse;
        font-size: 0.92rem;
        background: theme('colors.white');
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 1px 6px rgba(31, 48, 87, 0.06);
    }

    :deep(thead) {
        background: theme('colors.primary.700');
        color: theme('colors.paper.100');
    }

    :deep(th) {
        padding: 0.6rem 0.85rem;
        text-align: left;
        font-weight: 700;
    }

    :deep(td) {
        padding: 0.6rem 0.85rem;
        border-top: 1px solid theme('colors.paper.300');
    }

    :deep(tbody tr:nth-child(even)) {
        background: theme('colors.paper.100');
    }

    :deep(hr) {
        margin: 1.5rem 0;
        border: 0;
        border-top: 1px dashed theme('colors.paper.400');
    }

    :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
        margin: 1.4rem 0 0.6rem;
        font-family: 'Noto Serif TC', serif;
        color: theme('colors.primary.800');
        font-weight: 700;
    }
}
</style>
