<template>
    <div class="transition-all duration-300" :class="isOpen ? 'w-[500px]' : 'w-[140px]'">
        <table class="bg-white text-xs w-[500px]">
            <thead>
                <tr class="border-b whitespace-nowrap h-[33px] sticky top-0 bg-purple-50">
                    <th class="px-1 w-8 cursor-pointer hover:bg-purple-100" @click="isOpen = !isOpen">
                        <i class="fa-solid fa-chevron-left fa-flip" style="--fa-animation-duration: 3s"></i>
                    </th>
                    <th class="text-left">Project name</th>
                    <th>YE</th>
                    <th>Scope</th>
                    <th>Manager</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in projectList"
                    :key="item.id"
                    :id="item.id"
                    @contextmenu="(e) => handleContextMenu(e, item)"
                    class="hover:bg-sky-50 border-b text-center h-[33px] cursor-pointer"
                    title="Right click for more options"
                >
                    <td class="text-xs">{{ index + 1 }}</td>
                    <td class="text-left w-[150px]" :id="item.id">{{ item.title }}</td>
                    <td>{{ item.ye }}</td>
                    <td>{{ item.scope }}</td>
                    <td>{{ item.manager }}</td>
                    <td>{{ item.team.join() }}</td>
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

    const message = useMessage();

    const { projectList: list } = useProjectListStore();
    const projectList = ref(list);
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
