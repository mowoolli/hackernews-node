const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = requires('@prisma/client')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id)
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const updatedLink = {
        id: args.id,
        description: args.description,
        url: args.url
      }
      let foundLink = links.find(link => link.id === updatedLink.id)
      if (foundLink) {
        foundLink = updatedLink
        return foundLink
      }
    },
    deleteLink: (parent, args) => {
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          const deletedLink = links[i]
          links.splice(i, 1)
          return deletedLink
        }
      }
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