const { User } = require('./models'); // Assuming you have a User model
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (_, __, { token }) => {
 //need token?
  },
      Mutation: {
        login: async (_, { email, password }) => {

          const user = await User.findOne({ email });
    
          if (!user) {
            throw new Error('User not found');
          }
    
          const correctPassword = await user.isCorrectPassword(password);
    
          if (!correctPassword) {
            throw new Error('Incorrect password');
          }
    
          const token = signToken({
            username: user.username,
            email: user.email,
            _id: user._id
          });
    
          return { token, user };
        },
        addUser: async (_, { username, email, password }) => {

          const user = await User.create({ username, email, password });
    
          if (!user) {
            throw new Error('Failed to create user');
          }
    
          const token = signToken({
            username: user.username,
            email: user.email,
            _id: user._id
          });
    
          return { token, user };
        },
        saveBook: async (_, { bookInput }, { token }) => {
    
          if (!token) {
            throw new Error('Authentication token is required');
          }
    
          const user = await User.findOneAndUpdate(
            { _id: token._id },
            { $addToSet: { savedBooks: bookInput } },
            { new: true }
          );
    
          if (!user) {
            throw new Error('User not found');
          }
    
          return user;
        },
        removeBook: async (_, { bookId }, { token }) => {
       
          if (!token) {
            throw new Error('Authentication token is required');
          }
    
          const user = await User.findOneAndUpdate(
            { _id: token._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
    
          if (!user) {
            throw new Error('User not found');
          }
    
          return user;
        },
      },
    };
}
    
    module.exports = resolvers;
