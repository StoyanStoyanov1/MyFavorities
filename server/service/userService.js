const User = require('../models/User');

exports.create = async (userData) => await User.create(userData);

exports.findByEmail = async (email) => await User.findOne({ email }).lean();

exports.getAll = async () => await User.find().lean();

exports.getById = async (id) => await User.findById(id).lean();

exports.contentToList = async (userId, contentId) => await User.findByIdAndUpdate(userId, {$push: {contents: contentId}}, {new: true}).lean();

exports.removeContent = async (userId, contentId) => await User.findByIdAndUpdate(userId, {$pull: {contents: contentId}}, {new: true}).lean();

exports.addFavorite = async (userId, contentId) => await User.findByIdAndUpdate(userId, {$push: {favorites: contentId}}, {new: true}).lean();

exports.removeFavorite = async (userId, contentId) => await User.findByIdAndUpdate(userId, {$pull: {favorites: contentId}}, {new: true}).lean();

exports.configUser = async (userId) => await User.findByIdAndUpdate(userId, {aktiv: true}, {new: true});