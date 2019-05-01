'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema({
  profileInfo: {
    fullName: String,
    nickName: String,
    description: String,
    social: {
      twitterUrl: String,
      twitchUrl: String,
      instagramUrl: String,
      webUrl: String,
    },
  },
  accountInfo: {
    email: String,
    password: String,
    createdAt: Date,
    activatedAt: Date,
    verificationCode: String,
    uuid: {
      type: String,
      unique: true,
    },
    role: String,
  },
  tags: [String],
  avatarUrl: String,
  team: String,
  jobs: [],

  background: {
    experience: [{
      company: String,
      job: String,
      dateStart: Date,
      dateEnd: Date,
    }],
    education: [{
      school: String,
      degree: String,
      dateStart: Date,
      dateEnd: Date,
    }],
  },
});

playerSchema.index(
  {
    'profileInfo.fullName': 'text',
    'profileInfo.nickName': 'text',
    'profileInfo.description': 'text',
    tags: 'text',
  },
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
