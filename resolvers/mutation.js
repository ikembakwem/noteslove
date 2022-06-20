module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: "My Super Hero",
    });
  },
  newNoteAndAuthor: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: args.author,
    });
  },
};
