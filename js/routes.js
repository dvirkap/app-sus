import homeCmp from './apps/pages/home-cmp.js';
import aboutCmp from './apps/pages/about-cmp.js';
import emailApp from './apps/email/pages/email-app-cmp.js';
import keepApp from './apps/keep/pages/keep-app-cmp.js';
// import bookDetails from './cmps/book-details-cmp.js';

const routes = [
    { path: '/', component: homeCmp },
    { path: '/about', component: aboutCmp },
    { path: '/email', component: emailApp },
    { path: '/keep', component: keepApp },
    // { path: '/addbook', component: booksAdd },

];

export default routes;