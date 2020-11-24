import {
    IllustrationsPage, 
    UiKitPage, 
    ComicProfilePage,
    ComicPage,
    FaqPage,
    SearchPage,
    NotFoundPage,
    LoginPage,
    AdminPage
} from './components/pages';

import {
    AdminComicPage,
    AdminPostsPage,
    ComicStatusesPage,
    ComicGenresPage,
    SocialPage,
    FaqPage as AdminFaqPage,
    SubscriptionsPage
} from './components/admin/pages'

import PublicLayout from './components/layout'
import AdminLayout from './components/admin/layout'

import PrivateRoute from './components/private-route'
import NoAuthRoute from './components/no-auth-route'

export default [
    {
        layout: null,
        subRoutes: [
            {
                path: "/login",
                component: LoginPage
            }
        ],
        routeElement: NoAuthRoute
    },
    {
        layout: PublicLayout,
        subRoutes: [
            {
                path: "/",
                component: null,
                exact: true
            },
            {
                path: "/ui-kit",
                component: UiKitPage
            },
            {
                path: "/illustrations",
                component: IllustrationsPage
            },
            {
                path: "/comic",
                component: ComicProfilePage,
                exact: true
            },
            {
                path: "/comic/1",
                component: ComicPage,
            },
            {
                path: "/faq",
                component: FaqPage,
            },
            {
                path: "/search",
                component: SearchPage,
            },
            {
                path: "/404",
                component: NotFoundPage,
            }
        ]
    },
    {
        layout: AdminLayout,
        subRoutes: [
            {
                path: "/admin",
                component: AdminPage,
                exact: true
            },
            {
                path: "/admin/posts",
                component: AdminPostsPage,
                exact: true
            },
            {
                path: "/admin/comics",
                component: AdminComicPage,
                exact: true
            },
            {
                path: "/admin/comic/genres",
                component: ComicGenresPage,
            },
            {
                path: "/admin/comic/statuses",
                component: ComicStatusesPage,
            },
            {
                path: "/admin/social",
                component: SocialPage,
            },
            {
                path: "/admin/faq",
                component: AdminFaqPage,
            },
            {
                path: "/admin/subscriptions",
                component: SubscriptionsPage,
            },
        ],
        routeElement: PrivateRoute
    }
]