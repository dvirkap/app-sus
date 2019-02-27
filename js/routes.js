import homeCmp from './apps/pages/home-cmp.js';
import aboutCmp from './apps/pages/about-cmp.js';
// import booksApp from './pages/book-app-cmp.js';
// import booksAdd from './pages/book-add-cmp.js';
// import bookDetails from './cmps/book-details-cmp.js';

const routes = [
    { path: '/', component: homeCmp },
    { path: '/about', component: aboutCmp }
    // { path: '/books', component: booksApp },
    // { path: '/books/:bookId', component: bookDetails },
    // { path: '/addbook', component: booksAdd },

];

export default routes;