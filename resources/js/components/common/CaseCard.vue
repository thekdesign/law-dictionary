<template>
    <RouterLink
        :to="{name: 'CASE_DETAIL', params: {caseId: caseItem.id}}"
        class="group relative block overflow-hidden rounded-[14px] border border-paper-300 bg-white px-5 pt-5 pb-5 shadow-[0_2px_8px_rgba(31,48,87,0.06)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(31,48,87,0.13)]"
        :style="{'--accent': accent}"
        :class="{'hover:border-[var(--accent)]': true}"
    >
        <span
            class="absolute top-0 left-0 h-full w-1 opacity-85"
            :style="{background: 'var(--accent)'}"
        />

        <div class="flex items-center gap-2 text-xs text-gray-500">
            <span
                class="font-serif font-bold text-sm"
                :style="{color: 'var(--accent)'}"
            >
                {{ caseItem.number }}
            </span>
            <span class="text-base leading-none">{{ caseItem.emoji }}</span>
            <span
                v-if="caseItem.isAdult"
                class="rounded px-1.5 py-0.5 bg-seal-500 text-paper-100 text-[0.85rem] font-bold tracking-wider leading-none"
            >
                🔞
            </span>
            <span class="ml-auto rounded-full bg-paper-200 px-2 py-0.5 text-[0.7rem] text-gray-600">
                {{ partLabel }}
            </span>
        </div>

        <h3 class="mt-2.5 mb-1.5 font-serif text-lg font-bold leading-snug text-gray-900">
            {{ caseItem.title }}
        </h3>

        <p class="m-0 text-[0.88rem] leading-relaxed text-gray-600">
            {{ caseItem.hook }}
        </p>

        <div class="mt-3 text-xs font-medium" :style="{color: 'var(--accent)'}">
            看律師怎麼說 →
        </div>
    </RouterLink>
</template>

<script>
import {partMap} from 'maps/common/Part';

export default {
    name: 'CaseCard',
    props: {
        caseItem: {type: Object, required: true},
    },
    computed: {
        partInfo() {
            return partMap.get(this.caseItem.partKey) || {};
        },
        partLabel() {
            return this.partInfo.label || '';
        },
        accent() {
            return this.partInfo.accent || '#3E5790';
        },
    },
};
</script>
