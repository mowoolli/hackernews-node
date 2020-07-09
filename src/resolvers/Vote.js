function link(parent, args, context, info) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link()
}

function user(parent, args, context, info) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user()
}

module.exports = {
  link,
  user,
}