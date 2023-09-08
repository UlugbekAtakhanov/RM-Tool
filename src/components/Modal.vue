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
            <div
                @click="showModal = false"
                class="hover:border hover:bg-secondary/30 cursor-pointer ml-auto w-5 h-5 flex justify-center items-center rounded"
            >
                <i class="fa-solid fa-xmark"></i>
            </div>
            <slot />
        </n-card>
    </n-modal>
</template>

<script setup>
    import { h, ref } from "vue";
    import { NIcon } from "naive-ui";
    import { AddOutline } from "@vicons/ionicons5";
    import { useShowModalStore } from "../store/showModalStore";
    import { storeToRefs } from "pinia";

    const showModalStore = useShowModalStore();
    const { showModal } = storeToRefs(showModalStore);

    defineProps({
        buttonTitle: String,
        disabledState: Boolean,
    });

    const addIcon = () => {
        return h(NIcon, null, {
            default: () => h(AddOutline),
        });
    };
</script>
