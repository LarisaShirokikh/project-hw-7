export const jwtConstants = {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET || "staging-secret"
  };
  
  export const basicConstants = {
    userName: process.env.SA_LOGIN || "admin",
    password: process.env.SA_PASSWORD || "qwerty"
  };