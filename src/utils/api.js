import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test-front.framework.team/'
});

export const api = {
    getPaintings(pageSize, currentPage) {
        return instance.get(`paintings`, {
            params: {
                _limit: pageSize,
                _page: currentPage,
            }
        });
    },
    getAuthors() {
        return instance.get(`authors`);
    },
    getLocations() {
        return instance.get(`locations`);
    },


    // follow(userId) {
    //     return instance.post(`follow/${userId}`);
    // },
    // unfollow(userId) {
    //     return instance.delete(`follow/${userId}`);
    // },
    // getUserProfile(userId) {
    //     console.warn('Obsolete method. Please, use profileAPI object');
    //     return profileAPI.getUserProfile(userId);
    // },
};