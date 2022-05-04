import { Button, Flex } from '@synthetixio/ui';
import Connector from 'containers/Connector';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import BaseModal from '../BaseModal';

interface WithdrawModalProps {
	council: string;
}

export default function WithdrawModal({ council }: WithdrawModalProps) {
	const { t } = useTranslation();
	const { walletAddress, ensName, connectWallet } = Connector.useContainer();
	return (
		<BaseModal headline={t('modals.withdraw.headline')}>
			<StyledBlackBox direction="column" alignItems="center">
				<StyledBlackBoxSubline>
					{t('modals.withdraw.nomination-for', { council })}
				</StyledBlackBoxSubline>
				<StyledWalletAddress>
					{ensName ? (
						ensName
					) : walletAddress ? (
						walletAddress
							.substring(0, 5)
							.concat('...')
							.concat(walletAddress.substring(walletAddress.length - 4))
					) : (
						<Button onClick={() => connectWallet()} variant="primary" size="small">
							{t('modals.nomination.checkboxes.connect-wallet')}
						</Button>
					)}
				</StyledWalletAddress>
			</StyledBlackBox>
			<StyledButton onClick={() => {}}>{t('modals.withdraw.nomination')} </StyledButton>
		</BaseModal>
	);
}

const StyledBlackBox = styled(Flex)`
	background-color: ${({ theme }) => theme.colors.black};
	max-width: 314px;
	height: 80px;
	padding: 16px 50px;
	margin-bottom: ${({ theme }) => theme.spacings.medium};
`;

const StyledBlackBoxSubline = styled.h6`
	font-family: 'Inter Bold';
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.grey};
	margin: 0;
`;

const StyledWalletAddress = styled.h3`
	font-family: 'Inter Bold';
	font-size: 2rem;
	margin: ${({ theme }) => theme.spacings.tiniest};
	color: ${({ theme }) => theme.colors.white};
`;

const StyledButton = styled(Button)`
	max-width: 312px;
`;
