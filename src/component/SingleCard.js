import './SingleCard.css'

export default function SingleCard({card, cardBack, handleChoice, flipped, disabled}) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	}

	return (
		<div className="card">
			<div className={flipped ? 'flipped' : ''}>
				<img src={card.src} alt='card front' className='cardFront' width={100} />
				<img src={cardBack} alt='card back' className='cardBack' width={100} onClick={handleClick} />
			</div>
		</div>
	);
}