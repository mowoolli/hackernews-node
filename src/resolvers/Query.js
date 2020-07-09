function info() {
  return 'This is the API of a Hackernews Clone'
}

async function feed(parent, args, context, info) {
  // The 'where' parameter that is passed to findMany()
  const where = args.filter ? {
    OR: [
      { description: { contains: args.filter } },
      { url: { contains: args.filter } },
    ],
  } : {}

  return await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
  })
}

async function link(parent, args, context, info) {
  return context.prisma.link.findOne({
    where: { id: parseInt(args.id) },
  })
}

module.exports = {
  info,
  feed,
  link,
}