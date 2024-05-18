import { HttpError } from 'wasp/server'

export const getTimers = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Timer.findMany({
    where: { userId: context.user.id }
  });
}

export const getTimer = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const timer = await context.entities.Timer.findUnique({
    where: { id: args.id, userId: context.user.id },
    select: {
      id: true,
      name: true,
      endTime: true,
      design: true
    }
  });
  if (!timer) throw new HttpError(404, 'No timer with id ' + args.id);
  return timer;
}