import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // 可以根据实际情况更改 `user` 类型
}
