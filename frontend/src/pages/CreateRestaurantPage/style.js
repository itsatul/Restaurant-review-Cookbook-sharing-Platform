import styled from "styled-components";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"

export const Restaurantstyle = styled.form`
        background-color: whitesmoke;
        height: 100%;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
`

export const TopTitle = styled.section`
        color: black;
        height: 10vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            color: black;
            text-align: center;
            margin: 3px;
        }

        .line {
            width: 13rem;
            height: 2px;
            background-color: orange;
            margin-top: 0.7rem;
    `


    // --------------------------------------------MID --------------------
    export const MidSection = styled.section`

        align-self: center;
        color: black;
        height: 70vh;
        width: 80vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        gap: 2.6rem;


    `

    export const AllInputFieldDiv = styled.div`
        width: 100%;

        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;


        h6 {
            font-size: 1.1rem;
            height: 1.5rem;
            text-align: start;
            justify-content: start;
        }

    `

    export const InputFieldNameAndInput = styled.div`
        display: flex;
        justify-content: space-between;


        div {
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 10px;
            width: 32%;

            button {
                background-color: orange;
                color: white;
                width: 14rem;
                height: 3rem;
                border-radius: 4rem;
                transition: background-color 0.3s ease;

                &:hover {
                    border-bottom: 3px solid black;
                }

                &:active {
                    transform: scale(0.9);
                    color: whitesmoke;
                    transition: transform 0.1s ease-out;
                }
            }

            p {
                height: 40%;
                display: flex;
                align-items: center;
                color: dimgray;
            }

            input {
                height: 50%;
                width: 24vw;
                background-color: white;
                padding-left: 5px;
                border-radius: 2px;

                &:hover {
                    border-bottom: solid 1px black;
                }

            }


        }


        height: 60%;

    `

    // --------------------------------------------MID --------------------

    export const BottonSeciton = styled.section`
        color: black;
        height: 8vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            background-color: orange;
            color: white;
            width: 12.5rem;
            height: 3.5rem;
            border-radius: 4rem;
            transition: background-color 0.3s ease;

            &:hover {
                border-bottom: 3px solid black;
            }

            &:active {
                transform: scale(0.9);
                background-color: darkorange;
                transition: transform 0.1s ease-out;
            }


        }
    `

// export const ToastStyles = styled(ToastContainer)`
//   .Toastifytoast {
//     background-color: #333;
//     color: white;
//     border-radius: 8px;
//     padding: 16px;
//     font-family: "Roboto", sans-serif;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   }
//
//   .Toastifytoast--success {
//     background-color: green;
//   }
//
//   .Toastifytoast--error {
//     background-color: red;
//   }
//
//   .Toastifytoast-body {
//     font-size: 16px;
//     text-align: center;
//   }
//   `