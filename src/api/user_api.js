import { BASEURL } from '../../config'

const getUser = async (authId) => {
    return fetch(`${BASEURL}/api/login/${authId}`);
}

const pingServer = async () => {
    return fetch(`${BASEURL}/ping`)
}

export {
    getUser,
    pingServer
}