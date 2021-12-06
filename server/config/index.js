const { connectDB, connectMockDB } = require("./database");
const {
  initializeSystemSettings,
  initialiseSuperAdmin,
} = require("./systemSettings");

const initializeApplication = async (env, eventEmitter) => {
  console.log("Initializing application...");
  if (env === "test") {
    await connectMockDB();
  } else {
    await connectDB();
  }
  // await initialiseSuperAdmin();
  // await initializeSystemSettings();
  eventEmitter.emit("DatabaseReady");
};

module.exports = { initializeApplication };
