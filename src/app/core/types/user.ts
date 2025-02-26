export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface UsersResponse {
  page: string;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

export interface UserResponse {
  data: User;
  support: {
    url: string;
    text: string;
  };
}
