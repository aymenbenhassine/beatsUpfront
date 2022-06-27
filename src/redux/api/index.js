import axios from 'axios';

const url = 'http://localhost:3000/api';
const urlMac = 'http://localhost:3000';
// const SECRET_KEY = 'beatsup ';
// const token = JSON.parse(localStorage.getItem('profile')).accessToken;

// auth
export const login = (formData) => axios.post(`${url}/auth/login`, formData);
export const register = (formData) => axios.post(`${url}/auth/register`, formData);

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// collections
export const fetchCollections = () => API.get(`${url}/collections`);
export const fetchCollectionsBySearch = (searchQuery) =>
  API.get(`${url}/collections/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchCollectionsPaginate = (page) => API.get(`${url}/collections/paginate?page=${page}`);

export const createCollection = (newCollection) => API.post(`${url}/collections`, newCollection);
export const updateCollection = (id, updatedCollection) => API.put(`${url}/collections/${id}`, updatedCollection);
export const deleteCollection = (id) => API.delete(`${url}/collections/${id}`);
export const likeCollection = (id, userId) => API.put(`${url}/collections/${id}/likeCollection/${userId}`);

// musics
export const fetchMusics = () => API.get(`${url}/musics`);
export const createMusic = (newMusic) => API.post(`${url}/musics`, newMusic);
export const updateMusic = (id, updatedMusic) => API.put(`${url}/musics/${id}`, updatedMusic);
export const deleteMusic = (id) => API.delete(`${url}/musics/${id}`);

// E-Commerce

export const fetchProduits = () => axios.get(`${url}/products`);

export const createProduit = (newProduit) => axios.post(`${url}/products/addProduct`, newProduit);

export const deleteProduit = (id) => axios.delete(`${url}/products/deleteProduct/${id}`);

export const updateProduit = (id, updatedProduit) => axios.put(`${url}/products/updateProduct/${id}`, updatedProduit);

export const fetchProduitbyId = (id) => axios.get(`${url}/products/${id}`);

// E-Learning

// course
export const fetchCourses = () => axios.get(`${url}/course`);
export const fetchCoursesByIdUser = (id) => axios.get(`${url}/course/${id}`);

export const createCourse = (newCourse) => axios.post(`${url}/course`, newCourse);
export const updateCourse = (id, updatedCourse) => axios.put(`${url}/course/${id}`, updatedCourse);
export const deleteCourse = (id) => axios.delete(`${url}/course/${id}`);

// scrapping 
export const scrapCourses = (query) => axios.get(`${url}/course/searchcourse/${query}`);


// module

export const fetchModules = () => axios.get(`${url}/module`);
export const fetchModulesbyIdCource = (id) => axios.get(`${url}/module/${id}`);
export const createModule = (newModule) => axios.post(`${url}/module`, newModule);
export const updateModule = (id, updatedModule) => axios.put(`${url}/module/${id}`, updatedModule);
export const deleteModule = (id) => axios.delete(`${url}/module/${id}`);

//  QUIZ

export const fetchQuiz = () => axios.get(`${url}/quiz`);
export const fetchQuizByIdUser = (id) => axios.get(`${url}/quiz/${id}`);
export const fetchQuizByIdModule = (id) => axios.get(`${url}/quiz/module/${id}`);
export const createQuiz = (newQuiz) => axios.post(`${url}/quiz`, newQuiz);
export const updateQuiz = (id, updateQuiz) => axios.put(`${url}/quiz/${id}`, updateQuiz);
export const deleteQuiz = (id) => axios.delete(`${url}/quiz/${id}`);

//  Question

export const fetchQuestion = () => axios.get(`${url}/question`);
export const fetchQuestionByIdQuiz = (id) => axios.get(`${url}/question/${id}`);
export const createQuestion = (question) => axios.post(`${url}/question`, question);
export const updateQuestion = (id, question) => axios.put(`${url}/question/${id}`, question);
export const deleteQuestion = (id) => axios.delete(`${url}/question/${id}`);

// Answers 
export const createAnswer = (answer) => axios.post(`${url}/answer`, answer);

// Subscription
export const fetchSubscription = () => axios.get(`${url}/subscriptions`);
export const fetchSubscriptionByIdUser = (id) => axios.get(`${url}/subscriptions/${id}`)
export const createSubscription = (subscription) => axios.post(`${url}/subscriptions`, subscription);
export const deleteSubscription = (id) => axios.delete(`${url}/subscriptions/${id}`);
export const deleteSubscriptionByIdUserAndIdCourse = (idUser,idCourse) => axios.delete(`${url}/subscriptions/${idUser}/${idCourse}`);

// WishList
export const fetchWishList = () => axios.get(`${url}/wishlist`);
export const fetchWishByIdUser = (id) => axios.get(`${url}/wishlist/${id}`)
export const createWishList = (wish) => axios.post(`${url}/wishlist`, wish);
export const deleteWishList = (id) => axios.delete(`${url}/wishlist/${id}`);
export const deleteWishListByIdUserAndIdCourse = (idUser,idCourse) => axios.delete(`${url}/wishlist/${idUser}/${idCourse}`);

// Reviews 
export const fetchReviews = () => axios.get(`${url}/feedback`);
export const fetchReviewsByIdCourse = (id) => axios.get(`${url}/feedback/${id}`)
export const createReview = (wish) => axios.post(`${url}/feedback`, wish);
export const deleteReview = (id) => axios.delete(`${url}/feedback/${id}`);

/**   Statistics */
export const fetchTotalReviewsStatistics = (idUser) => axios.get(`${url}/feedback/statistics/${idUser}`)
export const fetchCoursesSubsStatistics = (idUser) => axios.get(`${url}/subscriptions/statistics/${idUser}`)
export const countCoursesByUser = (idUser) => axios.get(`${url}/subscriptions/statistics/countCourses/${idUser}`)
export const getTotalSubscriptionsByUser = (idUser) => axios.get(`${url}/subscriptions/statistics/getTotalSubscriptions/${idUser}`)
export const getTotalWishlistByUser = (idUser) => axios.get(`${url}/wishlist/statistics/getTotalWishlists/${idUser}`)


// Events
export const fetchEvents = () => axios.get(`${urlMac}/Events`);
export const createEvents = (newEvent) => axios.post(`${urlMac}/addEvent`, newEvent);
export const updateEvents = (id, updatedEvent) => axios.patch(`${urlMac}/update/${id}`, updatedEvent);
export const deleteEvents = (id) => axios.delete(`${urlMac}/delete/${id}`);
export const getOneEvent = (id) => axios.delete(`${urlMac}/Events/${id}`);

// Karaoke
export const fetchKaraokes = () => axios.get(`${urlMac}/Karaokes`);
export const createKaraokes = (newKaraoke) => axios.post(`${urlMac}/addKaraoke`, newKaraoke);
export const updateKaraokes = (id, updatedKaraoke) => axios.patch(`${urlMac}/updateKaraoke/${id}`, updatedKaraoke);
export const deleteKaraokes = (id) => axios.delete(`${urlMac}/deleteKaraoke/${id}`);

