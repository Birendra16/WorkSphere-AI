import { User } from "./user.model.js";
import { IUser } from "./user.types.js";

export const createUser = async (data: Partial<IUser>) => {
  return await User.create(data);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select("+password +refreshToken");
};

export const findUserById = async (id: string) => {
  return await User.findById(id);
};

export const updateRefreshToken = async (userId: string, refreshToken: string | null) => {
  return await User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
};

export const updateProfile = async (userId: string, data: Partial<IUser>) => {
  return await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};
