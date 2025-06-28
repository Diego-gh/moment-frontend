export interface UserType {
  _id: string;
  username: string;
  displayName: string;
  email: string;
  profileImage: {
    url: string;
  };
  bannerImage: {
    url: string;
  };
}
