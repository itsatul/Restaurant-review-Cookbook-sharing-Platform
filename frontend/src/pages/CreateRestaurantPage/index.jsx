import styled from "styled-components";
import {useState} from "react";
import {api} from "../../axios/axios.js";
import {useDispatch} from "react-redux";
import {
    AllInputFieldDiv,
    BottonSeciton,
    InputFieldNameAndInput,
    MidSection,
    Restaurantstyle,
    TopTitle
} from "./style.js";
import {useNavigate} from "react-router-dom";

export default function CreateRestaurant() {


    // MID PART CSS

    // --------------------------------- FUNTIONALITY ---------------------------------
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [opening_hours, setOpening_ours] = useState("");
    const [price_level, setPrice_level] = useState("");
    const [image, setImage] = useState("")
    const token = localStorage.getItem("access");
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const fetchtoken  = async () => {
    //     try {
    //         const config = {
    //             headers : {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         };
    //     }catch (
    //
    //         )
    // }


    //   const [password, setPassword] = useState("");
    // const [ConfirmPassword, setConfirmPassword] = useState("");
    // const [code, setCode] = useState("");
    // const email=useSelector(state=> state.user.email);
    // const navigate = useNavigate();
    // const [loginError, setLoginError] = useState("");


    const handleRegisterValidation = async (e) => {
        e.preventDefault();


        try {
            if(!name || !street || !city || !zip || !website || !phone || !email || !opening_hours || !price_level ){
                console.log("plis pull all the fields ")
                return;
            }

            const token = localStorage.getItem("access");
            if (!token) {
                console.error("User is not authenticated. Please log in.");
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };
            const res = await api.post("https://luna-project-batch30.propulsion-learn.ch/backend/api/restaurants/new/", {
                name: name,
                street: street,
                city: city,
                zip: zip,
                website: website,
                phone: phone,
                email: email,
                opening_hours: opening_hours,
                price_level: price_level,
                description:'super description',
                country:country

            }, config)
            // toast.success("Review submitted successfully!");
            console.log("submit done , check gmail :D")
            navigate("/")
        } catch (error) {
            console.log('error')
        }


    }


    return (<Restaurantstyle onSubmit={(e) => handleRegisterValidation(e)}>
            {/*// header section*/}

            <TopTitle>
                <h1>CREATE NEW RESTAURANT</h1>
                <div className="line"></div>
            </TopTitle>

            {/*//data section \ Mid section*/}
            <MidSection>
                <AllInputFieldDiv>
                    <h6>Basic</h6>
                    <InputFieldNameAndInput>
                        <div>
                            <p>Name *</p>
                            <input type="text" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <p>Category</p>
                            <input type="text" placeholder='select a value'/>
                        </div>
                        <div>
                            <p>Country *</p>
                            <input type="text"  onChange={(e) => setCountry(e.target.value)}/>
                        </div>
                    </InputFieldNameAndInput>
                </AllInputFieldDiv>
                <AllInputFieldDiv>
                    <h6>Address</h6>
                    <InputFieldNameAndInput>
                        <div>
                            <p>Street *</p>
                            <input type="text" onChange={(e) => setStreet(e.target.value)}/>
                        </div>
                        <div>
                            <p>City *</p>
                            <input type="text" onChange={(e) => setCity(e.target.value)}/>
                        </div>
                        <div>
                            <p>Zip *</p>
                            <input type="text" onChange={(e) => setZip(e.target.value)}/>
                        </div>
                    </InputFieldNameAndInput>
                </AllInputFieldDiv>
                <AllInputFieldDiv>
                    <h6>Contact</h6>
                    <InputFieldNameAndInput>
                        <div>
                            <p>Website *</p>
                            <input type="text" onChange={(e) => setWebsite(e.target.value)}/>
                        </div>
                        <div>
                            <p>Phone *</p>
                            <input type="text" onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div>
                            <p>Email *</p>
                            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </InputFieldNameAndInput>
                </AllInputFieldDiv>
                <AllInputFieldDiv>
                    <h6>Details</h6>
                    <InputFieldNameAndInput>
                        <div>
                            <p>Opening hours *</p>
                            <input type="text" onChange={(e) => setOpening_ours(e.target.value)}/>
                        </div>
                        <div>
                            <p>Price level *</p>
                            <input type="text"  onChange={(e) => setPrice_level(e.target.value)}/>
                        </div>
                        <div>
                            <p>image</p>
                            <button>CHOOSE A FILE</button>
                        </div>
                    </InputFieldNameAndInput>
                </AllInputFieldDiv>


            </MidSection>

            {/*// BOTTOM BUTTOM */}
            <BottonSeciton>
                <button type="submit">Submit</button>
            </BottonSeciton>

        </Restaurantstyle>

    )

}