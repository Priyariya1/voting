import jwt from 'jsonwebtoken'


export class Jwt {
    private static expiry = '2 days';

    private static secret = (process.env.JWT_SECRET as string) || 'dsdsadasd';

    static create(payload: JWT.generate): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiry,
        });
    }

    static decode(token: string): JWT.generate | null | string {
        try {
            const payload =   jwt.verify(token, this.secret)

            if(!payload) return null;

            console.log(payload);
            //@ts-ignore
            return payload


        } catch (err) {
            throw err; //TODO add error handling mechanism
        }
    }
}
