import { HttpError } from 'wasp/server'

export const createTimer = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Timer.create({
    data: {
      name: args.name,
      endTime: args.endTime,
      design: args.design,
      userId: context.user.id
    }
  });
}

export const updateTimer = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const timer = await context.entities.Timer.findUnique({
    where: { id: args.timerId }
  });
  if (timer.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Timer.update({
    where: { id: args.timerId },
    data: { name: args.name, endTime: args.endTime, design: args.design }
  });
}