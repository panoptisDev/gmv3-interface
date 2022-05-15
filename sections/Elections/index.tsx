import { Button, Card, Flex } from '@synthetixio/ui';
import NominateSelfBanner from 'components/Banners/NominateSelfBanner';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function ElectionsSection() {
	const { t } = useTranslation();
	const { push } = useRouter();
	const councilNames = [
		t('landing-pages.elections.councils.ccc'),
		t('landing-pages.elections.councils.ac'),
		t('landing-pages.elections.councils.sc'),
		t('landing-pages.elections.councils.gc'),
		t('landing-pages.elections.councils.tc'),
	];
	return (
		<>
			<NominateSelfBanner hideButton />
			<Flex direction="column" alignItems="center">
				<StyledElectionsHeadline>{t('landing-pages.elections.headline')}</StyledElectionsHeadline>
				<Flex justifyContent="space-between">
					{councilNames.map((name, index) => (
						<StyledCard color="purple" key={name.concat(index.toString())}>
							<StyledCardContentWrapper>
								<StyledCouncilCircleOuter>
									<StyledCouncilCircleInner></StyledCouncilCircleInner>
								</StyledCouncilCircleOuter>
								<CouncilCard name={name} />
								<Button
									onClick={() =>
										push({ pathname: '/elections/members/', query: { council: name } })
									}
								>
									{t('landing-pages.elections.vote-council')}
								</Button>
							</StyledCardContentWrapper>
						</StyledCard>
					))}
				</Flex>
			</Flex>
		</>
	);
}

const CouncilCard = ({ name }: { name: string }) => {
	return <StyledCardHeadline>{name}</StyledCardHeadline>;
};

const StyledElectionsHeadline = styled.h1`
	margin: 0;
	text-align: center;
	font-family: 'Inter Bold';
	font-size: 3.33rem;
	margin-bottom: ${({ theme }) => theme.spacings.medium};
`;

const StyledCardHeadline = styled.h4`
	font-family: 'Inter Bold';
	font-size: 1.5rem;
`;

const StyledCard = styled(Card)`
	margin: ${({ theme }) => theme.spacings.medium};
	width: 180px;
	height: 200px;
`;

const StyledCardContentWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: ${({ theme }) => theme.spacings.tiny};
`;

const StyledCouncilCircleOuter = styled.div`
	border-radius: 50%;
	min-width: 72px;
	min-height: 72px;
	background: ${({ theme }) => theme.colors.gradients.rainbow};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledCouncilCircleInner = styled.div`
	background-color: ${({ theme }) => theme.colors.black};
	width: 70px;
	height: 70px;
	border-radius: 50%;
`;