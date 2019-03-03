import homeCmp from './apps/pages/home-cmp.js';
import aboutCmp from './apps/pages/about-cmp.js';
import emailApp from './apps/email/pages/email-app-cmp.js';
import keepApp from './apps/keep/pages/keep-app-cmp.js';
import noteDetails from './apps/keep/cmps/note-details-cmp.js';
import noteAdd from './apps/keep/cmps/note-add-cmp.js';
// import bookDetails from './cmps/book-details-cmp.js';
import emailDetails from './apps/email/cmps/email-details-cmp.js';


const routes = [
    { path: '/', component: homeCmp },
    { path: '/about', component: aboutCmp },
    {
        path: '/email', component: emailApp, children:
            [{ path: '/email/:emailId', component: emailDetails }]
    },
    // { path: '/email/compose', component: emailCompose },
    // { path: '/email/:emailId', component: emailDetails },
    {
        path: '/keep', component: keepApp, children:
            [{ path: 'noteadd', component: noteAdd }]
    },
    { path: '/keep/:noteId', component: noteDetails },
    // { path: '/addbook', component: booksAdd },

]

export default routes;