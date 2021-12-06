const SettingsModel = require("../models/Settings");
const UserModel = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const { getDefaultSystemSettings } = require("../utils");

const initializeSystemSettings = async () => {
  console.log("Initializing system settings...");
  try {
    const systemSettings = await SettingsModel.findOne();
    // if no settings defined, we load the default settings
    if (!systemSettings) {
      console.log("No system settings found. Creating a new one...");
      const createdSettings = new SettingsModel({
        ...getDefaultSystemSettings(),
      });
      const result = await createdSettings.save();
      console.log("System settings:", result);
    } else {
      console.log("Existing system settings found.");
      console.log("System settings:", systemSettings);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Create a superUser account if not already created
// just ONCE in every app lifecycle
const initialiseSuperAdmin = async () => {
  try {
    // we will keep this creation as silent as possible
    // i.e. minimize console.log
    const superAdminEmail = process.env.SUPER_ADMIN_ID;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    if (!superAdminEmail || !superAdminPassword) {
      throw new Error("Super administrator credentials are not defined.");
    }
    const rootUser = await UserModel.find({ email: superAdminEmail });
    // if there's no super admin yet, we create one
    if (!rootUser || rootUser.length === 0) {
      const props = {
        name: "Reso Super Admin",
        email: superAdminEmail,
        mobile: "0000000000",
        password: superAdminPassword,
        isAdmin: true,
        isSuperAdmin: true,
        acceptedTNC: true,
      };
      const superAdmin = await UserModel.create({ ...props });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { initializeSystemSettings, initialiseSuperAdmin };
