const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000'
const URI_HISTORY_SVC = process.env.URI_HISTORY_SVC || 'http://localhost:8004'

const PREFIX_USER_SVC = '/api/user'

const PREFIX_HISTORY_SVC = '/api/history'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC

export const URL_HISTORY_SVC = URI_HISTORY_SVC + PREFIX_HISTORY_SVC