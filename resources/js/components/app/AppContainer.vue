<template>
    <div class="flex flex-col min-h-screen">
        <header
            class="sticky top-0 z-50 flex items-center gap-4 px-4 py-3 bg-primary-800 text-paper-100 shadow-[0_4px_18px_rgba(10,20,40,0.18)] sm:px-6"
        >
            <button
                type="button"
                class="inline-flex items-center justify-center w-9 h-9 -ml-1 rounded-full text-paper-100 transition-colors hover:bg-primary-700 hover:text-gold-200"
                aria-label="開啟選單"
                @click="drawerOpen = true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
            </button>

            <RouterLink :to="{name: 'HOME_INDEX'}" class="flex items-baseline gap-2 min-w-0">
                <span class="text-2xl leading-none">⚖️</span>
                <span class="font-serif font-bold text-base sm:text-lg tracking-wider truncate">
                    法律奇想終極全紀錄
                </span>
                <span class="hidden sm:inline text-xs opacity-75 tracking-wider whitespace-nowrap">
                    {{ caseStore.list.length - 1 }} 場奇案問答
                </span>
            </RouterLink>
        </header>

        <main class="flex-1 w-full max-w-[960px] mx-auto px-5 pt-7 pb-16 min-w-0">
            <RouterView v-slot="{Component}">
                <Transition name="route-fade" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </main>

        <!-- 側邊選單 drawer（手機與桌面共用） -->
        <Teleport to="body">
            <Transition name="mask-fade">
                <div
                    v-if="drawerOpen"
                    class="fixed inset-0 z-[60] bg-primary-900/50 backdrop-blur-sm"
                    @click="drawerOpen = false"
                />
            </Transition>
            <Transition name="drawer-slide">
                <aside
                    v-if="drawerOpen"
                    class="fixed top-0 left-0 z-[70] h-full w-[280px] max-w-[85vw] bg-paper-100 shadow-[8px_0_28px_rgba(10,20,40,0.18)] overflow-y-auto"
                >
                    <div class="flex items-center justify-between px-5 py-3 border-b border-paper-300 bg-paper-200">
                        <span class="font-serif font-bold text-primary-800">
                            <span class="mr-1.5">⚖️</span>選單
                        </span>
                        <button
                            type="button"
                            class="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-paper-300 hover:text-primary-700"
                            aria-label="關閉選單"
                            @click="drawerOpen = false"
                        >
                            ✕
                        </button>
                    </div>
                    <div class="px-4 py-5">
                        <AppSidebar @navigate="drawerOpen = false" />
                    </div>
                </aside>
            </Transition>
        </Teleport>

        <footer class="text-center px-4 py-6 text-xs text-gray-500 space-y-2">
            <div>僅供娛樂與學習，個案請洽執業律師</div>
            <div class="flex justify-center flex-wrap gap-x-3 gap-y-1">
                <a
                    href="https://forms.gle/txn8WbYhYzdFgQ3E6"
                    target="_blank"
                    rel="noopener noreferrer"
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
import {ref, watch, onBeforeUnmount} from 'vue';
import {useRoute} from 'vue-router';
import {useCaseStore} from 'stores/case/case';
import AppSidebar from 'components/app/AppSidebar.vue';

export default {
    name: 'AppContainer',
    components: {AppSidebar},
    setup() {
        const caseStore = useCaseStore();
        const route = useRoute();
        const drawerOpen = ref(false);

        // 換頁時自動關閉 drawer
        watch(() => route.fullPath, () => {
            drawerOpen.value = false;
        });

        // drawer 開啟時鎖住 body 滾動
        watch(drawerOpen, (open) => {
            document.body.style.overflow = open ? 'hidden' : '';
        });
        onBeforeUnmount(() => {
            document.body.style.overflow = '';
        });

        return {caseStore, drawerOpen};
    },
};
</script>

<style>
.route-fade-enter-active,
.route-fade-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}
.route-fade-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.route-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.mask-fade-enter-active,
.mask-fade-leave-active {
    transition: opacity 220ms ease;
}
.mask-fade-enter-from,
.mask-fade-leave-to {
    opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: transform 260ms cubic-bezier(0.32, 0.72, 0.24, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
    transform: translateX(-100%);
}
</style>
