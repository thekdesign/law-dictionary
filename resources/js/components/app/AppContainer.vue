<template>
    <div class="app-shell">
        <header class="app-shell__header">
            <RouterLink :to="{name: 'HOME_INDEX'}" class="app-shell__brand">
                <span class="app-shell__logo">⚖️</span>
                <span class="app-shell__title">
                    法律奇想終極全紀錄
                </span>
                <span class="app-shell__sub">22 場奇案問答</span>
            </RouterLink>

            <nav class="app-shell__nav">
                <RouterLink
                    v-for="item in mainNavList"
                    :key="item.key"
                    :to="{name: item.key}"
                    class="app-shell__nav-link"
                    exact-active-class="is-active"
                >
                    <span class="app-shell__nav-icon">{{ item.icon }}</span>
                    <span class="app-shell__nav-label">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </header>

        <main class="app-shell__main">
            <RouterView />
        </main>

        <footer class="app-shell__footer">
            僅供娛樂與學習，個案請洽執業律師
            <span class="app-shell__footer-divider">·</span>
            <a href="https://github.com/" target="_blank" rel="noreferrer">原始檔</a>
        </footer>
    </div>
</template>

<script>
import {mainNavList} from 'maps/navigation/MainNav';

export default {
    name: 'AppContainer',
    setup() {
        return {mainNavList};
    },
};
</script>

<style lang="scss" scoped>
.app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__header {
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1.5rem;
        padding: 0.85rem 1.5rem;
        background: theme('colors.primary.800');
        color: theme('colors.paper.100');
        box-shadow: 0 4px 18px rgba(10, 20, 40, 0.18);
    }

    &__brand {
        display: flex;
        align-items: baseline;
        gap: 0.55rem;
    }

    &__logo {
        font-size: 1.6rem;
        line-height: 1;
    }

    &__title {
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        font-size: 1.18rem;
        letter-spacing: 0.04em;
    }

    &__sub {
        font-size: 0.78rem;
        opacity: 0.75;
        letter-spacing: 0.05em;
    }

    &__nav {
        display: flex;
        gap: 0.25rem;
        margin-left: auto;
    }

    &__nav-link {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        font-size: 0.9rem;
        color: theme('colors.paper.200');
        transition: background 0.15s, color 0.15s;

        &:hover {
            background: theme('colors.primary.700');
            color: theme('colors.gold.200');
        }

        &.is-active {
            background: theme('colors.gold.300');
            color: theme('colors.primary.900');
            font-weight: 700;
        }
    }

    &__main {
        flex: 1;
        max-width: 960px;
        width: 100%;
        margin: 0 auto;
        padding: 1.75rem 1.25rem 4rem;
    }

    &__footer {
        text-align: center;
        padding: 1.25rem;
        font-size: 0.78rem;
        color: theme('colors.gray.500');
    }

    &__footer-divider {
        margin: 0 0.5rem;
        color: theme('colors.gray.400');
    }
}

@media (max-width: 640px) {
    .app-shell__header {
        padding: 0.7rem 1rem;
    }

    .app-shell__sub {
        display: none;
    }

    .app-shell__title {
        font-size: 1rem;
    }

    .app-shell__nav-label {
        display: none;
    }
}
</style>
