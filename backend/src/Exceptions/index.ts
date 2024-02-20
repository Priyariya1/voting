import commonExceptions from './Common'
import authExceptions from './auth'


export const Exceptions = {
    ...commonExceptions,
    ...authExceptions,
}