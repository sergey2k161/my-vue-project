﻿import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../Login.vue';
import RegisterForm from '../Register.vue';
import HomePage from '../components/HomePage.vue';
import TaskManager from '../components/TaskManager.vue';
import asyncMetodEmail from '../components/asyncMetodEmail.vue';
import asyncMetodFiles from "@/components/asyncMetodFiles.vue";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginForm
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterForm
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/task-manager',
        name: 'TaskManager',
        component: TaskManager
    },
    {
        path: '/async-Metod-Email',
        name: 'asyncMetodEmail',
        component: asyncMetodEmail
    },
    {
        path: '/async-Metod-Files',
        name: 'asyncMetodFiles',
        component: asyncMetodFiles
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/:pathMatch(.*)*', // Используйте параметр с регулярным выражением для охвата всех путей
        redirect: '/login'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// router.beforeEach((to, from, next) => {
//     const loggedIn = !!localStorage.getItem('accessToken');
//
//     if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
//         next('/login');
//     } else if ((to.path === '/login' || to.path === '/register') && loggedIn) {
//         next('/home');
//     } else {
//         next();
//     }
// });

export default router;
