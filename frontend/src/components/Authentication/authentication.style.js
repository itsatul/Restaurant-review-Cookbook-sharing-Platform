import styled from 'styled-components'

const orangeColor = '#E47D31'
const titleColor = '#4C4C4C'
// const inputAColor = '#555555'
const inputAColor = '#979797'
const borderColor = '#EBEBEB'
const whiteColor = '#ffffff'
const errorColor = '#B00000'
export const ContainerAuthDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ContainerHeaderDiv = styled.div`
    padding: 4rem 0 5rem 0;

    .name {
        font-size: 1.6rem;
        font-weight: 700;
        text-align: center;
        color: ${titleColor};
        padding-bottom: 1rem;
        margin: auto;
    }

    .bar {
        width: 100px;
        height: 3px;
        background-color: ${orangeColor};
        margin: auto;
    }
`

export const ContainerBodyDiv = styled.div`
`

export const AuthFormForm = styled.form`
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 400px;
        height: 3.5rem;
        padding: 1rem;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        color: ${inputAColor};
        border: solid ${borderColor} 1px;
        font-size: 1.2rem;
        font-weight: inherit;
        background-color: ${whiteColor};

        &::placeholder {
            color: ${inputAColor};
        }
    }

    button {
        background-color: ${orangeColor};
        color: ${whiteColor};
        font-size: 1.3rem;
        font-weight: 400;
        padding: 1rem 3.5rem;
        border-radius: 5rem;
        margin-top: 5rem;
    }

    .link-box {
        align-self: flex-end;
        margin-top: .2rem;

        a {
            color: ${inputAColor};
        }
    }

    .error-box {
        align-self: flex-start;
        color:${errorColor};
        font-size: .8rem;
        font-weight: lighter;
    }

    .input-box {
        max-width: 500px;

        p {
            text-align: center;
            font-size: 1.3rem;
            font-weight: 100;
            line-height: 1.6rem;
        }
    }

    .input-box-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 830px;

        .input-wrapper:nth-child(odd) {
            margin-right: 30px;
            margin-bottom: 15px;
        }
    }
`