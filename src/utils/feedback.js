import * as Haptics from 'expo-haptics';

export const playCorrect = async (hapticsEnabled = true) => {
  try {
    if (hapticsEnabled) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  } catch (e) {}
};

export const playWrong = async (hapticsEnabled = true) => {
  try {
    if (hapticsEnabled) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  } catch (e) {}
};

export const playTap = async (hapticsEnabled = true) => {
  try {
    if (hapticsEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch (e) {}
};

export const playSuccess = async (hapticsEnabled = true) => {
  try {
    if (hapticsEnabled) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  } catch (e) {}
};
