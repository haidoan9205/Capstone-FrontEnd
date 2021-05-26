import axios from "axios";
import state from "./state";
import Vue from "vue";


export const getImages = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })

    axios
        .get("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/random")
        .then((response) => {
            commit("SET_IMAGES", response.data);
            loader.hide()
        }).catch((err) => {
            loader.hide();
        })
};

export const getImagesAll = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    axios
        .get("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/GetAllNormalPhoto")
        .then((response) => {
            commit("SET_IMAGES_ALL", response.data);
            loader.hide()
        }).catch((err) => {
            loader.hide();
        })
};

export const getImagesAllExclusive = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    axios
        .get("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/GetAllExclusivePhoto")
        .then((response) => {
            commit("SET_IMAGES_ALL_EXCLUSIVE", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
};

export const getUserNonExlusiveImages = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserNormalPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_USER_NON_EXCLUSIVE", response.data);
            loader.hide()
        }).catch((err) => {
            loader.hide();
        })
}

export const getUserExlusiveImages = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserExclusivePhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_USER_EXCLUSIVE", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
}

export const getStrangerExlusiveImages = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })

    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserExclusivePhoto/${window.localStorage.getItem('strangerId')}`
        )
        .then((response) => {
            commit("SET_IMAGES_STRANGER_EXCLUSIVE", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
}

export const getStrangerNonExlusiveImages = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })

    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserNormalPhoto/${window.localStorage.getItem('strangerId')}`
        )
        .then((response) => {
            commit("SET_IMAGES_STRANGER_NON_EXCLUSIVE", response.data);
            loader.hide()
        }).catch((err) => {
            loader.hide();
        })
}

export const getNotification = ({ commit }) => {
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetNotification/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_NOTIFICATIONS", response.data);
        });
}

export const getUserExlusiveProperty = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserExclusivePropertyPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_EXCLUSIVE_PROPERTY", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
}

export const getImage = ({ commit }, photoId) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })

    state.image = '';
    state.checkIsYour = false;
    state.checkIsBought = false;
    axios
        .get(`https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/${photoId}`)
        .then((response) => {
            commit("SET_IMAGE", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
};

export const checkIsFollowed = ({ commit }) => {
    axios({
        method: "GET",
        url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/CheckFollowedUser?userId=" +
            JSON.parse(state.user).userId +
            "&followId=" +
            window.localStorage.getItem("strangerId"),
    }).then((response) => {
        commit("CHECK_IS_FOLLOWED", response.data);
    });
}

export const getStrangeUser = ({ commit }, userId) => {
    state.stranger = null;
    state.checkIsFollowed = false;
    axios
        .get(`https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetById/${userId}`)
        .then((response) => {
            commit("SET_STRANGER", response.data);
        });
};

export const downloadImage = ({ commit }, { tokenId, photoId }) => {
    console.log(photoId);
    console.log(tokenId);
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios({
        url: `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/DownloadPhoto?tokenId=${tokenId}&photoId=${photoId}&userId=${user_parsed.userId}`,
        method: "GET",
        responseType: "blob",
    }).then((response) => {
        console.log(response.status);
        if (response.status == 200) {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");
            var filename = response.headers["content-disposition"];
            filename = filename.split(";");
            filename = filename[1].substring(filename[1].lastIndexOf("="));
            filename = filename.substring(1);
            fileLink.href = fileURL;
            fileLink.setAttribute("download", filename);
            document.body.appendChild(fileLink);
            fileLink.click();
        }
        if (response.status == 400) {
            Vue.$toast.error('Sorry your token has expired!!!', {
                // override the global option
                position: 'bottom-right'
            })
        }
    }).catch((error) => {
        Vue.$toast.error('Sorry your token has expired!!!', {
            // override the global option
            position: 'bottom-right'
        })
    });
};


export const addPhotoToCart = ({ commit }, { image }) => {
    commit("ADD_TO_CART", { image });
};

export const removeItem = ({ commit }, { image }) => {
    commit("REMOVE_ITEM", { image });
};

export const checkIsBought = ({ commit }, photoId) => {

    axios({
        method: "GET",
        url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/CheckBoughtPhoto?id=" +
            photoId +
            "&userId=" +
            JSON.parse(state.user).userId,
    }).then((response) => {
        commit('CHECK_IS_BOUGHT', response.data);
    });
}

export const checkIsYour = ({ commit }, photoId) => {
    axios({
        method: "GET",
        url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Photo/CheckMyPhoto?photoId=" +
            photoId +
            "&userId=" +
            JSON.parse(state.user).userId,
    }).then((response) => {
        commit('CHECK_IS_YOUR', response.data)
    });
}

export const login = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
                url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Auth",
                data: user,
                method: "POST",
            })
            .then((resp) => {
                const token = resp.data.token;
                const user = resp.data;
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("user", JSON.stringify(user));
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success", user);
                resolve(resp);
                
            })
            .catch((err) => {
                commit("auth_error");
                Vue.$toast.error('Username or password is not correct.', {
                    position: "top",
                })
                window.localStorage.removeItem("token");
                reject(err);
            });
    });
};

