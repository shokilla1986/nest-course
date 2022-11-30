import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const DecrementId = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.query) {
      data.forEach((element) => {
        const id = request.query[element];
        if (id) {
          request.query[element] = id - 1;
        }
      });
    }
    return data;
  },
);
