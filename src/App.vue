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
import { Toaster, toast } from 'vue-sonner'
import {
	Banknote,
	Home,
	AudioWaveform,
	BadgeCheck,
	Bell,
	BookOpen,
	FileSpreadsheet,
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
import { useGlobalStore } from '@/store/GlobalStore.js'
import { useTableStore } from '@/store/TableStore'
const tableStore = useTableStore()
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
			title: 'Отчеты',
			url: '#',
			icon: Banknote,
			items: [
				{
					title: 'Отчет ДДС',
					url: '/transactions',
				},
				{
					title: 'Отчет ПиУ',
					url: '/transactions-piu',

				},
			],
		},
	],
}

const activeTeam = ref(data.teams[0])

function setActiveTeam(team: typeof data.teams[number]) {
	activeTeam.value = team
}


</script>

<template>
	<div v-if="globalStore.isGlobalLoading" class="bg-white fixed top-0 left-0 w-[100dvw] h-[100dvh] z-50">

		<svg class="w-[200px] h-[200px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" rsion="1.1" id="L9"
			xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
			<rect x="35" y="40" width="4" height="10" fill="green">
				<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 10; 0 0"
					begin="0" dur="0.8s" repeatCount="indefinite" />
			</rect>
			<rect x="45" y="40" width="4" height="10" fill="green">
				<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 10; 0 0"
					begin="0.2s" dur="0.8s" repeatCount="indefinite" />
			</rect>
			<rect x="55" y="40" width="4" height="10" fill="green">
				<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 10; 0 0"
					begin="0.4s" dur="0.8s" repeatCount="indefinite" />
			</rect>
		</svg>
	</div>
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
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton :tooltip="'Главная'" as-child>
								<router-link to="/">
									<component :is="Home" />
									<span>Главная</span>
								</router-link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton :tooltip="'Операции'" as-child>
								<router-link to="/operations">
									<component :is="FileSpreadsheet" />
									<span>Операции</span>
								</router-link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<!-- <SidebarGroupLabel>Платформа</SidebarGroupLabel> -->
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
												<router-link :to="subItem.url" :disabled="subItem.disabled">
													<!-- <component :is="Home" /> -->
													<span>{{ subItem.title }}</span>
												</router-link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
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
			<div class="flex flex-1 flex-col gap-4 p-2 pt-0 w-full overflow-hidden">
				<router-view></router-view>
			</div>
		</SidebarInset>
	</SidebarProvider>
	<Toaster richColors />
</template>