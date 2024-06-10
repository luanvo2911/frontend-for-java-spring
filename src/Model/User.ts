export default interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  secondname: string;
}

export interface UserContextType {
  authenticated: boolean;
  updateAuthenticated: () => void;
}
