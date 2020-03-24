'use strict';

const functions = require('firebase-functions');

const MAX_LOG_COUNT = 5;

exports.truncate = functions.database.ref('/agenda-cita/pachuca/{hora}').onWrite(async (change) => {
  const parentRef = change.after.ref.parent;
  const snapshot = await parentRef.once('value');
  if (snapshot.numChildren() >= MAX_LOG_COUNT) {
    let childCount = 0;
    const updates = {};
    snapshot.forEach((child) => {
      if (++childCount <= snapshot.numChildren() - MAX_LOG_COUNT) {
        updates[child.key] = null;
      }
    });
    return parentRef.update(updates);
  }
  return null;
});
