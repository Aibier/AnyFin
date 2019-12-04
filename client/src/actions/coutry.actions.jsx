import { authService } from "../services";
import { countryContants } from "../constants";

export function getCountries() {
    return dispatch => {
        dispatch(request());
        authService.getCountries()
            .then(
                countries => dispatch(success(countries)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: countryContants.GET_COUNTRIES_REQUEST } }
    function success(countries) {
        return { type: countryContants.GET_COUNTRIES_SUCCESS, countries } }
    function failure(error) { return { type: countryContants.GET_COUNTRIES_FAILURE, error } }
}

export function getCountryByName(value) {
    return dispatch => {
        dispatch(request());
        authService.getCountryByName(value)
            .then(
                countries => dispatch(success(countries)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: countryContants.GET_COUNTRY_DETAIL_REQUEST } }
    function success(countries) {
        return { type: countryContants.GET_COUNTRY_DETAIL_SUCCESS, value, countries } }
    function failure(error) {
        return { type: countryContants.GET_COUNTRY_DETAIL_FAILURE, error } }
}