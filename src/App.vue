<script lang="ts">
export const description
	= 'A sidebar that collapses to icons.'
export const iframeHeight = '800px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang=ts>
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
} from '@/components/ui/sidebar'



import readXlsxFile from 'read-excel-file'
onMounted(() => {
	const input = document.getElementById('input')
	if (input) {
		input.addEventListener('change', () => {

		})
	}

})
function showFile() {
	console.log('change');

	readXlsxFile(input.files[0]).then((rows) => {
		// `rows` is an array of rows
		console.log(rows);
		// each row being an array of cells.
	})
}

import {
	AudioWaveform,
	BadgeCheck,
	Bell,
	BookOpen,
	Bot,
	ChevronRight,
	ChevronsUpDown,
	Command,
	CreditCard,
	Folder,
	Forward,
	Frame,
	GalleryVerticalEnd,
	LogOut,
	Map,
	MoreHorizontal,
	PieChart,
	Plus,
	Settings2,
	Sparkles,
	SquareTerminal,
	Trash2,
} from 'lucide-vue-next'
import { ref, onBeforeMount, computed, onMounted } from 'vue'

import { useUserStore } from '@/store/UserStore.js'
import {useGlobalStore} from '@/store/GlobalStore.js'

const userStore = useUserStore()
const globalStore = useGlobalStore()


onBeforeMount(() => {
	userStore.getAccount()
})


// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'ООО Такое-то',
			logo: GalleryVerticalEnd,
			plan: 'Ультра',
		},
		{
			name: 'ИП Такое-то',
			logo: AudioWaveform,
			plan: 'Премиум',
		},
		{
			name: 'ООО Сякое-то',
			logo: Command,
			plan: 'Стандартный',
		},
	],
	navMain: [
		{
			title: 'Документация',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Введение',
					url: '#',
				},
				{
					title: 'Начало работы',
					url: '#',
				},
				{
					title: 'Туториалы',
					url: '#',
				},
				{
					title: 'Последние изменения',
					url: '#',
				},
			],
		},
		{
			title: 'Настройки',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'Основные',
					url: '#',
				},
				{
					title: 'Команда',
					url: '#',
				},
				{
					title: 'Счета',
					url: '#',
				},
				{
					title: 'Компании',
					url: '#',
				},
			],
		},
	],
	projects: [
		{
			name: 'Продажи & Маркетинг',
			url: '#',
			icon: PieChart,
		},
	],
}

const activeTeam = ref(data.teams[0])

function setActiveTeam(team: typeof data.teams[number]) {
	activeTeam.value = team
}


</script>

<template>
	<div v-if="!globalStore.isAuth" class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
		<div class="flex items-center justify-center py-12">
			<div class="mx-auto grid w-[350px] gap-6">
				<router-view></router-view>
			</div>
		</div>
		<div class="hidden bg-muted lg:block">
			<img class="max-h-[100dvh] block w-full object-cover" src="./assets/Gradient.png" alt="Image">
		</div>
	</div>

	<SidebarProvider v-else>
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger as-child>
								<SidebarMenuButton size="lg"
									class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0">
									<div
										class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
										<component :is="activeTeam.logo" class="size-4" />
									</div>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-semibold">{{ activeTeam.name }}</span>
										<span class="truncate text-xs">{{ activeTeam.plan }}</span>
									</div>
									<ChevronsUpDown class="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start"
								side="bottom" :side-offset="4">
								<DropdownMenuLabel class="text-xs text-muted-foreground">
									Компании
								</DropdownMenuLabel>
								<DropdownMenuItem v-for="(team, index) in data.teams" :key="team.name" class="gap-2 p-2"
									@click="setActiveTeam(team)">
									<div class="flex size-6 items-center justify-center rounded-sm border">
										<component :is="team.logo" class="size-4 shrink-0" />
									</div>
									{{ team.name }}
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem class="gap-2 p-2">
									<div class="flex size-6 items-center justify-center rounded-md border bg-background">
										<Plus class="size-4" />
									</div>
									<div class="font-medium text-muted-foreground">
										Добавить команию
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Платформа</SidebarGroupLabel>
					<SidebarMenu>
						<Collapsible v-for="item in data.navMain" :key="item.title" as-child :default-open="item.isActive"
							class="group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger as-child>
									<SidebarMenuButton :tooltip="item.title">
										<component :is="item.icon" />
										<span>{{ item.title }}</span>
										<ChevronRight
											class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub>
										<SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
											<SidebarMenuSubButton as-child>
												<a :href="subItem.url">
													<span>{{ subItem.title }}</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup class="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel>Проекты</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem v-for="item in data.projects" :key="item.name">
							<SidebarMenuButton as-child>
								<a :href="item.url">
									<component :is="item.icon" />
									<span>{{ item.name }}</span>
								</a>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger as-child>
									<SidebarMenuAction show-on-hover>
										<MoreHorizontal />
										<span class="sr-only">More</span>
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent class="w-48 rounded-lg" side="bottom" align="end">
									<DropdownMenuItem>
										<Folder class="text-muted-foreground" />
										<span>View Project</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Forward class="text-muted-foreground" />
										<span>Share Project</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Trash2 class="text-muted-foreground" />
										<span>Delete Project</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
						<!-- <SidebarMenuItem>
							<SidebarMenuButton class="text-sidebar-foreground/70">
								<MoreHorizontal class="text-sidebar-foreground/70" />
								<span>More</span>
							</SidebarMenuButton>
						</SidebarMenuItem> -->
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger as-child>
								<SidebarMenuButton size="lg"
									class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0">
									<Avatar class="h-8 w-8 rounded-lg">
										<AvatarImage :src="data.user.avatar" :alt="data.user.name" />
										<AvatarFallback class="rounded-lg">
											CN
										</AvatarFallback>
									</Avatar>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-semibold">{{ userStore.userData.name }}</span>
										<span class="truncate text-xs">{{ userStore.userData.email }}</span>
									</div>
									<ChevronsUpDown class="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom"
								align="end" :side-offset="4">
								<DropdownMenuLabel class="p-0 font-normal">
									<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar class="h-8 w-8 rounded-lg">
											<AvatarImage :src="data.user.avatar" :alt="data.user.name" />
											<AvatarFallback class="rounded-lg">
												CN
											</AvatarFallback>
										</Avatar>
										<div class="grid flex-1 text-left text-sm leading-tight">
											<span class="truncate font-semibold">{{ userStore.userData.name }}</span>
											<span class="truncate text-xs">{{ userStore.userData.email }}</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Sparkles class="w-4" />
										Upgrade to Pro
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<BadgeCheck class="w-4" />
										Аккаунт
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCard class="w-4" />
										Счета
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bell class="w-4" />
										Уведомления
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator class="w-4" />
								<DropdownMenuItem @click="userStore.logout()">
									<LogOut class="w-4" />
									Выйти
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
		<SidebarInset>
			<header
				class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
				<div class="flex items-center gap-2 px-4">
					<SidebarTrigger class="-ml-1" />
					<Separator orientation="vertical" class="mr-2 h-4" />
				</div>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-2 pt-0">
				<input type="file" id="input" @change="showFile" />
				<router-view></router-view>
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>