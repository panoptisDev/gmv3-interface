import { DeployedModules, useModulesContext } from 'containers/Modules';
import { BigNumber, ethers } from 'ethers';
import client from 'gql/apollo-client';
import { useQuery } from 'react-query';
import { gql } from '@apollo/client';
import { moduleAddresses } from 'containers/Modules/Modules';
import { hexStringBN } from 'utils/hexString';

export type VoteResult = {
	council: DeployedModules;
	epochIndex: string;
	ballotId: string;
	totalVotePower: BigNumber;
	voteCount: string;
	walletAddress: string;
};

export const useVotingResult = (moduleInstance: DeployedModules, epochIndex: string | null) => {
	const governanceModules = useModulesContext();
	return useQuery<VoteResult[]>(
		['voting-result', moduleInstance, epochIndex],
		async () => {
			const contractAddress = moduleAddresses[moduleInstance].toLowerCase();
			const epoch = String(epochIndex || '0');

			const { data } = await client.query({
				query: gql`
					query VoteResults {
						voteResults(
							where: { epochIndex: "${epoch}", contract: "${contractAddress}" }
						) {
							id
							epochIndex
							votePower
							contract
							voteCount
						}
					}
				`,
			});

			const contract = governanceModules[moduleInstance]?.contract as ethers.Contract;

			const voteResults = (data.voteResults || []).filter(
				(voteResult: any) => Number(voteResult.voteCount) > 0
			);
			const addresses: string[] = await Promise.all(
				voteResults.map((voteResult: any) =>
					contract?.getBallotCandidatesInEpoch(voteResult.id, hexStringBN(epoch))
				)
			);
			return voteResults.map((voteResult: any, index: number) => ({
				walletAddress: addresses[index].toString(),
				council: moduleInstance,
				ballotId: voteResult.id,
				totalVotePower: BigNumber.from(voteResult.votePower),
				voteCount: voteResult.voteCount,
				epochIndex: voteResult.epochIndex,
			}));
		},
		{
			enabled: governanceModules !== null && moduleInstance !== null && epochIndex !== null,
			staleTime: 900000,
		}
	);
};