
declare module User {

    interface signUp {
        email: string,
        name: string,
        password: string,
    }

    interface signUpResponse {
        email: string,
        uuid: string,
        name: string | null,
    }

    interface login {
        email: string,
        password: string,
    }

    interface loginResponse {
        authToken: string
    }

    interface user extends signUpResponse {
        role: 'user' | 'admin',
        password: string,
        id: number,
    }


}




