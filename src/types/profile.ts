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

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  username: string;
  headline: string;
  avatarUrl: string;
  avatarPublicId: string;
}