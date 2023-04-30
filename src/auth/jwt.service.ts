import { Injectable } from "@nestjs/common"
import jwt from 'jsonwebtoken'
import { User } from "src/schemas/users.schema"

@Injectable()
export class JwtService  {

  async getUserIdByToken (token: string){
    try{
      const result:any =  await jwt.verify(token, process.env.JWT_SECRET || '123')
      return result.userId
    } catch (error) {
      return null
    }
  }

  async userIdByToken (token: string) {
    try {
      const result: any = jwt.verify(token, process.env.JWT_SECRET || '123')
      return result.userId
    } catch (error) {
      return null
    }
  }

  async createJwtPair(user: User) {
    console.log(user)
    const accessToken = jwt
      .sign({userId: user.id},
        process.env.JWT_SECRET || '123', {expiresIn: '3h'})
    const refreshToken = jwt
      .sign({userId: user.id},
        process.env.JWT_SECRET || '123', {expiresIn: '5h'})
    const jwtTokenPair = {accessToken, refreshToken}
    return jwtTokenPair
  }

  async getTokenTime(token: string) {
    try{
      const result: any = await jwt.verify(token, process.env.JWT_SECRET || '123')
      if(result) {
        return result.exp
      } else {
        return false
      }
    }
    catch (error){
      return false
    }
  }
}