const isDocker = true;

const URI_USER_SVC = isDocker ? 'http://user-service:8000' : 'http://localhost:8000'
const URI_HISTORY_SVC = isDocker ? 'http://history-service:8004' : 'http://localhost:8004'

const PREFIX_USER_SVC = '/api/user'

const PREFIX_HISTORY_SVC = '/api/history'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC

export const URL_HISTORY_SVC = URI_HISTORY_SVC + PREFIX_HISTORY_SVC