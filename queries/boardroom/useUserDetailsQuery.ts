import { GET_PITCHES_FOR_USER_API_URL, GET_USER_DETAILS_API_URL } from 'constants/boardroom';
import { useQuery } from 'react-query';

export type GetUserDetails = {
	address: string;
	email: string;
	ens: string;
	username: string;
	twitter: string;
	about: string;
	website: string;
	notificationPreferences: string;
	associatedAddresses: string;
	type: string;
	pfpUrl: string;
	pfpImageId: string;
	bannerThumbnailUrl: string;
	bannerImageId: string;
	pfpThumbnailUrl: string;
	bannerUrl: string;
	discord: string;
	delegationPitch: string;
	github: string;
	council?: string;
};

type UserPitch = {
	address: string;
	delegationPitch: string;
	protocol: string;
};

function useUserDetailsQuery(walletAddress: string) {
	return useQuery<GetUserDetails>(
		['userDetails', walletAddress],
		async () => {
			return await getUserDetails(walletAddress);
		},
		{
			enabled: walletAddress !== null,
			// 15 minutes
			cacheTime: 900000,
		}
	);
}

export default useUserDetailsQuery;

export async function getUserDetails(walletAddress: string) {
	let userDetailsResponse = await fetch(GET_USER_DETAILS_API_URL(walletAddress), {
		method: 'POST',
	});
	let userProfile = await userDetailsResponse.json();
	let userPitchesResponse = await fetch(GET_PITCHES_FOR_USER_API_URL(walletAddress), {
		method: 'GET',
	});
	let userPitches = await userPitchesResponse.json();

	let synthetixPitch = '';
	if (userPitches.data.delegationPitches.length > 0) {
		let foundPitch = userPitches.data.delegationPitches.filter(
			(e: UserPitch) => e.protocol === 'synthetix'
		);
		synthetixPitch = foundPitch[0].delegationPitch;
	}

	delete userProfile.data.delegationPitches;

	return { ...userProfile.data, delegationPitch: synthetixPitch };
}
