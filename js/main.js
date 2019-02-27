// import emailApp from './apps/email/pages/email-app-cmp.js';
// import keepApp from './pages/book-app-cmp.js';
import myRoutes from './routes.js';
const myRouter = new VueRouter({routes: myRoutes})
console.log('myRoutes', myRoutes);

window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        // emailApp
    }
})