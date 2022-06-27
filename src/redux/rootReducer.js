import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import collectionReducer from "./reducers/collections"
import musicReducer from "./reducers/musics"
import authReducer from "./reducers/auth"
import productReducers from './reducers/E-commerceReducers/productReducers';
import cartReducers from './reducers/E-commerceReducers/cartReducers';
import courcesReducer from './reducers/courses';
import moduleReducer from './reducers/modules';
import quizReducer from "./reducers/quiz";
import questionReducer from "./reducers/question";
import answerReducer from "./reducers/answer"
import subscriptionsReducer from "./reducers/subscriptions";
import wishListReducer from "./reducers/wishList";
import eventReducer from "./reducers/Events"
import karaokeReducer from "./reducers/Karaoke"
import reviewReducer from "./reducers/review"

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  collections: collectionReducer,
  musics: musicReducer,
  auth: authReducer,
  produits : productReducers,
  cartItems : cartReducers,
  cources: courcesReducer,
  module: moduleReducer,
  quizzes:quizReducer,
  questions:questionReducer,
  answers:answerReducer,
  subscriptions: subscriptionsReducer,
  wishList: wishListReducer,
  reviews: reviewReducer,
  Karaokes :karaokeReducer,
  Events :eventReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
