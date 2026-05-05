<template>
    <div class="home">
        <section class="home__hero">
            <div class="home__hero-tag">⚖️ 22 場奇案 · 5 大主題</div>
            <h1 class="home__title">法律奇想終極全紀錄</h1>
            <p class="home__lead">
                從衛生紙打人到女鬼生子，從通靈居士到移動城堡——
                每一個你以為「這也能告？」的情境，都認真用法條跟你聊過。
            </p>
            <div class="home__stats">
                <span><strong>{{ caseStore.list.length - 1 }}</strong> 案</span>
                <span><strong>{{ partList.length }}</strong> 大分類</span>
                <span><strong>1</strong> 篇結語</span>
            </div>
        </section>

        <section class="home__filter">
            <button
                class="home__filter-chip"
                :class="{'is-active': activePartKey === ''}"
                @click="activePartKey = ''"
            >
                全部
            </button>
            <button
                v-for="p in partList"
                :key="p.key"
                class="home__filter-chip"
                :class="{'is-active': activePartKey === p.key}"
                :style="{'--accent': p.accent}"
                @click="activePartKey = p.key"
            >
                {{ p.emoji }} {{ p.label }}
            </button>
        </section>

        <section
            v-for="part in displayParts"
            :key="part.key"
            class="home__part"
        >
            <header class="home__part-head">
                <h2 class="home__part-title" :style="{'--accent': part.accent}">
                    <span class="home__part-emoji">{{ part.emoji }}</span>
                    {{ part.label }}
                </h2>
                <p class="home__part-blurb">{{ part.blurb }}</p>
            </header>
            <div class="home__grid">
                <CaseCard v-for="c in part.cases" :key="c.id" :case-item="c" />
            </div>
        </section>

        <section class="home__epilogue" v-if="epilogue">
            <RouterLink :to="{name: 'CASE_DETAIL', params: {caseId: epilogue.id}}" class="home__epilogue-link">
                <span class="home__epilogue-emoji">{{ epilogue.emoji }}</span>
                <div>
                    <h3 class="home__epilogue-title">{{ epilogue.title }}</h3>
                    <p class="home__epilogue-hook">{{ epilogue.hook }}</p>
                </div>
                <span class="home__epilogue-cta">→</span>
            </RouterLink>
        </section>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useCaseStore} from 'stores/case/case';
import {partList} from 'maps/common/Part';
import CaseCard from 'components/common/CaseCard.vue';

export default {
    name: 'HomeIndex',
    components: {CaseCard},
    setup() {
        const caseStore = useCaseStore();
        const activePartKey = ref('');

        const epilogue = computed(() => caseStore.list.find((c) => c.id === 99));
        const regularCases = computed(() => caseStore.list.filter((c) => c.id !== 99));

        const displayParts = computed(() => {
            const grouped = regularCases.value.reduce((acc, c) => {
                (acc[c.partKey] = acc[c.partKey] || []).push(c);
                return acc;
            }, {});
            return partList
                .filter((p) => activePartKey.value === '' || activePartKey.value === p.key)
                .map((p) => ({...p, cases: grouped[p.key] || []}))
                .filter((p) => p.cases.length > 0);
        });

        return {
            caseStore,
            partList,
            activePartKey,
            displayParts,
            epilogue,
        };
    },
};
</script>

<style lang="scss" scoped>
.home {
    &__hero {
        padding: 2.4rem 1.5rem 2.6rem;
        margin-bottom: 1.8rem;
        text-align: center;
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%),
            theme('colors.paper.200');
        border-radius: 18px;
        border: 1px solid theme('colors.paper.300');
        box-shadow: 0 4px 18px rgba(31, 48, 87, 0.05);
    }

    &__hero-tag {
        display: inline-block;
        padding: 0.3rem 0.85rem;
        font-size: 0.78rem;
        letter-spacing: 0.06em;
        color: theme('colors.gold.700');
        background: theme('colors.gold.100');
        border-radius: 999px;
        margin-bottom: 1rem;
    }

    &__title {
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        font-size: clamp(1.6rem, 4vw, 2.3rem);
        color: theme('colors.primary.800');
        margin: 0 0 0.7rem;
        letter-spacing: 0.02em;
    }

    &__lead {
        max-width: 580px;
        margin: 0 auto;
        color: theme('colors.gray.700');
        font-size: 0.95rem;
        line-height: 1.85;
    }

    &__stats {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 1.4rem;
        font-size: 0.85rem;
        color: theme('colors.gray.600');

        strong {
            color: theme('colors.primary.700');
            font-size: 1.1rem;
            margin-right: 0.2rem;
            font-family: 'Noto Serif TC', serif;
        }
    }

    &__filter {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        margin-bottom: 1.5rem;
    }

    &__filter-chip {
        --accent: theme('colors.primary.500');

        padding: 0.4rem 0.95rem;
        border-radius: 999px;
        background: theme('colors.white');
        border: 1px solid theme('colors.paper.300');
        font-size: 0.85rem;
        color: theme('colors.gray.700');
        cursor: pointer;
        transition: all 0.18s;

        &:hover {
            border-color: var(--accent);
            color: var(--accent);
        }

        &.is-active {
            background: var(--accent);
            border-color: var(--accent);
            color: theme('colors.white');
        }
    }

    &__part {
        margin-top: 2.2rem;
    }

    &__part-head {
        margin-bottom: 1rem;
    }

    &__part-title {
        --accent: theme('colors.primary.700');

        display: flex;
        align-items: center;
        gap: 0.55rem;
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        font-size: 1.25rem;
        color: theme('colors.gray.900');
        margin: 0 0 0.3rem;
        padding-bottom: 0.55rem;
        border-bottom: 2px solid var(--accent);
    }

    &__part-emoji {
        font-size: 1.4rem;
    }

    &__part-blurb {
        margin: 0;
        font-size: 0.85rem;
        color: theme('colors.gray.600');
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 0.95rem;
    }

    &__epilogue {
        margin-top: 2.6rem;
    }

    &__epilogue-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.1rem 1.4rem;
        background: theme('colors.primary.800');
        color: theme('colors.paper.100');
        border-radius: 14px;
        transition: background 0.18s;
        box-shadow: 0 4px 18px rgba(10, 20, 40, 0.18);

        &:hover {
            background: theme('colors.primary.700');
        }
    }

    &__epilogue-emoji {
        font-size: 2rem;
        line-height: 1;
    }

    &__epilogue-title {
        margin: 0 0 0.2rem;
        font-family: 'Noto Serif TC', serif;
        font-size: 1.1rem;
        color: theme('colors.gold.200');
    }

    &__epilogue-hook {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.85;
    }

    &__epilogue-cta {
        margin-left: auto;
        font-size: 1.5rem;
        color: theme('colors.gold.300');
    }
}
</style>
