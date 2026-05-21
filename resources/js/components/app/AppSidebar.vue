<template>
    <div class="flex flex-col gap-5 text-sm">
        <!-- 搜尋框 -->
        <div class="relative">
            <input
                v-model="filtersStore.searchQuery"
                type="search"
                placeholder="🔍 搜尋案件、法條..."
                class="w-full rounded-full border border-paper-300 bg-white px-4 py-2 pr-9 text-sm text-gray-700 transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
            />
            <button
                v-if="filtersStore.searchQuery"
                type="button"
                class="absolute inset-y-0 right-1.5 my-auto flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs leading-none text-gray-500 hover:bg-paper-200 hover:text-primary-700"
                aria-label="清除搜尋"
                @click="filtersStore.clearSearch()"
            >
                ✕
            </button>
        </div>

        <!-- 主選單：最新／18+／結語 -->
        <nav class="flex flex-col gap-0.5">
            <h3 class="px-3 mb-1 text-[0.7rem] font-bold tracking-widest text-gray-500">主選單</h3>
            <button
                type="button"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
                @click="goToAnchor('#part-latest')"
            >
                <span class="text-base leading-none">🆕</span>
                <span>最新案件</span>
            </button>
            <button
                type="button"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
                @click="goToAnchor('#part-adult')"
            >
                <span class="text-base leading-none">🔞</span>
                <span>18+ 案件區</span>
            </button>
            <RouterLink
                v-if="epilogueId"
                :to="{name: 'CASE_DETAIL', params: {caseId: epilogueId}}"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
                @click="$emit('navigate')"
            >
                <span class="text-base leading-none">📜</span>
                <span>結語</span>
            </RouterLink>
        </nav>

        <!-- 分類錨點 -->
        <nav class="flex flex-col gap-0.5">
            <h3 class="px-3 mb-1 text-[0.7rem] font-bold tracking-widest text-gray-500">分類</h3>
            <button
                v-for="p in partList"
                :key="p.key"
                type="button"
                class="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200"
                :style="{'--accent': p.accent}"
                @click="goToAnchor(`#part-${p.key.toLowerCase()}`)"
            >
                <span class="text-base leading-none">{{ p.emoji }}</span>
                <span class="flex-1 truncate group-hover:text-[var(--accent)]">{{ partShortLabel(p.label) }}</span>
                <span class="text-xs text-gray-400">{{ partCounts[p.key] || 0 }}</span>
            </button>
        </nav>

        <!-- 投稿 / 反映 -->
        <div class="flex flex-col gap-0.5 pt-4 border-t border-paper-300">
            <h3 class="px-3 mb-1 text-[0.7rem] font-bold tracking-widest text-gray-500">回饋</h3>
            <a
                href="mailto:thek8014@proton.me?subject=%E3%80%90%E6%B3%95%E5%BE%8B%E5%A5%87%E6%83%B3%E3%80%91%E6%96%B0%E9%A1%8C%E7%9B%AE%E6%8A%95%E7%A8%BF"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
            >
                <span class="text-base leading-none">📨</span>
                <span>投稿新題目</span>
            </a>
            <a
                href="mailto:thek8014@proton.me?subject=%E3%80%90%E6%B3%95%E5%BE%8B%E5%A5%87%E6%83%B3%E3%80%91%E5%95%8F%E9%A1%8C%E5%8F%8D%E6%98%A0"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
            >
                <span class="text-base leading-none">🐛</span>
                <span>反映問題</span>
            </a>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useCaseStore} from 'stores/case/case';
import {useFiltersStore} from 'stores/ui/filters';
import {partList} from 'maps/common/Part';

export default {
    name: 'AppSidebar',
    emits: ['navigate'],
    setup(_props, {emit}) {
        const route = useRoute();
        const router = useRouter();
        const caseStore = useCaseStore();
        const filtersStore = useFiltersStore();

        const epilogueId = computed(() => {
            const ep = caseStore.list.find((c) => c.id === 99);
            return ep ? ep.id : null;
        });

        const partCounts = computed(() => caseStore.list.reduce((acc, c) => {
            if (c.id === 99) return acc;
            acc[c.partKey] = (acc[c.partKey] || 0) + 1;
            return acc;
        }, {}));

        // 「物理衝擊與身體權限」太長，sidebar 顯示截斷成「物理衝擊」
        const partShortLabel = (label) => label.split('與')[0];

        const scrollToHash = (hash) => {
            const el = document.querySelector(hash);
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({top, behavior: 'smooth'});
        };

        const goToAnchor = (hash) => {
            if (route.name === 'HOME_INDEX') {
                scrollToHash(hash);
            } else {
                router.push({name: 'HOME_INDEX', hash});
            }
            emit('navigate');
        };

        return {
            filtersStore,
            partList,
            partCounts,
            partShortLabel,
            epilogueId,
            goToAnchor,
        };
    },
};
</script>
