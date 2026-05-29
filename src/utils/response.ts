export function success(message: string, data:any){
    return{
        success: true,
        message,
        data
    }
}
export function error(message:string){
    return{
        success: false,
        error: message
    }
}