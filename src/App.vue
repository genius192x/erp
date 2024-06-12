<script setup lang="ts">
import { cn } from '@/lib/utils'
import {ref} from 'vue'
import Overview from '@/components/Overview.vue'
import MainNav from '@/components/MainNav.vue'
import RecentSales from '@/components/RecentSales.vue'
import Search from '@/components/Search.vue'
import UserNav from '@/components/UserNav.vue'
import Nav from '@/components/Nav.vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'

import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import DashBoard from '@/pages/DashBoard.vue'

interface collapsedProps {
	defaultLayout?: number[]
	defaultCollapsed?: boolean
	navCollapsedSize: number
}
const props = withDefaults(defineProps < collapsedProps > (), {
	defaultCollapsed: false,
	defaultLayout: () => [20, 80],
})
const isCollapsed = ref(props.defaultCollapsed)
const links = [
    {
		title: 'Главная',
		link: '/',
        label: '128',
        icon: 'lucide:home',
        variant: 'default',
    },
    {
		title: 'Задачи',
		link: '/tasks',
        label: '9',
        icon: 'lucide:clipboard-edit',
        variant: 'ghost',
    },
]
function onCollapse() {
	isCollapsed.value = true
}

function onExpand() {
	isCollapsed.value = false
}

const defaultLayout = [20, 80]
</script>

<template>
    <TooltipProvider :delay-duration="0">
        <ResizablePanelGroup
            id="resize-panel-group-1"
            direction="horizontal"
            class="h-full items-stretch"
        >
            <ResizablePanel
				id="resize-panel-1"
				:default-size="defaultLayout[0]"
				:collapsed-size="navCollapsedSize"
				collapsible
				:min-size="15"
				:max-size="20"
				class="hidden md:block"
				:class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
				@expand="onExpand"
				@collapse="onCollapse"
            >
            <Nav
                :is-collapsed="isCollapsed"
                :links="links"
            />
            </ResizablePanel>
            <ResizableHandle id="resize-handle-1" with-handle class="hidden md:flex" />
            <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[1]">
                <div class=" flex-col md:flex">
                    <div class="border-b">
                        <div class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                            <MainNav class="mx-6 hidden md:block" />
                            <Sheet>
                                <SheetTrigger as-child>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        class="shrink-0 md:hidden"
                                    >
                                        <Menu class="h-5 w-5" />
                                        <span class="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" class="flex flex-col">
                                    <Nav
                                        :is-collapsed="isCollapsed"
                                        :links="links"
                                    />
                                    <Separator />
                                    <Nav
                                        :is-collapsed="isCollapsed"
                                        :links="links2"
                                    />
                                </SheetContent>
                                </Sheet>
                            <div class="ml-auto flex items-center space-x-4">
                                <Search />
                                <UserNav />
                            </div>
                        </div>
						<router-view></router-view>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>

</template>
