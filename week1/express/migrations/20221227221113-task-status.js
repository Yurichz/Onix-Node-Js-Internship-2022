module.exports = {
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('taskmodels').updateMany({ estimatedTime: { $lte: 10 } }, { $set: { status: 'done' } });
    await db.collection('taskmodels').updateMany({ estimatedTime: { $gt: 10 } }, { $set: { status: 'in progress' } });
  },

  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('taskmodels').updateMany({}, { $unset: { status: '' } });
  },
};
