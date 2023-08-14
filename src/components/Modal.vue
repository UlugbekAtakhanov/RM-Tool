<template>
    <n-button
        @click="showModal = true"
        ghost
        size="small"
        type="primary"
        class="hover:!bg-primary hover:!text-white"
        icon-placement="right"
        :render-icon="addIcon"
        :disabled="disabledState"
    >
        {{ buttonTitle }}
    </n-button>
    <n-modal v-model:show="showModal">
        <n-card style="width: 75%" :bordered="false" role="dialog" aria-modal="true">
            <slot />
        </n-card>
    </n-modal>
</template>

<script setup>
    import { h, ref } from "vue";
    import { NIcon } from "naive-ui";
    import { AddOutline } from "@vicons/ionicons5";

    const { buttonTitle, disabledState } = defineProps({ buttonTitle: String, disabledState: Boolean });

    const addIcon = () => {
        return h(NIcon, null, {
            default: () => h(AddOutline),
        });
    };

    const showModal = ref(false);
</script>
