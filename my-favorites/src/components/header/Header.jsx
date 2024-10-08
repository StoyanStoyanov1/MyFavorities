import React, { useContext, useEffect, useState } from 'react';
import Path from '../../paths.js'
import { Link } from "react-router-dom";
import translateHeader from "../../utils/translator/translateHeader.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import authContext from "../../context/authContext.jsx";
import translateEmail from '../../utils/translator/translateEmail/translateEmail.js';
import sendEmail from '../../utils/email/configEmail.js';
import MobilHeader from './MobilHeader.jsx';

export default function Header() {

	const [language, setLanguage] = useLanguage();
	const { _id, username, isAuthenticated, email, aktiv } = useContext(authContext);
	const [isClicked, setIsClicked] = useState(false);


	const getNavLinkClass = (path) => {

		return location.pathname.includes(path) ? 'current-page' : '';
	};

	const handleLanguageChange = (e) => {
		setLanguage(e.target.value);
	};

	return (
		<header>

			<nav>
			<MobilHeader/>

				<div className="nav-left">
					<Link className={getNavLinkClass(Path.Books)} to={Path.Books}>{translateHeader.books[language]}</Link>
					<Link className={getNavLinkClass(Path.Movies)} to={Path.Movies}>{translateHeader.movies[language]}</Link>
					<Link className={getNavLinkClass(Path.Series)} to={Path.Series}>{translateHeader.series[language]}</Link>
					<Link className={getNavLinkClass(Path.Podcasts)} to={Path.Podcasts}>{translateHeader.podcasts[language]}</Link>
				</div>
				<div className="favorites-container">
					<Link className={`favorites-text ${location.pathname === Path.Home ? 'current-page' : ''}`} to={Path.Home}>My Favorites</Link>
				</div>
				<div className="nav-right">
					<Link className={getNavLinkClass(Path.EmailForm)} to={Path.EmailForm}>{translateHeader.contactUs[language]}</Link>

					{isAuthenticated && <>
						<div className='profilMenu'>
							<button className={`profilMenu-button ${getNavLinkClass(Path.Recommend) || getNavLinkClass(_id)}`}>{username}</button>
							<div className="profilMenu-content">
								<p className='profilMenu-email'>{email}</p>

								<Link className={getNavLinkClass(Path.MyRecommends)} to={`${Path.MyRecommends}/${_id}`}>{translateHeader.myRecommendations[language]}</Link>
								<Link className={getNavLinkClass(Path.Recommend)} to={Path.Recommend}>{translateHeader.recommend[language]}</Link>
								<Link className={getNavLinkClass(Path.MyFavorites)} to={`${Path.MyFavorites}/${_id}`}>{translateHeader.favorites[language]}</Link>
								<Link to={Path.Logout}>{translateHeader.logout[language]}</Link>
							</div>
						</div>
					</>
						||
						<>

							<Link className={getNavLinkClass(Path.Login)} to={Path.Login}>{translateHeader.login[language]}</Link>
							<Link className={getNavLinkClass(Path.Register)} to={Path.Register}>{translateHeader.register[language]}</Link>
						</>}


					<div className="language-selector">
						<select value={language} onChange={handleLanguageChange}>
							<option value="en">English</option>
							<option value="de">Deutsch</option>
							<option value="bg">Български</option>
						</select>
					</div>
				</div>
			</nav>
			{isAuthenticated && !aktiv && <p className={`config-message ${isClicked ? 'confirm' : ''}` }>{isClicked ? translateEmail.waitConfirm[language]:translateEmail.configEmail[language] }
				{!isClicked && <a className='config-here' onClick={() => {
					setIsClicked(true);

					setTimeout(() => {
						setIsClicked(false);

					}, 50000)

					if (!isClicked) sendEmail(username, _id, email);
				}}>{language === 'bg' ? 'тук' : 'here'}</a>}
				.</p>}

		</header>
	)
}