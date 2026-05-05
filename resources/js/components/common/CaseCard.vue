<template>
    <RouterLink
        :to="{name: 'CASE_DETAIL', params: {caseId: caseItem.id}}"
        class="case-card"
        :style="{'--accent': accent}"
    >
        <div class="case-card__head">
            <span class="case-card__number">{{ caseItem.number }}</span>
            <span class="case-card__emoji">{{ caseItem.emoji }}</span>
            <span class="case-card__part">{{ partLabel }}</span>
        </div>
        <h3 class="case-card__title">{{ caseItem.title }}</h3>
        <p class="case-card__hook">{{ caseItem.hook }}</p>
        <div class="case-card__cta">看律師怎麼說 →</div>
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

<style lang="scss" scoped>
.case-card {
    --accent: #3E5790;

    display: block;
    position: relative;
    padding: 1.2rem 1.3rem 1.3rem;
    border-radius: 14px;
    background: theme('colors.white');
    border: 1px solid theme('colors.paper.300');
    box-shadow: 0 2px 8px rgba(31, 48, 87, 0.06);
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 4px; height: 100%;
        background: var(--accent);
        opacity: 0.85;
    }

    &:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
        box-shadow: 0 6px 22px rgba(31, 48, 87, 0.13);
    }

    &__head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.78rem;
        color: theme('colors.gray.500');
    }

    &__number {
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        font-size: 0.9rem;
        color: var(--accent);
    }

    &__emoji {
        font-size: 1.1rem;
        line-height: 1;
    }

    &__part {
        margin-left: auto;
        padding: 0.1rem 0.55rem;
        border-radius: 999px;
        background: theme('colors.paper.200');
        color: theme('colors.gray.600');
        font-size: 0.7rem;
    }

    &__title {
        margin: 0.55rem 0 0.4rem;
        font-family: 'Noto Serif TC', serif;
        font-weight: 700;
        font-size: 1.1rem;
        color: theme('colors.gray.900');
        line-height: 1.4;
    }

    &__hook {
        margin: 0;
        font-size: 0.88rem;
        color: theme('colors.gray.600');
        line-height: 1.55;
    }

    &__cta {
        margin-top: 0.9rem;
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--accent);
    }
}
</style>
