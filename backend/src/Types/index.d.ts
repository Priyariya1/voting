
declare  global {
   
    type Mutate<T , R> = Omit<T, keyof R> & R ;


    type ErrorResponseType = { 
        code: number,
        name: string,
        message: string,
    }

    type AuthRequest<R, B=any> = Mutate<R, { 
        user: User.user 
        body: B
    }> 
}

export {}