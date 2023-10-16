const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.create_message_post = [
  body('message', 'message must contain at least 2 characters')
    .trim()
    .isLength({ min: 2, max: 280 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('new', {
        title: 'Send a message!',
        errors: errors.array(),
      });
    } else {
      // data is valid, send message
      try {
        const messageText = req.body.message;
        const userId = req.user._id;

        const message = new Message({
          author: userId,
          text: messageText
        })

        const result = await message.save();
        res.redirect('/');
      } catch (err) {
        return next(err);
      }
    }
  }),
];

exports.get_messages = asyncHandler(async (req, res, next) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('author', 'username')
      .exec();

    res.render('index', { title: 'Express', messages });

  } catch(err) {
    return next(err);
  }
})