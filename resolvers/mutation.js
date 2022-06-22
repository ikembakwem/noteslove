module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: "My Super Hero",
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models }) => {
    try {
      return await models.Note.findOneAndUpdate(
        { _id: id },
        { content: content },
        { new: true }
      );
    } catch (err) {
      return console.log("Note does not exist");
    }
  },
};
