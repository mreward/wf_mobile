/* DO NOT CHANGE: Auto-generated file */

const DashboardBase = require('../../modules/Dashboard/Base/register.js');
const HelpersBase = require('../../modules/Helpers/Base/register.js');
const OnBoarding = require('../../modules/OnBoarding/register.js');
const mRewardAuth = require('../../modules/mReward/Auth/register.js');
const mRewardContacts = require('../../modules/mReward/Contacts/register.js');
const mRewardDashboard = require('../../modules/mReward/Dashboard/register.js');
const mRewardHelpers = require('../../modules/mReward/Helpers/register.js');
const mRewardHistory = require('../../modules/mReward/History/register.js');
const mRewardInteresting = require('../../modules/mReward/Interesting/register.js');
const mRewardMap = require('../../modules/mReward/Map/register.js');
const mRewardNews = require('../../modules/mReward/News/register.js');
const mRewardNotifications = require('../../modules/mReward/Notifications/register.js');
const mRewardPoll = require('../../modules/mReward/Poll/register.js');
const mRewardProfile = require('../../modules/mReward/Profile/register.js');
const mRewardPromotions = require('../../modules/mReward/Promotions/register.js');

module.exports = dirname => ({
        ...DashboardBase(dirname),
    ...HelpersBase(dirname),
    ...OnBoarding(dirname),
    ...mRewardAuth(dirname),
    ...mRewardContacts(dirname),
    ...mRewardDashboard(dirname),
    ...mRewardHelpers(dirname),
    ...mRewardHistory(dirname),
    ...mRewardInteresting(dirname),
    ...mRewardMap(dirname),
    ...mRewardNews(dirname),
    ...mRewardNotifications(dirname),
    ...mRewardPoll(dirname),
    ...mRewardProfile(dirname),
    ...mRewardPromotions(dirname),
});
