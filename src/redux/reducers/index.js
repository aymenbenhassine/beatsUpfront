import { combineReducers } from "redux";

import collections from "./collections"
import musics from "./musics"
import courses from "./courses"
import modules from "./modules"
import quiz from "./quiz"
import subscription from "./subscriptions"
import wishlist from "./wishList"

export default combineReducers({
    collections, musics,courses,modules,quiz,subscription,wishlist,
})