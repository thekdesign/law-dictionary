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

        <footer class="text-center px-4 py-6 text-xs text-gray-500 space-y-2">
            <div>僅供娛樂與學習，個案請洽執業律師</div>
            <div class="flex justify-center flex-wrap gap-x-3 gap-y-1">
                <a
                    href="mailto:thek8014@proton.me?subject=%E3%80%90%E6%B3%95%E5%BE%8B%E5%A5%87%E6%83%B3%E3%80%91%E6%96%B0%E9%A1%8C%E7%9B%AE%E6%8A%95%E7%A8%BF"
                    class="text-primary-700 hover:text-gold-600 transition-colors underline-offset-2 hover:underline"
                >
                    📨 投稿新題目
                </a>
                <span class="text-gray-400">·</span>
                <a
                    href="mailto:thek8014@proton.me?subject=%E3%80%90%E6%B3%95%E5%BE%8B%E5%A5%87%E6%83%B3%E3%80%91%E5%95%8F%E9%A1%8C%E5%8F%8D%E6%98%A0"
                    class="text-primary-700 hover:text-gold-600 transition-colors underline-offset-2 hover:underline"
                >
                    🐛 反映問題
                </a>
            </div>
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
