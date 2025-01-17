import styled from "styled-components";
import {useUserData} from "../../hooks/useUserData.js";
import ProfileReviewCard from "../../components/ProfileReviewCard/index.jsx";
import comment from '../../assets/comment.svg'
import star from '../../assets/star.svg'
import edit from '../../assets/edit.svg'
import restaurant from '../../assets/restaurant.svg'
import {useState} from "react";
import ProfileCommentCard from "../../components/ProfileCommentCard/index.jsx";
import ProfileRestaurantCard from "../../components/ProfileRestaurantCard/index.jsx";
import EditUserProfile from "../../components/EditProfile/index.jsx";

const ProfilePageContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;

    .banner-image {
        width: 100%;
        height: 100%;
        z-index: 0;

        img {
            width: 100%;
            height: 25%;
        }
    }
`

const ProfileContainer = styled.div`
    width: 70%;
    height: 80%;
    position: absolute;
    top: 8%;
    left: 8%;
    z-index: 1;

    display: flex;
    flex-direction: row;

    .profile-container-left {
        width: 30%;
        z-index: 1;

        .profile-image {
            width: 100%;
            height: 50%;

            img {
                width: 100%;
                min-width: 200px;
                height: 100%;
                min-height: 180px;
            }
        }
    }

    .profile-container-right {
        width: 100%;

        .location-div {
            height: 23%;
            padding-left: 1rem;
            color: #FFFFFF;

            .first-name {
                font-size: 24px;
                font-weight: 700;
            }

            .info {
                font-size: 18px;
                font-weight: 300;
            }
        }

        .content-title {
            background: #FFFFFF;
            color: #303030;
            font-size: 20px;
            font-weight: 700;
            padding-left: 1rem;
        }

        .profile-content-wrapper {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            opacity: 1;
            transform: translateY(0);
        }

        /* When the content is transitioning out */

        .profile-content-wrapper.transition-exit {
            opacity: 0;
            transform: translateY(20px);
        }


    }

    //.profile-image {
    //    border: 1px solid #535bf2;
    //    height: 40%;
    //}
`

const ProfileNavigation = styled.div`
    height: 60%;
    width: 100%;

    ul {
        height: 100%;
    }

    .navigation-points {
        height: 15%;
        font-size: 18px;
        font-weight: 300;
        background: #FFFFFF;
        border-block: 1px solid #979797;
        padding-left: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;

        &:hover {
            background-color: #f0f0f0; /* color when hovering over point */
            transform: scale(1.02); /*zoom effect*/
        }
    }

    .navigation-points.active {
        border-left: 4px solid #E47D31;
    }
`

const AboutContainer = styled.div`
    width: 22%;
    height: 65%;
    position: absolute;
    top: 25%; /* Aligns with ProfileContainer */
    right: 0%; /* Positions it on the right side */
    z-index: 1;

    .about-title {
        font-size: 20px;
        font-weight: 700;
        color: #303030;
        padding-inline: 1rem;
        padding-top: 1rem;
    }

    .about-headline {
        font-size: 20px;
        font-weight: 700;
        color: #000000;
        margin-top: 2rem;
        margin-inline: 1rem;
    }

    .about-body {
        font-size: 20px;
        font-weight: 300;
        color: #000000;
        padding-inline: 1rem;
    }
