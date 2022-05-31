import { GET_USER_DETAILS_API_URL } from 'constants/boardroom';
import { useConnectorContext } from 'containers/Connector';
import { useQuery } from 'react-query';
import { sortToOwnCard } from 'utils/sort';
import { GetUserDetails } from './useUserDetailsQuery';

function useUsersDetailsQuery(walletAddresses: string[]) {
	const { walletAddress } = useConnectorContext();
	return useQuery<GetUserDetails[]>(
		['usersDetails', walletAddresses],
		async () => {
			return await getUsersDetail(walletAddresses, walletAddress || '');
		},
		{
			enabled: walletAddresses !== null && walletAddresses.length > 0,
			staleTime: 900000,
		}
	);
}

export default useUsersDetailsQuery;

export async function getUsersDetail(walletAddresses: string[], ownAddress: string) {
	const promises = walletAddresses.map((address) =>
		fetch(GET_USER_DETAILS_API_URL(address), {
			method: 'POST',
		})
	);
	const responses = await Promise.all(promises);
	const result = await Promise.all(responses.map((response) => response.json()));
	if (ownAddress) {
		return sortToOwnCard(
			result.map((r) => r.data),
			ownAddress
		);
	}
	return result.map((r) => r.data);
}
