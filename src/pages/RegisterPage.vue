<template>
    <div class="h-screen flex justify-center items-center flex-col">
        <h1 class="text-4xl text-center mb-8 text-primary font-bold">RM Tool</h1>
        <div class="bg-white/60 backdrop-blur-xl w-[885px] rounded-2xl shadow">
            <div class="flex">
                <!-- img -->
                <div>
                    <img src="../assets/rm314-adj-101.png" alt="" />
                </div>

                <!-- form -->
                <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="flex-1 p-[28px]">
                    <h1 class="text-base text-[#010A13] font-bold mb-12">First verification</h1>
                    <div class="flex-1 grid grid-cols-2 gap-x-4 w-full">
                        <n-form-item label="First name" label-style="font-weight: 600" path="firstName">
                            <n-input v-model:value="formValue.firstName" placeholder="First name" />
                        </n-form-item>

                        <n-form-item label="Last name" label-style="font-weight: 600" path="lastName">
                            <n-input v-model:value="formValue.lastName" placeholder="Last name" />
                        </n-form-item>

                        <n-form-item label="Business name" label-style="font-weight: 600" path="businessName">
                            <n-input v-model:value="formValue.businessName" placeholder="Business name" />
                        </n-form-item>

                        <n-form-item label="Email" label-style="font-weight: 600" path="email">
                            <n-input type="email" disabled v-model:value="formValue.email" placeholder="Email" />
                        </n-form-item>

                        <n-form-item label="Password" label-style="font-weight: 600" path="password">
                            <n-input type="password" v-model:value="formValue.password" placeholder="Password" show-password-on="mousedown" />
                        </n-form-item>

                        <n-form-item label="Re-password" label-style="font-weight: 600" path="rePassword">
                            <n-input type="password" v-model:value="formValue.rePassword" placeholder="Confirm password" show-password-on="mousedown" />
                        </n-form-item>

                        <n-form-item class="!flex !justify-end col-span-2 mt-4">
                            <n-button :disabled="userIsLoading" type="primary" class="!px-12" @click="handleSubmit"> Sign up</n-button>
                        </n-form-item>
                    </div>
                    <RouterLink :to="{ name: 'login' }" class="text-gray-400 underline hover:text-gray-500 text-xs text-center block border-t mt-8 py-2">
                        or Sign in
                    </RouterLink>
                </n-form>
            </div>
        </div>
        <!-- <div class="flex justify-center absolute top-4 left-4">
            <pre>{{ JSON.stringify(formValue, null, 2) }}</pre>
        </div> -->
    </div>
</template>

<script setup>
    import { useLoadingBar, useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";
    import { onMounted, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { useUserStore } from "../store/userStore";

    const message = useMessage();
    const loadingBar = useLoadingBar();
    const router = useRouter();
    const route = useRoute();

    const userStore = useUserStore();
    const { userInfo, userIsLoading } = storeToRefs(userStore);
    const { userRegisterInfo, userRegister } = userStore;

    onMounted(() => userRegisterInfo({ activationToken: route.query.token }));

    const formRef = ref(null);
    const formValue = ref({
        firstName: "",
        lastName: "",
        businessName: "",
        email: userInfo.value.email,
        password: "",
        rePassword: "",
    });

    watch(userInfo, () => {
        formValue.value = {
            firstName: userInfo.value.firstName,
            lastName: userInfo.value.lastName,
            businessName: userInfo.value.businessName,
            email: userInfo.value.email,
            password: "",
            rePassword: "",
        };
    });

    const rules = {
        firstName: {
            required: true,
            message: "Please provide first name",
            trigger: ["blur", "input"],
        },
        lastName: {
            required: true,
            message: "Please provide last name",
            trigger: ["blur", "input"],
        },
        email: {
            required: true,
            validator: (rule, value) => {
                const res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
                return new Promise((resolve, reject) => {
                    if (!value) {
                        reject(Error("Please provide an email"));
                    } else if (!res) {
                        reject(Error("Please provide a valid email."));
                    } else {
                        resolve();
                    }
                });
            },
            trigger: ["blur", "input"],
        },
        password: {
            required: true,
            message: "Please provide password",
            trigger: ["blur", "input"],
        },
        rePassword: {
            required: true,
            validator: (rule, value) => {
                return new Promise((resolve, reject) => {
                    if (!value) {
                        reject(Error("Please provide confirm password"));
                    } else if (value !== formValue.value.password) {
                        reject(Error("Please confirm password"));
                    } else {
                        resolve();
                    }
                });
            },
            trigger: ["blur", "input"],
        },
    };

    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (errors) return;
            loadingBar.start();
            const { email, rePassword, ...rest } = formValue.value;
            userRegister({ data: { ...rest, activationToken: route.query.token }, message, loadingBar, router });
        });
    }
</script>
