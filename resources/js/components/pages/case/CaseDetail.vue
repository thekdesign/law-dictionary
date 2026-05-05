<template>
    <div v-if="caseItem">
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="inline-block rounded-full bg-paper-200 px-3.5 py-1.5 text-sm text-primary-700 mb-6 transition-colors hover:bg-gold-200 hover:text-primary-800"
        >
            ← 回到案件總覽
        </RouterLink>

        <header
            class="mb-7 rounded-[14px] border-l-[6px] bg-white px-7 pt-6 pb-7 shadow-[0_2px_12px_rgba(31,48,87,0.08)]"
            :style="{borderColor: accent}"
        >
            <div class="flex items-center gap-2 text-xs text-gray-500">
                <span class="font-serif font-bold" :style="{color: accent}">案 {{ caseItem.number }}</span>
                <span class="rounded-full bg-paper-200 px-2 py-0.5">
                    {{ partInfo.emoji }} {{ partInfo.label }}
                </span>
                <span
                    v-if="caseItem.isAdult"
                    class="rounded bg-seal-500 text-paper-100 text-[0.7rem] font-bold tracking-wider px-1.5 py-0.5"
                >
                    🔞 18+
                </span>
            </div>
            <h1 class="mt-2.5 mb-2 font-serif text-2xl font-bold leading-snug text-gray-900">
                <span class="mr-2">{{ caseItem.emoji }}</span>{{ caseItem.title }}
            </h1>
            <p class="m-0 text-[0.95rem] italic leading-relaxed text-gray-700">
                {{ caseItem.hook }}
            </p>
        </header>

        <section class="flex flex-col gap-5">
            <div class="rounded-[14px] border-l-4 border-gray-400 bg-paper-200 px-7 py-5 shadow-[0_2px_12px_rgba(31,48,87,0.06)]">
                <div class="font-serif font-bold text-gray-700 text-sm tracking-wider mb-2">我</div>
                <div class="text-base leading-loose text-gray-800">{{ caseItem.question }}</div>
            </div>

            <div class="rounded-[14px] border-l-4 border-primary-700 bg-white px-7 py-5 shadow-[0_2px_12px_rgba(31,48,87,0.06)]">
                <div class="flex items-center gap-1.5 font-serif font-bold text-primary-700 text-sm tracking-wider mb-2">
                    <span class="text-base">⚖️</span> 律師
                </div>
                <MarkdownView :source="caseItem.answer" />
            </div>
        </section>

        <nav class="mt-9 grid gap-3 grid-cols-1 sm:grid-cols-2">
            <RouterLink
                v-if="prevCase"
                :to="{name: 'CASE_DETAIL', params: {caseId: prevCase.id}}"
                class="flex flex-col gap-1 rounded-xl border border-paper-300 bg-white px-5 py-4 text-sm text-gray-700 transition-all hover:border-primary-500 hover:-translate-y-0.5"
            >
                <span class="text-[0.72rem] tracking-widest text-gray-500">上一案</span>
                <span class="font-serif font-bold text-primary-800">{{ prevCase.number }} · {{ prevCase.title }}</span>
            </RouterLink>
            <RouterLink
                v-if="nextCase"
                :to="{name: 'CASE_DETAIL', params: {caseId: nextCase.id}}"
                class="flex flex-col gap-1 rounded-xl border border-paper-300 bg-white px-5 py-4 text-sm text-gray-700 transition-all hover:border-primary-500 hover:-translate-y-0.5 sm:text-right"
                :class="{'sm:col-start-2': !prevCase}"
            >
                <span class="text-[0.72rem] tracking-widest text-gray-500">下一案</span>
                <span class="font-serif font-bold text-primary-800">{{ nextCase.number }} · {{ nextCase.title }}</span>
            </RouterLink>
        </nav>
    </div>

    <div v-else class="text-center py-12 px-4 text-gray-600">
        <p class="mb-6">找不到這個案件，可能網址錯了。</p>
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="inline-block rounded-full bg-paper-200 px-3.5 py-1.5 text-sm text-primary-700 transition-colors hover:bg-gold-200"
        >
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
