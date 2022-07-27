import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { copyToClipboard } from 'utils/helpers';

interface Props {
	text: string;
	className?: string;
}

export const CopyClipboard: React.FC<Props> = ({ text, className }) => {
	const { t } = useTranslation();
	const onClick = () => {
		copyToClipboard(text);
		toast.success(t('components.copy-clipboard-message'));
	};
	return (
		<svg
			className={clsx('cursor-pointer transition-colors hover:text-primary', className)}
			fill="currentColor"
			height="1em"
			stroke="currentColor"
			strokeWidth="0"
			viewBox="0 0 1024 1024"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			onClick={onClick}
			data-testid="copy-clipboard-svg"
		>
			<path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-.2L232 746.2v-.2h150v150z" />
		</svg>
	);
};