export const getImagesOfFollowing = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/GetPhotoOfAllUserWeAreFollowing/${user_parsed.userId}?userId=${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_IMAGES_FOLLOWING", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
}

export const getTransactions = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetBoughtPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_TRANSACTIONS", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })
};

export const getUnknownPeople = ({ commit }) => {
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/Get5UserOfUserThatWeAreFollowThatTheyAreFollowing/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_UNKNOWNPEOPLE", response.data);
        });
}

export const getFollowingUsers = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/GetFollowingUser/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_FOLLOWINGUSERS", response.data);
            loader.hide();
        }).catch((err) => {
            loader.hide();
        })

};

export const getFollowingStranger = ({ commit }, strangerId) => {
    state.followingStranger = [];
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Follow/GetFollowingUser/${strangerId}`
        )
        .then((response) => {
            commit("SET_FOLLOWINGSTRANGERS", response.data);
        });
};

export const register = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
                url: "https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Auth/Register",
                data: user,
                method: "POST",
            })
            .then((resp) => {
                const token = resp.data.token;
                const user = resp.data;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = token;
                commit("auth_success", user);
                Vue.$toast.success('Welcome to imago, your account is created.')
                resolve(resp);
            })
            .catch((err) => {
                commit("auth_error", err);
                Vue.$toast.error('Something went wrong, please check your register information.')
                localStorage.removeItem("token");
                reject(err);
            });
    });
};

export const logout = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        localStorage.removeItem("ucart");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
    });
};

export const getApprovedImageByUser = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserApprovedPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("GET_APPROVED_IMAGE", response.data);
            loader.hide();
        });
};

export const getPendingImageByUser = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserPendingPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("GET_PENDING_IMAGE", response.data);
            loader.hide();
        });
};

export const getApprovedImageByStranger = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const strangerId = window.localStorage.getItem('strangerId');
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserApprovedPhoto/${strangerId}`
        )
        .then((response) => {
            commit("GET_APPROVED_IMAGE_STRANGER", response.data);
            loader.hide();
        });
};

export const getTransactionDetail = ({ commit }, transactionId) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Transaction/GetTransaction/${transactionId}`
        )
        .then((response) => {
            commit("GET_HISTORY_DETAIL", response.data);
            loader.hide();
        });
}

export const getHistory = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Transaction/GetAllTransactionByUserID/${user_parsed.userId}`
        )
        .then((response) => {
            commit("SET_HISTORY", response.data);
            loader.hide();
        });
}


export const getDeniedImageByUser = ({ commit }) => {
    let loader = Vue.$loading.show({
        loader: 'dots',
        height: 50,
        width: 50,
    })
    const user = localStorage.getItem("user");
    const user_parsed = JSON.parse(user);
    console.log("user parse");
    console.log(user_parsed);
    axios
        .get(
            `https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetUserDeniedPhoto/${user_parsed.userId}`
        )
        .then((response) => {
            commit("GET_DENIED_IMAGE", response.data);
            loader.hide();
        });
};