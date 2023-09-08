<template>
    <div class="transition-all duration-300" :class="isOpen ? 'w-[800px]' : 'w-[200px]'">
        <table class="bg-white text-xs border-b w-[800px]">
            <thead>
                <tr class="border-b whitespace-nowrap h-[33px] bg-purple-50">
                    <th class="px-1 cursor-pointer hover:bg-purple-100" @click="isOpen = !isOpen">
                        <i class="fa-solid fa-chevron-left fa-flip w-4" style="--fa-animation-duration: 3s"></i>
                    </th>
                    <th class="text-left">Resource name</th>
                    <th class="text-left">Position</th>
                    <th class="text-left">Coach</th>
                    <th class="text-left">Projects</th>
                    <th class="text-center px-4">Hours</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in resourceListComputed" :key="item.id" class="hover:bg-sky-50 divide-y text-center group">
                    <td class="text-xs align-top">{{ index + 1 }}</td>
                    <td class="text-left align-top pr-4">{{ item.firstName }} {{ item.lastName }}</td>

                    <td class="text-left pr-4">
                        <div v-for="project in item.projects" :key="project.id" class="h-[33px]">
                            {{ project.role }}
                        </div>
                    </td>

                    <td class="text-left align-top pr-4">{{ item.coachName }}</td>

                    <td class="text-left pr-4">
                        <div v-for="project in item.projects" :key="project.id" class="h-[33px]">
                            {{ project.projectName }}
                        </div>
                    </td>

                    <td class="text-center">
                        <div v-for="project in item.projects" :key="project.id" class="h-[33px] text-center">
                            {{ project.hours }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { computed, ref } from "vue";
    import { useDateRangeStore } from "../../../store/dateRangeStore";
    import { useProjectListStore } from "../../../store/projectStore";
    import { daysInMilliseconds } from "../../../utils/Days";

    const projectListStore = useProjectListStore();
    const { resourcesWithProjecstsList } = storeToRefs(projectListStore);

    const dateRangeStore = useDateRangeStore();
    const { startDate } = storeToRefs(dateRangeStore);

    // modify project list giving new keys - startPoint, duration
    const resourceListComputed = computed(() => {
        const newList = resourcesWithProjecstsList.value.map((project) => {
            const newProjects = project.projects.map((item) => {
                return {
                    ...item,
                    startPoint: (new Date(item.startDate) - new Date(startDate.value)) / daysInMilliseconds(1),
                    duration: (new Date(item.endDate) - new Date(item.startDate)) / daysInMilliseconds(1),
                };
            });
            return { ...project, projects: newProjects };
        });
        return newList;
    });

    const isOpen = ref(true);
</script>
