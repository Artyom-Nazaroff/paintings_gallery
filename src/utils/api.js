import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test-front.framework.team/'
});

export const api = {
    getPaintings(str = '', pageSize, currentPage) {
        return instance.get(`paintings`, {
            params: {
                q: str,
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
    getAuthorPaintings(id) {
        return instance.get(`paintings`, {
            params: {
                authorId: id,
            }
        });
    },
    getLocationPaintings(id) {
        return instance.get(`paintings`, {
            params: {
                locationId: id,
            }
        });
    },
    searchPainting(str, page, pageSize) {
        return instance.get(`paintings`, {
            params: {
                q: str,
                _page: page,
                _limit: pageSize,
            }
        });
    },

    searchQuery(str , author , location , from , before , page = 1, pageSize = 6) {
        return instance.get(`paintings`, {
            params: {
                _page: page,
                _limit: pageSize,
                q: str,
                authorId: author,
                locationId: location,
                created_gte: from,
                created_lte: before,
            }
        });
    }
};