`

const getIcon = (item) => {
    switch (item) {
        case 'Reviews':
            return star;
        case 'Comments':
            return comment;
        case 'Restaurants':
            return restaurant;
        case 'Edit Profile':
            return edit;
        default:
            return null;
    }
};

export default function ProfilePage() {

    const {data: userData, status: userStatus, error: userError} = useUserData()
    const [activeNav, setActiveNav] = useState(0)
    console.log('profile page user data log', userData.profile_picture)
    const handleNavClick = (index) => {
        setActiveNav(index)
    }

    const getContentTitle = () => {
        if (activeNav === 0) {
            return (
                <p className={'content-title'}>Reviews</p>
            )
        } else if (activeNav === 1) {
            return (
                <p className={'content-title'}>Comments</p>
            )
        } else if (activeNav === 2) {
            return (
                <p className={'content-title'}>Restaurants</p>
            )
        } else if (activeNav === 3) {
            return (
                <p className={'content-title'}>Edit User Profile</p>
            )
        }
    }

    const getContent = () => {

        if (activeNav === 0) {
            return (
                <>
                    {userStatus === 'loading' && <div>Loading...</div>}
                    {userStatus === 'failed' && <div>Error: {userError}</div>}
                    {userStatus === 'succeeded' && userData &&
                        <ProfileReviewCard key={`nav-${activeNav}`} userId={userData.id} activeNav={activeNav}/>
                    }
                </>
            )
        } else if (activeNav === 1) {
            return (
                <>
                    {userStatus === 'loading' && <div>Loading...</div>}
                    {userStatus === 'failed' && <div>Error: {userError}</div>}
                    {userStatus === 'succeeded' && userData &&

                        <ProfileCommentCard key={`nav-${activeNav}`} userId={userData.id} activeNav={activeNav}/>

                    }
                </>
            )
        } else if (activeNav === 2) {
            return (
                <>
                    {userStatus === 'succeeded' && userData &&
                        <ProfileRestaurantCard key={`nav-${activeNav}`} userId={userData.id} activeNav={activeNav}/>
                    }
                </>
            )
        } else if (activeNav === 3) {
            return (
                <>
                    <EditUserProfile/>
                </>
            )
        }
    }

    return (
        <ProfilePageContainer>
            <div className={'banner-image'}>
                <img className={'banner-image'} src={userData.banner_picture}/>
            </div>
            <ProfileContainer>
                <div className={'profile-container-left'}>
                    <div className={'profile-image'}>
                        <img src={userData.profile_picture}/>
                    </div>
                    <ProfileNavigation>
                        <ul>
                            {['Reviews', 'Comments', 'Restaurants', 'Edit Profile'].map((item, index) => (
                                <li
                                    key={index}
                                    className={`navigation-points ${activeNav === index ? 'active' : ''}`}
                                    onClick={() => handleNavClick(index)}
                                >
                                    <img src={getIcon(item)} alt={item}/>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </ProfileNavigation>
                </div>
                <div className={'profile-container-right'}>
                    {/*location missing in endpoint*/}
                    <div className={'location-div'}>
                        <p className={'first-name'}>{userData.first_name} {userData.last_name}</p>
                        <p className={'info'}>{userData.location}</p>
                        <p className={'info'}>{userData.review_count} reviews</p>
                        <p className={'info'}>{userData.comment_count} comments</p>
                    </div>

                    <div className="profile-content-wrapper">
                        {getContentTitle()}
                        {getContent()}
                    </div>
                    {/*{getContentTitle()}*/}
                    {/*/!*calling getContent function here*!/*/}
                    {/*{getContent()}*/}

                    {/*<ProfileReviewCard key={userData.id} userId={userData.id}/>*/}
                </div>
            </ProfileContainer>

            <AboutContainer>
                <div className={'about-title'}>About {userData.first_name}</div>
                <div className={'about-location'}>
                    <p className={'about-headline'}>Location</p>
                    <p className={'about-body'}>{userData.location}</p></div>
                <div className={'about-luna'}>
                    <p className={'about-headline'}>Luna member since</p>
                    <p className={'about-body'}>{userData.joined_date}</p>
                </div>
                <div className={'about-interests'}>
                    <p className={'about-headline'}>Things I love</p>
                    <p className={'about-body'}>{userData.things_i_love}</p>
                </div>
                <div className={'about-description'}>
                    <p className={'about-headline'}>Description</p>
                    <p className={'about-body'}>{userData.description}</p>
                </div>

            </AboutContainer>

        </ProfilePageContainer>
    )
}