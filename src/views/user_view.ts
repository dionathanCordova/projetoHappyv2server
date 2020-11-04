import UserModel from "../models/User";

export default {
   render(user: UserModel) {
      return {
         id: user.id,
         name: user.name,
         email: user.email,
         createdAt: user.created_at
      }
   },

   renderMany(user: UserModel[]) {
      return user.map(users => this.render(users))
   }
}