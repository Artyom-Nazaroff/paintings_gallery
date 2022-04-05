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