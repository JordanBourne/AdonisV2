import type { profile } from './types';

export const SetMyProfile = 'profile/set-my-profile';
export const SetMyProfileAction = (myProfile : profile|null) => {
    return {
        myProfile,
        type: SetMyProfile
    };
};

export const CompleteMyWorkout = 'profile/completeWorkout';