export class ForbiddenError extends Error {
    constructor(status, message){
        super()
        this.name = "ForbiddenError"
        this.status = status
        this.message = message
    }
}