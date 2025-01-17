import styled from "styled-components";
import {useEffect, useState} from "react";
import {useUserData} from "../../hooks/useUserData.js";
import {useDispatch} from "react-redux";
import { setProfileValues, updateUserData } from "../../slice/userSlice.js";


const FormWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    padding-inline: 1rem;
    gap: 1rem;
`

const ProfileForm = styled.form`
    display: flex;
    flex-direction: column;

    #description {
        width: 80%;
        height: 80px;
    }
`

const FormLabel = styled.label`
    color: #979797;
    font-size: 20px;
    font-weight: 700;
    padding-top: 1rem;
`

const FormInput = styled.input`
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 50%;
    height: 35px;
    padding: 0 10px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        border-color: #E47D31;
        box-shadow: 0 0 5px rgba(228, 125, 49, 0.5);
    }

    &:focus {
        border-color: #E47D31;
        outline: none;
        box-shadow: 0 0 10px rgba(228, 125, 49, 0.8);
    }

`

const SaveButton = styled.button`
    width: 27%;
    min-width: 210px;
    height: 50px;
    background-color: #E47D31;
    color: #FFFFFF;
    border: none;
    border-radius: 25px;
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #e55d00; /* Slightly darker shade */
        transform: translateY(-2px); /* Lift on hover */
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
    }

    &:active {
        background-color: #cc5200; /* Darker orange for active state */
        transform: translateY(1px); /* Push-down effect */
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* Tighter shadow */
    }
`

export default function EditUserProfile() {

    // fetching data with hook
    const {data: userData, status: userStatus, error: userError} = useUserData()

    // state management for the form
    const [profileValues, setProfileValues] = useState({
        username: userData.username || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        location: userData.location || '',
        phone: userData.phone || '',
        things_i_love: userData.things_i_love || '',
        description: userData.description || '',
        // profile_picture: userData.profile_picture,
        // banner_picture: userData.banner_picture,
    })

    const [successMessage, setSuccessMessage] = useState('')

    const dispatch = useDispatch();

    console.log('profile values', profileValues)

    // handling input
    const handleChange = (event) => {
        const {name, value} = event.target; // name and value of the changed input
        setProfileValues((prevValues) => ({
            ...prevValues, // keep other form values unchanged
            [name]: value, // update the value of the changed input
        }));
    };

    // handling submit
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('start dispatching data')
        dispatch(updateUserData(profileValues))
            .then((response) => {
                console.log("Profile updated successfully:", response);
                setSuccessMessage('Your profile has been updated successfully!');
            })
            .catch((err) => {
                console.error("Failed to update profile:", err);
                setSuccessMessage('');
            });
    }


    if (!userData) return <p>Loading...</p>;
    if (userStatus === 'failed') return <p>Error: {userError}</p>;

    return (
        <FormWrapper>
            <ProfileForm onSubmit={handleSubmit}>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <FormLabel htmlFor='username'>Username</FormLabel>
                <FormInput
                    type='text'
                    name='username'
                    placeholder={userData.username}
                    value={profileValues.username}
                    onChange={handleChange}/>

                <FormLabel htmlFor='first_name'>First Name</FormLabel>
                <FormInput
                    type='text'
                    name='first_name'
                    placeholder={userData.first_name}
                    value={profileValues.first_name}
                    onChange={handleChange}/>

                <FormLabel htmlFor='last_name'>Last Name</FormLabel>
                <FormInput
                    type='text'
                    name='last_name'
                    placeholder={userData.last_name}
                    value={profileValues.last_name}
                    onChange={handleChange}/>

                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormInput
                    type='email'
                    name='email'
                    placeholder={userData.email}
                    value={profileValues.email}
                    onChange={handleChange}/>

                <FormLabel htmlFor='location'>Location</FormLabel>
                <FormInput
                    type='text'
                    name='location'
                    placeholder={userData.location}
                    value={profileValues.location}
                    onChange={handleChange}/>

                <FormLabel htmlFor='phone'>Phone</FormLabel>
                <FormInput
                    type='text'
                    name='phone'
                    placeholder={userData.phone}
                    value={profileValues.phone}
                    onChange={handleChange}/>

                <FormLabel htmlFor='things_i_love'>Things I Love</FormLabel>
                <FormInput
                    type='text'
                    name='things_i_love'
                    placeholder={userData.things_i_love}
                    value={profileValues.things_i_love}
                    onChange={handleChange}/>

                <FormLabel htmlFor='description' id={'description'}>Description</FormLabel>
                <FormInput
                    id={'description'}
                    name='description'
                    type='text'
                    placeholder={userData.description}
                    value={profileValues.description}
                    onChange={handleChange}
                />

                <div className={'button-div'}>
                    <SaveButton type='submit'>Save</SaveButton>
                </div>
            </ProfileForm>
        </FormWrapper>
    )
}