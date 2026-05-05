<template>
    <div class="text-center py-16 px-4">
        <div class="text-6xl mb-4">⚖️</div>
        <h1 class="font-serif text-2xl font-bold text-primary-800 m-0 mb-2">
            404 · 此案不存在
        </h1>
        <p class="text-gray-600 m-0 mb-6">
            這個案件還沒進入卷宗，請回到總覽看看其他奇案。
        </p>
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="inline-block rounded-full bg-primary-700 px-5 py-2 text-sm text-paper-100 transition-colors hover:bg-primary-800"
        >
            ← 回到案件總覽
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>
