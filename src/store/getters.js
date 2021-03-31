export const isLoggedIn = (state) =>{
    return !!state.token;
};

export const authStatus = (state) =>{
    return state.status;
};



export const followerCount = (state) =>{
    return state.followingUsers.length + 1;
};