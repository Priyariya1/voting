import { UsersRepository } from "../../DB";

export async function getUserByEmail(email: string) {
    return UsersRepository.findFirst({ where: { email } })
}

export async function getUserByEmailAndUuid(email: string,uuid:string) {
    return UsersRepository.findFirst({ where: { email,uuid } })
}
