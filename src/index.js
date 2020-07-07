const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',

    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },

    link: async (parent, args, context) => {
      return context.prisma.link.findOne({
        where: { id: parseInt(args.id) },
      })
    },
  },

  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink
    },

    updateLink: (parent, args, context) => {
      return context.prisma.link.update({
        data: {
          id: parseInt(args.id),
          description: args.description,
          url: args.url,
        },
        where: { id: parseInt(args.id) }
      })
    },

    deleteLink: (parent, args, context) => {
      return context.prisma.link.delete({
        where: { id: parseInt(args.id) },
      })
    }
  }
}

const prisma = new PrismaClient()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  context: {
    prisma
  },
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))