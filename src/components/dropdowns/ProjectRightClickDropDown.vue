<template>
    <n-dropdown
        placement="bottom-start"
        trigger="manually"
        :x="x"
        :y="y"
        :options="options"
        :show="showDropdown"
        :on-clickoutside="clickOutsideHandler"
        @select="(key) => handleSelectHandler(key)"
    />

    <!-- request resource modal -->
    <RequestResourceModal :isModalOpen="isModalOpen" v-model:show="isModalOpen">
        <AddNewStaffForm />
    </RequestResourceModal>
</template>

<script setup>
    import { defineProps, defineEmits } from "vue";
    import RequestResourceModal from "../modals/RequestResourceModal.vue";
    import AddNewStaffForm from "../forms-page/AddNewStaffForm.vue";
    import { ref } from "vue";

    const isModalOpen = ref(false);

    // props for right click dropdown
    defineProps({
        showDropdown: Boolean,
        x: Number,
        y: Number,
    });

    const emit = defineEmits(["onClickoutside", "handleSelect"]);

    const clickOutsideHandler = () => {
        emit("onClickoutside");
    };
    
    const handleSelectHandler = (key) => {
        emit("handleSelect", key);
    };

    const options = [
        {
            label: "Request resource",
            key: "request-resource",
            props: {
                onClick: () => {
                    isModalOpen.value = true;
                },
            },
        },
        {
            label: "Sth else",
            key: "daisy buchanan",
            disabled: true,
        },
        {
            type: "divider",
            key: "d1",
        },
        {
            label: "Sth else",
            key: "nick carraway",
            disabled: true,
        },
        {
            label: "Sth else",
            key: "others1",
            children: [
                {
                    label: "Sth else",
                    key: "jordan baker",
                    disabled: true,
                },
                {
                    label: "Sth else",
                    key: "tom buchanan",
                    disabled: true,
                },
                {
                    label: "Others",
                    key: "others2",
                    children: [
                        {
                            label: "Sth else",
                            key: "chicken",
                        },
                        {
                            label: "Sth else",
                            key: "beef",
                        },
                    ],
                },
            ],
        },
    ];
</script>
