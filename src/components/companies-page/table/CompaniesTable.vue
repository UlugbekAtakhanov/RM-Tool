<template>
    <n-data-table
        :scroll-x="1800"
        virtual-scroll
        size="small"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :max-height="'60vh'"
        :key="(row) => row.key"
        @update:checked-row-keys="handleCheck"
        :row-props="rowProps"
    />
</template>

<script setup>
    import { NInput, useMessage } from "naive-ui";
    import { defineComponent, h, nextTick, reactive, ref } from "vue";

    const createData = () => [
        {
            key: 0,
            name: "Company 0",
            email: "test0@test.com",
            address: "Walter Street, 0",
            phone: " 123 456 789",
            "contact-first-name": "Contact F 0",
            "contact-last-name": "Contact L 0",
        },
        {
            key: 1,
            name: "Company 1",
            email: "test1@test.com",
            address: "Walter Street, 1",
            phone: " 123 456 789",
            "contact-first-name": "Contact F 1",
            "contact-last-name": "Contact L 1",
        },
        {
            key: 2,
            name: "Company 2",
            email: "test2@test.com",
            address: "Walter Street, 2",
            phone: " 123 456 789",
            "contact-first-name": "Contact F 2",
            "contact-last-name": "Contact L 2",
        },
        {
            key: 3,
            name: "Company 3",
            email: "test3@test.com",
            address: "Walter Street, 3",
            phone: " 123 456 789",
            "contact-first-name": "Contact F 3",
            "contact-last-name": "Contact L 3",
        },
    ];

    const message = useMessage();
    const checkedRowKeysRef = ref([]);
    const data = ref(createData());

    const checkedRowKeys = checkedRowKeysRef;
    // console.log(checkedRowKeys.value);

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
                        data.value[index].name = v;
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
                        data.value[index].email = v;
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
                        data.value[index].address = v;
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
                        data.value[index].phone = v;
                    },
                });
            },
        },
        {
            title: "Contact First Name",
            key: "contact-first-name",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row.phone,
                    onUpdateValue(v) {
                        data.value[index].phone = v;
                    },
                });
            },
        },
        {
            title: "Contact Last Name",
            key: "contact-last-name",
            render(row) {
                const index = getDataIndex(row.key);
                return h(ShowOrEdit, {
                    value: row.phone,
                    onUpdateValue(v) {
                        data.value[index].phone = v;
                    },
                });
            },
        },
    ];

    const columns = createColumns();

    const rowKey = (row) => row.key;

    const handleCheck = (rowKeys) => {
        checkedRowKeysRef.value = rowKeys;
    };

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
        return data.value.findIndex((item) => item.key === key);
    };
    const page = ref(1);

    const handlePageChange = (curPage) => {
        page.value = curPage;
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
                console.log(e);
                message.info(row.name);
            },
        };
    };
</script>
