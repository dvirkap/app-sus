// import emailApp from './apps/email/pages/email-app-cmp.js';
// import keepApp from './pages/book-app-cmp.js';
import myRoutes from './routes.js';
const myRouter = new VueRouter({ routes: myRoutes })

// console.log('myRoutes', myRoutes);
window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    template: `
        <section>
            <div class="main-nav">
                <nav>
                    <i class="fas fa-hamburger bars" v-on:click="onHamburgerClicked"></i>
                    <!-- <router-link to="/" exact>Home</router-link>
                    <router-link to="/keep">Keep</router-link>
                    <router-link to="/email">Email</router-link>
                    <router-link to="/about">About</router-link> -->
                </nav>
            </div>
            <router-view></router-view>
            <footer>
            Copyright &copy; 2019
            </footer>
            <div class="main-hamburger-menu flex" v-show="isHamburger">
            <!-- isHamburger -->
                <div class="flex">
                    <i class="fas fa-home"></i>
                    <i class="fas fa-info"></i>
                </div>
                <div class="flex">
                    <i class="fas fa-lightbulb"></i>
                    <i class="fas fa-at"></i>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isHamburger: false
        }
    },
    methods: {
        onHamburgerClicked() {
            this.isHamburger = !this.isHamburger;
            console.log(this.isHamburger);
            // <i class="fas fa-home"></i>
        }
    },
    components: {

    }
})