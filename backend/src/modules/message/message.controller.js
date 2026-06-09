const Message = require("./message.model");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await Message.create({
      name,
      email,
      message,
      owner: req.user.userId.toString(),
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error : Message not created" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      owner: req.user.userId.toString(),
    }).sort({ createdAt: -1 });
    if (messages.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Server error : Failed to fetch messages",
      error: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete({
      _id: id,
      owner: req.user.userId.toString(),
    });
    res.status(200).json({ message: "Message Deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Server error : Failed to delete message",
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
