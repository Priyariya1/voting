import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { UsersRepository } from '../../DB';
import { Exceptions } from '../../Exceptions';
import { getUserByEmail } from '../../Repositories/User';

export async function signUp(request: Mutate<Request, { body: User.signUp }>, response: Response, next: NextFunction) {

    const { email, name, password } = request.body;

    try {

        const existingUser = await getUserByEmail(email);

        if (existingUser) Exceptions.invalidRequest(`Email address '${email}' already exists. please login`);

        const newUser = await createNewUser({ email, name, password });

        const safeToReturn = _.omit(newUser, [ 'id','password' ]) as User.signUpResponse

        return response.json(safeToReturn);

    } catch (error) {
        return next(error)
    }

}


async function createNewUser(data: User.signUp) {

    const salt = await bcrypt.genSalt(10);

    data.password = await bcrypt.hash(data.password, salt)

    try {
        return await UsersRepository.create({ data });
    } catch (error: any) {

        throw Exceptions.invalidRequest(`Sorrry, failed to add new user ${error.message ?? ''}`);
    }
}

