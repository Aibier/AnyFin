import { countryContants } from '../constants';

export function countries(state = {}, action = {}) {
    switch (action.type) {
        case countryContants.GET_COUNTRIES_REQUEST:
            return {
                loading: true
            };
        case countryContants.GET_COUNTRIES_SUCCESS:
            return {
                items: action.countries
            };
        case countryContants.GET_COUNTRIES_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function country(state = {}, action = {}) {
    switch (action.type) {
        case countryContants.GET_COUNTRY_DETAIL_REQUEST:
            return {
                loading: true
            };
        case countryContants.GET_COUNTRY_DETAIL_SUCCESS:
            return {
                items: action.countries
            };
        case countryContants.GET_COUNTRY_DETAIL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function search(state = { }, action = {}) {
    switch(action.type) {
        case countryContants.SEARCH: {
            const { value } = action;
            return {...state, value };
        }
        default:
            return state;
    }
}