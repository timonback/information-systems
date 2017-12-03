const dudeService = require('../service/dudeService');

export const resolvers = {
  Query: {
    dudes: () => {
      return dudeService.findAll();
    },
    dude: (root, { id }) => {
      return dudeService.findById(id);
    },
      dudesByStatus: (root, { status }) => {
          return dudeService.findByStatus(status);
      },
  },
  Mutation: {
    addDude: (root, args) => {
        return dudeService.addDude(args.name);
    },
      addFriend: (root, args) => {
          return dudeService.addFriend(args.dudeId, args.friendId);
      },
  },
};
