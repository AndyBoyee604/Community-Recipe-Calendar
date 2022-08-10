const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: '1st comment',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'wow great job',
    user_id: 2,
    post_id: 2
  },
  {
    comment_text: 'another one',
    user_id: 3,
    post_id: 1
  },
  {
    comment_text: 'Nice Recipe',
    user_id: 3,
    post_id: 1
  },
  {
    comment_text: 'In hac habitasse platea dictumst.',
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: 'Vivamus vestibulum sagittis sapien.',
    user_id: 1,
    post_id: 2
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
