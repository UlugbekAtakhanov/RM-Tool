<template>
    <n-data-table
        virtual-scroll
        :scroll-x="1400"
        size="small"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :max-height="'60vh'"
        :row-key="(row) => row.key"
        @update:checked-row-keys="handleCheck"
        :row-props="rowProps"
        @update:page="handlePageChange"
    />
</template>

<script setup>
    import { NInput } from "naive-ui";
    import { defineComponent, h, nextTick, reactive, ref } from "vue";

    // props
    const { data } = defineProps({ checkedRowKeysRef: Array, data: Array });

    // emits
    const emit = defineEmits(["handleCheck"]);

    // emitting check handler of users
    const handleCheck = (rowKeys) => {
        emit("handleCheck", rowKeys);
    };

    // creating columns for table
    const createColumns = () => [
        {
            type: "selection",
            disabled(row) {
                return row.name === "Edward King 3";
            },
            fixed: "left",
        },
        {
            title: "Name",
            key: "name",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row.name,
                    onUpdateValue(v) {
                        data[index].name = v;
                    },
                });
            },
            fixed: "left",
        },
        {
            title: "Email",
            key: "email",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row.email,
                    onUpdateValue(v) {
                        data[index].email = v;
                    },
                });
            },
        },
        {
            title: "Address",
            key: "address",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row.address,
                    onUpdateValue(v) {
                        data[index].address = v;
                    },
                });
            },
        },
        {
            title: "Phone",
            key: "phone",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row.phone,
                    onUpdateValue(v) {
                        data[index].phone = v;
                    },
                });
            },
        },
        {
            title: "Contact First Name",
            key: "contactFirstName",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row["contactFirstName"],
                    onUpdateValue(v) {
                        data[index]["contactFirstName"] = v;
                    },
                });
            },
        },
        {
            title: "Contact Last Name",
            key: "contactLastName",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row["contactLastName"],
                    onUpdateValue(v) {
                        data[index]["contactLastName"] = v;
                    },
                });
            },
        },
    ];

    const columns = createColumns();

    const ShowOrEdit = defineComponent({
        props: {
            value: [String, Number],
            onUpdateValue: [Function, Array],
        },
        setup(props) {
            const isEdit = ref(false);
            const inputRef = ref(null);
            const inputValue = ref(props.value);
            function handleOnClick() {
                isEdit.value = true;
                nextTick(() => {
                    inputRef.value.focus();
                });
            }
            function handleChange() {
                props.onUpdateValue(inputValue.value);
                isEdit.value = false;
            }
            return () =>
                h(
                    "div",
                    {
                        style: "min-height: 22px",
                        onClick: handleOnClick,
                    },
                    isEdit.value
                        ? h(NInput, {
                              ref: inputRef,
                              value: inputValue.value,
                              onUpdateValue: (v) => {
                                  inputValue.value = v;
                              },
                              onChange: handleChange,
                              onBlur: handleChange,
                          })
                        : props.value
                );
        },
    });

    const getDataIndex = (key) => {
        return data.findIndex((item) => item.key === key);
    };

    const pagination = reactive({
        page: 1,
        pageSize: 10,
        showSizePicker: true,
        pageSizes: [10, 25, 50],
        onChange: (page) => {
            pagination.page = page;
        },
        onUpdatePageSize: (pageSize) => {
            pagination.pageSize = pageSize;
            pagination.page = 1;
        },
    });

    const rowProps = (row) => {
        return {
            style: "cursor: pointer;",
            onClick: (e) => {
                // console.log(e);
                // message.info(row.name);
            },
        };
    };

    const handlePageChange = () => {
        console.log("page is changed");
    };
</script>
