<template>
    <div>
        <section
            class="mb-7 rounded-[18px] border border-paper-300 px-6 py-10 text-center shadow-[0_4px_18px_rgba(31,48,87,0.05)]"
            style="background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%), #F4ECDA;"
        >
            <div class="inline-block rounded-full bg-gold-100 px-3.5 py-1 text-xs tracking-wider text-gold-700 mb-4">
                ⚖️ {{ caseStore.list.length - 1 }} 場奇案 · {{ partList.length }} 大主題
            </div>
            <h1 class="font-serif font-bold text-3xl sm:text-4xl text-primary-800 m-0 mb-3 tracking-wide">
                法律奇想終極全紀錄
            </h1>
            <p class="max-w-xl mx-auto text-gray-700 text-sm leading-loose">
                從衛生紙打人到女鬼生子，從通靈居士到移動城堡——
                每一個你以為「這也能告？」的情境，都認真用法條跟你聊過。
            </p>
            <div class="flex justify-center gap-6 mt-5 text-sm text-gray-600">
                <span><strong class="font-serif text-base text-primary-700 mr-1">{{ caseStore.list.length - 1 }}</strong>案</span>
                <span><strong class="font-serif text-base text-primary-700 mr-1">{{ partList.length }}</strong>大分類</span>
                <span><strong class="font-serif text-base text-primary-700 mr-1">1</strong>篇結語</span>
            </div>
        </section>

        <section class="flex flex-wrap gap-1.5 mb-6">
            <button
                class="rounded-full border px-4 py-1.5 text-sm transition-colors"
                :class="activePartKey === ''
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-paper-300 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-500'"
                @click="activePartKey = ''"
            >
                全部
            </button>
            <button
                v-for="p in partList"
                :key="p.key"
                class="rounded-full border px-4 py-1.5 text-sm transition-colors"
                :class="activePartKey === p.key ? 'text-white' : 'border-paper-300 bg-white text-gray-700'"
                :style="activePartKey === p.key
                    ? {background: p.accent, borderColor: p.accent}
                    : {'--hover-accent': p.accent}"
                @click="activePartKey = p.key"
            >
                {{ p.emoji }} {{ p.label }}
            </button>
        </section>

        <section
            v-for="part in displayParts"
            :id="`part-${part.key.toLowerCase()}`"
            :key="part.key"
            class="mt-9 scroll-mt-20"
        >
            <header class="mb-4">
                <h2
                    class="group m-0 mb-1 flex items-center gap-2 pb-2 font-serif text-xl font-bold text-gray-900 border-b-2"
                    :style="{borderColor: part.accent}"
                >
                    <a
                        :href="`#part-${part.key.toLowerCase()}`"
                        class="text-gold-500 opacity-0 transition-opacity no-underline cursor-pointer group-hover:opacity-70 hover:!opacity-100"
                        aria-label="連結到此分類"
                    >#</a>
                    <span class="text-2xl">{{ part.emoji }}</span>
                    {{ part.label }}
                </h2>
                <p class="m-0 text-sm text-gray-600">{{ part.blurb }}</p>
            </header>
            <div class="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
                <CaseCard v-for="c in part.cases" :key="c.id" :case-item="c" />
            </div>
        </section>

        <section v-if="adultCases.length" id="part-adult" class="mt-10 scroll-mt-20">
            <button
                v-if="!showAdult"
                class="flex w-full items-center gap-4 rounded-[14px] border-2 border-dashed border-seal-400 bg-paper-100 px-5 py-4 text-left transition-colors hover:bg-seal-100 hover:border-seal-500"
                @click="confirmAdult"
            >
                <span class="text-3xl leading-none">🔞</span>
                <div class="flex-1">
                    <h3 class="m-0 mb-1 font-serif text-base font-bold text-seal-700">
                        18+ 案件區（{{ adultCases.length }} 篇）
                    </h3>
                    <p class="m-0 text-xs text-gray-600 leading-relaxed">
                        含成人或敏感主題，點擊確認您已年滿 18 歲後展開。
                    </p>
                </div>
                <span class="whitespace-nowrap text-sm font-bold text-seal-600">展開 ▾</span>
            </button>

            <div v-else class="rounded-[14px] border border-seal-300 bg-paper-100 px-5 pt-5 pb-6">
                <header class="mb-2 flex items-center">
                    <h2 class="m-0 flex items-center gap-1.5 font-serif text-xl text-seal-700">
                        <span class="text-xl">🔞</span> 18+ 案件區
                    </h2>
                    <button
                        class="ml-auto rounded-full border border-seal-400 bg-transparent px-3 py-1 text-xs text-seal-600 hover:bg-seal-100"
                        @click="showAdult = false"
                    >
                        收合 ▴
                    </button>
                </header>
                <p class="m-0 mb-4 text-sm text-gray-600 leading-relaxed">
                    以下案件涉及性、暴力或其他成人主題。法律分析仍秉持「認真講幹話」精神，但建議成年讀者再展開。
                </p>
                <div class="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
                    <CaseCard v-for="c in adultCases" :key="c.id" :case-item="c" />
                </div>
            </div>
        </section>

        <section v-if="epilogue" class="mt-10">
            <RouterLink
                :to="{name: 'CASE_DETAIL', params: {caseId: epilogue.id}}"
                class="flex items-center gap-4 rounded-[14px] bg-primary-800 px-6 py-4 text-paper-100 transition-colors hover:bg-primary-700 shadow-[0_4px_18px_rgba(10,20,40,0.18)]"
            >
                <span class="text-3xl leading-none">{{ epilogue.emoji }}</span>
                <div class="flex-1">
                    <h3 class="m-0 mb-1 font-serif text-base text-gold-200">{{ epilogue.title }}</h3>
                    <p class="m-0 text-sm opacity-85">{{ epilogue.hook }}</p>
                </div>
                <span class="text-2xl text-gold-300">→</span>
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
        const showAdult = ref(false);

        const epilogue = computed(() => caseStore.list.find((c) => c.id === 99));
        const regularCases = computed(() => caseStore.list.filter((c) => c.id !== 99));
        // 主網格只顯示非 18+ 案件
        const safeCases = computed(() => regularCases.value.filter((c) => !c.isAdult));
        // 18+ 案件單獨收進可摺疊區
        const adultCases = computed(() => regularCases.value
            .filter((c) => c.isAdult)
            .filter((c) => activePartKey.value === '' || c.partKey === activePartKey.value));

        const displayParts = computed(() => {
            const grouped = safeCases.value.reduce((acc, c) => {
                (acc[c.partKey] = acc[c.partKey] || []).push(c);
                return acc;
            }, {});
            return partList
                .filter((p) => activePartKey.value === '' || activePartKey.value === p.key)
                .map((p) => ({...p, cases: grouped[p.key] || []}))
                .filter((p) => p.cases.length > 0);
        });

        const confirmAdult = () => {
            if (window.confirm('本區內容涉及性、暴力或其他成人主題。\n您是否已年滿 18 歲？')) {
                showAdult.value = true;
            }
        };

        return {
            caseStore,
            partList,
            activePartKey,
            displayParts,
            adultCases,
            showAdult,
            confirmAdult,
            epilogue,
        };
    },
};
</script>
