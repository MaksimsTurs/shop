import { FC } from 'react'

import TextLoader from '../loaders/ui/textLoader.component'

const ProductCardsLoader: FC = () => {
	return (
		<div
			style={{
				marginTop: '1rem',
				display: 'flex',
				flexWrap: 'wrap',
				gap: '1rem',
			}}
		>
			<TextLoader />
			<TextLoader />
			<TextLoader />
			<TextLoader />
			<TextLoader />
			<TextLoader />
			<TextLoader />
			<TextLoader />
		</div>
	)
}

export default ProductCardsLoader
