// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  music: getIcon('ic_music'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'E-learning Analytics', path: PATH_DASHBOARD.eLearning.analytics, icon: ICONS.analytics },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.newUser },
          { title: 'edit', path: PATH_DASHBOARD.user.editById },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // MANAGEMENT : E-COMMERCE
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
          { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
        ],
      },


      // MANAGEMENT : E-Learnng
      {
        title: 'E-Learning',
        path: PATH_DASHBOARD.eLearning.root,
        icon: ICONS.calendar,
        children: [
          { title: 'List Courses', path: PATH_DASHBOARD.eLearning.lists },
          { title: 'Add Course', path: PATH_DASHBOARD.eLearning.add },
          { title: 'Artist Course', path: PATH_DASHBOARD.eLearning.listsArtist },
          { title: 'Quiz List', path: PATH_DASHBOARD.eLearning.listQuiz },
          { title: 'My wishList', path: PATH_DASHBOARD.eLearning.wishlist },
          { title: 'My Subscriptions', path: PATH_DASHBOARD.eLearning.subscriptions },

        ],
      },

      // MANAGEMENT : Music World
      {
        title: 'Music World',
        path: PATH_DASHBOARD.musicWorld.root,
        icon: ICONS.music,
        children: [
          { title: 'Explore', path: PATH_DASHBOARD.musicWorld.explore },
          { title: 'radio', path: PATH_DASHBOARD.musicWorld.radio },
          { title: 'podcast', path: PATH_DASHBOARD.musicWorld.podcast },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
          { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
        ],
      },

        // MANAGEMENT : Event & Karaoke 
        {
          title: 'Event & Karaoke',
          path: PATH_DASHBOARD.event.root,
          icon: ICONS.chat,
          children: [
            { title: 'Events', path: PATH_DASHBOARD.event.posts },
            { title: 'new Event', path: PATH_DASHBOARD.event.newPost },
            { title: 'Event list', path: PATH_DASHBOARD.event.list },
            { title: 'Karaokes', path: PATH_DASHBOARD.karaoke.posts },
            { title: 'new Karaoke', path: PATH_DASHBOARD.karaoke.newPost },
            { title: 'Karaoke list', path: PATH_DASHBOARD.karaoke.list }
          ],
        },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  
/*

  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      // {
      //  title: 'kanban',
       // path: PATH_DASHBOARD.kanban,
       // icon: ICONS.kanban,
     // },
    ],
  },

*/


];

export default navConfig;
