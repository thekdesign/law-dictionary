<template>
    <div class="not-found">
        <div class="not-found__emoji">⚖️</div>
        <h1 class="not-found__title">404 · 此案不存在</h1>
        <p class="not-found__hint">這個案件還沒進入卷宗，請回到總覽看看其他奇案。</p>
        <RouterLink :to="{name: 'HOME_INDEX'}" class="not-found__btn">
            ← 回到案件總覽
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
.not-found {
    text-align: center;
    padding: 4rem 1rem;

    &__emoji {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    &__title {
        font-family: 'Noto Serif TC', serif;
        font-size: 1.6rem;
        color: theme('colors.primary.800');
        margin: 0 0 0.6rem;
    }

    &__hint {
        color: theme('colors.gray.600');
        margin: 0 0 1.6rem;
    }

    &__btn {
        display: inline-block;
        padding: 0.5rem 1.2rem;
        background: theme('colors.primary.700');
        color: theme('colors.paper.100');
        border-radius: 999px;
        font-size: 0.9rem;
        transition: background 0.15s;

        &:hover {
            background: theme('colors.primary.800');
        }
    }
}
</style>
