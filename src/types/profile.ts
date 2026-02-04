export interface ChangePasswordRequestBody {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequestBody {
  name: string;
  headline: string;
  avatar: File | null;
}