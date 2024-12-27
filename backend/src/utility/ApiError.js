class ApiError extends Error{
    constructor(
        statusCode,
        stack="",
        errors=[],
        message="Something went wrong"
        
    ){
        super(message)
        this.statusCode=statusCode
        this.message=message
        this.success=false
        this.data=null
        this.errors=errors
        if(stack!=null){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

        

    }
}
export {ApiError}