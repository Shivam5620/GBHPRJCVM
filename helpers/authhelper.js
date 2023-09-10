import bcrypt from "bcrypt";

 const hasPassword = async (password) => {

    try {
        const saltround = 10;
        const hashedpasssword = await bcrypt.hash(password, saltround)
        return hashedpasssword
    } catch (error) {
        console.log(error);
    }
}
export default hasPassword;

export const comparePassword = async (password, hashedpasssword) => {
    return bcrypt.compare(password, hashedpasssword)

}