import type { profile } from './types';

export const SetMyProfile = 'profile/set-my-profile';
export const SetMyProfileAction = (myProfile : profile|null) => {
    return {
        myProfile,
        type: 'auth/set-cognito-user'
    };
};

export const CompleteMyWorkout = 'profile/completeWorkout';