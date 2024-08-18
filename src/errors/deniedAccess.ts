export class DeniedAccess extends Error {
    constructor() {
        super('Access Denied: Unauthorized token');
    }
}