import * as actionType from './ActionsTypes';
import { url } from '../shared_data/Url';

/////////////////////////////////{ POST FEEDBACK }/////////////////////////////////
export const postFeedback = (feedback) => (dispatch) =>{

    // var mutatedFeedback = JSON.parse(JSON.stringify(feedback)); //This line for changing the object from not extensible to extensible
    // mutatedFeedback.image = `feedback_images/(${feedback.get('id')})`;
    // console.log(mutatedFeedback);

    const accessToken = "Bearer " + localStorage.getItem('token');
    var isAuthenticated = localStorage.getItem('token') ? true : false;

    const reqBody = isAuthenticated ? feedback
                    : 
                    {   guestAuthor:{
                            firstname: feedback.firstname,
                            lastname: feedback.lastname,
                            email: feedback.email,
                            phone: feedback.phone
                        },
                        feedback: feedback.feedback
                    }

    fetch(url + (isAuthenticated ? 'feedback' : 'feedback/guest'), {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error post Feedback: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(feedback => dispatch(postNewFeedback(feedback)))
    .catch(error => {alert('Error:\n' + error.message)})
};

export const postNewFeedback = (feedback) =>({
    type: actionType.POST_FEEDBACK,
    payload: feedback
});

/////////////////////////////////{ FETCH FEEDBACK }/////////////////////////////////
export const fetchFeedback = () => (dispatch) =>{
    dispatch(feedbackLoading(true));

    fetch(url + 'feedback')
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error fetch Feedback: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(feedback => dispatch(addFeedback(feedback)))
    .catch(error => dispatch(feedbackFailed(error.message)))
};

export const addFeedback = (feedback) =>({
    type: actionType.ADD_FEEDBACK,
    payload: feedback
});
export const feedbackLoading = () => ({
    type: actionType.FEEDBACK_LOADING
});

export const feedbackFailed = (errMsg) => ({
    type: actionType.FEEDBACK_FAILED,
    payload: errMsg
});


/////////////////////////////////{ FETCH COMMENTS }/////////////////////////////////
export const fetchComments = (plateId) => (dispatch) =>{

    dispatch(commentsLoading(true));

    fetch(`${url}plates/${plateId}/comments`)
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error fetch Comments: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const addComments = (comments) =>({
    type: actionType.ADD_COMMENTS,
    payload: comments
});
export const commentsLoading = () =>({
    type: actionType.COMMENTS_LOADING
});
export const commentsFailed = (errMsg) =>({
    type: actionType.COMMENTS_FAILED,
    payload: errMsg
});

/////////////////////////////////{ POST COMMENT }/////////////////////////////////
export const postComment = (plateId, rating, comment) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    const newComment = {
        rating: rating,
        comment: comment,
    };

    fetch(`${url}plates/${plateId}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else{
            var error = new Error('Error ' + res.status + ' ' + res.statusText);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error post Comment: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(res => res.json())
    .then(() => dispatch(fetchComments(plateId)))
    .catch(error => {alert('Your comment couldn\'t be posted\n' + error.message)});
};

/////////////////////////////////{ UPDATE COMMENTS }/////////////////////////////////
export const updateComment = (plateId, commentId, data) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(`${url}plates/${plateId}/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res =>{
        if(res.ok){
            return res;
        }else{
            var error = new Error("Comment could not be updated:\n " + res.status + ' ' + res.statusText);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error update Comment: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(res => res.json())
    .then(() => dispatch(fetchComments(plateId)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

/////////////////////////////////{ DELETE COMMENT }/////////////////////////////////
export const deleteComment = (plateId, commentId) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(`${url}plates/${plateId}/comments/${commentId}`, {
        method: 'DELETE',
        // body: {},
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error delete Comment: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(() => dispatch(fetchComments(plateId)))
    .catch(error => {alert('Your comment couldn\'t be deleted\n' + error.message)});
};



/////////////////////////////////{ FETCH PLATES }/////////////////////////////////
export const fetchPlates = () => (dispatch) =>{
    dispatch(platesLoading(true));

    fetch(url + 'plates')
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error fetch Plates: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(dishes => dispatch(addPlates(dishes)))
    .catch(error => dispatch(platesFailed(error.message)));
};

export const addPlates = (dishes) =>({
    type: actionType.ADD_PLATES,
    payload: dishes
});

export const platesLoading = () => ({
    type: actionType.PLATES_LOADING
});

export const platesFailed = (errMsg) => ({
    type: actionType.PLATES_FAILED,
    payload: errMsg
});



/////////////////////////////////{ FETCH STAFF }/////////////////////////////////
export const fetchStaff = () => (dispatch) =>{
    dispatch(staffLoading(true));

    fetch(url + 'staff')
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
        var disconnected = new Error('Error fetch Staff: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(res => res.json())
    .then(staff => dispatch(addStaff(staff)))
    .catch(error => dispatch(staffFailed(error.message)));
};

export const addStaff = (staff) =>({
    type: actionType.ADD_STAFF,
    payload: staff
});

export const staffLoading = () => ({
    type: actionType.STAFF_LOADING
});

export const staffFailed = (errMsg) => ({
    type: actionType.STAFF_FAILED,
    payload: errMsg
});



/////////////////////////////////{ HANDLE LOGIN }/////////////////////////////////
export const handleLogin = (creds) => (dispatch) =>{

    fetch(url + 'users/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
            dispatch(loginReq(res));
            // Dispatch the success action
            dispatch(fetchWishList());

            // Delay with 3 seconds just to see spinner loading effects (testing purpose) 
            setTimeout(() => {
                dispatch(loginRes(res));
            }, 2000);
            
        }
        else {
            var error = new Error(res.err);
            error.res = res;
            throw error;
        }
    })
    .catch(error => dispatch(loginFailed(error.message)));
};

export const loginReq = (res) =>({
    type: actionType.REQ_LOGIN,
    payload: res.userInfo
});

export const loginRes = (res) =>({
    type: actionType.LOGIN_SUCCESS,
    payload: res.token
});

export const loginFailed = (errMsg) =>({
    type: actionType.LOGIN_FAILED,
    payload: errMsg
});

/////////////////////////////////{ HANDLE LOGOUT }/////////////////////////////////
export const handleLogout = () => (dispatch) =>{
    dispatch(logoutReq());
    
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // dispatch(favoriteFailed("Error 401: Unauthorized"));
    
    // Delay with 3 seconds just to see spinner loading effects (testing purpose) 
    setTimeout(() => {
        dispatch(logoutRes());
    }, 2000);    
}

export const logoutReq = () =>({
    type: actionType.REQ_LOGOUT
});

export const logoutRes = () =>({
    type: actionType.LOGOUT_SUCCESS
})


/////////////////////////////////{ SIGNUP }/////////////////////////////////
export const handleSignup = (newUser) => (dispatch) =>{

    fetch(url + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Signup Error: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then((res) => {
        console.log(newUser);
        const creds ={
            username: newUser.username,
            password: newUser.password
        }
        fetch(url + 'users/login', {
            method: 'POST',
            body: JSON.stringify(creds),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((res) =>{
            if (res.ok){
                return res;
            }else{
                var error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
        },
        (error) =>{
            throw error;
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', res.token);
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
                dispatch(loginReq(res))
                // Dispatch the success action
                dispatch(fetchWishList());
                setTimeout(() => {
                    dispatch(loginRes(res));
                }, 2000);
            }
            else {
                var error = new Error('Error ' + res.status);
                error.res = res;
                throw error;
            }
        })
        .catch(error => dispatch(loginFailed(error.message)))
    })
    
};



/////////////////////////////////{ FETCH WISH LIST }/////////////////////////////////
export const fetchWishList = () => (dispatch) =>{
    dispatch(wishListLoading());

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(`${url}wishlist`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error fetch WishList: ' + res.status + ' ' + res.statusText);
        throw error;
    })
    .then(res => res.json())
    .then(wishList => dispatch(addWishList(wishList)))
    .catch(error => dispatch(wishListFailed(error.message)));
};

export const addWishList = (wishList) =>({
    type: actionType.ADD_FAVORITE,
    payload: wishList
});

export const postNewDishToWishList = () =>({
    type: actionType.POST_NEW_DISH_TO_WISHLIST,
});

export const wishListLoading = () => ({
    type: actionType.FAVORITE_LOADING
});

export const wishListFailed = (errMsg) => ({
    type: actionType.FAVORITE_FAILED,
    payload: errMsg
});

/////////////////////////////////{ POST WISH LIST }/////////////////////////////////
export const postLikeDish = (plateId) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');
    
    fetch(url + 'wishlist/' + plateId, {
        method: 'POST',
        body: JSON.stringify({"_id": plateId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error post WishList: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(fav => {dispatch(postNewDishToWishList()); dispatch(addWishList(fav));})
    .catch(error => {alert('Your plate couldn\'t be added\n' + error.message)});
};

/////////////////////////////////{ DELETE WISH LIST }/////////////////////////////////
export const deleteLikeDish = (plateId) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');
    
    fetch(url + 'wishlist/' + plateId, {
        method: 'DELETE',
        // body: JSON.stringify({"_id": plateId}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error deleteWishList: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .then(res => res.json())
    .then(fav => dispatch(addWishList(fav)))
    .catch(error => {alert('Your plate couldn\'t be deleted\n' + error.message)});
};

// $$$$$$$$$$$$$$$$$$$$$ ADMIN WORKS $$$$$$$$$$$$$$$$$$$$$

/////////////////////////////////{ POST NEW PLATE }/////////////////////////////////
export const postNewPlate = (plate) => (dispatch) =>{
    dispatch(platesLoading(true));

    plate.image = `images/${plate.image.name}`;

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'plates/', {
        method: 'POST',
        body: JSON.stringify(plate),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            // return res;
            dispatch(platesFailed(res.message));
        }else{
            var error = new Error(res.message);
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error post Plate: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(() => dispatch(fetchPlates()))
    .catch(error => dispatch(platesFailed(error.message)));
};

/////////////////////////////////{ UPLOAD IMAGE }/////////////////////////////////
export const uploadImage = (image) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'uploadimg', {
        method: 'POST',
        body: image,
        headers: {
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error post image: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .catch(error => {alert('image couldn\'t be posted\n' + error.message)});
};

/////////////////////////////////{ DELETE IMAGE }/////////////////////////////////
export const deleteImage = (image) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'uploadimg/delete', {
        method: 'DELETE',
        body: JSON.stringify(image),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.ok){
            return res;
        }else
        var error = new Error('Error ' + res.status + ' ' + res.statusText);
        throw error;
    }, error =>{
    var disconnected = new Error('Error delete image: ' + error.message + ' (Cannot connect to the server)')
    throw disconnected
    })
    .catch(error => {alert('image couldn\'t be deleted\n' + error.message)});
};

/////////////////////////////////{ DELETE PLATE }/////////////////////////////////
export const deletePlate = (plateId) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'plates/', {
        method: 'DELETE',
        body: JSON.stringify(plateId),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            // return res;
            dispatch(platesFailed(res.message));
        }else{
            var error = new Error("Dish could not be deleted");
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error delete Plate: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(() => dispatch(fetchPlates()))
    .catch(error => dispatch(platesFailed(error.message)));
};

/////////////////////////////////{ UPDATE PLATE }/////////////////////////////////
export const updatePlate = (plateId, data) => (dispatch) =>{

    const accessToken = "Bearer " + localStorage.getItem('token');

    fetch(url + 'plates/' + plateId, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(res =>{
        if(res.success){
            // return res;
            dispatch(platesFailed(res.message));
        }else{
            var error = new Error("Dish could not be updated");
            throw error;
        }
    }, error =>{
        var disconnected = new Error('Error update Plate: ' + error.message + ' (Cannot connect to the server)')
        throw disconnected
    })
    .then(() => dispatch(fetchPlates()))
    .catch(error => dispatch(platesFailed(error.message)));
};