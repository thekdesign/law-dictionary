<template>
    <div class="flex flex-col min-h-screen">
        <header
            class="sticky top-0 z-50 flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 bg-primary-800 text-paper-100 shadow-[0_4px_18px_rgba(10,20,40,0.18)] sm:px-6"
        >
            <RouterLink :to="{name: 'HOME_INDEX'}" class="flex items-baseline gap-2">
                <span class="text-2xl leading-none">⚖️</span>
                <span class="font-serif font-bold text-base sm:text-lg tracking-wider">
                    法律奇想終極全紀錄
                </span>
                <span class="hidden sm:inline text-xs opacity-75 tracking-wider">
                    {{ caseStore.list.length - 1 }} 場奇案問答
                </span>
            </RouterLink>

            <nav class="flex gap-1 ml-auto">
                <RouterLink
                    v-for="item in mainNavList"
                    :key="item.key"
                    :to="{name: item.key}"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-paper-200 transition-colors hover:bg-primary-700 hover:text-gold-200"
                    active-class="!bg-gold-300 !text-primary-900 !font-bold"
                >
                    <span class="text-base">{{ item.icon }}</span>
                    <span class="hidden sm:inline">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </header>

        <main class="flex-1 w-full max-w-[960px] mx-auto px-5 pt-7 pb-16">
            <RouterView />
        </main>

        <footer class="text-center px-4 py-5 text-xs text-gray-500">
            僅供娛樂與學習，個案請洽執業律師
        </footer>
    </div>
</template>

<script>
import {useCaseStore} from 'stores/case/case';
import {mainNavList} from 'maps/navigation/MainNav';

export default {
    name: 'AppContainer',
    setup() {
        const caseStore = useCaseStore();
        return {mainNavList, caseStore};
    },
};
</script>
