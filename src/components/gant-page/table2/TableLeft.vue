<template>
    <div class="transition-all duration-300" :class="isOpen ? 'w-[1000px]' : 'w-[200px]'">
        <table class="bg-white text-xs w-[1000px]">
            <thead>
                <tr class="border-b whitespace-nowrap h-[33px] sticky top-0 bg-purple-50">
                    <th class="px-1 w-8 cursor-pointer hover:bg-purple-100" @click="isOpen = !isOpen">
                        <i class="fa-solid fa-chevron-left fa-flip" style="--fa-animation-duration: 3s"></i>
                    </th>
                    <th class="text-left pr-4">Project name</th>
                    <th class="pr-4">Type</th>
                    <th class="pr-4">YE</th>
                    <th class="pr-4">QRP</th>
                    <th class="pr-4">Director</th>
                    <th class="pr-4">Manager</th>
                    <th class="pr-4">Team</th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="!projectList.length">
                    <td></td>
                    <td class="whitespace-nowrap py-2 font-semibold">No projects..</td>
                </tr>
                <tr
                    v-show="projectList.length"
                    v-for="(item, index) in projectList"
                    :key="item.id"
                    :id="item.id"
                    @contextmenu="(e) => handleContextMenu(e, item)"
                    class="hover:bg-sky-50 border-b text-center h-[33px] cursor-pointer"
                    title="Right click for more options"
                >
                    <td class="text-xs">{{ index + 1 }}</td>
                    <td class="text-center" :id="item.id">{{ item.name }}</td>
                    <td class="pr-4">
                        <div
                            class="rounded-full py-[1px] font-semibold"
                            :class="
                                item.type === 'AUDIT'
                                    ? 'bg-[#0ea5e9]/20 text-[#0ea5e9]'
                                    : item.type === 'REVIEW'
                                    ? 'bg-[#e11d48]/20 text-[#e11d48]'
                                    : 'bg-[#16a34a]/20 text-[#16a34a]'
                            "
                        >
                            {{ item.type }}
                        </div>
                    </td>
                    <td class="pr-4 whitespace-nowrap">{{ formattingDate(item.fiscalYear - 0) }}</td>
                    <td class="pr-4">{{ item.qrp }}</td>
                    <td class="pr-4">{{ item.director }}</td>
                    <td class="pr-4">{{ item.manager }}</td>
                    <!-- <td>{{ item.team.join() }}</td> -->
                </tr>
            </tbody>
        </table>

        <!-- right clicked dropdown  -->
        <ProjectRightClickDropDown @onClickoutside="onClickoutside" @handleSelect="handleSelect" :showDropdown="showDropdown" :x="x" :y="y" />
    </div>
</template>

<script setup>
    import { ref, nextTick } from "vue";
    import { useProjectListStore } from "../../../store/projectStore";
    import ProjectRightClickDropDown from "../../dropdowns/ProjectRightClickDropDown.vue";
    import { useMessage } from "naive-ui";
    import { storeToRefs } from "pinia";
    import { formattingDate } from "../../../utils/Days";

    const message = useMessage();

    const projectListStore = useProjectListStore();
    const { modifiedProjectList: projectList } = storeToRefs(projectListStore);

    const isOpen = ref(true);

    const showDropdownRef = ref(false);
    const xRef = ref(0);
    const yRef = ref(0);

    const showDropdown = showDropdownRef;
    const x = xRef;
    const y = yRef;

    const handleContextMenu = (e, item) => {
        e.preventDefault();
        showDropdownRef.value = false;
        if (parseInt(e.target.parentElement.id) === item.id) {
            nextTick().then(() => {
                showDropdownRef.value = true;
                xRef.value = e.clientX;
                yRef.value = e.clientY;
            });
        }
    };

    const onClickoutside = (e) => {
        message.info("clickoutside");
        showDropdownRef.value = false;
    };

    const handleSelect = (key) => {
        showDropdownRef.value = false;
    };
</script>
