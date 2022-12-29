import * as actionType from './ActionsTypes';

/////////////////// Feedback Reducer //////////////////////
export const feedbackRed = (state ={loading: true, errMsg: null, feedback: []}, action) => {
    switch (action.type) {
        case actionType.ADD_FEEDBACK:
            return {...state, loading: false, errMsg: null, feedback: action.payload}

        case actionType.FEEDBACK_LOADING:
            return {...state, loading: true, errMsg: null, feedback: []}

        case actionType.FEEDBACK_FAILED:
            return {...state, loading: false, errMsg: action.payload, feedback: []}   

        case actionType.POST_FEEDBACK:
            return {...state, feedback: state.feedback.concat(action.payload)};
                    
        default:
            return state;
    }
};

/////////////////// Comments Reducer //////////////////////
export const CommentsRed = (state = {loading: true, errMsg: null, comments: []}, action) => {

    switch (action.type) {
        case actionType.ADD_COMMENTS:
            return {...state, loading: false, errMsg: null, comments: action.payload}
            
        case actionType.COMMENTS_LOADING:
            return {...state, loading: true, errMsg: null, comments: []};

        case actionType.COMMENTS_FAILED:
            return {...state, loading: false, errMsg: action.payload, comments: []}
            
        default:
            return state;
    }
};

/////////////////// Plates Reducer //////////////////////
export const PlatesRed = (state = {loading: true, errMsg: null, plates: []}, action) =>{
    
    switch (action.type){
        case actionType.ADD_PLATES:
            return {...state, loading: false, errMsg: null, plates: action.payload}

        case actionType.PLATES_LOADING:
            return {...state, loading: true, errMsg: null, plates: []}

        case actionType.PLATES_FAILED:
            return {...state, loading: false, errMsg: action.payload, plates: []}  

        default: return state;
    }
};

/////////////////// Staff Reducer //////////////////////
export const StaffRed = (state = {loading: true, errMsg: null, staff: []}, action) => {
    switch (action.type) {
        case actionType.ADD_STAFF:
            return {...state, loading: false, errMsg: null, staff: action.payload}

        case actionType.STAFF_LOADING:
            return {...state, loading: true, errMsg: null, staff: []}

        case actionType.STAFF_FAILED:
            return {...state, loading: false, errMsg: action.payload, staff: []}
            
        default: return state;
    }
};


/////////////////// Login Reducer //////////////////////
export const LoginRed = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    errMsg: null }, action) => {

        switch (action.type) {
            
            case actionType.REQ_LOGIN:
                return({
                    ...state,
                    isLoading: true,
                    isAuthenticated: false,
                    user: action.payload
                });

            case actionType.LOGIN_SUCCESS:
                return({
                    ...state,
                    isLoading: false,
                    isAuthenticated: true,
                    token: action.payload
                });

            case actionType.LOGIN_FAILED:
                return({
                    ...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMsg: action.payload
                });

            case actionType.REQ_LOGOUT:
                return({
                    ...state,
                    isLoading: true,
                    isAuthenticated: true,
                });

            case actionType.LOGOUT_SUCCESS:
                return({
                    ...state,
                    isLoading: false,
                    isAuthenticated: false,
                    token: '',
                    user: null
                });    

            default:
                return state;
        }
};



/////////////////// WISH LIST Reducer //////////////////////
export const WishListRed = (state = {loading: true, errMsg: null, success: false, wishlist: []}, action) => {
    switch (action.type) {
        case actionType.ADD_FAVORITE:
        return {...state, loading: false, errMsg: null, wishlist: action.payload, success: false}

        case actionType.POST_NEW_DISH_TO_WISHLIST:
            return {...state, loading: false, errMsg: null, success: true}

        case actionType.FAVORITE_LOADING:
            return {...state, loading: true, errMsg: null, wishlist: [], success: false}

        case actionType.FAVORITE_FAILED:
            return {...state, loading: false, errMsg: action.payload, wishlist: [], success: false}
            
        default:
            return state;
    }
};
