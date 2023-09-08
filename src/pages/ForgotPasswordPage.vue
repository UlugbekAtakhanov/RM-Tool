<template>
    <div class="h-screen flex justify-center items-center flex-col">
        <h1 class="text-3xl text-center mb-8 text-primary font-bold">RM Tool</h1>
        <div class="bg-white w-[600px] rounded-2xl shadow">
            <div class="flex">
                <!-- img -->
                <div class="flex-1">
                    <img src="../assets/rm314-adj-101.png" alt="img" class="h-full" />
                </div>
                <!-- form -->
                <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium" class="flex-1 p-[28px]">
                    <h1 class="text-sm font-bold flex items-center gap-2">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.666668 8.2C0.666668 7.07989 0.666668 6.51984 0.884655 6.09202C1.0764 5.71569 1.38236 5.40973 1.75869 5.21799C2.18651 5 2.74656 5 3.86667 5H8.13333C9.25344 5 9.81349 5 10.2413 5.21799C10.6176 5.40973 10.9236 5.71569 11.1153 6.09202C11.3333 6.51984 11.3333 7.0799 11.3333 8.2V8.2C11.3333 9.88016 11.3333 10.7202 11.0064 11.362C10.7187 11.9265 10.2598 12.3854 9.69531 12.673C9.05357 13 8.21349 13 6.53333 13H5.46667C3.78651 13 2.94643 13 2.3047 12.673C1.74021 12.3854 1.28127 11.9265 0.993648 11.362C0.666668 10.7202 0.666668 9.88016 0.666668 8.2V8.2Z"
                                stroke="#33363F"
                            />
                            <path
                                d="M8.66667 4.33333V3.66667C8.66667 2.19391 7.47276 1 6 1V1C4.52724 1 3.33334 2.19391 3.33334 3.66667V4.33333"
                                stroke="#33363F"
                                stroke-linecap="round"
                            />
                        </svg>
                        Forgot Password?
                    </h1>
                    <h1 class="text-[#010A13] mb-12">Enter your email and we'll send you instructions to reset your password</h1>
                    <div class="flex-1 gap-x-4 w-full">
                        <n-form-item label="Email" label-style="font-weight: 600" path="email">
                            <n-input type="email" v-model:value="formValue.email" placeholder="Email" />
                        </n-form-item>

                        <n-form-item class="flex">
                            <n-button :disabled="isLoading" type="primary" class="!px-12 flex-1" @click="handleSubmit">Get an Email</n-button>
                        </n-form-item>
                    </div>
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
    import { ref } from "vue";
    import { useForgotPasswordData } from "../hooks/useRegisterHooks";

    const message = useMessage();
    const loadingBar = useLoadingBar();

    const formRef = ref(null);

    const formValue = ref({
        email: "",
    });

    const rules = {
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
    };

    const { isLoading, mutate } = useForgotPasswordData({ message, loadingBar });

    function handleSubmit(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
            if (errors) return;
            mutate(formValue.value);
        });
    }
</script>
