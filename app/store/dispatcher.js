import { userSettingsMethods } from "./slices/userSettingsSlice";

export const mapDispatchToProps = {
    ...userSettingsMethods,
};

export const mapStateToProps = state => ({
    userSettings: state.userSettings,
});
