import bcrypt from 'bcrypt';


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed_pw = await bcrypt.hash(password, salt);
    return { salt, hashed_pw };
}





