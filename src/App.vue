<script setup >
import { cn } from '@/lib/utils'
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
let isCollapsed = false;
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
const links = [
    {
        title: 'Inbox',
        label: '128',
        icon: 'lucide:inbox',
        variant: 'default',
    },
    {
        title: 'Drafts',
        label: '9',
        icon: 'lucide:file',
        variant: 'ghost',
    },
    {
        title: 'Sent',
        label: '',
        icon: 'lucide:send',
        variant: 'ghost',
    },
    {
        title: 'Junk',
        label: '23',
        icon: 'lucide:archive',
        variant: 'ghost',
    },
    {
        title: 'Trash',
        label: '',
        icon: 'lucide:trash',
        variant: 'ghost',
    },
    {
        title: 'Archive',
        label: '',
        icon: 'lucide:archive',
        variant: 'ghost',
    },
]

const links2 = [
    {
        title: 'Social',
        label: '972',
        icon: 'lucide:user-2',
        variant: 'ghost',
    },
    {
        title: 'Updates',
        label: '342',
        icon: 'lucide:alert-circle',
        variant: 'ghost',
    },
    {
        title: 'Forums',
        label: '128',
        icon: 'lucide:message-square',
        variant: 'ghost',
    },
    {
        title: 'Shopping',
        label: '8',
        icon: 'lucide:shopping-cart',
        variant: 'ghost',
    },
    {
        title: 'Promotions',
        label: '21',
        icon: 'lucide:archive',
        variant: 'ghost',
    },
]
function onCollapse() {
    isCollapsed = true
}

function onExpand() {
    isCollapsed = false
    isCollapsed = false
}

const defaultLayout = [265, 440, 655]
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
            <Separator />
            <Nav
                :is-collapsed="isCollapsed"
                :links="links2"
            />
            </ResizablePanel>
            <ResizableHandle id="resize-handle-1" with-handle class="hidden md:block" />
            <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[2]">
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
                    </div>
                    <div class="flex-1 space-y-4 p-8 pt-6">
                        <div class="flex items-center justify-between space-y-2">
                            <h2 class="text-3xl font-bold tracking-tight">
                                Dashboard
                            </h2>
                            <div class="flex items-center space-x-2">
                                <Button>Download</Button>
                            </div>
                        </div>
                        <Tabs default-value="overview" class="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="analytics" >
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger value="reports" >
                                    Reports
                                </TabsTrigger>
                                <TabsTrigger value="notifications" >
                                    Notifications
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" class="space-y-4">
                                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle class="text-sm font-medium">
                                                Total Revenue
                                            </CardTitle>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                class="h-4 w-4 text-muted-foreground">
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div class="text-2xl font-bold">
                                                $45,231.89
                                            </div>
                                            <p class="text-xs text-muted-foreground">
                                                +20.1% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle class="text-sm font-medium">
                                                Subscriptions
                                            </CardTitle>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                class="h-4 w-4 text-muted-foreground">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div class="text-2xl font-bold">
                                                +2350
                                            </div>
                                            <p class="text-xs text-muted-foreground">
                                                +180.1% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle class="text-sm font-medium">
                                                Sales
                                            </CardTitle>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                class="h-4 w-4 text-muted-foreground">
                                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                                <path d="M2 10h20" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div class="text-2xl font-bold">
                                                +12,234
                                            </div>
                                            <p class="text-xs text-muted-foreground">
                                                +19% from last month
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle class="text-sm font-medium">
                                                Active Now
                                            </CardTitle>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                class="h-4 w-4 text-muted-foreground">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div class="text-2xl font-bold">
                                                +573
                                            </div>
                                            <p class="text-xs text-muted-foreground">
                                                +201 since last hour
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <Card class="col-span-4">
                                        <CardHeader>
                                            <CardTitle>Overview</CardTitle>
                                        </CardHeader>
                                        <CardContent class="pl-2">
                                            <Overview />
                                        </CardContent>
                                    </Card>
                                    <Card class="col-span-4 md:col-span-3">
                                        <CardHeader>
                                            <CardTitle>Recent Sales</CardTitle>
                                            <CardDescription>
                                                You made 265 sales this month.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RecentSales />
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>

</template>
