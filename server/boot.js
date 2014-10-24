if (!Meteor.settings.APP_SECRET) {
  console.error("Where are your settings dawg");
  process.exit(1);
}

