import Main from 'components/Main';
import type { NextPage } from 'next';
import Head from 'next/head';
import Dashboard from '../sections/dashboard';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Synthetix | Governance V3</title>
			</Head>
			<Main>
				<Dashboard />
			</Main>
		</>
	);
};

export default Home;
