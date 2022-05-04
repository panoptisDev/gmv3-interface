import Main from 'components/Main';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CouncilNominees from 'sections/nominations/CouncilNominees';
import { capitalizeString } from 'utils/capitalize';

const CouncilMembers: NextPage = () => {
	const { query } = useRouter();
	return (
		<>
			<Head>
				<title>
					Synthetix | &nbsp;
					{query?.council && capitalizeString(query.council.toString())} - Council
				</title>
			</Head>
			<Main>
				<CouncilNominees />
			</Main>
		</>
	);
};

export default CouncilMembers;
