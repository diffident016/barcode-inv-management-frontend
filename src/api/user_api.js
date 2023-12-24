import { BASEURL } from '../../config'

const getUser = async (authId) => {
    return fetch(`${BASEURL}/api/login/${authId}`);
}

export {
    getUser
}