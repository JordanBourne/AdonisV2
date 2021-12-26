import type { ProfileDb } from './types';

export const SetMyProfile = 'profile/set-my-profile';
export const SetMyProfileAction = (myProfile : ProfileDb|null) => {
    return {
        myProfile,
        type: SetMyProfile
    };
};

export const CompleteMyWorkout = 'profile/completeWorkout';