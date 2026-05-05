<template>
    <div v-if="caseItem" class="case-detail">
        <RouterLink :to="{name: 'HOME_INDEX'}" class="case-detail__back">
            ← 回到案件總覽
        </RouterLink>

        <header class="case-detail__head" :style="{'--accent': accent}">
            <div class="case-detail__meta">
                <span class="case-detail__number">案 {{ caseItem.number }}</span>
                <span class="case-detail__part-tag">{{ partInfo.emoji }} {{ partInfo.label }}</span>
            </div>
            <h1 class="case-detail__title">
                <span class="case-detail__emoji">{{ caseItem.emoji }}</span>
                {{ caseItem.title }}
            </h1>
            <p class="case-detail__hook">{{ caseItem.hook }}</p>
        </header>

        <section class="case-detail__qa">
            <div class="case-detail__bubble case-detail__bubble--user">
                <div class="case-detail__role">我</div>
                <div class="case-detail__bubble-body">{{ caseItem.question }}</div>
            </div>

            <div class="case-detail__bubble case-detail__bubble--lawyer">
                <div class="case-detail__role case-detail__role--lawyer">
                    <span>⚖️</span> 律師
                </div>
                <MarkdownView :source="caseItem.answer" />
            </div>
        </section>

        <nav class="case-detail__nav">
            <RouterLink
                v-if="prevCase"
                :to="{name: 'CASE_DETAIL', params: {caseId: prevCase.id}}"
                class="case-detail__nav-link case-detail__nav-link--prev"
            >
                <span class="case-detail__nav-label">上一案</span>
                <span class="case-detail__nav-title">{{ prevCase.number }} · {{ prevCase.title }}</span>
            </RouterLink>
            <RouterLink
                v-if="nextCase"
                :to="{name: 'CASE_DETAIL', params: {caseId: nextCase.id}}"
                class="case-detail__nav-link case-detail__nav-link--next"
            >
                <span class="case-detail__nav-label">下一案</span>
                <span class="case-detail__nav-title">{{ nextCase.number }} · {{ nextCase.title }}</span>
            </RouterLink>
        </nav>
    </div>

    <div v-else class="case-detail__missing">
        <p>找不到這個案件，可能網址錯了。</p>
        <RouterLink :to="{name: 'HOME_INDEX'}" class="case-detail__back">
            ← 回到案件總覽
        </RouterLink>
    </div>
</template>

<script>
import {computed, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useCaseStore} from 'stores/case/case';
import {partMap} from 'maps/common/Part';
import MarkdownView from 'components/common/MarkdownView.vue';

export default {
    name: 'CaseDetail',
    components: {MarkdownView},
    setup() {
        const route = useRoute();
        const caseStore = useCaseStore();

        const caseId = computed(() => Number(route.params.caseId));
        const caseItem = computed(() => caseStore.getById(caseId.value));

        const partInfo = computed(() => partMap.get(caseItem.value?.partKey) || {});
        const accent = computed(() => partInfo.value.accent || '#3E5790');

        // 上下案僅在「正規案件」之間切換，結語頁不串接
        const sequentialList = computed(() => caseStore.list.filter((c) => c.id !== 99));
        const currentIndex = computed(() => sequentialList.value.findIndex((c) => c.id === caseId.value));
        const prevCase = computed(() => (currentIndex.value > 0 ? sequentialList.value[currentIndex.value - 1] : null));
        const nextCase = computed(() => (currentIndex.value >= 0 && currentIndex.value < sequentialList.value.length - 1
            ? sequentialList.value[currentIndex.value + 1]
            : null));

        // 切換案件時，更新文件標題並滾回頂端
        watch(caseItem, (c) => {
            if (c) {
                document.title = `${c.number} · ${c.title} ｜ 法律奇想終極全紀錄`;
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        }, {immediate: true});

        return {
            caseItem,
            partInfo,
            accent,
            prevCase,
            nextCase,
        };
    },
};
</script>

<style lang="scss" scoped>
.case-detail {
    &__back {
        display: inline-block;
        padding: 0.4rem 0.85rem;
        font-size: 0.85rem;
        color: theme('colors.primary.700');
        background: theme('colors.paper.200');
        border-radius: 999px;
        margin-bottom: 1.4rem;
        transition: background 0.15s;

        &:hover {
            background: theme('colors.gold.200');
            color: theme('colors.primary.800');
        }
    }

    &__head {
        --accent: theme('colors.primary.700');

        padding: 1.4rem 1.6rem 1.6rem;
        margin-bottom: 1.8rem;
        background: theme('colors.white');
        border-radius: 14px;
        border-left: 6px solid var(--accent);
        box-shadow: 0 2px 12px rgba(31, 48, 87, 0.08);
    }

    &__meta {
        display: flex;
        gap: 0.6rem;
        align-items: center;
        font-size: 0.78rem;
        color: theme('colors.gray.500');
    }

    &__number {
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        color: var(--accent);
    }

    &__part-tag {
        padding: 0.1rem 0.55rem;
        background: theme('colors.paper.200');
        border-radius: 999px;
    }

    &__title {
        margin: 0.65rem 0 0.55rem;
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        font-size: 1.65rem;
        color: theme('colors.gray.900');
        line-height: 1.3;
    }

    &__emoji {
        margin-right: 0.4rem;
    }

    &__hook {
        margin: 0;
        font-size: 0.95rem;
        color: theme('colors.gray.700');
        font-style: italic;
        line-height: 1.65;
    }

    &__qa {
        display: flex;
        flex-direction: column;
        gap: 1.3rem;
    }

    &__bubble {
        padding: 1.2rem 1.4rem;
        border-radius: 14px;
        background: theme('colors.white');
        box-shadow: 0 2px 12px rgba(31, 48, 87, 0.06);

        &--user {
            background: theme('colors.paper.200');
            border-left: 4px solid theme('colors.gray.400');
        }

        &--lawyer {
            border-left: 4px solid theme('colors.primary.700');
        }
    }

    &__role {
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        color: theme('colors.gray.700');
        margin-bottom: 0.5rem;
        font-size: 0.92rem;
        letter-spacing: 0.06em;

        &--lawyer {
            color: theme('colors.primary.700');
            display: flex;
            align-items: center;
            gap: 0.35rem;

            span {
                font-size: 1.05rem;
            }
        }
    }

    &__bubble-body {
        font-size: 0.98rem;
        color: theme('colors.gray.800');
        line-height: 1.85;
    }

    &__nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.85rem;
        margin-top: 2.2rem;
    }

    &__nav-link {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        padding: 0.95rem 1.1rem;
        background: theme('colors.white');
        border-radius: 12px;
        border: 1px solid theme('colors.paper.300');
        font-size: 0.86rem;
        color: theme('colors.gray.700');
        transition: border-color 0.15s, transform 0.15s;

        &:hover {
            border-color: theme('colors.primary.500');
            transform: translateY(-2px);
        }

        &--next {
            text-align: right;
        }

        &--prev:only-child {
            grid-column: 1;
        }

        &--next:only-child {
            grid-column: 2;
        }
    }

    &__nav-label {
        font-size: 0.72rem;
        color: theme('colors.gray.500');
        letter-spacing: 0.08em;
    }

    &__nav-title {
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        color: theme('colors.primary.800');
    }

    &__missing {
        text-align: center;
        padding: 3rem 1rem;
        color: theme('colors.gray.600');

        p {
            margin-bottom: 1.5rem;
        }
    }
}

@media (max-width: 640px) {
    .case-detail__nav {
        grid-template-columns: 1fr;
    }

    .case-detail__nav-link--next {
        text-align: left;
    }
}
</style>
